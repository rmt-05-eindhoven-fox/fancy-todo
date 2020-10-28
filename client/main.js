const baseUrl = 'http://localhost:3050'


let globalTodoId


$(document).ready(function() {
  checkLogin()
})


function signUp(event) {
  event.preventDefault()
  let email = $("#register-email").val();
  let password = $("#register-password").val();

  $.ajax({
    url: `${baseUrl}/register`,
    method: "post",
    data: {
      email,
      password
    }
  })
  .done(data => {
    showSuccessToastMessage('Your account has been created')
    goToLogin()
  })
  .fail(err => {
    showErrorToastMessage(err.responseJSON.errors.join('\n'))
  })
}

function login(event) {
  event.preventDefault()
  let email = $("#login-email").val();
  let password = $("#login-password").val();

  $.ajax({
    url: `${baseUrl}/login`,
    method: "post",
    data: {
      email,
      password
    }
  })
  .done(data => {
    localStorage.setItem("token", data.token)
    showSuccessToastMessage('Login successful')
    checkLogin()
  })
  .fail(err => {
    console.log(err.responseJSON.errors)
    showErrorToastMessage(err.responseJSON.errors.join(', '))
  })
  .always(() => {
    $("#login-email").val('');
    $("#login-password").val('');
  })
}

function checkLogin() {
  if (localStorage.token) {
    $('#home-page').show()
    $('#login-page').hide()
    $('#register-page').hide()
    $("#add-page").hide()
    fetchTodo()
  } else {
    $('#login-page').show()
    $('#home-page').hide()
    $('#register-page').hide()
    $("#add-page").hide()
  }
}


function goToLogin() {
  $("#login-email").val('');
  $("#login-password").val('');
  $("#login-page").show()
  $("#register-page").hide()
  $("#add-page").hide()
}

function goToRegister() {
  $("#register-email").val('');
  $("#register-password").val('');
  $("#register-page").show()
  $("#login-page").hide()
  $("#login-page").hide()
  $("#add-page").hide()
}


function onSignIn(googleUser) {
  var tokenGoogle = googleUser.getAuthResponse().id_token;

  $.ajax({
    url: baseUrl + '/googleSign',
    method: 'POST',
    data: {
      tokenGoogle
    }
  })
  .done(data => {
    localStorage.setItem("token", data.token)
    checkLogin()
  })
  .fail(err => {
    console.log(err)
  })
}


function logout() {
  localStorage.clear()
  checkLogin()
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut()
  .then( () => {
    console.log('User signed out.');
  })
  .catch(err =>{
      console.log(err.responseJSON.errors)
  })
}



function showSuccessMessage(message) {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: 1500
  })
}

function showSuccessToastMessage(message) {
  Swal.fire({
    position: 'top',
    icon: 'success',
    toast: true,
    title: message,
    showConfirmButton: false,
    timer: 2000
  })
}

function showErrorToastMessage(message) {
  Swal.fire({
    position: 'top',
    icon: 'error',
    toast: true,
    title: message,
    showConfirmButton: false,
    timer: 3000
  })
}










function getWeather() {
  $.ajax({
    url: `${baseUrl}/weathers/`,
    method: 'GET',

  })
  .done(data => {
    $("#icon").empty();
    const condition = data.weatherData.weather[0].main;
    const temperature = Math.floor((Number(data.weatherData.main.temp) - 270 )).toString() + '°C';
    const wind = (data.weatherData.wind.speed).toString() + 'm/s';
    const location = data.weatherData.name;
    const icon = data.weatherData.weather[0].icon

    //$("#condition").text(condition)
    $("#temperature").text(temperature)
    $("#wind").text(`Wind speed:${wind}`)
    $("#location").text(`Welcome to ${location}`)
    //
    $("#icon").prepend(`<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="">
    <h4 id="condition"> ${condition}</h4> `)
  })
  .fail(err => {
    showErrorToastMessage(err.responseJSON.errors.join('\n'))
  })
}