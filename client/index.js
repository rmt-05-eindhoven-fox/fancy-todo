////////////////////////////////////
const SERVER = "http://localhost:3000"
let tempId

$(document).ready(function() {
  // cuma dijalankan saat page pertama kali load
  const access_token = localStorage.getItem('access_token')
  if (access_token) {
    showHome()
  } else {
    showLogin()
  }
})

function onSignIn(googleUser) {
  // var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

  var google_access_token = googleUser.getAuthResponse().id_token;

  // verify di backend
  $.ajax({
    method: 'POST',
    url: SERVER + '/loginGoogle',
    data: {
      google_access_token
    }
  })
  .done(response => {
    localStorage.setItem('access_token', response.access_token)
    showHome()
    fetchTodo()
  })
  .fail(err => {
    console.log(err, err.responseJSON);
  })
}

function logout() {
  $("#home").hide()
  $("#register").hide()
  $("#login").show()
  $("#updateTodo").hide()
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  localStorage.removeItem('access_token')
}

function showRegister() {
  $("#login").hide()
  $("#home").hide()
  $("#register").show()
  $("#updateTodo").hide()
}

function showHome() {
  $("#register").hide()
  $("#login").hide()
  $("#home").show()
  $("#updateTodo").hide()
  fetchTodo()
}

function showLogin() {
  $("#register").hide()
  $("#login").show()    
  $("#home").hide()
  $("#updateTodo").hide()
}

function showUpdate(id, title, description, status, due_date) {
  console.log(id, title, description, status, due_date);
  $("#register").hide()
  $("#login").hide()    
  $("#home").hide()
  $("#updateTodo").show()
  $("#update-title").val(title)
  $("#update-description").val(description)
  $("#update-status").val(status)
  $("#update-due_date").val(due_date)
  tempId = id
}

function register(e) {
  e.preventDefault()
  console.log('register');
  const email = $("#register-email").val()
  const password = $("#register-password").val()
  console.log({
    email,
    password
  });
  $.ajax({
    method: "POST",
    url: SERVER + "/register",
    data: {
      email,
      password
    }
  }).done(response => {
    console.log(response);
    showLogin()
  }).fail(err => {
    console.log(err, err.responseJSON);
  })
}

function login(e) {
  e.preventDefault()
  const email = $("#login-email").val()
  const password = $("#login-password").val()
  $.ajax({
    method: 'POST',
    url: SERVER + '/login',
    data: {
      email,
      password
    }
  }).done(response => {
    console.log(response);
    localStorage.setItem('access_token', response.access_token)
    showHome()
  }).fail(err => {
    console.log(err, err.responseJSON);
  })
}

function fetchTodo() {
  const access_token = localStorage.getItem('access_token')
  $.ajax({
    method: 'GET',
    url: SERVER + '/todos',
    headers: {
      access_token
    }
  }).done(response => {
    const todos = response
    $("#todo-table-content").empty()
    todos.forEach(todo => {
      let due_date = todo.due_date.split('T')[0]
      $("#todo-table-content").append(`
      <tr>
        <th scope="row">${todo.id}</th>
        <td>${todo.title}</td>
        <td>${todo.description}</td>
        <td>${todo.status}</td>
        <td>${due_date}</td>
        <td>
          <button type="button" class="btn btn-primary" onclick="showUpdate(${todo.id}, '${todo.title}', '${todo.description}', '${todo.status}', '${due_date}')">Update</button>
          <button type="button" class="btn btn-danger" onclick="deleteTodo(${todo.id})">Delete</button>
        </td>
      </tr>
      `)
    });
  }).fail(err => {
    console.log(err, err.responseJSON);
  })
}

function addTodo(e) {
  e.preventDefault()
  const access_token = localStorage.getItem('access_token')
  const title = $("#add-title").val()
  const description = $("#add-description").val()
  const status = $("#add-status").val()
  const due_date = $("#add-due_date").val()
  const todo = {
    title,
    description,
    status,
    due_date
  }
  console.log(todo);
  $.ajax({
    method: 'POST',
    url: SERVER + '/todos',
    headers: {
      access_token
    },
    data: {
      title,
      description,
      status,
      due_date
    }
  }).done(response => {
    $("#add-title").val('')
    $("#add-description").val('')
    $("#add-status").val('')
    $("#add-due_date").val('')
    showHome()
  }).fail(err => {
    console.log(err, err.responseJSON);
  })
}

function deleteTodo(id) {
  const access_token = localStorage.getItem('access_token')
  $.ajax({
    method: 'delete',
    url: SERVER + `/todos/${id}`,
    headers: {
      access_token
    }
  }).done(response => {
    console.log(response);
    showHome()
  }).fail(err => {
    console.log(err, err.responseJSON);
  })
}

function updateTodo(e) {
  e.preventDefault()
  const access_token = localStorage.getItem('access_token')
  const id = tempId
  const title = $("#update-title").val()
  const description = $("#update-description").val()
  const status = $("#update-status").val()
  const due_date = $("#update-due_date").val()
  const todo = {
    title,
    description,
    status,
    due_date
  }
  console.log(todo, id);
  $.ajax({
    method: 'PUT',
    url: SERVER + `/todos/${id}`,
    headers: {
      access_token
    },
    data: {
      title,
      description,
      status,
      due_date
    }
  }).done(response => {
    $("#update-title").val('')
    $("#update-description").val('')
    $("#update-status").val('')
    $("#update-due_date").val('')
    showHome()
  }).fail(err => {
    console.log(err, err.responseJSON);
  })
}