/**
 * Created with JetBrains WebStorm.
 * User: dherrera
 * Date: 8/1/13
 * Time: 8:51 PM
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function() {
    // Hide Buttons
    $('#btnFBLogout').hide();
    $('#profileImage').hide();
});

// Additional JS functions here
window.fbAsyncInit = function() {
    FB.init({
        appId      : '533981806634551', // App ID
        channelUrl : '//WWW.chompsmash.COM/channel.html', // Channel File
        status     : true, // check login status
        cookie     : true, // enable cookies to allow the server to access the session
        xfbml      : true  // parse XFBML
    });

    // Additional init code here

};

// Load the SDK asynchronously
(function(){
    // If we've already installed the SDK, we're done
    if (document.getElementById('facebook-jssdk')) {return;}

    // Get the first script element, which we'll use to find the parent node
    var firstScriptElement = document.getElementsByTagName('script')[0];

    // Create a new script element and set its id
    var facebookJS = document.createElement('script');
    facebookJS.id = 'facebook-jssdk';

    // Set the new script's source to the source of the Facebook JS SDK
    facebookJS.src = '//connect.facebook.net/en_US/all.js';

    // Insert the Facebook JS SDK into the DOM
    firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
}());

/*
function checkStatus()
{

    FB.getLoginStatus(function(response) {
        if(response.status === 'connected') {
            $('#btnFBLogin').hide();
            //loadProfileImage();
        } else {
            $('#sysMessage').text("Image Error");
            //loadProfileImage();
        }
    });

}
*/
function logoutFB() {
    FB.logout(function(response) {
        $('#sysMessage').text("You have logged out of Facebook");
        $('#btnFBLogout').hide();
        location.reload();
    });
}
function loginFB()
{
    FB.login(function(response) {
        if (response.authResponse) {
            var accessToken = FB.getAuthResponse()['accessToken'];
            loadProfileImage();
            FB.api('/me?access_token='+accessToken, function(response) {
                $('#sysMessage').text(response);
                $('#btnFBLogin').hide();
                $('#btnFBLogout').show();
                $('#mainTitle').text(response.name);
                $('.lead').text('Hello ' + response.first_name + ".  Your gender is " + response.gender + ".  Your are from " + response.age_range);
                //speak("Hello, you, are, one, ugly, motherfucker",{ pitch: 10 });
                //speak('Hello ' + response.first_name + ".  Your gender is " + response.gender + ".  Your are from " + response.location.name);
            });
        } else {
            $('#sysMessage').text("User cancelled login or did not fully authorize");
        }
    }, {scope:'user_about_me,read_friendlists'});

}
function getFriendList(accessToken)
{


}
function loadProfileImage()
{
    FB.api("me/picture?width=180&height=180", function(response) {
        //$('#profileImage').css({"background-image":"url(" + response.data.url + ")"});
        $('#fbInformation img').attr('src', response.data.url);
        //$('#profileImage').css({"color":"#FFFFFF","font-size":"60px"});
    });
}