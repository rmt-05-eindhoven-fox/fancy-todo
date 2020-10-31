const SERVER = "http://localhost:3000"
const token = localStorage.getItem("token")

$(document).ready(function (){
    if(token){
        $("#login").hide()
        $("#register").hide()
        $("#edit").hide()
        $("#create").hide()
        $("#logout").show()
        $("#read").show()
        read()
    }else{
        $("#login").show()
        $("#read").hide()
        $("#register").hide()
        $("#logout").hide()
        $("#create").hide()
        $("#edit").hide()
    }
})

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
        localStorage.setItem("token", response.token)
        $("#login").hide()
        // $("#register").hide()
        $("#login-email").val("")
        $("#login-password").val("")
        $("#read").show()
        $("#logout").show()
        $("#todolist").empty()
        read()
    }).fail(err => {
        console.log(err.responseJSON.errors)
    })
}
function onSignIn(googleUser) {
    const google_token = googleUser.getAuthResponse().id_token;
    // console.log(google_token)
    $.ajax({
        method: "POST",
        url: SERVER + "/users/loginGoogle",
        data: {
            google_token: google_token
        }
    }).done(response => {
        console.log(response, 'adsfdasdf')
        localStorage.setItem("token", response.token)
        $("#login").hide()
        // $("#register").hide()
        $("#login-email").val("")
        $("#login-password").val("")
        $("#read").show()
        $("#logout").show()
        $("#todolist").empty()
        read()
    }).fail(err => {
        console.log({msg: "masuk ke error saat google login"})
    })
  }
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
function destroy(status, id){
    if(status){
        $.ajax({
            method: "DELETE",
            url: SERVER + `/todos/${id}`,
            headers: {
                token: localStorage.getItem("token")
            }
        }).done(response => {
            $("#todolist").empty()
            read()
            $("#read").show()
            console.log(response)
        }).fail(err => {
            console.log(err.responseJSON.errors)
        })
    }else{
        console.log({msg: "todo masih belum dikerjakan"})
    }
}
function openRegister(){
    $("#login").hide()
    $("#register").show()
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
        $("#login").show()
        $("#register").hide()
    }).fail(err => {
        console.log(err.responseJSON.errors)
    })
}
function opentaddtodo(){
    $("#create").show()
    $("#read").hide()
    $("#logout").hide()
    // read()
}
function hideadd(){
    $("#create").hide()
    $("#read").show()
    $("#logout").show()
    // read()
}
function loginpage(){
    $("#register").hide()
    $("#login").show()
}
function read(){ // nampilin todo list
    const token = localStorage.getItem("token")
    $.ajax({
        method: "GET",
        url: SERVER + "/todos",
        headers: {
            token: token
        }
    }).done(response => {
        // $("#read").empty()
        const dataTodo = response.dataTodo
        dataTodo.forEach(elemen => {
            const date = new Date(elemen.due_date)
            const day = date.getDate()
            const month = date.getMonth() + 1
            const year = date.getFullYear()
            const ddate = `${day}/${month}/${year}`
            $("#todolist").append(`
                            <tr>
                            <td>${elemen.title}</td>
                            <td>${elemen.description}</td>
                            <td>${elemen.status === true ? "Done" : "On Going"}</td>
                            <td>${ddate}</td>
                            <div>
                            <td><a onclick="editShow(${elemen.id})" class="btn btn-primary">Edit</a>
                            <a onclick="destroy(${elemen.status}, ${elemen.id})" class="btn btn-danger">Delete</a>
                            <a onclick="done(${elemen.id})" class="btn btn-success">Mark as Done</a>
                            </div>
                            </tr>
                            
                            `)
                        })
                        // $("#edit").hide()
                        console.log(dataTodo)
                    }).fail(err => {
        console.log(err.responseJSON.errors)
    })
}

function editShow(id){
    $("#edit").show()
    $("#logout").hide()
    // $("#signOut").hide()
    $("#read").hide()
    $.ajax({
        method: "GET",
        url: SERVER + `/todos/${id}`,
        headers: {
            token: token
        }
    }).done(response => {
        console.log(response)
        const dataTodo = response.dataTodo
        // const date = formatDate(dataTodo.due_date)
        // dataTodo.forEach(elemen => {
            let date = new Date(dataTodo.due_date)
            let day = date.getDate()
            if(day < 10){
                day = `0${day}`
            }
            console.log(day, 'ini day')
            let month = date.getMonth() + 1
            if(month < 10){
                month = `0${month}`
            }
            console.log(month, 'ini month')
            let year = date.getFullYear()
            let ddate = `${year}-${month}-${day}`
            // console.log(ddate, 'inid dafa')
        $("#edit").append(`
        <div class="row justify-content-center">
            <div class="col-4" id="get-todo">
        <form>
                    <h1>EDIT TODO</h1>
                    <div class="form-group">
                        <label for="edit-title">Title</label>
                        <input type="text" id="edit-title" class="form-control" value="${dataTodo.title}">
                    </div>
                    <div class="form-group">
                        <label for="edit-description">Description</label>
                        <input type="text" id="edit-description" class="form-control" value="${dataTodo.description}">
                    </div>
                    <div class="form-group">
                        <label for="edit-due-date">Due Date</label>
                        <input type="date" id="edit-due-date" class="form-control" value="${ddate}">
                    </div>
                    <button onclick="editPost(${id})" class="btn btn-primary">Edit Todo</button>
                    <button onclick="read()" class="btn btn-secondary">Cancel</button>
                </form>
                </div>
        </div>
        `)
        // $("#edit").hide()
        // $("#read").show()
        // $("#todolist").empty()
        // $("#get-todo").empty()
        // $("#edit-title").val("") // biar add todo langsung kosong
        // $("#edit-description").val("")
        // $("#edit-due-date").val("")

    }).fail(err => {
        console.log(err)
    })
}
function editPost(id){
    // event.preventDefault()

    
    const title = $("#edit-title").val()
    const description = $("#edit-description").val()
    // const status = $("#edit-status").val()
    const due_date = $("#edit-due-date").val()
    $.ajax({
        method: "PUT",
        url: SERVER + `/todos/${id}`,
        data: {
            title, description, due_date
        },
        headers: {
            token: token
        }
    }).done(response => {
        
        console.log(response)
    }).fail(err => {
        console.log(err.responseJSON.errors)
    })
}
function done(id){
    $.ajax({
        method: "PATCH",
        url: SERVER + `/todos/${id}`,
        headers: {
            token: localStorage.getItem("token")
        }
    }).done(response => {
        console.log(response)
        $("#todolist").empty()
        read()
    }).fail(err => {
        console.log(err.responseJSON.errors)
    })
}


function create(event){ // add todo
    // $("#logout").hide()
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
        $("#create").hide()
        $("#read").show()
        $("#todolist").empty()
        read()
        $("#title-todo").val("") // biar add todo langsung kosong
        $("#description-todo").val("")
        $("#due-date-todo").val("")
        console.log(response)
    }).fail(err => {
        console.log(err.responseJSON.errors)
    })
}


function logout(){
    // $("#read").hide()
    $("#login").show()
    // $("#register").show()
    $("#read").hide()
    localStorage.clear()
    $("#logout").hide()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}