const SERVER = 'http://localhost:3000'

$(document).ready(() => {
  const token = localStorage.getItem('token')
  if (token) {
    $('#homepage').show()
    $('#login-page').hide()
    $('#register-page').hide()
    $('#alert-add').hide()
    $('#alert-delete').hide()
    $('#alert-update').hide()
    $('#error-register').hide()
    getQuote()
    getTodo()
  } else {
    $('.section-todo').hide()
    $('#homepage').hide()
    $('#login-page').show()
    $('#register-page').hide()
    $('#error-login').hide()
    $('#error-register').hide()
  }

  $('div#alert-add').click(() => {
    $('#alert-add').fadeOut()
  })
  $('div#alert-error').click(() => {
    $('#alert-error').fadeOut()
  })
  $('div#alert-delete').click(() => {
    $('#alert-delete').fadeOut()
  })
  $('div#alert-update').click(() => {
    $('#alert-update').fadeOut()
  })


  $('#register-page-btn').click(() => {
    $('#register-page').show()
    $('#login-page').hide()
    $('#error-login').hide()
  })

  $('#login-page-btn').click(() => {
    $('#register-page').hide()
    $('#login-page').show()
    $('#error-register').hide()
  })
})


function register(e) {
  e.preventDefault()
  // console.log('Clicked!');
  const email = $('#register-email').val()
  const password = $('#register-password').val()
  $('#error-register').hide()


  $.ajax({
      url: `${SERVER}/register`,
      method: 'POST',
      data: {
        email,
        password
      }
    })
    .done(response => {
      console.log(response);
      $('#register-page').hide()
      $('#login-page').show()

    })
    .fail(error => {
      console.log(error);
      $('#error-register').show()
    })
}


function login(e) {
  e.preventDefault()
  // console.log('Clicked!');
  const email = $('#login-email').val()
  const password = $('#login-password').val()



  $.ajax({
      method: 'POST',
      url: `${SERVER}/login`,
      data: {
        email,
        password,
      }
    })
    .done(response => {
      console.log(response);
      const token = response.access_token
      localStorage.setItem('token', token)
      $('#login-page').hide();
      $('#homepage').show();
      $('.section-todo').show();
      $('#error-login').hide()
      getTodo()
      getQuote()
    })
    .fail(err => {
      console.log(err);
      $('#error-login').show()
    })

}

function logout() {
  $('#login-page').show()
  $('#homepage').hide()
  $('#error-login').hide()
  $("#todo-null").empty()
  $('#login-email').val('')
  $('#login-password').val('')
  localStorage.clear()
}

function getQuote() {
  const token = localStorage.getItem('token')
  $.ajax({
      method: 'GET',
      url: `${SERVER}/quote`,
      headers: {
        token
      }
    })
    .done(response => {
      $('#favq-quote').empty()
      $('#favq-quote').append(`
      <h1 class="display-4 quote-body">${response.body}</h1>
      <p class="blockquote-footer">${response.author}</p>
      `)
    })
    .fail(error => {
      console.log(error);
    })
}

function getTodo() {
  $('#alert-add').hide()
  $('#alert-error').hide()
  $('#alert-update').hide()
  $('#alert-delete').hide()
  $('#user-todo').empty()
  const token = localStorage.getItem('token')
  $.ajax({
      method: 'GET',
      url: `${SERVER}/todos`,
      headers: {
        token
      }
    })
    .done(response => {
      if (response.length > 0) {
        response.forEach(element => {
          $('#user-todo').append(`
          <div class="col-lg-4 col-sm-6">
          <div class= "card bg-warning mb-3 mt-3" >
              <div class="card-header" id="status-todo">${element.status}</div>
              <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.description}</p>
                <p class="text-monospace"><cite>Due Date:</cite> ${element.due_date}</p>
                </div>
                <div class="d-flex justify-content-end mr-1 px-2">
                <button class="btn btn-primary mb-2 mr-2" onclick="markDone(${element.id})" id="btn-mark">Mark As Done</button>
                  <button class="btn btn-info mr-2 mb-2" onclick="updateTodo(${element.id})" id="btn-edit")">Edit</button>
                  <button class="btn btn-danger mb-2" onclick="deleteTodo(${element.id})">Delete</button>
              </div>
            </div>
          </div>
          </div>
          `)
          $('#todo-null').empty()
          $('#sucess-add').hide()
        });
      } else {
        $('#user-todo').empty()
        $('#todo-null').append(`
         <h1 class="display-5 mt-3 mb-5">Not task yet</h1>
      `)
      }
    })
    .fail(error => {
      console.log(error);
    })
}

