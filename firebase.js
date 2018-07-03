var config = {
    apiKey: "AIzaSyDlVwuwqnRk_N7G4EH15G8AwoWp4qUov54",
    authDomain: "victoriaproject1-e2411.firebaseapp.com",
    databaseURL: "https://victoriaproject1-e2411.firebaseio.com",
    projectId: "victoriaproject1-e2411",
    storageBucket: "victoriaproject1-e2411.appspot.com",
    messagingSenderId: "987825665363"
};

firebase.initializeApp(config);
var database = firebase.database();

var provider = new firebase.auth.FacebookAuthProvider();
provider.setCustomParameters({
    'display': 'popup'
});

firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;

    console.log(user, token);
    // ...
}).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
});

