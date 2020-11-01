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

async function login(event) {
  try {
    // ini untuk sweet alert
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    // sweet alert sampai sini
    event.preventDefault()
    if (!$("#email").val() || !$("#password").val()) {
      $('#errorLogin').empty()
      $('#errorLogin').append(`
        <p style="color:red"> Email dan Password harus di isi!! </p>
      `)
    } else {
      $('#errorLogin').empty()
      const email = $("#email").val()
      const password = $("#password").val()
      console.log(email, password)
      const response = await $.ajax({
        method: "POST",
        url: `${SERVER}/users/login`,
        data: {
          email,
          password
        }
      })
      // ini sweet alert klo berhasil login
      Toast.fire({
        icon: "success",
        title: `Log in successfully`,
      });
      // todoAdd()
      // sampai sini
      const token = response.accessToken
      const userName = response.userName
      localStorage.setItem("token", token)
      localStorage.setItem("userName", userName)
      document.getElementById("namaUser").innerText = userName
      $("#login").hide()
      $('#mainPage').show()
      $('#formUpdateTodo').hide()
      const movies = await $.ajax({
        method: "GET",
        url: `${SERVER}/movies/popular`,
      })
      console.log(movies.results)
      movies.results.forEach(movie => {
        $('#gambarMovies').append(`
          <div>
            <img src="http://image.tmdb.org/t/p/w185${movie.poster_path}" width="100px" height="120px">
          </div>
        `)
      })
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.responseJSON.msg,
    });
    console.log(error)
  }
  // event.preventDefault()
  // const email = $("#email").val()
  // const password = $("#password").val()
  // console.log(email, password)
  // $.ajax({
  //   method: "POST",
  //   url: `${SERVER}/users/login`,
  //   data: {
  //     email,
  //     password
  //   }
  // })
  //   .done(response => {
  //     const token = response.accessToken
  //     const userName = response.userName
  //     localStorage.setItem("token", token)
  //     localStorage.setItem("userName", userName)
  //     document.getElementById("namaUser").innerText = userName
  //     $("#login").hide()
  //     $('#mainPage').show()
  //     $('#formUpdateTodo').hide()
  //     return $.ajax({
  //       method: "GET",
  //       url: `${SERVER}/movies/popular`,
  //     })
  //       .done(movies => {
  //         console.log(movies.results)
  //       })
  //   })

  //   .fail(error => {
  //     console.log(error)
  //   })
}

function formRegister(event) {
  event.preventDefault()
  $('#login').hide()
  $('#formRegister').empty()
  $('#formRegister').show()
  $('#formRegister').append(`
   <div class="container-fluid ">
      <div class="row justify-content-center mt-5">
        <div class="col-4">
          <form action="" onsubmit="register(event)">
          <div class="form-group">
          <div> <h1> REGISTRASI </h1> </div>
              <label for="email"> User Name</label>
              <input type="text" name="registerUserName" id="registerUserName" class="form-control" placeholder="123-45-678" autocomplete="current-userName" >
            </div>
            <div class="form-group">
              <label for="email"> Email</label>
              <input type="email" name="registerEmail" id="registerEmail" class="form-control" autocomplete="current-email">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" name="registerPassword" id="registerPassword" class="form-control" autocomplete="current-password">
            </div>
            <div id="error" class="form-group" style="border-radius:20px; border:1px solid red">

            </div>
            <div class="row justify-content-center">
              <button type="submit" class="btn btn-primary">Register</button>
            </div>
          </form>
          <a class="btn btn-warning" onclick="$('#formRegister').hide(), $('#login').show()">Cancel</a>
        </div>
      </div>
    </div>
  `)
}

function register(event) {
  event.preventDefault()
  const userName = $('#registerUserName').val()
  const email = $('#registerEmail').val()
  const password = $('#registerPassword').val()

  $.ajax({
    method: "POST",
    url: `${SERVER}/users/register`,
    data: {
      userName,
      email,
      password
    }
  })
    .done(response => {
      $('#login').show()
      $('#formRegister').hide()
    })
    .fail(error => {
      formRegister(event)

      error.responseJSON.forEach(error => {
        $('#error').append(`
        <p style="margin:0px">${error}</p>
      `)
      })

      console.log(error.responseJSON)
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
  $('#formUpdateTodo').hide()
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
          <p><b>Title : </b>${myTodo.title}</p>
          <p><b>Descriptioan : </b>${myTodo.description}</p>
          <p><b>Due Date : </b>${myTodo.due_date.slice(0, 10).split('-').reverse().join('-')}</p>
          <p><b>Status : </b>${myTodo.status}</p>

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
      document.getElementById("namaUser").innerText = userName
      $("#login").hide()
      $('#mainPage').show()
      $('#formUpdateTodo').hide()
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
  $('#myTodo').hide()
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
function markById(id) {
  const token = localStorage.getItem("token")
  $('#myTodo').empty()
  $.ajax({
    method: "PATCH",
    url: `${SERVER}/todos/${id}`,
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

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}