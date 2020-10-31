
const base_url = 'http://localhost:3000';
$(document).ready(() => {
  // $('#page-authetication').show();
})

function showRegister(e) {
  e.preventDefault()
  $('#form-login').hide();
  $('#form-register').show();
}

function register(e) {
  e.preventDefault()
  const username = $('#register-username').val()
  const email = $('#register-email').val()
  const password = $('#register-password').val()
  const retypePassword = $('#register-retype-password').val()
  if (password !== retypePassword) {
    Swal.fire('Register Failed', 'Password not match', 'error')
  } else {
    prosesRegister({ username, email, password });
  }
}

function prosesRegister(input) {
  const { username, email, password } = input;
  $.ajax({
    method: "POST",
    url: base_url + "/users/register",
    data: {
      username,
      email,
      password
    }
  })
    .done(response => {
      Swal.fire({
        title: 'Register Succesfully!',
        text: 'Please Login first!',
        icon: 'success',
        onClose: () => {
          clearRegisterValue()
          showLogin()
        }
      })
    })
    .fail(err => {
      let message = checkError(err);
      Swal.fire('Register Failed!', message, 'error')
      console.log(err.responseJSON[0].message)
    })
}

function clearRegisterValue() { 
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
        onClose: () => {
          afterLogin()
          clearRegisterLogin()
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

function clearRegisterLogin() { 
  const username = $("#login-username").val('')
  const password = $("#login-password").val('')
}

function afterLogin() { 
  $('#form-login').hide();
  $('#form-register').hide();
  $('#form-register').hide();
  $('#page-authetication').hide();
  clearRegisterValue();
  clearRegisterLogin();
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
  const { username, email, userid, accesstoken } = user
  localStorage.setItem('username', username)
  localStorage.setItem('email', email)
  localStorage.setItem('userid', userid)
  localStorage.setItem('accesstoken', accesstoken)
}

function destroyUserInfo() {
  localStorage.clear();
}

