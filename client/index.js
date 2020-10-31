// console.log('hello world')

// let tog = true

// $("#btn-click").click(function () {
//   console.log('button terklik')
//   tog = !tog
//   if (tog) {
//     $("#p1").show()
//   } else {
//     $("#p1").hide()
//   }
// })
// $("#btn-click").on("click", function () {
//   console.log('button terklik')
// })
// $("#btn-click").on("mouseover", function () {
//   console.log('button terklik')
// })
const SERVER = 'http://localhost:3000'

// Goolge sign in/out
function onSignIn(googleUser) {
  // var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  var id_token = googleUser.getAuthResponse().id_token;
  // console.log(id_token)

  // verify di backend minta tolong sama google
  // akses pake ajax
  // method, url, data(kalo ada)
  $.ajax({
    method: 'POST',
    url: SERVER + '/googleLogin',
    data: {
      id_token
    }
  }).done(response => {
    // console.log('==============response')
    // console.log(response)
    const token = response.access_token
    localStorage.setItem("token", token)
    $("#login").hide()
    $("#home").show()
    fetchTodo()
    fetchMovies()
  }).fail(error => {
    console.log(error)
  })
}
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

$(document).ready(function () {
  // localStorage => website
  const token = localStorage.getItem("token")
  console.log("+++++++", token)
  if (token) {
    $("#home").show()
    $("#login").hide()
    fetchTodo()
    fetchMovies()
  } else {
    $("#home").hide()
    $("#login").show()
  }

  $("#btn-logout").on("click", function() {
    logout()
  })
})

function login(e) {
  // prevet default event (disable onsubmit refresh page)
  e.preventDefault()
  // console.log('login ___')
  const email = $("#login-email").val()
  const password = $("#login-password").val()
  // console.log(email, password)

  $.ajax({
    method: "POST",
    url: SERVER + "/login",
    data: {
      email, password
    }
  })
    // if http status code 2** 
    .done(response => {
      // console.log(response)
      // console.log(response.access_token)
      const token = response.access_token
      localStorage.setItem("token", token)
      $("#login").hide()
      $("#home").show()
      $("#login-email").val('')
      $("#login-password").val('')
      fetchTodo()
      fetchMovies()
    })
    // if http status code 4** or 5**
    .fail(error => {
      console.log('+====== ERROR')
      console.log(error)
    })
}

function logout() {
  $("#home").hide()
  $("#login").show()
  localStorage.removeItem("token")
  signOut()
}

function fetchTodo() {
  const token = localStorage.getItem("token")
  $.ajax({
    method: "GET",
    url: SERVER + '/todos',
    headers: {
      token
    }
  })
    .done(response => {
      const reLength = response.length
      const randomNum = Math.floor(Math.random() * reLength)
      const todo = response[randomNum]
      console.log(response)
      console.log(todo)
    //   $("#random").append(`
    //   <div class="col-4 mt-5">
    //     <p class="text-right font-weight-bold">Miscellaneous</p>
    //     <p>
    //       My mother said, "You won't amount to anything becouse you always procrastinate."
    //     </p>
    //     <p class="text-muted">I said, "Oh yeah... just you wait."</p>
    //     <hr/>
    //   </div>`)
    // })
      // page refresh => kalo ganti html file
      // page ga refresh => kalo request http tidak refresh (spa) 
      $("#random").empty()
      $("#random").append(`
      <div class="col-4 mt-5">
        <p class="text-right font-weight-bold">${todo.title}</p>
        <p>
          ${todo.description}
        </p>
        <p class="text-muted">${todo.status} <br> ${todo.due_date}</p>
        <hr/>
        <div class="d-flex justify-content-between">
          <i class="btn fas fa-star text-muted"></i>
          <button class="btn btn-link p-0" onclick="fetchTodo()">Fetch</button>
        </div>
      </div>`)
    })
    .fail(error => {
      console.log(error)
    })
}

function fetchMovies() {
  const token = localStorage.getItem("token")
  $.ajax({
    method: "GET",
    url: SERVER + '/movies/popular',
    headers: {
      token
    }
  }).done(response => {
    console.log(response)
    $("#popular").empty()
    response.forEach(movie => {
      $("#popular").append(`
        <div class="col my-2 p-3 card">
        <p class="text-center font-weight-bold">${movie.title}</p>
        <p>${movie.vote_average}</p>
        <p>${movie.overview}</p>
        <p>${movie.release_date}</p>
      </div>`)
    })
  }).fail(err => {
    console.log(err)
  })
}