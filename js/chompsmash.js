$(document).ready(function() {
    // Hide Buttons
    $('#btnFBLogout').hide();
    $('#profileImage').hide();
});

// Additional JS functions here
window.fbAsyncInit = function() {
    FB.init({
        appId      : '533981806634551', // App ID
        channelUrl : '//www.chompsmash.com/channel.html', // Channel File
        status     : true, // check login status
        cookie     : true, // enable cookies to allow the server to access the session
        xfbml      : true  // parse XFBML
    });

    // Additional init code here

}
// Load the SDK asynchronously
(function(d){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));

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
        //$('#fbInformation img').attr('src', response.data.url);
        //$('#profileImage').css({"color":"#FFFFFF","font-size":"60px"});
    });
}