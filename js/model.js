// Initialize Firebase
var config = {
  apiKey: "AIzaSyAyYUSp4pDlqGd3wRx1FxrfQDQedl46ULI",
  authDomain: "realtime-chat-8f257.firebaseapp.com",
  databaseURL: "https://realtime-chat-8f257.firebaseio.com",
  storageBucket: "realtime-chat-8f257.appspot.com",
  messagingSenderId: "440440851020"
};
firebase.initializeApp(config);

// create DB
var database = firebase.database();

//new message count
var countNewMsg = 0;
 
var modelMsg = {
  pressEnter: function (e) {
    if (e.keyCode == 13) { //press enter
      modelMsg.writeData(userId, uid, "push_msg");                    
    }
  }, 
  writeData: function(userId, uid, id) {
    var msg = document.getElementById(id).value;
    document.getElementById(id).value = null;
    if(msg !== null && uid !== null){
      firebase.database().ref('message/').push({
        uid: uid,
        user: userId,
        msg: msg,
        photoURL: userPhotoURL,
        date: (new Date().getTime())
      });
    }
  },
  listenMsgAdd: function(id){
    firebase.database().ref('message/').on('child_added', function(snapshot) {
      modelChangeView.display_data(snapshot, id);
      countNewMsg++;
      pageTitleChange.On(countNewMsg);
    }); 
  }
};

var modelUser = {
  addUser: function(userId, uid, userPhotoURL, userEmail){
    firebase.database().ref('users/'+uid).set({
      id: userId,
      uid: uid,
      photoURL: userPhotoURL,
      email: userEmail,
      date: (new Date()).getTime()
    }); 
  },
  deleteUser: function(uid){
    firebase.database().ref('users/' + uid).remove();
  },
  listenUserAdd: function(){
    firebase.database().ref('users/').on('child_added', function(snapshot) {
      console.log("add: "+snapshot.val().uid);
      online[snapshot.val().uid] = {
        id: snapshot.val().id,
        uid: snapshot.val().uid,
        photoURL: snapshot.val().photoURL,
        email: snapshot.val().email,
        date: snapshot.val().date 
      };
      modelChangeView.showOnline(online);
    });
  },
  listenUserDelete: function (){
    firebase.database().ref('users/').on('child_removed', function(snapshot) {
      console.log("delete: "+snapshot.val().uid);
      delete online[snapshot.val().uid];
      modelChangeView.showOnline(online);
    }); 
  }
};

var modelChangeView = {
  showOnline: function (obj){
    var outline = document.getElementById('onlineList');
    outline.innerHTML = null;

    for (var key in obj) {

      var li = document.createElement("li");
      var img = document.createElement("img");
      img.src = obj[key].photoURL;
      img.id = obj[key].uid;
      img.onclick = function (e) {
        console.log(e.target.id);
      };

      img.className = "img-circle";

      var span = document.createElement("span");
      span.style.color = "white";

      var t = document.createTextNode("\u00A0\u00A0"+obj[key].id);

      li.appendChild(img); 
      li.appendChild(span);

      span.appendChild(t);     
      outline.appendChild(li);
    }
  },
  display_data: function (snapshot, id){
    var data_val = snapshot.val();
    var elem = document.getElementById(id);
    var flag = timeSolver.after(data_val.date,timeSolver.getString(new Date(),"YYYY/MM/DD"));

    if(flag){ 
      //only show today's message
      var img = document.createElement("img");
      img.src = data_val.photoURL;
      img.id = data_val.uid;
      img.className = "img-circle-msg";
      img.alt = data_val.user;
      var imgText = document.createElement("span");
      var imgTextNode = document.createTextNode(data_val.user);
      imgText.appendChild(imgTextNode);

      var p = document.createElement("p");
      var span = document.createElement("span");
      span.style.color = "gray";

      var tDate = document.createTextNode("("+timeSolver.getString(data_val.date,"HH:MM:SS")+")");
      var tMsg = document.createTextNode("\u00A0\u00A0"+data_val.msg+"\u00A0\u00A0");
      var tSpace = document.createTextNode("\u00A0\u00A0\u00A0");

      span.appendChild(tDate); 

      
      if(uid == data_val.uid){
        p.setAttribute("align", "right");
        p.appendChild(span); 
        p.appendChild(tMsg);
        p.appendChild(img);
        imgText.style.color = "#3F51B5";
        p.appendChild(imgText);
        p.appendChild(tSpace);
      }
      else{
        p.appendChild(tSpace);
        p.setAttribute("align", "left");
        p.appendChild(img);
        imgText.style.color = "#F44336";
        p.appendChild(imgText); 
        p.appendChild(tMsg);
        p.appendChild(span);
      }

      //set scoll bar to bottom
      elem.appendChild(p);
      elem.scrollTop = elem.scrollHeight; 
    }
    else{
      // auto delete old data (before today)
      firebase.database().ref('message/' + snapshot.getKey()).remove();
    }                    
  },
  showDomMsg: function(id, msg){
    var target = document.getElementById(id);
    target.innerHTML = msg;
  },
  showHideOnlineList: function(){
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }
};

// var controlRoom = {
//     privateChat: function(){

//     }
// };

// function privateChat(id){
//   this.id = id;
// }

var pageTitleChange = {   
    On: function(count){
      document.title = "("+count+") Let's Chat";
    },
    Off: function(){
      document.title = "Let's Chat";
      countNewMsg = 0;
    }
};





