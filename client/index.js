
const base_url = 'http://localhost:3000';
$(document).ready(() => {
  $('#form-login').show();
})

function register() {

}

function login(e) {
  e.preventDefault();
  const username = $("#login-username").val()
  const password = $("#login-password").val()
  alert(`Login ${username} & ${password}`)
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

