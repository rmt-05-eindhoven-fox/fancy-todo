const SERVER = "http://localhost:3000"

$(document).ready(function(){
    const token = localStorage.getItem("token")
    if(token){
        $("#register-page").hide()
        $("#login-page").hide()
        $("#homepage").show()
        $("#add-todo").show()
        listTodo()
    }else{
        $("#homepage").hide()
        $("#add-todo").hide()
        $("#list-todo").hide()
        $("#register-page").hide()
        $("#login-page").show()
    }
})

//handle click here di login page
function showRegisterPage(){
    $("#register-page").show()
    $("#login-page").hide()
    
}

function register(e){
    e.preventDefault()
    const email = $("#register-email").val()
    const password = $("#register-password").val()
    $.ajax({
        method: "POST",
        url: SERVER + "/register",
        data: {
            email,
            password
        }
    })
    .done(response=>{
        console.log(response)
        swal("Good Job!", "Your account has created", "success")
        $("#register-page").hide()
        $("#login-page").show()
    })
    .fail(err=>{
        console.log(err)
        swal("Oh no!", err.responseJSON.error, "error")
    })
}

//handle click here di register page 
function showLoginPage(){
    $("#register-page").hide()
    $("#login-page").show()
}

function login(e){
    e.preventDefault()
    const email = $("#login-email").val()
    const password = $("#login-password").val()
    $.ajax({
        method: "POST",
        url: SERVER + "/login",
        data: {
            email,
            password
        }
    })
    .done(response=>{
        swal("Good Job!", "You has signed in", "success")
        localStorage.setItem("token",response.access_token)
        $("#login-page").hide()
        $("#homepage").show()
        $("#searchpage").hide()
        $("#add-todo").show()
        $("#list-todo").empty()
        listTodo()
    })
    .fail(err=>{
        console.log(err)
        swal("Oh no!", err.responseJSON.error, "error")
    })
}

function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method:'POST',
        url: SERVER + "/googleLogin",
        data:{
            id_token
        }
    })
    .done(response=>{
        swal("Good Job!", "You has signed in", "success")
        localStorage.setItem("token",response.access_token)
        $("#login-page").hide()
        $("#register-page").hide()
        $("#searchpage").hide()
        $("#homepage").show()
        $("#add-todo").show()
        $("#list-todo").empty()
        listTodo()
    })
    .fail(err=>{
        console.log(err)
        swal("Oh no!", err.responseJSON.error, "error")
    })
}

function listTodo(){
    const token = localStorage.getItem('token')
    $.ajax({
        method: "GET",
        url: `${SERVER}/todos`,
        headers:{
            token
        }
    })
    .done(response=>{
        console.log(response)
        response.data.forEach((todo, index)=>{
            let status = todo.status
            $("#list-todo").append(`
            <div class="col-sm-3 mt-4">
                <div class="card">
                    <div class="card-body">
                        <input type="checkbox" ${!todo.status?"":"checked"} class="checkbox" onclick="patchTodoById(${todo.id})">
                        <h5 class="card-title">#${index + 1} ${todo.title}</h5>
                        <p class="card-text">${todo.description}</p>
                        <a class="btn btn-primary" onclick="getTodoById(${todo.id})">Detail</a>
                        <a class="btn btn-danger" onclick="deleteTodoById(${todo.id})">Delete</a>
                        
                    </div>
                </div>
            </div>`)
        })
        $("#list-todo").show()
    })
    .fail(err=>{
        console.log(err)
        swal("Oh no!", err.responseJSON.error, "error")
    })
}

function deleteTodoById(id){
    const token = localStorage.getItem('token')
    $.ajax({
        method: "DELETE",
        url: `${SERVER}/todos/${id}`,
        headers:{
            token
        }
    })
    .done(response=>{
        swal("Good job!", response.message, "success");
        $("#homepage").show()
        $("#add-todo").show()
        $("#list-todo").empty()
        listTodo()
    })
    .fail(err=>{
        console.log(err)
        swal("Oh no!", err.responseJSON.error, "error")
    })
}

