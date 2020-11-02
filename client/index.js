const SERVER = "http://localhost:3000";

$(document).ready(function(){
  const token = localStorage.getItem("token");

  if(token) {
    $('#home').show()
    $('#login').hide()
    $('#register').hide()
    cook()
    listTodo()
    showTodoFalse()
    showTodoTrue()
  } else {
    $('#home').hide()
    $('#login').show()
    $('#register').hide()
  }

  $("#btn-logout").on('click', function(){
    logout()
    signOut()
  })
})

function login(e) {
  e.preventDefault();
  const email = $('#email').val()
  const password = $('#password').val()

  $.ajax({
    method: "POST",
    url: SERVER + "/login",
    data: {
      email,
      password
    },
  })
    .done(res => {
      const token = res.access_token;
      localStorage.setItem("token", token);
      $('#login').hide()
      $('#home').show()
      cook()
      listTodo()
      showTodoFalse()
      showTodoTrue()
      $('#email').val("")
      $('#password').val("")
    })
    .fail(err => {
      console.log(err.responseJSON);
    })
}
//sweetalert


function showRegister(e){
  e.preventDefault()
  $('#register').show()
  $('#home').hide()
  $('#login').hide()
}

function register(e) {
  e.preventDefault()
  const email = $('#regis-email').val()
  const password = $('#regis-password').val()

  $.ajax({
    method: "POST",
    url: SERVER + "/register",
    data: {
      email,
      password
    },
  })
    .done(res => {
      $('#login').show()
      $('#register').hide()
      $('#home').hide()
    })
    .fail(err => {
      console.log(err);
    })
}

function logout() {
  $("#login").show()
  $("#home").hide()
  localStorage.removeItem("token")
  signOut()
}

function onSignIn(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token;

  $.ajax({
    method: 'POST',
    url: SERVER + '/googleLogin',
    data: {
      id_token
    }
  })
  .done(res => {
    const token = res.access_token;
    localStorage.setItem("token", token);
    $('#login').hide()
    $('#home').show()
    cook()
    listTodo()
    showTodoFalse()
    showTodoTrue()
    $('#email').val("")
    $('#password').val("")
  })
  .fail(err => {
    console.log(err)
  })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function cook(){
  const token = localStorage.getItem("token");
  $.ajax({
    method: "GET",
    url: SERVER + "/listCook",
    headers: {
      token: token
    }
  })
  .done(res => {
    $("#cook").empty();
    $("#cook").append(`
    <h2> Cooking Today ... </h2>
    <img src="${res.thumb}" class="card-img-top">
      <div class="card-body">
        <p class="card-text">${res.title}</p>
      </div>
    `)
  })
  .fail(err => {
    console.log(err)
  })
}

function formTodo(){
  $('#createTodo').show()
  $("#listTodo").hide()
}

function listTodo(){
  $("#listTodo").show()
  $('#createTodo').hide()
}

function createTodo(e){
  e.preventDefault()
  const token = localStorage.getItem("token");
  const title = $('#title').val()
  const description = $('#description').val()
  const due_date = $('#due_date').val()

  $.ajax({
    method: 'POST',
    url: SERVER + '/todos',
    headers: {
      access_token: token
    },
    data: {
      title,
      description,
      due_date
    }
  })
    .done(res => {
      listTodo();
      showTodoFalse();
    })
    .fail(err => {
      console.log(err);
    })

}

function showTodoFalse(){
  const token = localStorage.getItem("token");
  $.ajax({
    method: "GET",
    url: SERVER + "/todos",
    headers: {
      access_token: token
    }
  })
  .done(res => {
    $('#todoFalse').empty();
    res.forEach(todo => {
      $("#todoFalse").append(`
      <div class="card" style="padding: 10px; margin-bottom: 10px;">
        <h5 class="card-title">${todo.title}</h5>
        <p class="card-text">${todo.description}</p>
        <p class="card-text">${todo.due_date}</p>
        <a href="#" class="btn" onclick="processTodo(${todo.id}, event)">Process</a>
      </div>
      `)
    });
  })
  .fail(err => {
    console.log(err)
  })
}

function showTodoTrue(){
  const token = localStorage.getItem("token");
  $.ajax({
    method: "GET",
    url: SERVER + "/todos/true",
    headers: {
      access_token: token
    }
  })
  .done(res => {
    $('#todoTrue').empty();
    res.forEach(todo => {
      $("#todoTrue").append(`
      <div class="card" style="padding: 10px; margin-bottom: 10px;">
        <h5 class="card-title">${todo.title}</h5>
        <p class="card-text">${todo.description}</p>
        <p class="card-text">${todo.due_date}</p>
        <a href="#" class="btn" onclick="deleteTodo(${todo.id}, event)">Done</a>
      </div>
      `)
    });
  })
  .fail(err => {
    console.log(err)
  })
}

function processTodo(id_todo, e) {
  e.preventDefault();
  const id = id_todo;
  console.log(id);
  const token = localStorage.getItem("token");
  $.ajax({
    method: "PATCH",
    url: `${SERVER}/todos/${id}`,
    headers: {
      access_token: token,
    },
    params: {
      id
    }
  })
  .done(res => {
    console.log(res);
    listTodo()
    showTodoFalse()
  })
  .fail(err => {
    console.log(err)
  })
}

function deleteTodo(id_todo, e){
  e.preventDefault();
  const id = id_todo;
  console.log(id);
  const token = localStorage.getItem("token");
  $.ajax({
    method: "DELETE",
    url: `${SERVER}/todos/${id}`,
    headers: {
      access_token: token,
    },
    params: {
      id
    }
  })
  .done(res => {
    console.log(res);
    listTodo()
    showTodoTrue()
  })
  .fail(err => {
    console.log(err)
  })
}