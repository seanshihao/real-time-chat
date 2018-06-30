# real-time-chat

A simply chat web application practice with Firebase and material design style. 

## Demo: 
[real-time-chat demo]
[real-time-chat demo]: <http://sean1093.github.io/chat/letsChat.html>

![chat](https://github.com/sean1093/real-time-chat/blob/master/img/chat.png "chat")

## Feature

* Login with Google account
* Mutiple user chat online
* Shows online list
* Auto clean chat content before today

## Concept

A real-time chat room samlpe implement with Firebase. Also use materialize and startBootstrap's  simple-sidebar for layout. User need to use Google account login. After user login, Firebase will add a new user in user list and register a listerner for other user message.

```js
firebase.database().ref('users/'+uid).set({
    id: userId,
    uid: uid,
    photoURL: userPhotoURL,
    email: userEmail,
    date: (new Date()).getTime()
});
```

When Firebase get any user event, it will refresh online list.

```js
firebase.database().ref('users/').on('child_added', function(snapshot) {
    // do something
});
```


