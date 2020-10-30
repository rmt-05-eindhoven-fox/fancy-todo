const SERVER = `http://localhost:3000`
$(document).ready(() => {
    const token = localStorage.getItem("access_token");
    if(token){
        afterLogin();
    } else {
        $("#login").show();
        $("#register").hide();
        $("#main").hide();
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

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
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
        afterRegister(e);
    })
    .fail(err => alert(err.statusText))
}

function afterRegister(e){
    $("#register").hide();
    $("#login").show();
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
        localStorage.setItem("access_token", response.token)
        afterLogin()
    })
    .fail(err => alert(err.statusText))
}

function afterLogin(){
    $("#register").hide();
    $("#login").hide();
    $("#main").show();
    showTodos();
}

function logout(e){
    localStorage.removeItem("access_token");
    console.log('p');
    $("#login").show();
    $("#main").hide();
    signOut();
}

function showTodos(){
    let token = localStorage.getItem("access_token");
    $.ajax({
        method: "GET",
        url: `${SERVER}/todos`,
        headers: {token}
    })
    .done(response => {
        $("#todo-list").empty();
        $("#done-list").empty();

        console.log(response);
        response.forEach((el) => {
            if(el.status === "undone"){
                $("#todo-list").append(`
                            <tr>
                                <td> 
                                    <div class="card">
                                        <div class="card-body">
                                          <h5 class="card-title">${el.title}</h5>
                                          <p class="card-text">${el.description}</p>
                                          <a href="#" class="btn btn-warning">Edit Todo</a>
                                          <a href="#" class="btn btn-primary">Mark as done</a>
                                          <a href="#" class="btn btn-danger">Delete Todo</a>
                                        </div>
                                    </div>
                                    <!-- <h5 class="card-title">Belajar React</h5>
                                    <p class="card-text">Belajar react lewat recording karena instruktur libur tanggal merah</p> -->
                                </td>
                            </tr>
                `)
            } else {
                $("#done-list").append(`
                            <tr>
                                <td> 
                                    <div class="card">
                                        <div class="card-body">
                                          <h5 class="card-title">${el.title}</h5>
                                          <p class="card-text">${el.description}</p>
                                          <a href="#" class="btn btn-warning">Undo</a>
                                          <a href="#" class="btn btn-danger">Delete Todo</a>
                                        </div>
                                    </div>
                                    <!-- <h5 class="card-title">Belajar React</h5>
                                    <p class="card-text">Belajar react lewat recording karena instruktur libur tanggal merah</p> -->
                                </td>
                            </tr>
                `)
            }
        })
        
    })
    .fail(err => console.log(err));
    console.log(token);
}