function postTodo() {
  $('#user-todo').empty()
  const token = localStorage.getItem('token')
  const title = $('#title').val()
  const description = $('#description').val()
  const status = $('#status').val()
  const due_date = $('#due_date').val()
  $.ajax({
      method: 'POST',
      url: `${SERVER}/todos`,
      data: {
        title,
        description,
        status,
        due_date
      },
      headers: {
        token
      }
    })
    .done(response => {
      getTodo()
      $('#alert-add').show()
    })
    .fail(error => {
      console.log(error.message);
      getTodo()
      $('#alert-error').show()
    })
}


function updateTodo(id) {
  const token = localStorage.getItem('token')

  $.ajax({
      url: `${SERVER}/todos/${id}`,
      method: 'GET',
      headers: {
        token
      }
    })
    .done(response => {
      console.log(response.id);
      $('#updateModal').modal()
      $('#edit-id').val(`${response.id}`)
      $('#edit-title').val(`${response.title}`)
      $('#edit-description').val(`${response.description}`)
      $('#edit-status').val(`${response.status}`)
      $('#edit_due_date').val(`${response.due_date}`)
    })
    .fail(error => {
      console.log(error);
    })
}

function postUpdate() {
  const token = localStorage.getItem('token')
  let newId = $('#edit-id').val()
  let title = $('#edit-title').val()
  let description = $('#edit-description').val()
  let status = $('#edit-status').val()
  let due_date = $('#edit_due_date').val()

  $.ajax({
      url: `${SERVER}/todos/${newId}`,
      method: 'PUT',
      headers: {
        token
      },
      data: {
        title,
        description,
        status,
        due_date
      }
    })
    .done(response => {
      console.log(response)
      getTodo()
      $('#alert-update').show()
    })
    .fail(error => {
      console.log(error);
      $('#alert-error').show()
    })
}

function markDone(id) {
  const token = localStorage.getItem('token')
  let status = 'Finished'
  $.ajax({
      url: `${SERVER}/todos/${id}`,
      method: `PATCH`,
      data: {
        status
      },
      headers: {
        token
      }
    })
    .done(response => {
      console.log(response);
      getTodo()
    })
    .fail(error => {
      console.log(error);
    })
}


function deleteTodo(id) {
  const token = localStorage.getItem('token')
  console.log(id);
  $.ajax({
      url: `${SERVER}/todos/${id}`,
      method: 'DELETE',
      headers: {
        token
      }
    })
    .done(response => {
      getTodo()
      $('#alert-delete').show()
    })
    .fail(error => {
      console.log(err);
    })
}

// Google Signin

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var google_access_token = googleUser.getAuthResponse().id_token
  // console.log(google_access_token)

  $.ajax({
      url: `${SERVER}/googleLogin`,
      method: 'POST',
      data: {
        google_access_token
      }
    })
    .done(response => {
      console.log(response);
      const token = response.access_token
      localStorage.setItem('token', token)
      $('#login-page').hide();
      $('#homepage').show();
      $('.section-todo').show();
      $('#error-login').hide()
      getTodo()
      getQuote()
    })
    .fail(error => {
      console.log(error);
    })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function() {
    console.log('User signed out.');
  });
}