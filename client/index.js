const SERVER = "http://localhost:3000"

$(document).ready(function (){
    const token = localStorage.getItem("token")
    if(token){
        $("#login").hide()
        $("#create").show()
        $("#logout").show()
        $("#register").hide()
        $("#read").show()
        read()
    }else{
        $("#read").hide()
        $("#register").show()
        $("#logout").hide()
        $("#login").show()
        $("#create").hide()
        $("#edit").hide()
    }
})
function onSignIn(googleUser) {
    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var google_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: "POST",
        url: SERVER + "/users/loginGoogle",
        data: {
            google_token
        }
    }).done(response => {
        const token = google_token
        console.log(token)
        localStorage.setItem("token", token)
        $("#login").hide()
        $("#create").show()
        read()
    }).fail(err => {
        console.log(err)
    })
  }
function destroy(){
    $.ajax({
        method: "DELETE",
        url: SERVER + "/todos",
        headers: {
            token: localStorage.getItem("token")
        }
    }).done(response => {
        console.log(response)
    }).fail(err => {
        console.log(err)
    })
}
function register(event){
    event.preventDefault()
    const email = $("#register-email").val()
    const password = $("#register-password").val()

    $.ajax({
        method: "POST",
        url: SERVER + "/users/register",
        data: {email, password}
    }).done(response => {
        console.log(response)
    }).fail(err => {
        console.log(err)
    })
}

function read(event){
    const token = localStorage.getItem("token")

    $.ajax({
        method: "GET",
        url: SERVER + "/todos",
        headers: {
            token: token
        }
    }).done(response => {
        const dataTodo = response.dataTodo
        dataTodo.forEach(elemen => {
            const date = new Date(elemen.due_date)
            const day = date.getDate()
            const month = date.getMonth()
            const year = date.getFullYear()
            const ddate = `${day}/${month}/${year}`
            $("#todolist").append(`
                <table class="table table-dark">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Due Date</th>
                            
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                            <td>${elemen.title}</td>
                            <td>${elemen.description}</td>
                            <td>${elemen.status}</td>
                            <td>${ddate}</td>
                            <td><a onclick="edit()" class="btn btn-primary">Edit</a></td>
                            <td><a onclick="destroy()" class="btn btn-primary">Delete</a></td>
                            </tr>
                            </tbody>
                            </table>
                            `)
                        })
                        $("#edit").hide()
                        console.log(dataTodo)
                    }).fail(err => {
        console.log(err)
    })
}

function edit(event){
    $("#edit").show()
    const title = $("#edit-title").val()
    const description = $("#edit-description").val()
    const status = $("#edit-status").val()
    const due_date = $("#edit-due-date").val()
    
    $.ajax({
        method: "PUT",
        url: SERVER + "/todos",
        headers: {
            token: localStorage.getItem("token")
        },
        data: {
            title,
            description,
            status,
            due_date
        }
    }).done(response => {
        const dataTodo = response.dataTodo
        dataTodo.forEach(elemen => {
            const date = new Date(elemen.due_date)
            $("#todolist").append(`
                <table class="table table-dark">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Due Date</th>
                            
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                            <td>${elemen.title}</td>
                            <td>${elemen.description}</td>
                            <td>${elemen.status}</td>
                            <td>${date}</td>
                            <td><a onclick="edit()" class="btn btn-primary">Edit</a></td>
                            <td><a onclick="delete()" class="btn btn-primary">Delete</a></td>
                            </tr>
                            </tbody>
                            </table>
                            `)
                        })
        console.log(response)
    }).fail(err => {
        console.log(err)
    })
}
function login(event){
    event.preventDefault()
    const email = $("#login-email").val()
    const password = $("#login-password").val()

    $.ajax({
        method: "POST",
        url: SERVER + "/users/login",
        data: {
            email, password
        }
    }).done(response => {
        const token = response.token
        console.log(token)
        localStorage.setItem("token", token)
        $("#login").hide()
        $("#create").show()
        read()
    }).fail(err => {
        console.log(err)
    })
}

function create(event){
    event.preventDefault()
    const title = $("#title-todo").val()
    const description = $("#description-todo").val()
    const due_date = $("#due-date-todo").val()

    $.ajax({
        method: "POST",
        url: SERVER + "/todos",
        data: {
            title, description, due_date
        },
        headers: {
            token: localStorage.getItem("token")
        }
    }).done(response => {
        console.log(response)
    }).fail(err => {
        console.log(err)
    })
}


function logout(){
    $("#create").hide()
    $("#login").show()
    $("#register").show()
    localStorage.clear()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}