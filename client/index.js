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
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var google_access_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: "POST",
        url: `${SERVER}/googleLogin`,
        data: {google_access_token}
    })
    .done(response => {
        console.log(response);
        localStorage.setItem("access_token", response.token)
        afterLogin()
    })
    .fail(err => console.log(err));
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
    .fail(err => console.log(err.statusText))
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
    .fail(err => console.log(err.statusText))
}

function afterLogin(){
    $("#register").hide();
    $("#login").hide();
    $("#main").show();
    // $("#user-info").
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
        headers: {access_token: token}
    })
    .done(response => {
        $("#todo-list").empty();
        $("#done-list").empty();

        console.log(response);
        response.forEach((el) => {
            if(el.status === "undone"){
                let stringDate = el.due_date.slice(0, 10)
                $("#todo-list").append(`
                            <tr>
                                <td> 
                                    <div class="card">
                                        <div class="card-body">
                                          <h5 class="card-title">${el.title}</h5>
                                          <p class="card-text">${el.description}</p>
                                          <p class="card-text">Due Date : <strong style="color: red;">${stringDate}</strong></p>
                                          <a href="#" class="btn btn-warning" data-toggle="modal" data-target="#editTodoForm${el.id}">Edit Todo</a>
                                          <a href="javascript:void();" class="btn btn-primary" onclick="markAsDone(${el.id})">Mark as done</a>
                                          <a href="javascript:void();" class="btn btn-danger" onclick="deleteTodo(${el.id})">Delete Todo</a>
                                        </div>
                                    </div>
                                    <div class="modal fade" id="editTodoForm${el.id}" role="dialog">
                                        <div class="modal-dialog">
                                        <!-- Modal content-->
                                            <div class="modal-content">
                                                <div class="modal-body">
                                                    <p>Add todo</p>
                                                    <form onsubmit="editTodo(${el.id}, event)">
                                                        <div class="form-group">
                                                            <label for="edit-todo-title${el.id}">Title</label>
                                                            <input type="text" class="form-control" id="edit-todo-title${el.id}" aria-describedby="textHelp" value="${el.title}" required>
                                                            <small id="textHelp" class="form-text text-muted">What are you planning to do?</small>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="edit-todo-desc${el.id}">Description</label>
                                                            <input type="text" class="form-control" id="edit-todo-desc${el.id}" aria-describedby="descHelp" value="${el.description}" required>
                                                            <small id="descHelp" class="form-text text-muted">Tell me specifically what it is about?</small>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="edit-todo-date${el.id}">Due Date</label>
                                                            <input type="date" class="form-control" id="edit-todo-date${el.id}" aria-describedby="dateHelp" value="${el.due_date.slice(0, 10)}" required>
                                                            <small id="dateHelp" class="form-text text-muted">When is the deadline?</small>
                                                        </div>
                                                        <button type="submit" class="btn btn-primary">Submit</button>
                                                    </form>
                                                </div>
                                                <div class="modal-footer">
                                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
                                          <a href="javascript:void();" class="btn btn-warning" onclick="undo(${el.id})">Undo</a>
                                          <a href="javascript:void();" class="btn btn-danger" onclick="deleteTodo(${el.id})">Delete Todo</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                `)
            }
        })
        
    })
    .fail(err => console.log(err));
}

function addTodo(e){
    e.preventDefault();
    let access_token = localStorage.getItem("access_token")
    let title = $("#todo-title").val();
    let description = $("#todo-desc").val();
    let due_date = $("#todo-date").val();
    let status = "undone";

    $.ajax({
        method: "POST",
        url: `${SERVER}/todos`,
        data: {title, description, due_date, status},
        headers: {access_token}
    })
    .done(response => { console.log(response); $(`#AddTodoForm`).modal('hide'); showTodos()})
    .fail(err => console.log(err.responseJSON.error));
}

function deleteTodo(id){
    let access_token = localStorage.getItem("access_token");
    $.ajax({
        method: "DELETE",
        url: `${SERVER}/todos/${id}`,
        headers: {access_token}
    })
    .done(response => {showTodos()})
    .fail(err => console.log(err.responseJSON.error));
}

function markAsDone(id){
    let access_token = localStorage.getItem("access_token");
    $.ajax({
        method: "PATCH",
        url: `${SERVER}/todos/${id}`,
        headers: {access_token},
        data: {status: "done"}
    })
    .done(response => {showTodos()})
    .fail(err => console.log(err.responseJSON.error));
}

function undo(id){
    let access_token = localStorage.getItem("access_token");
    $.ajax({
        method: "PATCH",
        url: `${SERVER}/todos/${id}`,
        headers: {access_token},
        data: {status: "undone"}
    })
    .done(response => {showTodos()})
    .fail(err => console.log(err.responseJSON.error));
}

function editTodo(id, e){
    e.preventDefault()
    let access_token = localStorage.getItem("access_token")
    let title = $(`#edit-todo-title${id}`).val();
    let description = $(`#edit-todo-desc${id}`).val();
    let due_date = $(`#edit-todo-date${id}`).val();
    let status = "undone";

    $.ajax({
        method: "PUT",
        url: `${SERVER}/todos/${id}`,
        data: {title, description, due_date, status},
        headers: {access_token}
    })
    .done(response => {
        showTodos();
        $(`#editTodoForm${id}`).modal('hide');
    })
    .fail(err => console.log(err.responseJSON.error));
}