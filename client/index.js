// let tog = true
// $('#click').on("click", () => {
//   tog = !tog
//   if (tog) {
//     $('#p1').show()
//   } else {
//     $('#p1').hide()
//   }

// })
const SERVER = "http://localhost:3000"


$(document).ready(() => {
  const token = localStorage.getItem("token")
  const userName = localStorage.getItem("userName")
  if (!token) {
    $('#mainPage').hide()
    $('#login').show()

  } else {
    document.getElementById("namaUser").innerText = userName
    $('#mainPage').show()
    $('#login').hide()

  }
})

function login(event) {
  event.preventDefault()
  const email = $("#email").val()
  const password = $("#password").val()
  console.log(email, password)
  $.ajax({
    method: "POST",
    url: `${SERVER}/users/login`,
    data: {
      email,
      password
    }
  }).done(response => {
    const token = response.accessToken
    const userName = response.userName
    localStorage.setItem("token", token)
    localStorage.setItem("userName", userName)
    document.getElementById("namaUser").innerText = userName
    $("#login").hide()
    $('#mainPage').show()
    $('#formUpdateTodo').hide()
  }).fail(error => {
    console.log(error)
  })
}

function logout() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  $('#mainPage').hide()
  $('#login').show()
  $('#formAddTodo').hide()
  localStorage.removeItem("token")
  localStorage.removeItem("userName")
  document.getElementById("namaUser").innerText = ""
  // function signOut() {
  //   var auth2 = gapi.auth2.getAuthInstance();
  //   auth2.signOut().then(function () {
  //     console.log('User signed out.');
  //   });
  // }
}

function fetchMyTodo() {
  $('#formAddTodo').hide()
  const token = localStorage.getItem("token")
  $.ajax({
    method: "GET",
    url: `${SERVER}/todos`,
    headers: {
      token: token
    }
  })
    .done(response => {
      const myTodo = response
      console.log(myTodo)
      $("#myTodo").empty()
      $('#myTodo').show()
      myTodo.forEach(myTodo => {
        $("#myTodo").append(`
          <p>${myTodo.title}</p>
          <p>${myTodo.description}</p>
          <p>${myTodo.due_date}</p>
          <p>${myTodo.status}</p>
          <button class="btn btn-warning" onclick="updateById(${myTodo.id})">Update</button>
          <button class="btn btn-danger" onclick="deleteById(${myTodo.id})">delete</button>
          <button class="btn btn-success" onclick="markById(${myTodo.id})">Mark As Done</button`)
      });
    })
    .fail(error => {
      console.log(error)
    })
}

function deleteById(id) {
  const token = localStorage.getItem("token")
  $.ajax({
    method: "DELETE",
    url: `${SERVER}/todos/${id}`,
    headers: {
      token: token
    }
  })
    .done(response => {
      fetchMyTodo()
    })
    .fail(error => {
      console.log(error)
    })
}

// FUNCTION SIGN-IN DAN SIGN-OUT DARI GOOGLE //
function onSignIn(googleUser) {
  // INI BASIC INFORMASI YANG DI BERIKAN GOOGLE MENGENAI USER
  // var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  var google_access_token = googleUser.getAuthResponse().id_token;

  $.ajax({
    method: "POST",
    url: `${SERVER}/users/googleLogin`,
    data: {
      google_access_token
    }
  })
    .done(response => {
      const token = response.accessToken
      const userName = response.userName
      localStorage.setItem("token", token)
      localStorage.setItem("userName", userName)
      $('#userMenu').empty()
      $('#userMenu').append(`
      <a class="navbar-brand" href="#">${userName}</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#" onclick="logout()">LOGOUT</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" onclick="fetchMyTodo()">My Todo</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Add Todo</a>
          </li>
        </ul>
      </div>`)
      $("#login").hide()
      $('#mainPage').show()
    })
    .fail(error => {
      console.log(error)
    })
}

function formAddTodo() {
  $('#title').val('')
  $('#description').val('')
  $('#due_date').val('')

  $('#formAddTodo').show()
  $('#myTodo').hide()
  $('#formUpdateTodo').hide()
}

function addTodo(event) {
  event.preventDefault()
  let token = localStorage.getItem("token")
  let title = $('#title').val()
  let description = $('#description').val()
  let due_date = $('#due_date').val()

  $.ajax({
    method: "POST",
    url: `${SERVER}/todos`,
    data: {
      title,
      description,
      due_date
    },
    headers: {
      token
    }
  })
    .done(response => {
      fetchMyTodo()
    })
    .fail(error => {
      console.log(error)
    })

}

function updateById(id) {
  let token = localStorage.getItem("token")

  $.ajax({
    method: "GET",
    url: `${SERVER}/todos/${id}`,
    headers: {
      token
    }
  })
    .done(response => {
      let date = response.due_date.slice(0, 10)
      console.log(date)
      $('#myTodo').hide()
      $('#formUpdateTodo').show()
      $('#updateId').val(`${response.id}`)
      $('#updateTitle').val(`${response.title}`)
      $('#updateDescription').val(`${response.description}`)
      $('#updateDue_date').val(`${date}`)
      console.log(response)
    })
    .fail(error => {
      console.log(error)
    })
}

function updateTodo() {
  event.preventDefault()
  let token = localStorage.getItem("token")
  $('#formUpdateTodo').hide()
  $('#myTodo').show()
  let id = $('#updateId').val()
  let title = $('#updateTitle').val()
  let description = $('#updateDescription').val()
  let due_date = $('#updateDue_date').val()

  $.ajax({
    method: "PUT",
    url: `${SERVER}/todos/${id}`,
    data: {
      title,
      description,
      due_date,
    },
    headers: {
      token
    }
  })
    .done(response => {
      fetchMyTodo()
    })
    .fail(error => {
      console.log(error)
    })
}
// FUNCTION SIGN-IN DAN SIGN-OUT DARI GOOGLE //
