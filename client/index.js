const SERVER = "http://localhost:3000";

$(document).ready(function(){
  const token = localStorage.getItem("token");

  if(token) {
    $('#home').show()
    $('#login').hide()
    $('#register').hide()
    cook()
    listTodo()
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
    $('#email').val("")
    $('#password').val("")
    const token = res.access_token;
    localStorage.setItem("token", token);
    $('#login').hide()
    $('#home').show()
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
  const title = $('#title').val()
  const description = $('#description').val()
  const due_date = $('#due_date').val()

  console.log(title, description, due_date);

}