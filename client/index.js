const SERVER = "http://localhost:3000"

$(document).ready(() => {
    const token = localStorage.getItem("token")

    if(!token){
        $("#signin-form").show()
        $("#signup-form").hide()
        $("#homepage").hide()
        $("#schedule-page").hide()
        $("#post-todo-form").hide()
        $("#edit-todo-form").hide()
        $("#done-page").hide()
        $("#navbar").hide()
    } else {
        generateHome()
    }

    $("#signup-button").on("click", () => {
        $("#signin-form").hide()
        $("#signup-form").show()
    })

    $("#back").on("click", () => {
        $("#signin-form").show()
        $("#signup-form").hide()
    })

    $("#add-todo").on("click", () => {
        $("#homepage").hide()
        $("#schedule-page").hide()
        $("#post-todo-form").show()
        $("#done-page").hide()
    })

    $("#signout-button").on("click", () => {
        signout()
        signOutFromGoogleId()
    })
})

function signup(e) {
    e.preventDefault()

    const email = $("#signup-email").val()
    const password = $("#signup-password").val()

    $.ajax({
        method:"POST",
        url: SERVER + "/users/signup",
        data: {
            email,
            password
        }
    }).done(response => {
        afterSignup()
        Swal.fire("Created!", "Your account has been created.", "success")
    }).fail(err => {
        Swal.fire("Error", err.responseJSON, "error")
    })
}

function signin(e) {
    e.preventDefault()
    
    const email = $("#signin-email").val()
    const password = $("#signin-password").val()

    $.ajax({
        method:"POST",
        url: SERVER + "/users/signin",
        data: {
            email,
            password
        }
    })
    .done(response => {
        const token = response.access_token
        localStorage.setItem("token", token)
        Swal.fire("Signed Up!", "You successfully sign to our app", "success")
        generateHome()
    })
    .fail(err => {
        Swal.fire("Error", err.responseJSON, "error")
    })
    .always(() => {
        $("#signin-email").val("")
        $("#signin-password").val("")
    })
}

function fetchQuote() {
    const token = localStorage.getItem("token")
    $.ajax({
        method: "GET",
        url: SERVER + "/quotes/",
        headers: {
            token: token
        }
    })
    .done(response => {
        const data = response
        $("#quotes").empty()
        $("#quotes").append(`
        <div>
            <p class="font-italic" style="font-size: 25px">"${data.quote}"</p>
            <p class="font-italic" style="font-size: 20px">-${data.author}-</p>
        </div>
        `)
    })
    .fail(err => {
        Swal.fire("Error", err.responseJSON, "error")
    })
}

function fetchTodo() {
    const token = localStorage.getItem("token")
    $.ajax({
        method: "GET",
        url: SERVER + "/todos/",
        headers: {
            token: token
        }
    })
    .done(result => {
        const data = result
        $("#schedule").empty()
        data.forEach(el => {
            let tanggalRaw = new Date(el.due_date)
            let tanggal = tanggalRaw.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
            $("#schedule").append(`
                <li>
                    <h2>${el.title}</h2>
                    <p>${el.description}</p>
                    <i class="fa fa-calendar"></i> &nbsp <time>${tanggal}</time><br><br>
                    <a onclick="editTodoForm(${el.id})"><i class="material-icons">create</i></a>
                    <a onclick="deleteTodo(${el.id})"><i class="material-icons">cancel</i></a>
                    <a onclick="changeStatus(${el.id})"><i class="material-icons">done</i></a>
                </li>
            `)
        })
    })
    .fail(err => {
        Swal.fire("Error", err.responseJSON, "error")
    })
}

function fetchDoneTodo() {
    const token = localStorage.getItem("token")
    $.ajax({
        method: "GET",
        url: SERVER + "/todos/status",
        headers: {
            token: token
        }
    })
    .done(result => {
        const data = result
        $("#done-schedule").empty()
        data.forEach(el => {
            let tanggalRaw = new Date(el.due_date)
            let tanggal = tanggalRaw.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
            $("#done-schedule").append(`
                <li>
                    <h2>${el.title}</h2>
                    <p>${el.description}</p>
                    <i class="fa fa-calendar"></i> &nbsp <time>${tanggal}</time><br><br>
                    <p>Status: completed!</p>
                </li>
            `)
        })
    })
    .fail(err => {
        Swal.fire("Error", err.responseJSON, "error")
    })
}

function latestTodo() {
    const token = localStorage.getItem("token")
    $.ajax({
        method: "GET",
        url: SERVER + "/todos/",
        headers: {
            token: token
        }
    })
    .done(result => {
        const data = result
        $("#latestTodo").empty()
        data.forEach(el => {
            let tanggalRaw = new Date(el.due_date)
            el.due_date = tanggalRaw.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
        })
        if(data.length == 0){
            $("#latestTodo").append(`
            <p>Currently you have no upcoming event!</p>
            `)  
        } else{
            $("#latestTodo").append(`
                <h3>Here is your nearest upcoming event:</h3>
                <p class= "font-italic" style="font-size: 30px"><b>${data[0].title}</b></p>
                <p class= "font-italic" style="font-size: 17px">${data[0].due_date}</p>
            `)
        }
    })
    .fail(err => {
        Swal.fire("Error", err.responseJSON, "error")
    })
}



