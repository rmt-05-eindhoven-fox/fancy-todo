const SERVER = "https://todojquery.herokuapp.com"
const token = localStorage.getItem("token")

$(document).ready(function (){
    if(token){
        $("#login").hide()
        $("#register").hide()
        $("#edit").hide()
        $("#create").hide()
        $("#logout").show()
        $("#read").show()
        $("#error").hide()
        $("#sukses").hide()
        read()
    }else{
        $("#error").hide()
        $("#sukses").hide()
        $("#login").show()
        $("#read").hide()
        $("#register").hide()
        $("#logout").hide()
        $("#create").hide()
        $("#edit").hide()
    }
})

function showError(error){
    $("#error").show()
    $("#error").empty()
    $("#error").append(`
    <p>${error.join(', ')}</p>
    `)
    setTimeout(() => {
        $("#error").hide()
    }, 3000)
}
function showSucces(response){
    $("#sukses").show()
    $("#sukses").empty()
    $("#sukses").append(`
    <p>${response}</p>
    `)
    setTimeout(() => {
        $("#sukses").hide()
    }, 3000)
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
        showSucces("Berhasil Login")
        localStorage.setItem("token", response.token)
        $("#login").hide()
        $("#login-email").val("")
        $("#login-password").val("")
        $("#read").show()
        $("#logout").show()
        $("#todolist").empty()
        read()
    }).fail(err => {
        showError(err.responseJSON.errors)
    })
}
function onSignIn(googleUser) {
    const google_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: "POST",
        url: SERVER + "/users/loginGoogle",
        data: {
            google_token: google_token
        }
    }).done(response => {
        showSucces("Berhasil Login")
        localStorage.setItem("token", response.token)
        $("#login").hide()
        $("#login-email").val("")
        $("#login-password").val("")
        $("#read").show()
        $("#logout").show()
        $("#todolist").empty()
        read()
    }).fail(err => {
        showError(err.responseJSON.errors)
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
            // console.log(response)
            showSucces("Todo berhasil dihapus")
        }).fail(err => {
            showError(err.responseJSON.errors)
        })
    }else{
        showError(["todo masih belum dikerjakan"])
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
        // console.log(response)
        showSucces("Berhasil register")
        $("#login").show()
        $("#register").hide()
        $("#register-email").val("")
        $("#register-password").val("")
    }).fail(err => {
        showError(err.responseJSON.errors)
    })
}
function opentaddtodo(){
    $("#create").show()
    $("#read").hide()
    $("#logout").hide()
}
function hideadd(){
    $("#create").hide()
    $("#read").show()
    $("#logout").show()
    $("#title-todo").val("") // biar add todo langsung kosong
    $("#description-todo").val("")
    $("#due-date-todo").val("")
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
                        // console.log(dataTodo)
        }).fail(err => {
        showError(err.responseJSON.errors)
    })
}

function editShow(id){
    $("#edit").show()
    $("#logout").hide()
    $("#read").hide()
    $.ajax({
        method: "GET",
        url: SERVER + `/todos/${id}`,
        headers: {
            token: token
        }
    }).done(response => {
        // console.log(response)
        const dataTodo = response.dataTodo
        let date = new Date(dataTodo.due_date)
        let day = date.getDate()
        if(day < 10){
            day = `0${day}`
        }
        let month = date.getMonth() + 1
        if(month < 10){
            month = `0${month}`
        }
        let year = date.getFullYear()
        let ddate = `${year}-${month}-${day}`
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
                    <button onclick="editPost(event, ${id})" class="btn btn-primary">Edit Todo</button>
                    </form><br>
                    <button onclick="hideedit()" class="btn btn-secondary">Cancel</button>
                </div>
        </div>
        `)
    }).fail(err => {
        showError(err.responseJSON.errors)
    })
}
function hideedit(){
    $("#edit").hide()
        $("#edit").empty()
        $("#logout").show()
        $("#read").show()
        $("#todolist").empty()
        read()
}
function editPost(event, id){
    event.preventDefault()
    const title = $("#edit-title").val()
    const description = $("#edit-description").val()
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
        $("#edit").hide()
        $("#edit").empty()
        $("#logout").show()
        $("#read").show()
        $("#todolist").empty()
        read()
        showSucces("Berhasil mengedit todo")
    }).fail(err => {
        showError(err.responseJSON.errors)
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
        showSucces("Todo telah selesai")
        $("#todolist").empty()
        read()
    }).fail(err => {
        showError(err.responseJSON.errors)
    })
}


function create(event){ // add todo
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
        $("#logout").show()
        $("#todolist").empty()
        read()
        $("#title-todo").val("") // biar add todo langsung kosong
        $("#description-todo").val("")
        $("#due-date-todo").val("")
        showSucces("Berhasil add todo")
    }).fail(err => {
        showError(err.responseJSON.errors)
    })
}


function logout(){
    $("#login").show()
    $("#read").hide()
    localStorage.clear()
    $("#logout").hide()
    showSucces("Berhasil Logout")
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}