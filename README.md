# real-time-chat
A simply chat web application practice with Firebase and material design style. 

* Demo: [real-time-chat demo]
[real-time-chat demo]: <http://sean1093.github.io/chat/letsChat.html>

![chat](https://github.com/sean1093/real-time-chat/blob/master/img/chat.png "chat")

1. Login with Google account
2. Shows online list
3. Auto clean chat content before today


* Concept
這是一個利用 Firebase 進行 real-time chat room 的實作練習，並且運用 materialize 與 startBootstrap 的 simple-sidebar 來做頁面的美化。

主要實作登入部分，使用Google account，一登入並會去加入 Firebase 中的 user list ，並且註冊一個監聽變化的 listerner
```js
firebase.database().ref('users/'+uid).set({
    id: userId,
    uid: uid,
    photoURL: userPhotoURL,
    email: userEmail,
    date: (new Date()).getTime()
});
```

當 Firebase 收到任何 user 新增或是減少都會 push 通知過來，並且在前端的 view 做 online list 的刷新
```js
firebase.database().ref('users/').on('child_added', function(snapshot) {
    // do something
});
```


