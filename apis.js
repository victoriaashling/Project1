// Facebook functions
function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
}

function statusChangeCallback(response) {
    if (response.status === 'connected') {
      testAPI();
    }
}

function testAPI() {
    FB.api('/me', function(response) {
        localStorage.setItem("facebookID", response.id);
        localStorage.setItem("facebookName", response.name);
  
        showInstructions();
    });
}

// Intro Animation
function blinker() {
	$('.animate').fadeOut(2000);
	$('.animate').fadeIn(2000);
}
setInterval(blinker, 4000);


// Screen Change Functions
function hideAll() {
    $("#intro-screen").hide();
    $("#login-screen").hide();
    $("#help-screen").hide();
    $("#game-screen").hide();
}

function showTitlePage() {
    $("#intro-screen").show();
    $("#login-screen").hide();
    $("#help-screen").hide();
    $("#game-screen").hide();
}

function showLoginBtns() {
    $("#login-screen").show();

    $("html, body").animate({
        scrollTop: $("#login-screen").offset().top
    }, 1000);

    setTimeout(function(){
        $("#intro-screen").hide();
    }, 1000)

    $("#help-screen").hide();
    $("#game-screen").hide();
}

function showInstructions() {
    $("#help-screen").show();

    $("html, body").animate({
        scrollTop: $("#help-screen").offset().top
    }, 1000);

    setTimeout(function(){
        $("#login-screen").hide();
    }, 1000)
    
    $("#intro-screen").hide();
    $("#game-screen").hide();
    // localStorage.setItem("instructionsSeen", true);
}

function showGame() {
    $("#game-screen").show();

    $("html, body").animate({
        scrollTop: $("#game-screen").offset().top
    }, 1000);

    setTimeout(function(){
        $("#help-screen").hide();
    }, 1000)

    $("#intro-screen").hide();
    $("#login-screen").hide();
}


hideAll();

$(document).ready(function() {

    showTitlePage();

    $("#intro-continue").click(function() {
        showLoginBtns();
    });

    $("#info-continue").click(function() {
        showGame();
    })

    $("#play-anon").click(function() {
        showInstructions();
        localStorage.setItem("playAnon", true);
    })

});