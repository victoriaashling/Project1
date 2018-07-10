// localStorage.setItem("instructionsSeen", false);

function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
}

function statusChangeCallback(response) {
    // console.log('statusChangeCallback');
    // console.log(response);
    if (response.status === 'connected') {
      testAPI();
    } else {
    //   document.getElementById('status').innerHTML = 'Please log ' +
    //     'into this app.';
    }
}

function testAPI() {
    FB.api('/me', function(response) {
      
    //   console.log('Successful login for: ' + response.name);
    //   console.log(response);

    //   document.getElementById('status').innerHTML =
    //     'Thanks for logging in, ' + response.name + '!';

      localStorage.setItem("facebookID", response.id);
      localStorage.setItem("facebookName", response.name);

      if (localStorage.getItem("instructionsSeen") === false) {
        showInstructions();
      }
      else {
        showGame();
      }
    });
}


function hideAll() {
    $("#title-div").hide();
    $("#login-btns").hide();
    $("#instructions").hide();
    $("#game").hide();
}

function showTitlePage() {
    $("#title-div").show();
    $("#login-btns").hide();
    $("#instructions").hide();
    $("#game").hide();
}

function showLoginBtns() {
    $("#login-btns").show();

    $("html, body").animate({
        scrollTop: $("#login-btns").offset().top
    }, 1000);

    setTimeout(function(){
        $("#title-div").hide();
    }, 1000)

    // $("#title-div").hide();
    $("#instructions").hide();
    $("#game").hide();
}

function showInstructions() {
    $("#instructions").show();

    $("html, body").animate({
        scrollTop: $("#instructions").offset().top
    }, 1000);

    setTimeout(function(){
        $("#login-btns").hide();
    }, 1000)
    
    $("#title-div").hide();
    // $("#login-btns").hide();
    $("#game").hide();
    localStorage.setItem("instructionsSeen", true);
}

function showGame() {
    $("#game").show();

    $("html, body").animate({
        scrollTop: $("#game").offset().top
    }, 1000);

    setTimeout(function(){
        $("#instructions").hide();
    }, 1000)

    $("#title-div").hide();
    $("#login-btns").hide();
    // $("#instructions").hide();
    // $("#game").show();
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