function patchTodoById(id){
    const token = localStorage.getItem('token')
    let status
    $(".checkbox").change(function() {
        if(this.checked) {
            status = true
        }else{
            status = false
        }
        $.ajax({
            method: 'PATCH',
            url: `${SERVER}/todos/${id}`,
            data:{
                status
            },
            headers:{
                token
            }
        })
        .done(response=>{
            console.log(response)
            swal("Good Job!", "Update todo status success", "success")
            $("#homepage").show()
            $("#add-todo").show()
            $("#list-todo").show()
        })
        .fail(err=>{
            console.log(err)
            swal("Oh no!", err.responseJSON.error, "error")
        })
    });
    
    
}

function getTodoById(id){
    const token = localStorage.getItem('token')
    $.ajax({
        method: "GET",
        url: `${SERVER}/todos/${id}`,
        headers:{
            token
        }
    })
    .done(response=>{
        console.log(response)
        $("#login-page").hide()
        $("#register-page").hide()
        $("#list-todo").hide()
        $("#add-todo").hide()
        $("#getTodoById").empty()
        $("#getTodoById").append(`
        <form class="mt-5" onsubmit="putTodo(event,${id})">
            <label for="title">Title</label><br>
            <input type="text" value="${response.data.title}" id="edit-title"><br><br>
            <label for="description">Description</label><br>
            <input type="text" value="${response.data.description}" id="edit-description"><br><br>
            <label for="status">Status</label><br>
            <input type="text" value="${response.data.status}" id="edit-status"><br><br>
            <label for="due_date">Due date</label><br>
            <input type="date" value="${new Date(response.data.due_date).toISOString().slice(0,10)}" id="edit-date"><br><br>
            <label for="UserId">UserId</label><br>
            <input type="text" value="${response.data.User.id}" disabled><br><br>
            <label for="email">Email</label><br>
            <input type="text" value="${response.data.User.email}" disabled><br><br>
            <button class="btn btn-outline-dark">Update</button>
        </form>
        `)
        $("#homepage").show()
        $("#getTodoById").show()
    })
    .fail(err=>{
        console.log(err)
        swal("Oh no!", err.responseJSON.error, "error")
    })
}

function putTodo(e, id){
    e.preventDefault()
    const token = localStorage.getItem("token")
    const title = $("#edit-title").val()
    const description = $("#edit-description").val()
    const due_date = $("#edit-date").val()
    const status = $("#edit-status").val()
    $.ajax({
        method: "PUT",
        url: `${SERVER}/todos/${id}`,
        data:{
            title,
            description,
            due_date,
            status
        },
        headers:{
            token
        }
    })
    .done(response=>{
        console.log(response)
        swal("Good Job!", "Your todo has been updated", "success")
        $("#getTodoById").hide()
        $("#homepage").show()
        $("#add-todo").show()
        $("#list-todo").empty()
        listTodo()
    })
    .fail(err=>{
        console.log(err)
        swal("Oh no!", err.responseJSON.error, "error")
    })
}

function addTodo(e){
    e.preventDefault()
    const token = localStorage.getItem("token")
    const title = $("#add-title").val()
    const description = $("#add-description").val()
    const due_date = $("#due-date").val()
    $.ajax({
        method: "POST",
        url: `${SERVER}/todos`,
        data:{
            title,
            description,
            due_date
        },
        headers:{
            token
        }
    })
    .done(response=>{
        console.log(response)
        swal("Good Job!", "Add todo success", "success")
        $("#list-todo").empty()
        listTodo()
    })
    .fail(err=>{
        console.log(err)
        swal("Oh no!", err.responseJSON.error, "error")
    })
}

function signOut() {
    $("#homepage").hide()
    $("#add-todo").hide();
    $("#list-todo").hide();
}

//handle logout di navbar
function logout(e){
    //e.preventDefault();
    localStorage.clear();
    $("#homepage").hide();
    $("#add-todo").hide();
    $("#list-todo").hide();
    $("#login-page").show()
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        swal("Good Bye!", "You has signed out.", "success")
    });
}