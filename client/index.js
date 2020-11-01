const SERVER = "http://localhost:3000"

$(document).ready(() => {
    const token = localStorage.getItem("token");
    console.log("Access Token : "+token);
    if(token){
        $("#content-page").show()
        $("#login-page").hide()
        $("#register-page").hide()
    } else {
        $("#home-page").hide()
        $("#content-page").hide()
        $("#create-page").hide()
        $("#login-page").show()
        $("#register-page").hide()
    }
})

function jumpToRegister() {
    $("#login-page").hide()
	$("#register-page").show()
}

function jumpToLogin() {
    $("#login-page").show()
	$("#register-page").hide()
}

function login(e) {
    e.preventDefault();
    console.log("Login!");
    const email = $("#login-email").val();
    const password = $("#login-password").val();
    console.log(email, password);

    $.ajax({
        method: "POST",
        url: SERVER + "/login",
        data: {
            email: email,
            password: password
        }
    }).done( response => {
        const token = response.access_token;
        localStorage.setItem("token", token);
        console.log("Logged In!");
        $("#login-page").hide()
        $("#content-page").show()
    }).fail( err => {
        console.log(err);
    })
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Email: ' + profile.getEmail());
    console.log('Name: '+ profile.getName());
    $("#login-page").hide()
    $("#content-page").show()
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut()
    .then(function() {
        console.log('User signed out.');
        $("#login-page").show()
        $("#content-page").hide()
    });
}

function register(e) {
    e.preventDefault();
    console.log("Register!");
    const email = $("#register-email").val();
    const password = $("#register-password").val();
    console.log(email, password);

    $.ajax({
        method: "POST",
        url: SERVER + "/register",
        data: {
            email: email,
            password: password
        }
    }).done( response => {
        console.log("Register Success!");
        $("#login-page").show()
        $("#register-page").hide()
        $("#content-page").hide()
    }).fail( err => {
        console.log(err);
    })
}