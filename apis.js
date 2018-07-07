// localStorage.setItem("instructionsSeen", false);
localStorage.instructionsSeen = false;


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
    FB.api('/me', function(response) {
      
      console.log('Successful login for: ' + response.name);
      console.log(response);

      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';

      localStorage.setItem("facebookID", response.id);

      if (localStorage.instructionsSeen === "false") {
        showInstructions();
      }
      else {
        showGame();
      }
    });
}




function showTitlePage() {
    $("#title-div").show();
    $("#login-btns").hide();
    $("#instructions").hide();
    $("#game").hide();
}

function showLoginBtns() {
    $("#title-div").hide();
    $("#login-btns").show();
    $("#instructions").hide();
    $("#game").hide();
}

function showInstructions() {
    $("#title-div").hide();
    $("#login-btns").hide();
    $("#instructions").show();
    $("#game").hide();
    localStorage.instructionsSeen = true;
}

function showGame() {
    $("#title-div").hide();
    $("#login-btns").hide();
    $("#instructions").hide();
    $("#game").show();
}

function hideAll() {
    $("#title-div").hide();
    $("#login-btns").hide();
    $("#instructions").hide();
    $("#game").hide();
}
hideAll();

$(document).ready(function() {

    showTitlePage();

    $("#title-btn").click(function() {
        if ((localStorage.facebookID === undefined) && (localStorage.googleID === undefined)) {
            showLoginBtns();
        }
        else {
            showGame();
        }
    });

    $("#play-btn").click(function() {
        showGame();
    })

});