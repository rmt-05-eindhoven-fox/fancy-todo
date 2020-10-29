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
    }
})

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
                            <td>${elemen.due_date}</td>
                        </tr>
                    </tbody>
                </table>
            `)
        })
        console.log(dataTodo)
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
    const date = $("#due-date-todo").val()

    $.ajax({
        method: "POST",
        url: SERVER + "/todos",
        data: {
            title, description, date
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
    localStorage.removeItem("token")
}