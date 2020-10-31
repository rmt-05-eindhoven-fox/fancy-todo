const server = 'http://localhost:3000'

$(document).ready(() => {
  const token = localStorage.getItem('token')
  if (token) {
    $('#login-error').empty()
    $('#content').show()
    $('#register').hide()
    $('#login').hide()
    $('#add').hide()
    $('#edit').hide()
  } else {
    $('#login-error').empty()
    $('#content').hide()
    $('#register').hide()
    $('#login').show()
    $('#add').hide()
    $('#edit').hide()
  }
})

function register(e) {
  e.preventDefault()
  const email = $('#register-email').val()
  const password = $('#register-password').val()
  $.ajax({
    method: 'POST',
    url: server + '/register',
    data: {
      email,
      password
    }
  })
    .done(res => {
      $('#register-error').empty()
      $('#register-email').val('')
      $('#register-password').val('')
      $('#register').hide()
      $('#login').show()
      $('#content').hide()
    })
    .fail(err => {
      console.log(err)
      $('#register-error').empty()
      error = err.responseJSON.error.split(', ')
      error.forEach(el => {
        if (el == 'Validation error') {
          $('#register-error').append(`<p>Email Already Taken</p> `)
        } else {
          $('#register-error').append(`<p>${el}</p>`)
        }
      })
    })
}

function login(e) {
  e.preventDefault()
  const email = $('#login-email').val()
  const password = $('#login-password').val()
  $.ajax({
    method: 'POST',
    url: server + '/login',
    data: {
      email,
      password
    }
  })
    .done(res => {
      $('#login-error').empty()
      $('#login-email').val('')
      $('#login-password').val('')
      localStorage.setItem('token', res.token)
      localStorage.setItem('UserId', res.id)
      $('#register').hide()
      $('#login').hide()
      $('#content').show()
      fetchAllContent()
      fetchFavQ()
    })
    .fail(err => {
      console.log(err.responseJSON.error)
      $('#login-error').empty()
      $('#login-error').append(`<p>${err.responseJSON.error}</p>`)
      $('#login').show()
      $('#content').hide()
    })
}

function registerForm() {
  $('#login').hide()
  $('#register').show()
  $('#content').hide()
  $('#login-error').empty()
}

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;

  $.ajax({
    method: 'POST',
    url: server + '/googleLogin',
    data: {
      id_token
    }
  })
    .done(res => {
      localStorage.setItem('token', res.token)
      localStorage.setItem('UserId', res.id)
      $('#register').hide()
      $('#login').hide()
      $('#content').show()
      fetchAllContent()
      fetchFavQ()
    })
    .fail(err => {
      $('#login').hide()
      $('#register').show()
      $('#content').hide()
    })
}

