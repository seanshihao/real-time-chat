
var mainFlow = {
  start: function(){
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    provider.setCustomParameters({
      'login_hint': 'user@example.com'
    });
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;           
      uid = user.uid;
      userPhotoURL = user.photoURL;
      userId = user.displayName;

      //add user into db
      controllerUser.addUser(userId, uid, userPhotoURL, user.email);          
      controllerListener.addUserListener();
      controllerListener.addMsgListener();

      //show today date
      modelChangeView.showDomMsg("today", timeSolver.getString(new Date(),"YYYY/MM/DD"));
      
    }).catch(function(error) {
      console.error("errorCode: "+errorCode);
      console.error("message: "+error.message);
      console.error("email: "+error.email);
      console.error("credential: "+error.credential);
    });   
  },
  sendMsg: function(e){
    modelMsg.pressEnter(e);
  },
  showHideOnlineList: function(){
    modelChangeView.showHideOnlineList();
  }
};

var controllerListener = {
  addUserListener: function(){
    //listen new message and show on #dataArea
    modelMsg.listenMsgAdd("dataArea"); 
    //listen new user add into db
    modelUser.listenUserAdd();
  },
  addMsgListener: function(){
    //listen user delete from db
    modelUser.listenUserDelete();
  }
};

var controllerUser = {
  addUser: function(userId, uid, userPhotoURL, userEmail){
    //add user into db
    modelUser.addUser(userId, uid, userPhotoURL, userEmail);    
  },
  deleteUser: function(uid){
    modelUser.deleteUser(uid);
  }
};



