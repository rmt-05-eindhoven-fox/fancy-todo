const SERVER = "http://localhost:3000";

$(document).ready(()=> {
  const token = localStorage.token;
  $("#register-page").hide();

  $(".register-success").empty();
  $(".error-message").empty();
  if(token) {
    helloSalut()
    $("#landing-page").hide();
    // $("#home-page").show();
  
    fetchCategory();
  } else {
    $("#landing-page").show();
    $("#home-page").hide();
    $("quiz").hide()
  }
})

$("#register-link").on("click", () => {
  $("#register-page").show();
  $(".register-success").empty();
  $(".error-message").empty();
  $("#landing-page").hide();
  $("#home-page").hide();
})

$(".cancel-button").on("click", () => {
  $("#add-todo-page").hide();
  $("#edit-todo-page").empty();
  ready();
})

$("#logout-button").on("click", () => {
  $("#landing-page").show();
  $("#home-page").hide();
  $(".error-message").empty();
  $("#hello-salut").empty();
  signOut()
  localStorage.clear()
})

function login(e){
    e.preventDefault()
    const email = $("#login-email").val()
    const password = $("#login-password").val()
    $.ajax({
        method: "POST",
        url: SERVER + "/login",
        data: {
            email: email,
            password: password
        }
    })
    .done(response => {  
        const token = response.access_token;
        const first_name = response.first_name;
        localStorage.setItem("token", token);
        localStorage.setItem("first_name", first_name);
        ready();
    })
    .fail(err => {
      $(".error-message").empty();
      console.log(err)
      $(".error-message").append(`
        <p class="alert alert-danger" role="alert" style="color: red;">${err.responseJSON.message}</p>
      `);
      setTimeout(() => {
        $(".error-message").empty();
      }, 3000)
    })
}

function register(event) {
    event.preventDefault();
    const email = $("#reg-email").val();
    const password = $("#reg-password").val();
    $.ajax({
      method: "POST",
      url: SERVER + "/register",
      data: {
        email,
        password
      }
    }).done(response => {
      $("#landing-page").show();
      $("#home-page").hide();
      $("#register-page").hide();
      $(".register-success").empty();
      $(".register-success").append(`
        <p class="alert alert-success" role="alert" style="color: green;">Successful register</p>
      `)
      setTimeout(() => {
        $(".register-success").empty();
      }, 3000)
    }).fail(err => {
      $(".error-message").empty();
      $(".error-message").append(`
        <p class="alert alert-danger" role="alert" style="color: red;">${err.responseJSON.message}</p>
      `)
      setTimeout(() => {
        $(".error-message").empty();
      }, 3000)
    })
  }

  function onSignIn(googleUser) {
    var google_access_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method:'POST',
        url:SERVER + '/googleLogin',
        data:{
            google_access_token
        }
    }) 
    .done(response => {
      console.log(response.access_token)
      localStorage.setItem("token", response.access_token)
      localStorage.setItem("first_name", response.first_name)
      helloSalut()
      ready()
    })
    .fail(err => {
        console.log(err)
    })
  }

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      // console.log('User signed out.');
    });
  }

  function getAllTodo() {
    let token = localStorage.getItem('token')
    $.ajax({
      type: 'get',
      url: SERVER + '/todos',
      headers: {
        'Authorization': `${token}`
      }
    })
      .done(result => {
        let todos = result
        $('#').empty()
        let i = 1
        todos.forEach(e => {
          $('#').append(`<h4>${i}.${e.title} - ${e.description}<small><a href="#" onclick="editTodo('${e._id}')"> Edit </a> | <a href="/#" onclick="deleteList('${e._id}')">Delete</a></td></small></h4><br> `)
          i++
        });
      })
      .fail(err => {
        console.log(err)
      })
  }
  function createTodo() {
    let title = $('#').val()
    let description = $('#').val()
    let status = $('#')
    let dueDate = $('#').val()
    let token = localStorage.getItem('token')
   
    $.ajax({
      type: "post",
      url: SERVER + '/todos',
      data: {
        title,
        description,
        status,
        dueDate,
        token
      },
      headers: {
        'Authorization': `${token}`
      }
    })
      .done(result => {
     
        getAllTodo()
      })
      .fail(err => {
        console.log(err)
      })
  }
  
  function editTodo(id) {
    
    let title = $('#').val()
    let description = $('#').val()
    let status = $('#').val()
    let dueDate = $('#').val()
    let token = localStorage.getItem('token')
  
    $.ajax({
      type: "put",
      url: SERVER + '/todos/:id',
      data: {
        id,
        title,
        description,
        status,
        dueDate,
        token
      },
      headers: {
        'Authorization': `${token}`
      }
    })
      .done(result => {
        getAllTodo()
        // window.location = 'index.html'
      })
      .fail(err => {
        console.log(err)
      })
    }
  
  
    function editTodoStatus(id) {
    
      let status = $('#').val()
      let token = localStorage.getItem('token')
    
      $.ajax({
        type: "patch",
        url: SERVER + '/todos/:id',
        data: {
          id,
          status,
          token
        },
        headers: {
          'Authorization': `${token}`
        }
      })
        .done(result => {
          getAllTodo()
          // window.location = 'index.html'
        })
        .fail(err => {
          console.log(err)
        })
      }
  
  function deleteList(id) {
    let token = localStorage.getItem('token')
    $.ajax({
      type: "delete",
      url: SERVER + '/todos/:id',
      data: {
        id, token
      },
      headers: {
        'Authorization': `${token}`
      }
    })
      .done(result => {
        getAllTodo()
      })
      .fail(err => {
        console.log(err)
      })
  }