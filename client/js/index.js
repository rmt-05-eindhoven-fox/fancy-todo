const SERVER = "http://localhost:3000"

$(document).ready(function(){
    const token = localStorage.getItem("token")
    if(token){
        $("#home-page").show()
        $("#login-page").hide()
        $("#signup-page").hide()
        getTodo()
    } else{
        $("#home-page").hide()
        $("#login-page").show()
        $("#signup-page").hide()
    }
})

function signup(e) {
    e.preventDefault()
    const email = $('#signup-email').val()
    const password = $('#signup-password').val()

    $.ajax({
        method:"POST",
        url: SERVER + "/signup",
        data:{
            email, 
            password
        }
    }).done(res => {
        console.log(res)
        $("#login-page").show()
        $("#signup-page").hide()
        $("#home-page").hide()
    }).fail(err => {
        console.log(err)
    })
}

function signupPage(){
    $("#signup-page").show()
    $("#login-page").hide()
    $("#home-page").hide()
}

function signOut(){
    $("#login-page").show()
    $("#home-page").hide()
    localStorage.removeItem('token');

    //LOGOUT GOOGLE NIH
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

function login(e) {
    e.preventDefault()
    console.log("login !")
    const email = $('#login-email').val()
    const password = $('#login-password').val()

    console.log(email, password)
    $.ajax({
        method:"POST",
        url: SERVER + "/login",
        data:{
            email, 
            password
        }
    }).done(res => {
        const token = res.token
        localStorage.setItem("token", token)
        $("#login-page").hide()
        $("#signup-page").hide()
        $("#home-page").show()
        getTodo()
    }).fail(err => {
        console.log(err)
    })
}

function onSignIn(googleUser){
    const google_token = googleUser.getAuthResponse().id_token;
    
    $.ajax({
        method:"POST",
        url: SERVER + "/googleLogin",
        data:{
            google_token
        }
    }).done(res => {
        // console.log(res)
        localStorage.setItem("token", google_token)
        $("#login-page").hide()
        $("#signup-page").hide()
        $("#home-page").show()
        $("#myModal").show()
    }).fail(err => {
        console.log(err)
    })
}

//>>>>>>>>>> TAMPILIN LIST TODO <<<<<<<<<<<<<<<<<<
function getTodo() {
    const token = localStorage.getItem("token")
    $.ajax({
        method: "GET",
        url: SERVER + "/todos",
        headers: {
            token
        }
    }).done(res => {
        // console.log(res)
        $("#listTodo").empty();
        res.forEach((data) => {
            // console.log(data)
            $("#listTodo").append(`
            <tr>
                  <td><center><input id="checkbox" onclick="updateStatus(${data.id},'${!data.status}')" name="status" type="checkbox" ${(data.status === false) ? value="false" : "checked"}></center></td>
                  <td>${data.title}</td>
                  <td>${data.description}</td>
                  <td>${data.due_date}</td>
                  <td> <button onclick="deleteTodo(${data.id})" class="btn btn-primary"><i class="fa fa-trash"></i></button>
                  <button onclick="getEdit(${data.id})" class="btn btn-primary" ><i class="fa fa-pencil-square-o"></i></button>
                </td>
              </tr>
            `)
        })
    }).fail(err => {
        console.log(err);
    })
}

//>>>>>>>>>> ADD TODO <<<<<<<<<<<<<<<<<<
function addTodo(e) {
    const token = localStorage.getItem("token")
    e.preventDefault()
    const title = $('#title').val()
    const description = $('#description').val()
    const due_date = $('#due_date').val()
    const status = $('#status').val()

    $.ajax({
        method:"POST",
        url: SERVER + "/todos",
        headers: {
            token
        },
        data:{
            title, 
            description,
            due_date,
            status
        },    
        success: function() {   
            location.reload();  
        }
    }).done(res => {
        console.log(res)
        $("#login-page").hide()
        $("#signup-page").hide()
        $("#myModal").modal('hide')
        $("#home-page").reload()
    }).fail(err => {
        console.log(err)
    })
}

//>>>>>>>>>> DELETE TODO <<<<<<<<<<<<<<<<<<
function deleteTodo(id) {
    const token = localStorage.getItem("token")
    $.ajax({
        method:"DELETE",
        url: SERVER + `/todos/${id}`,
        headers: {
            token
        },
        success: function() {   
            location.reload();  
        }
    }).done(res => {
        console.log(res)
        // $("#login-page").hide()
        // $("#signup-page").hide()
        // $("#home-page").show()
    }).fail(err => {
        console.log(err)
    })
}

//>>>>>>>>>> GET EDIT <<<<<<<<<<<<<<<<<<
function getEdit(id) {
    const token = localStorage.getItem("token")
    $.ajax({
        method:"GET",
        url: SERVER + `/todos/${id}`,
        headers: {
            token
        },
        success: function() {   
            $("#editModal").modal('show')
        }
    }).done(res => {
        let { title, description, status, due_date } = res
        $("#edit-title").val(title)
        $("#edit-description").val(description)
        $("#edit-status").val(status)
        $("#edit-due_date").val(due_date)
        $("#edit-button").empty().append(`
        <button onclick="postEdit(${id})" class="btn btn-info""> EDIT </button >
          `)
      }).fail(err => {
        console.log(err)
    })
}

//>>>>>>>>>> POST EDIT <<<<<<<<<<<<<<<<<<
function postEdit(id) {
    const token = localStorage.getItem("token")
    const title = $("#edit-title").val()
    const description = $("#edit-description").val()
    const status = $("#edit-status").val()
    const due_date = $("#edit-due_date").val()

    $.ajax({
        method:"PUT",
        url: SERVER + `/todos/${id}`,
        headers: {
            token
        },
        data:{
            id,
            title, 
            description,
            due_date,
            status
        },    
        success: function() {   
            location.reload();  
        }
    }).done(res => {
        console.log(res)
    }).fail(err => {
        console.log(err)
    })
}

//>>>>>>>>>> UPDATE STATUS <<<<<<<<<<<<<<<<<<
function updateStatus(id, status) {
    const token = localStorage.getItem("token")

    $.ajax({
        method:"PATCH",
        url: SERVER + `/todos/${id}`,
        headers: {
            token
        },
        data:{
            status
        },
        success: function() {   
            location.reload();  
        }
    }).done(res => {
        console.log(res)
       
    }).fail(err => {
        console.log(err)
    })
}

//>>>>>>>>>> GET QUOTES <<<<<<<<<<<<<<<<<<
// function updateStatus() {
//     const token = localStorage.getItem("token")

//     $.ajax({
//         method:"GET",
//         url: SERVER + `/quotes`,
//         headers: {
//             token
//         }
//     }).done(res => {
//         console.log(res)
//        $("#listQuotes").empty();
//         res.forEach((data) => {
//             console.log(data)
//            $("#listQuotes").append(`
//                 <h2>" ${data.quoteText} - ${data.quoteAuthor} "</h2>
//             `)
//         })
//     }).fail(err => {
//         console.log(err)
//     })
// }