function postTodo(e) {
    e.preventDefault()
    const token = localStorage.getItem("token")
    const title = $("#todo-title").val()
    const description = $("#todo-description").val()
    const due_date = $("#todo-due-date").val()
    $.ajax({
        method: "POST",
        url: SERVER + "/todos/",
        headers: {
            token: token
        },
        data: {
            title,
            description,
            due_date
        }
    })
    .done(result => {
        Swal.fire("Posted!", "You successfully posted your plan", "success")
        generateSchedule()
    })
    .fail(err => {
        Swal.fire("Error", err.responseJSON, "error")
    })
}

function editTodoForm(index) {
    $("#homepage").hide()
    $("#schedule-page").hide()
    $("#signin-form").hide()
    $("#signup-form").hide()
    $("#edit-todo-form").show()
    const token = localStorage.getItem("token")
    $.ajax({
        method: "GET",
        url: SERVER + "/todos/" + index,
        headers: {
            token: token
        }
    })
    .done(result => {
        $("#edit-form").append(`
            <form onsubmit="putTodo(event, ${index})">
                <div class="form-group">
                    <label for="todo-new-title">What's your plan</label>
                    <input type="text" id="todo-new-title" class="form-control" value="${result[0].title}">
                </div>
                <div class="form-group">
                    <label for="todo-new-description">Description</label>
                    <input type="text" id="todo-new-description" class="form-control" value="${result[0].description}">
                </div>
                <div class="form-group">
                    <label for="todo-new-due-date">Due to</label>
                    <input type="date" id="todo-new-due-date" class="form-control" value="${result[0].due_date}">
                </div>
                <button type="submit" class="btn btn-primary">add</button>
            </form>
        `)
    })
    .fail(err => {
        Swal.fire("Error", err.responseJSON, "error")
    })
}

function putTodo(e, index) {
    e.preventDefault()
    const token = localStorage.getItem("token")
    const title = $("#todo-new-title").val()
    const description = $("#todo-new-description").val()
    const due_date = $("#todo-new-due-date").val()

    $.ajax({
        method: "PUT",
        url: SERVER + "/todos/" + index,
        headers: {
            token: token
        },
        data: {
            title,
            description,
            due_date
        }
    })
    .done(result => {
        Swal.fire("Success!", "You successfully change your plan", "success")
        generateSchedule()
    })
    .fail(err => {
        Swal.fire("Error", err.responseJSON, "error")
    })
}

function changeStatus(index) {
    const token = localStorage.getItem("token")
    $.ajax({
        method: "PATCH",
        url: SERVER + "/todos/" + index,
        headers: {
            token: token
        }
    })
    .done(result => {
        Swal.fire("Success!", "You successfully mark your plan as done", "success")
        generateDone()
    })
    .fail(err => {
        Swal.fire("Error", err.responseJSON, "error")
    })
}

function deleteTodo(index) {
    let deleteTodo = false;
    Swal.fire({
        title: 'Are you sureeee?',
        text: "How can you achieve your dream if you keep deleting!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes :('
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your plan has been deleted.',
                'success'
            )
            deleteTodo = true
            return deleteTodo
        }
    }).then(deleteTodo => {
        if(deleteTodo){
            const token = localStorage.getItem("token")
            $.ajax({
                method: "DELETE",
                url: SERVER + "/todos/" + index,
                headers: {
                    token: token
                }
            })
            .done(result => {
                generateSchedule()
            })
            .fail(err => {
                Swal.fire("Error", err.responseJSON, "error")
            })
        }
    })
}

function signout() {
    let signout = false
    Swal.fire({
        title: 'Are you sureeee?',
        text: "How can you achieve your dream if you keep deleting!",
        imageUrl: "./cry.png",
        imageWidth: 400,
        imageHeight: 300,
        imageAlt: 'Custom image',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes :('
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your plan has been deleted.',
                'success'
            )
            signout = true
            return signout
        }
    }).then(result => {
        if(result){
            generateLoginPage()
            localStorage.removeItem("token")
        }
    })
}

function generateLoginPage() {
    $("#homepage").hide()
    $("#signin-form").show()
    $("#signup-form").hide()
    $("#navbar").hide()
    $("#schedule-page").hide()
    $("#post-todo-form").hide()
    $("#edit-todo-form").hide()
    $("#done-page").hide()
}

function afterSignup() {
    $("#signin-form").show()
    $("#signup-form").hide()
}

function generateHome() {
    $("#navbar").show()
    $("#homepage").show()
    $("#signin-form").hide()
    $("#signup-form").hide()
    $("#schedule-page").hide()
    $("#post-todo-form").hide()
    $("#edit-todo-form").hide()
    $("#done-page").hide()
    fetchQuote()
    latestTodo()
}

function generateSchedule() {
    $("#schedule-page").show()
    $("#navbar").show()
    $("#homepage").hide()
    $("#signin-form").hide()
    $("#signup-form").hide()
    $("#post-todo-form").hide()
    $("#edit-todo-form").hide()
    $("#done-page").hide()
    fetchTodo()
}

function generateDone() {
    $("#navbar").show()
    $("#done-page").show()
    $("#homepage").hide()
    $("#signin-form").hide()
    $("#signup-form").hide()
    $("#schedule-page").hide()
    $("#post-todo-form").hide()
    $("#edit-todo-form").hide()
    fetchTodo()
    fetchDoneTodo()
}

// Google Sign In - Sign Out 
function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        method: "POST",
        url: SERVER + "/users/googleSignin/",
        data: {
            id_token
        }
    })
    .done(response => {
        const token = response.access_token
        localStorage.setItem("token", token)
        generateHome()
    })
    .fail(err => {
        Swal.fire("Error", err.responseJSON, "error")
    })
}

function signOutFromGoogleId() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}