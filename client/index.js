const SERVER = "http://localhost:3000"

$(document).ready(function () {
    const token = localStorage.getItem("token")
    console.log(token);
    if (token) {
        $("#home").show()
        $("#login").hide()
        $("#register").hide()
        $("#listTodo").show()
        $("#todoAdd").hide()
        todoList()
        todoAdd()
    } else {
        $("#home").hide()
        $("#login").show()
        $("#register").hide()
        $("#listTodo").hide()
        $("#todoAdd").hide()

    }

    $("#logout").on("click", function () {
        logout()
    })
})

function toLogin(event) {
    event.preventDefault()
    $("#login").show();
    $("#home").hide();
    $("#register").hide()
    $("#listTodo").hide()
    $("#todoAdd").hide()
}


function getQuote() { 
    const token = localStorage.getItem("token")
    $("#listTodo").hide()

    $.ajax({ 
        method : "GET", 
        url : SERVER + "/quetos/randomQuote",
        headers : { 
            token
        },
    }).done(res => { 
        console.log(res);
    }).fail(err => { 
        console.log(err);
    })

}

function login(e) {
    e.preventDefault()  
    const email = $("#login-email").val()
    const password = $("#login-password").val()  

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
    $.ajax({                   
        method: "POST",        
        url: SERVER + "/users/login",
        data: {
            email,
            password
        }
    }).done(response => {
        const token = response.access_token
        localStorage.setItem("token", token)
        $("#home").show()
        $("#login").hide()
        $("#login-email").val("");
        $("#login-password").val("");
        todoList()
        Toast.fire({
            icon: "success",
            title: `Log in successfully`,
          });
    }).fail(err => {
        console.log(err.responseJSON.msg);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.responseJSON.msg,
        });
    })
}

function toRegister(event) {
    event.preventDefault() 
    $("#login").hide();
    $("#home").hide();
    $("#register").show()
    $("#listTodo").hide()
    $("#todoAdd").hide()
}


function register(e) {
    e.preventDefault();
    const email = $("#register-email").val()
    const password = $("#register-password").val()
    $("#register-email").val("")
    $("#register-password").val("")
    console.log(email, password);
    $.ajax({
        method: "POST",
        url: SERVER + `/users/register`,
        data: {
            email,
            password
        }
    }).done(res => {
        $("#login").show()
        $("#register").hide()
        $("#home").hide()


        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Your account has been registered",
          });
        })
        .fail((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: err.responseJSON.msg,
          })
        })
}


function logout(e) {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    $("#login").show()
    $("#home").hide()
    $("#listTodo").hide()
    $("#todoAdd").hide()
    localStorage.clear()
}

function onSignIn(googleUser) {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

    var google_access_token = googleUser.getAuthResponse().id_token;
    console.log(google_access_token, "<<< google_access_token");

    $.ajax({
        method: "POST",
        url: SERVER + "/users/googleLogin",
        data: {
            google_access_token
        }
    }).done(response => {
        localStorage.setItem("token", response.token)
        $("#login").hide()
        $("#home").show()
        $("#register").hide()
        Toast.fire({ 
            icon : "success", 
            title : "Log in successfully"
        })
    }).fail(err => {
        console.log(err);
    })
}

function todoList() {
    const token = localStorage.getItem("token")
    $("#todoAdd").hide()
    $("#listTodo").show()
    $.ajax({
        method: "GET",
        url: SERVER + "/todos",
        headers: {
            token: token
        }

    }).done(res => {
        $("#dataTodoList").empty();
        console.log(res, "<< responde list todo");
        res.forEach((data, index) => {
            $("#dataTodoList").append(`
         <tr>
            <td>${index + 1}</td>
            <td>${data.title}</td>
            <td>${data.description}</td>
            <td>${(data.status === false) ? "uncomplete" : "complete"}</td>
            <td>${new Date(data.due_date).toISOString().slice(0, 10)}</td>
                <td> <button type="button" class="btn btn-outline-dark"  onclick="deleteTodo('${data.id}', event)"><i class="fa fa-trash"></i></button>
                <button type="danger" class="btn btn-outline-dark" onclick="${update(data.id)}" data-toggle="modal" data-target="#exampleModal">
                <i class="fa fa-pencil-square-o"></i></button>
                <button type="button" class="btn btn-outline-dark"  onclick="markDone('${data.id}')"><i class="fas fa-tasks"></i></button>
              </td>
         </tr>
        `)


        })
    }).fail(err => {
        console.log(err);
    })
}

function markDone(id) { 
    console.log(id, "<<< ini id dari markDone");
    const token = localStorage.getItem("token")
    $.ajax({ 
        method : "PATCH", 
        url : SERVER + `/todos/${id}`,
        headers : { 
            token
        }
    }).done(res => { 
        todoList()
    }).fail(err => { 
        console.log(err);
    })
}


function update(id) { 

    const token = localStorage.getItem("token")

    $.ajax({ 
        method : "GET", 
        url : SERVER + `/todos/${id}`,
        headers : { 
            token
        }
    }).done(res => { 
        $("#id-edit").val(`${res.id}`)
        $("#title-edit").val(`${res.title}`)
        $("#description-edit").val(`${res.description}`)
        $("#status-edit").val(`${res.status}`)
        $("#due_date-edit").val(`${new Date(res.due_date).toISOString().slice(0,10)}`)
        console.log(res, "<<<< res.get");
    }).fail(err => { 
        console.log(err);
    })

}

function postData() { 
    const id = $("#id-edit").val()  
    const title = $("#title-edit").val()
    const description = $("#description-edit").val()
    const status = $("#status-edit").val()
    const due_date = $("#due_date-edit").val()
    console.log(id, title, description, status, due_date);

    const token = localStorage.getItem("token")

    $.ajax({ 
        method : "PUT", 
        url : SERVER + `/todos/${id}`, 
        data : { 
            title, description, status, due_date
        }, 
        headers : { 
            token : token
        }
    }).done(res => { 
        todoList()
    }).fail(err=> { 
        console.log(err);
    })
}

function todoAdd() {
    $("#todoAdd").show()
    $("#listTodo").hide()
}


function postTodoAdd() {
    $("#todoAdd").hide()
    $("#listTodo").show()
    const title = $("#title").val()
    const description = $("#description").val()
    const status = $("#status").val()
    const due_date = $("#due_date").val()
    $("#title").val("")
    $("#description").val("")
    $("#status").val("")
    $("#due_date").val("")
    console.log(title, description, status, due_date);
    const token = localStorage.getItem("token");
    console.log(token, "<<< ini token");
    $.ajax({
        method: "POST",
        url: SERVER + `/todos`,
        data: {
            title,
            description,
            status,
            due_date
        },
        headers: {
            token
        }
    }).done(res => {
        console.log(res);
    }).fail(err => {
        console.log(err);
    })
}


function deleteTodo(id, event) {
    event.preventDefault() 
    const token = localStorage.getItem("token")
    console.log(token, "deleteTode token");
    $.ajax({
        method : "DELETE", 
        url : SERVER + `/todos/${id}`,
        headers : { token : token}
    }).done(res => {
        todoList()
    }).fail(err => { 
        console.log(err);
    })
}