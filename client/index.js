const SERVER = "http://localhost:3000"

$(document).ready(() => {
    const token = localStorage.getItem("token");
    console.log("Access Token : "+token);
    if(token){
        $("#content-page").show()
        viewAllTodos()
        $("#home-page").hide()
        $("#login-page").hide()
        $("#register-page").hide()
    } else {
        $("#home-page").hide()
        $("#content-page").hide()
        $("#login-page").show()
        $("#register-page").hide()
    }
})

function jumpToRegister() {
    $("#login-page").hide()
	$("#register-page").show()
}

function register(e) {
    e.preventDefault();
    console.log("Register!");
    const email = $("#register-email").val();
    const password = $("#register-password").val();

    $.ajax({
        method: "POST",
        url: SERVER + "/register",
        data: {
            email: email,
            password: password
        }
    }).done( response => {
        console.log("User Registered Successfully.");
        $("#login-page").show()
        $("#register-page").hide()
        $("#content-page").hide()
    }).fail( err => {
        console.log(err);
    })
}

function jumpToLogin() {
    $("#login-page").show()
	$("#register-page").hide()
}

function login(e) {
    e.preventDefault();
    const email = $("#login-email").val();
    const password = $("#login-password").val();

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
        viewAllTodos()
    }).fail( err => {
        console.log(err);
    })
}

function logout() {
	$("#login-page").show()
	$("#content-page").hide()
}

function onSignIn(googleUser) {
    var g_access_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        method: 'POST',
        url: SERVER + '/glogin',
        data: {
            g_access_token
        }
    })
    .done(response=> {
        console.log(response.access_token)
        localStorage.setItem("access_token", response.g_access_token)
        localStorage.setItem("email", response.email)
    })
    .fail(error=> {
        console.log(error);
    })

    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Email: ' + profile.getEmail());
    console.log('Name: '+ profile.getName());
    $("#login-page").hide()
    $("#content-page").show()
}

function onSignOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut()
    .then(function() {
        console.log('User signed out.');
        $("#login-page").show()
        $("#content-page").hide()
    });
}

function viewAllTodos() {
    console.log("viewAllTodo");
    $("#view-AllTodos").show()
    const token = localStorage.getItem("access_token");
    
    $.ajax({
		method: "GET",
		url: SERVER + "/todos",
		headers: { token }
    })
    .done(data => {
        console.log("Here");
        console.log(data);
        $("#view-AllTodos").empty();
        data.forEach((el, i) => {
            const date = el.due_date;
            let status = el.status;

            if (el.status === false) {
                status = "On-Going"
            } else {
                status = "Done"
            }
            
            $("#view-AllTodos").append(`
                <div>
                    <h3>#${i + 1} - ${el.title}</h3>
                <div>
                    <p>Description : ${el.description}</p>
                </div>
                <div>
                    <p>Status : ${status}</p>
                </div>
                <div>
                    <p>Due Date : ${date}</p>
                </div>
            </div>
            `)
        })
    })
    .fail(err => {
        console.log(err)
    })

}

function deleteTodo(e ,id){
    e.preventDefault()
    const token = localStorage.getItem("token")
    $.ajax({
        method: "DELETE",
        url: SERVER + `/todos/${id}`,
        headers: { acces_token: token }
    }).done(response => {
        viewAllTodos(e)
    }).fail(err => {
        console.log(err)
    })
}