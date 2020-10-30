const SERVER = "http://localhost:3000"

$(document).ready(function () {
    const token = localStorage.getItem("token")
    console.log(token)
    
    if(token) {
        $("#content").show()
        $("#login-page").hide()
        $("#btn-logout").show()
        $("#register-page").hide()
        showTodos()
    } else {
        $("#content").hide()
        $("#login-page").show() 
        $("#register-page").hide()
        $("#btn-logout").hide()
    }
    $("#btn-logout").on("click", function () {
        logout()
    })
})

function registerPage() {
    $("#login-page").hide()
    $("#register-page").show()
    register()
}

function loginPage() {
    $("#login-page").show()
    $("#register-page").hide()
    login(e)
}

function register() {
    //e.preventDefault()
    $("#login-page").hide()
    $("#register-page").show()
    //console.log('register')
    const email = $("#email-reg").val()
    const password = $("#password-reg").val()

    $.ajax({
        method: "POST",
        url: SERVER + "/register",
        data: {
            email,
            password,
        },
    }).done(response => {
        $("#content").hide()
        $("#btn-logout").hide()
        $("#login-page").show()
        $("#register-page").hide()
    })
    .fail(err => {
        console.log(err)
    })
}

function login(e) {
    e.preventDefault()
    console.log('login!')
    const email= $("#email").val()
    const password = $("#password").val()

    console.log(email, password)
    $.ajax({
        method: "POST",
        url: SERVER + "/login",
        data: {
            email, 
            password,
        },
    }).done(response => {
        const token = response.tokenAcces
        localStorage.setItem("token", token)
        $("#login-page").hide()
        $("#register-page").hide()
        $("#content").show()
        $("#btn-logout").show()
        $("#email").val("")
        $("#password").val("")
        showTodos()
    }).fail(err => {
        console.log(err)
    })
}

function logout() {
    $("#login-page").show()
    $("#content").hide()
    $("#btn-logout").hide()
    localStorage.removeItem('token')
}

function showTodos() {
    const token = localStorage.getItem("token")
    $.ajax({
        method: "GET",
        url: SERVER + "/todos",
        headers: {
            token: token
        }
    }).done(response => {
        const todos = response.todos
        $("#content").append(`
                <p>Error Handler</p>
                <p>Has to do it tonight</p>
                <p>on progress</p>
                <p>2020-10-29T00:00:00.000Z</p>
        `)
        console.log(todos)
    }).fail(err => {
        console.log(err)
    })
} 