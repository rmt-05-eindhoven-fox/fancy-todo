////////////////////////////////////
const SERVER = "http://localhost:3000"
let tempId = null

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
  var google_access_token = googleUser.getAuthResponse().id_token;

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
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Login Successfull',
      showConfirmButton: false,
      timer: 1500
    })
  })
  .fail(err => {
    console.log(err, err.responseJSON);
    // Swal.fire(
    //   'Login by Google Error',
    //   err.responseJSON.errors,
    //   'error'
    // )
  })
}

function logout() {
  Swal.fire({
    title: 'Are you sure?',
    text: "",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Logout'
  }).then((result) => {
    if (result.isConfirmed) {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
      localStorage.removeItem('access_token')
      showLogin()
      Swal.fire(
        'Logged out!',
        'Log out successfull.',
        'success'
      )
    }
  })
}

function showError(error) {
  $("#error-alert").show()
  $("#error-alert").empty()
  $("#error-alert").append(`
  <p>${error}</p>
  `)
}

function showRegister() {
  $("#error-alert").hide()
  $("#login").hide()
  $("#home").hide()
  $("#register").show()
  $("#updateTodo").hide()
  $("#navbar-home").hide()
  $("#navbar-landing").show()
}

function showHome() {
  $("#error-alert").hide()
  $("#register").hide()
  $("#login").hide()
  $("#home").show()
  $("#updateTodo").hide()
  $("#navbar-home").show()
  $("#navbar-landing").hide()
  fetchTodo()
}

function showLogin() {
  $("#error-alert").hide()
  $("#register").hide()
  $("#login").show()    
  $("#home").hide()
  $("#updateTodo").hide()
  $("#navbar-home").hide()
  $("#navbar-landing").show()
}

function showUpdate(id, title, description, status, due_date) {
  $("#error-alert").hide()
  $("#register").hide()
  $("#login").hide()    
  $("#home").hide()
  $("#updateTodo").show()
  $("#navbar-home").show()
  $("#navbar-landing").hide()

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
  const image_url = $("#register-image_url").val()
  console.log(image_url, 'image');
  $.ajax({
    method: "POST",
    url: SERVER + "/register",
    data: {
      email,
      password,
      image_url
    }
  }).done(response => {
    Swal.fire(
      'Success',
      'Register Succesfull',
      'success'
    )
    showLogin()
  }).fail(err => {
    // console.log(err, err.responseJSON);
    // showError(err.responseJSON.errors)
    Swal.fire(
      'Register Error',
      err.responseJSON.errors,
      'error'
    )
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
    localStorage.setItem('access_token', response.access_token)
    showHome()
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Login Successfull',
      showConfirmButton: false,
      timer: 1500
    })
  }).fail(err => {
    console.log(err, err.responseJSON);
    // showError(err.responseJSON.errors)
    Swal.fire(
      'Login Error',
      err.responseJSON.errors,
      'error'
    )
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
    todos.forEach((todo, i) => {
      let due_date = todo.due_date.split('T')[0]
      $("#todo-table-content").append(`
      <tr>
        <th scope="row">${i + 1}</th>
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
    // showError(err.responseJSON.errors)
    Swal.fire(
      'Fetch Todo Error',
      err.responseJSON.errors,
      'error'
    )
  })
}

function addTodo(e) {
  e.preventDefault()
  const access_token = localStorage.getItem('access_token')
  const title = $("#add-title").val()
  const description = $("#add-description").val()
  const status = $("#add-status").val()
  const due_date = $("#add-due_date").val()
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
    // showError(err.responseJSON.errors)
    Swal.fire(
      'Add Todo Error',
      err.responseJSON.errors,
      'error'
    )
  })
}

function deleteTodo(id) {
  const access_token = localStorage.getItem('access_token')
  Swal.fire({
    title: 'Are you sure want to delete this Todo?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: `Yes, I want to delete it`,
  }).then( result => {
    if (result.isConfirmed) {
      $.ajax({
        method: 'delete',
        url: SERVER + `/todos/${id}`,
        headers: {
          access_token
        }
      })
      .done(response => {
        showHome()
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Todo Deleted',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .fail(err => {
        console.log(err, err.responseJSON);
        // showError(err.responseJSON.errors)
        Swal.fire(
          'Delete Todo Error',
          err.responseJSON.errors,
          'error'
        )
      })
    }
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
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Todo Updated',
      showConfirmButton: false,
      timer: 1500
    })
  }).fail(err => {
    console.log(err, err.responseJSON);
    // showError(err.responseJSON.errors)
    Swal.fire(
      'Update Todo Error',
      err.responseJSON.errors,
      'error'
    )
  })
}