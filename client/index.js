const SERVER = `http://localhost:3000`
$(document).ready(() => {
    const token = localStorage.getItem("token");
    if(token){
        $("#register").hide();
        $("#login").hide();
        $("#landing").show();
    } else {
        $("#login").show();
        $("#register").hide();
        $("#landing").hide();
    }
})

function pageManager(value){
    console.log(value);
    switch(value){
        case 0:
            $("#login").hide();
            $("#register").show();
            break;
        case 1:
            $("#register").hide();
            $("#login").show();
            break;
    }
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

function register(e){
    e.preventDefault();
    let username = $("#username-register").val();
    let password = $("#password-register").val();
    let email = $("#email").val();
    console.log(username, email, password);
    $.ajax({
        method: "POST",
        url: `${SERVER}/register`,
        data: {username, email, password}
    })
    .done(response => {
        console.log(response)
        $("#register").hide();
        $("#login").show();
    })
    .fail(err => alert(err.statusText))
}

function login(e){
    e.preventDefault();
    let username = $("#username").val();
    let password = $("#password").val();

    $.ajax({
        method: "POST",
        url: `${SERVER}/login`,
        data: {username, password}
    })
    .done(response => {
        console.log(response)
        localStorage.setItem("token", response.token)
        $("#login").hide();
        $("#landing").show();
    })
    .fail(err => alert(err.statusText))
}

function logout(e){
    localStorage.removeItem("token");
    $("login").show();
}

function showTodos(){
    let token = localStorage.getItem("token");
    $.ajax({
        method: "GET",
        url: `${SERVER}/todos`,
        headers: {token}
    })
    .done(response => console.log(response))
    .fail(err => console.log(err));
    console.log(token);
}

$("#showtodos").on("click", () => {
    showTodos();
})