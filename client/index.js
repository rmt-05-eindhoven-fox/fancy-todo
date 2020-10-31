const SERVER = "http://localhost:3000"

$(document).ready(() => {
    const token = localStorage.getItem("token");
    console.log("Access Token : "+token);
    if(token){
        
    }
})

function login(e) {
    e.preventDefault();
    console.log("Login!");
    const email = $("#email").val();
    const password = $("#password").val();
    console.log(email, password);

    $.ajax({
        method: "POST",
        url: SERVER + "/login",
        data: {
            email: email,
            password: password
        }
    }).done( response => {
        const token = response.access_token;
        localStorage.setItem("token", token);
    }).fail( err => {
        console.log(err);
    })
}

function register(e) {
    e.preventDefault();
    console.log("Register!");
    const email = $("#email").val();
    const password = $("#password").val();
    console.log(email, password);

    $.ajax({
        method: "POST",
        url: SERVER + "/register",
        data: {
            email: email,
            password: password
        }
    }).done( response => {
        console.log("Register Success!");
    }).fail( err => {
        console.log(err);
    })
}