const server = "http://localhost:3000"

$(document).ready(function () {
    const token = localStorage.getItem("token")
    // console.log(token)
    if(token){
        $("#home-page").show()
        $("#sign-in-page").hide()
        $("#sign-up-page").hide()
        $("#add-todo-form").hide()
    }
    else{
        $("#home-page").hide()
        $("#sign-in-page").show()
        $("#sign-up-page").hide()
        $("#add-todo-form").hide()
    }
})

function signIn(e){
    e.preventDefault()
    // console.log("button terclick")
    const email = $("#email").val()
    const password = $("#password").val()
    console.log(email)
    $.ajax({
        method: "POST",
        url: server + "/users/sign-in",
        data: {
            email,
            password
        }
    }).done(response =>{
        console.log(response)
        const token = response.acces_token
        localStorage.setItem("token", token)
        // console.log(response)
        getTodo(e)
        $("#home-page").show()
        $("#sign-in-page").hide()
        $("#sign-up-page").hide()
        $("#add-todo-form").hide()
        $("#email").val("")
        $("#password").val("")
    }).fail(err => {
        console.log(err)
    })
}

function showSignUp(e){
    e.preventDefault()
    $("#sign-up-page").show()
    $("#home-page").hide()
    $("#sign-in-page").hide()
    $("#add-todo-form").hide()

}
function signUp(e){
    e.preventDefault()
    const email = $("#sign-up-email").val()
    const password = $("#sign-up-password").val()
    $.ajax({
        method: "POST",
        url: server + "/users/sign-up",
        data: {
            email,
            password,
        }
    }).done(response =>{
        // console.log(response)
        $("#home-page").hide()
        $("#sign-in-page").show()
        $("#sign-up-page").hide()
        $("#add-todo-form").hide()
       
    }).fail(err => {
        console.log(err)
    })
}

function logOut(e){
    e.preventDefault()
    $("#home-page").hide()
    $("#sign-in-page").show()
    $("#sign-up-page").hide()
    $("#add-todo-form").hide()
    localStorage.removeItem("token")
    localStorage.clear()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    // const token = localStorage.getItem("token")
    // console.log(token)
}

function addTodo(e){
    e.preventDefault()
    $("#home-page").hide()
    $("#sign-in-page").hide()
    $("#sign-up-page").hide()
    $("#add-todo-form").show()
}

function addedTodo(e){
    e.preventDefault()
    const token = localStorage.getItem('token');
    const title = $("#title").val()
    const description = $("#description").val()
    const due_date = $("#due-date").val()
    const status = "belum dikerjakan"
    $.ajax({
        method: "POST",
        url: server + "/todos",
        headers: {
            acces_token: token
        },
        data: {
            title,
            description,
            due_date,
            status
        }
    }).done(response => {
        getTodo(e)
        $("#home-page").show()
        $("#sign-in-page").hide()
        $("#sign-up-page").hide()
        $("#add-todo-form").hide()
    }).fail(err => {
        console.log(err)
    })
}

function getTodo(e){
    e.preventDefault()
    const token = localStorage.getItem('token');
    $.ajax({
        method: "GET",
        url: server + "/todos",
        headers: {
            acces_token: token
        }
    }).done(response => {
        // console.log(response)
        $("#list-todo").empty()
        response.forEach(element => {
            const title = element.title
            const description = element.description
            const status = element.status
            const due_date = element.due_date
            $(`<div class="card mx-4 mt-4 shadow" style= "width: 25%;">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <h6 class="card-subtitle mb-2 text-muted" id="status">${status}</h6>
                <p class="card-text">
                    ${description} harus dikerjakan sebelum ${due_date}
                </p>
                <button class="btn btn-primary" onclick="editTodo(event, ${element.id})">Edit Todo</button>
                <button class="btn btn-primary" onclick="updateTodo(event, ${element.id})">Update Todo</button>
                <button class="btn btn-danger" onclick="deleteTodo(event, ${element.id})">Delete Todo</button>
            </div>
        </div>`).appendTo("#list-todo")
        });
    }).fail( err => {
        console.log(err)
    })
}

function editTodo(e, id){
    e.preventDefault()
    $("#home-page").hide()
    $("#sign-in-page").hide()
    $("#sign-up-page").hide()
    $("#add-todo-form").hide()
    $("#edit-todo-form").show()
}

function editedTodo(e, id){
    e.preventDefault()
    const token = localStorage.getItem('token');
    const title = $("#title").val()
    const description = $("#description").val()
    const due_date = $("#due-date").val()
    const status = "belum dikerjakan"
    $.ajax({
        method: "PUT",
        url: server + `/todos/${id}`,
        headers: {
            acces_token: token
        },
        data: {
            title,
            description,
            due_date,
            status
        }
    }).done(response => {
        getTodo(e)
        $("#home-page").show()
        $("#sign-in-page").hide()
        $("#sign-up-page").hide()
        $("#add-todo-form").hide()
    }).fail(err => {
        console.log(err)
    })
}

function deleteTodo(e ,id){
    e.preventDefault()
    const token = localStorage.getItem("token")
    $.ajax({
        method: "DELETE",
        url: server + `/todos/${id}`,
        headers: {
            acces_token: token
        }
    }).done(response => {
        getTodo(e)
    }).fail(err => {
        console.log(err)
    })
}

function updateTodo(e, id){
    const token = localStorage.getItem("token")
    // $("#status").replaceWith(`sudah dikerjakan`)
    e.preventDefault()
    const status = "sudah dikerjakan"
    $.ajax({
        method: "PATCH",
        url: server + `/todos/${id}`,
        headers: {
            acces_token: token
        },
        data: {
            status
        } 
    }).done(response => {
        getTodo(e)
    }).fail(err => {
        console.log(err)
    })
}

function onSignIn(googleUser) {
    var google_access_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method:"POST",
        url: server + "/users/googleSignIn",
        data: {
            google_access_token
        }
    })
    .done(response => {
        console.log(response)
        localStorage.setItem("token", response )
        $("#home-page").show()
        $("#sign-in-page").hide()
        $("#sign-up-page").hide()
    })  
    .fail(err => {
        console.log(err)
    })
}