function logout() {
  $('#content').hide()
  $('#login').show()
  $('#register').hide()
  localStorage.clear()
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function fetchFavQ() {
  $.ajax({
    method: 'GET',
    url: server + '/favQ',
    headers: {
      token: localStorage.token
    }
  })
    .done(res => {
      console.log(res)
      $('#favQ').empty()
      $('#favQ').append(res)
    })
    .fail(err => {
      console.log(err)
    })
}

function fetchAllContent() {
  $.ajax({
    method: 'GET',
    url: server + '/todos',
    headers: {
      token: localStorage.token
    }
  })
    .done(res => {
      $('#show').empty()
      $('#show').append(`
        <tr>
        <th>Id</th>
        <th>Title</th>
        <th>Description</th>
        <th>Status</th>
        <th>Due Date</th>
        <th>Action</th>
      </tr> `)
      res.forEach(el => {
        if (el.status == false) {
          $('#show').append(`
        <tr>
          <td>${el.id}</td>
          <td>${el.title}</td>
          <td>${el.description}</td>
          <td>Not Done</td>
          <td>${el.due_date}</td>
          <td><button id="done" onclick="editStatusContent(${el.id})">Done</button> <button id="delete" onclick="deleteContent(${el.id})">Delete</button> <button id="editAll" onclick="editFormContent(${el.id}, '${el.title}', '${el.description}', ${el.status}, '${el.due_date}')">Edit</button></td>
        </tr> `)
        } else {
          $('#show').append(`
        <tr>
          <td>${el.id}</td>
          <td>${el.title}</td>
          <td>${el.description}</td>
          <td>Done</td>
          <td>${el.due_date}</td>
          <td><button id="delete" onclick="deleteContent(${el.id})">Delete</button> <button id="editAll" onclick="editFormContent(${el.id}, '${el.title}', '${el.description}', ${el.status}, '${el.due_date}')">Edit</button></td>
        </tr> `)
        }
      })
    })
    .fail(err => {
      console.log(err)
    })
  $('#btn-add').on('click', () => {
    $('#add').show()
    $('#content').hide()
  })
}

function deleteContent(id) {
  $.ajax({
    method: 'DELETE',
    url: `${server} / todos / ${+ id}`,
    headers: {
      token: localStorage.token
    }
  })
    .done(res => {
      fetchAllContent()
      $('#find-error').append(`ToDo Deleted Succesfully`)
    })
    .fail(err => {
      console.log(err)
    })
}

function fetchOneContent() {
  const id = $('#findOne').val()
  if (id) {
    $.ajax({
      method: 'GET',
      url: server + '/todos/' + id,
      headers: {
        token: localStorage.token
      }
    })
      .done(res => {
        $('#find-error').empty()
        $('#findOne').val('')
        $('#show').empty()
        $('#show').append(
          `<tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Action</th>
          </tr> `)
        if (res.status == false) {
          $('#show').append(`
      <tr>
          <td>${res.id}</td>
          <td>${res.title}</td>
          <td>${res.description}</td>
          <td>Not Done</td>
          <td>${res.due_date}</td>
          <td><button id="done" onclick="editStatusContent(${res.id})">Done</button></td>
          <td><button id="delete" onclick="deleteContent(${res.id})">Delete</button></td>
          <td><button id="editAll" onclick="editFormContent(${res.id}, '${res.title}', '${res.description}', ${res.status}, '${res.due_date}')">Edit</button></td>
        </tr> `)
        } else {
          $('#show').append(`
      <tr>
          <td>${res.id}</td>
          <td>${res.title}</td>
          <td>${res.description}</td>
          <td>Done</td>
          <td>${res.due_date}</td>
          <td><button id="delete" onclick="deleteContent(${res.id})">Delete</button></td>
          <td><button id="editAll" onclick="editFormContent(${res.id}, '${res.title}', '${res.description}', ${res.status}, '${res.due_date}')">Edit</button></td>
        </tr> `)
        }
      })
      .fail(err => {
        $('#findOne').val('')
        $('#find-error').empty()
        $('#find-error').append(`< p > Please Insert Valid Id`)
        fetchAllContent()
        console.log(err)
      })
  } else {
    $('#find-error').empty()
    $('#find-error').append(`< p > Please Insert Valid Id`)
    fetchAllContent()
  }
}

function addContent(e) {
  e.preventDefault()
  const title = $('#add-title').val()
  const description = $('#add-description').val()
  const status = false
  const due_date = $('#add-date').val()
  $.ajax({
    method: 'POST',
    url: server + '/todos',
    data: {
      title,
      description,
      status,
      due_date
    },
    headers: {
      token: localStorage.token
    }
  })
    .done(res => {
      $('#find-error').empty()
      $('#add-title').val('')
      $('#add-date').val('')
      $('#add-description').val('')
      $('#content').show()
      $('#add').hide()
      fetchAllContent()
    })
    .fail(err => {
      console.log(err.responseJSON.error)
      $('#add-error').empty()
      error = err.responseJSON.error.split(', ')
      error.forEach(el => {
        $('#add-error').append(`< p > ${el}</ > `)
      })
    })
}

function editFormContent(id, title, description, status, due_date) {
  $('#find-error').empty()
  localStorage.setItem('editId', id)
  $('#edit-title').val(title)
  $('#edit-description').val(description)
  $('#edit-date').val(due_date)
  if (status == false) {
    $('#not-done').prop('checked', true)
  } else if (status == true) {
    $('#done').prop('checked', true)
  }
  $('#content').hide()
  $('#edit').show()
}

function editOneContent(e) {
  e.preventDefault()
  const title = $('#edit-title').val()
  const description = $('#edit-description').val()
  const due_date = $('#edit-date').val()
  const status = $('input[type="radio"]:checked').val()
  const id = localStorage.getItem('editId')
  console.log(status)
  $.ajax({
    method: 'PUT',
    url: server + '/todos/' + id,
    data: {
      title,
      description,
      status,
      due_date
    },
    headers: {
      token: localStorage.token
    }
  })
    .done(res => {
      console.log(res)
      $('#edit-title').val('')
      $('#edit-description').val('')
      $('input[type="radio"]').prop('checked', false)
      $('#edit-date').val('')
      $('#edit').hide()
      $('#content').show()
      fetchAllContent()
      localStorage.removeItem('editId')
    })
    .fail(err => {
      console.log(err)
    })
}

function editStatusContent(e) {
  $.ajax({
    method: 'PATCH',
    url: server + '/todos/' + e,
    data: {
      status: true
    },
    headers: {
      token: localStorage.token
    }
  })
    .done(res => {
      $('#find-error').empty()
      fetchAllContent()
    })
    .fail(err => {
      console.log(err)
    })
}