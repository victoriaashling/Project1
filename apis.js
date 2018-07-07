
function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
}

function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
      testAPI();
    } else {
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    }
}

function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
      console.log(response);
      localStorage.setItem("facebookID", response.id);
    });
}

$("#log-out-button").click(function() {
    FB.logout(function(response){
        checkLoginState();
    })
})

function goToInstructions() {
    $("#title-div").hide();
    $("#login-btns").hide();
    $("#instructions").show();
    $("#game").hide();
}

$(document).ready(function() {
    $("#title-dv").show();
    $("#login-btns").hide();
    $("#instructions").hide();
    $("#game").hide();


    $("#title-div").click(function() {
        $("#title-div").hide();
        $("#login-btns").show();
        $("#instructions").hide();
        $("#game").hide();
    })

    $("#play-btn").click(function() {
        $("#title-div").hide();
        $("#login-btns").hide();
        $("#instructions").hide();
        $("#game").show();
    })
});