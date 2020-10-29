const SERVER = "http://localhost:3000"

$(document).ready(function () {
    const token = localStorage.getItem("token")
    console.log(token)
    if(token) {
        $("#content").show()
        $("#landing").hide()
        showTodos()
    } else {
        $("#content").hide()
        $("#landing").show() 
    }

    $("#btn-logout").on("click", function () {
        logout()
    })
})

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
        $("#landing").hide()
        $("#content").show()
        $("#email").val("")
        $("#password").val("")
        //showTodos()
    }).fail(err => {
        console.log(err)
    })
}

function logout() {
    $("#landing").show()
    $("#content").hide()
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