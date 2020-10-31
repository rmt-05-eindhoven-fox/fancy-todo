
const base_url = 'http://localhost:3000';
let accesstoken = ''

$(document).ready(() => {
  // $('#page-authetication').show();
  verifyToken();
})

function verifyEmail(mail) {
  var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (mail.match(mailformat)) {
    return true
  }
  return false
}

function verifyToken() {
  $.ajax({
    method: "POST",
    url: base_url + "/users/verifytoken",
    headers: {
      accesstoken: localStorage.getItem('accesstoken')
    }
  })
    .done(response => {
      afterLogin();
    })
    .fail(err => {
      afterSignOut();
    })
}

function showRegister(e) {
  e.preventDefault()
  $('#form-login').hide();
  $('#form-register').show();
}

function register(e) {
  e.preventDefault()
  const fullname = $('#register-fullname').val()
  const username = $('#register-username').val()
  const email = $('#register-email').val()
  const password = $('#register-password').val()
  const retypePassword = $('#register-retype-password').val()
  if (password !== retypePassword) {
    Swal.fire('Register Failed', 'Password not match', 'error')
  } else {
    prosesRegister({ fullname, username, email, password });
  }
}

function prosesRegister(input) {
  $.ajax({
    method: "POST",
    url: base_url + "/users/register",
    data: input
  })
    .done(response => {
      Swal.fire({
        title: 'Register Succesfully!',
        text: 'Please Login first!',
        icon: 'success',
        willClose: () => {
          clearRegisterValue()
          showLogin()
        }
      })
    })
    .fail(err => {
      let message = checkError(err);
      Swal.fire('Failed Add Todo!', message, 'error')
    })
}

function clearRegisterValue() {
  $('#register-fullname').val('')
  $('#register-username').val('')
  $('#register-email').val('')
  $('#register-password').val('')
  $('#register-retype-password').val('')
}

function checkError(err) {
  if (Array.isArray(err.responseJSON)) {
    message = err.responseJSON[0].message;
  } else {
    message = err.responseJSON.message;
  }
  return message;
}

function showLogin(e) {
  if (e) {
    e.preventDefault()
  }
  $('#form-login').show();
  $('#form-register').hide();
}

function login(e) {
  e.preventDefault();
  const username = $("#login-username").val()
  const password = $("#login-password").val()

  $.ajax({
    method: "POST",
    url: base_url + "/users/login",
    data: {
      username,
      password
    }
  })
    .done(response => {
      saveUserInfo(response);
      Swal.fire({
        title: 'Access Granted!',
        text: 'Welcome, enjoy plan your task!',
        icon: 'success',
        willClose: () => {
          afterLogin()
          clearLogin()
        }
      })
    })
    .fail(err => {
      let message = '';
      if (Array.isArray(err.responseJSON)) {
        message = err.responseJSON[0].message;
      } else {
        message = err.responseJSON.message;
      }
      Swal.fire('Access Denied!', message, 'error')
    })
}

function setProfile() {
  $('#fullname').html(`<strong>${localStorage.fullname}</strong>`);
  $('#email').html(`<strong>${localStorage.email}</strong>`);
}

function clearLogin() {
  const username = $("#login-username").val('')
  const password = $("#login-password").val('')
}

function afterLogin() {
  const currentDate = new Date().toISOString().slice(0, 10);
  accesstoken = localStorage.getItem('accesstoken');
  $('#todo-due_date').attr('min', currentDate);
  $('#page-authetication').hide();
  $('#form-login').hide();
  $('#form-register').hide();
  $('#right-sidebar').show();
  $('#page-home').show();
  clearRegisterValue();
  clearLogin();
  setProfile();
}

function afterSignOut() {
  $('#page-authetication').show();
  $('#form-login').show();
  $('#form-register').hide();
  $('#page-home').hide();
  $('#right-sidebar').hide();

}

//google signin
function onSignIn(googleUser) {

  let google_access_token = googleUser.getAuthResponse().id_token;

  $.ajax({
    method: 'POST',
    url: base_url + '/users/googlesignin',
    data: {
      google_access_token
    }
  }).done(response => {
    saveUserInfo(response)
    afterLogin()
  }).fail(err => {
    console.log(err)
  })
}

function signOut(e) {
  e.preventDefault()
  Swal.fire({
    title: 'Are you sure Want Logout?',
    text: "You will redirect to login page!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Logout!'
  }).then((result) => {
    if (result.isConfirmed) {
      afterSignOut();
      googleSignOut();
    }
  })
}

function googleSignOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    destroyUserInfo();
  });
}

function saveUserInfo(user) {
  const { fullname, username, email, userid, accesstoken } = user
  localStorage.setItem('fullname', fullname)
  localStorage.setItem('username', username)
  localStorage.setItem('email', email)
  localStorage.setItem('userid', userid)
  localStorage.setItem('accesstoken', accesstoken)
}

function destroyUserInfo() {
  localStorage.clear();
}

function showAddTodo(e) {
  e.preventDefault();
  $('#defaultModalLabel').text('Add Todo')
  $('#add-todo').show()
  $('#edit-todo').hide()
  $('#modalTodo').modal('toggle');
}

function showEditTodo(e, todoId) {
  e.preventDefault()
  $('#defaultModalLabel').text('Edit Todo')
  $('#edit-todo-id').val(todoId)
  $('#add-todo').hide()
  $('#edit-todo').show()
  $('#modalTodo').modal('toggle');
}

function addTodo(e) {
  e.preventDefault();
  const title = $('#add-todo-title').val()
  const description = $('#add-todo-description').val()
  const due_date = $('#add-todo-due_date').val()
  const input = {
    title,
    description,
    due_date
  }
  $.ajax({
    method: "POST",
    url: base_url + "/todos",
    data: input,
    headers: {
      accesstoken
    }
  })
    .done(response => {
      Swal.fire({
        title: 'Succesfully Add Todo!',
        text: '',
        icon: 'success',
        willClose: () => {
          afterAddTodo()
        }
      })
    })
    .fail(err => {
      let message = checkError(err);
      Swal.fire('Register Failed!', message, 'error')
    })
}

function editTodo(e, todoId) {
  e.preventDefault();
  const id = $('#edit-todo-id').val()
  const title = $('#edit-todo-title').val()
  const description = $('#edit-todo-description').val()
  const due_date = $('#edit-todo-due_date').val()
  const status = $('input[name="edit-todo-status"]:checked').val();

  const input = {
    title,
    description,
    status,
    due_date
  }
  $.ajax({
    method: "PUT",
    url: base_url + `/todos/${id}`,
    data: input,
    headers: {
      accesstoken
    }
  })
    .done(response => {
      console.log(response)
      Swal.fire({
        title: 'Succesfully Edit Todo!',
        text: ``,
        icon: 'success',
        willClose: () => {
          afterEditTodo()
        }
      })
    })
    .fail(err => {
      let message = checkError(err);
      Swal.fire('Register Failed!', message, 'error')
    })
}

function afterAddTodo() {
  $('#add-todo-title').val('')
  $('#add-todo-description').val('')
  $('#add-todo-due_date').val('')
}

function afterEditTodo() {
  $('#edit-todo-title').val('')
  $('#edit-todo-description').val('')
  $('#edit-todo-due_date').val('')
  $('#modalTodo').modal('hide');
}
