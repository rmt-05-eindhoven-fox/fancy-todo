const SERVER = 'http://localhost:3000'

$(document).ready(() => {
  const token = localStorage.getItem('token')
  if (token) {
    $('#homepage').show()
    $('#login-page').hide()
  } else {
    $('#homepage').hide()
    $('#login-page').show();
  }
})

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

    })
    .fail(err => {
      console.log(err);
    })

}

function logout() {
  $('#login-page').show()
  $('#homepage').hide()
  localStorage.clear()
}