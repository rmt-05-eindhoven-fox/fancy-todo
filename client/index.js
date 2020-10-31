const SERVER = "http://localhost:3000"

$(document).ready(function () {
  const token = localStorage.getItem("token")

  if (!token) {
    $("#login").show()
    $("#register").hide()
    $("#content").hide()
    $("#error").hide()
    $(".navbar").hide()

    $("#btn-register").on("click", function () {
      $("#login").hide()
      $("#register").show()
      $("#content").hide()
      $("#error").hide()
    })
  }
  else {
    $("#form_add").empty()
    $("#form_edit").empty()
    afterLogin()
  }
})

function login(event) {
  event.preventDefault()
  const email = $("#login-email").val()
  const password = $("#login-password").val()

  $.ajax({
    method: "POST",
    url: SERVER + "/user/login",
    data: {
      email: email,
      password: password
    }
  })
  .done(response => {
    const token = response.access_token
    localStorage.setItem("token", token)
    afterLogin()
  })
  .fail(err => {
    console.log(err)
    showError(err.responseJSON.message)
  })
}

//google sign-in
function onSignIn(googleUser) {
  // var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  var google_access_token = googleUser.getAuthResponse().id_token;

  //verify to backend
  $.ajax({
    method: 'POST',
    url: SERVER + '/user/googleLogin',
    data: {
      google_access_token: google_access_token
    }
  })
  .done(response => {
    const token = response.access_token
    localStorage.setItem("token", token)
    afterLogin()
  })
  .fail(err => {
    console.log(err)
  })
}


function register (event) {
  event.preventDefault()
  const email = $("#register-email").val()
  const password = $("#register-password").val()

  $.ajax({
    method: "POST",
    url: SERVER + "/user/register",
    data: {
      email: email,
      password: password
    }
  })
  .done(response => {
    const token = response.access_token
    localStorage.setItem("token", token)
    afterLogin()
  })
  .fail(err => {
    console.log(err)
    showError(err.responseJSON.message)
  })
}

function afterLogin () {
  $("#login").hide()
  $("#register").hide()
  $("#content").show()
  $(".navbar").show()
  $("#error").hide()
  $("#form_add").empty()
  $("#form_edit").empty()
  $("#show_movie").empty()
  fetchData()
}

function beforeLogin () {
  $("#login").show()
  $("#register").hide()
  $("#content").hide()
  $(".navbar").hide()
  $("#error").hide()
  $("#form_add").empty()
  $("#form_edit").empty()
  $("#show_movie").empty()
}

function showError (error) {
  $("#error").show()
  $("#error").empty()
  $("#error").append(`
    <p>${error}</p>
  `)
  setTimeout(() => {
    $("#error").hide()
  }, 3000)
}

function fetchData () {
  const token = localStorage.getItem("token")
  $.ajax({
    method: "GET",
    url: SERVER + "/todos/",
    headers: {
      access_token: token
    }
  })
  .done(response => {
    $("#show_todos").show()
    $("#show_todos").empty()
    let result = `
    <h1>Todo List</h1>
    <table border=1>
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Status</th>
        <th>Due Date</th>
        <th>Action</th>
      <tr>`;
    response.forEach(element => {
      let tanggal = element.due_date.toString().split('T')[0];
      result += `<tr>
          <td>${element.title}</td>
          <td>${element.description}</td>
          <td>${element.status}</td>
          <td>${tanggal}</td>
          <td><a class="btn btn-primary" onclick="editData(${element.id})">Edit</a><a class="btn btn-primary" onclick="deleteData(${element.id})">Delete</a>
        <tr>`
    });
    result += `</table>`;
    $("#show_todos").append(`${result}`)
  })
  .fail(err => {
    console.log(err)
    showError(err.responseJSON.message)
  })
}

function addData () {
  $("#show_todos").empty()
  $("#show_movie").empty()
  $("#form_add").show()
  $("#form_add").empty()
  $("#form_add").append(`
    <div class="col-4">
    <h2>Add Todo</h2>
    <form onsubmit="addDataPost(event)">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          class="form-control"
          type="text"
          id="add-title">
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          type="text"
          id="add-description">
      </div>
      <div class="form-group">
        <label for="status">Status</label>
        <select id="add-status">
            <option value="on progress">On Progress</option>
            <option value="done">Done</option>
            <option value="not even start">Not Even Start</option>
        </select>
      </div>
      <div class="form-group">
        <label for="due_date">Due Date</label>
        <input
          class="form-control"
          type="date"
          id="add-due_date">
      </div>
      <button type="submit" class="btn btn-primary">Add</button>
    </form>
  </div>
  `)
}

function addDataPost (event) {
  event.preventDefault()
  const token = localStorage.getItem("token")
  const title = $("#add-title").val()
  const description = $("#add-description").val()
  const status = $("#add-status").val()
  const due_date = $("#add-due_date").val()

  $.ajax({
    method: "POST",
    url: SERVER + `/todos/`,
    headers: {
      access_token: token
    },
    data: {
      title: title,
      description: description,
      status: status,
      due_date: due_date
    }
  })
  .done(response => {
    $("#form_add").hide()
    $("#form_add").empty()
    afterLogin()
  })
  .fail(err => {
    console.log(err)
    showError(err.responseJSON.message)
  })
}

function editData (id) {
  const token = localStorage.getItem("token")
  $.ajax({
    method: "GET",
    url: SERVER + `/todos/${id}`,
    headers: {
      access_token: token
    }
  })
  .done(response => {
    let onProgress = '';
    let done = '';
    let notStart = '';
    if (response.status === 'on progress') {
      onProgress = 'selected';
    } else if (response.status === 'done') {
      done = 'selected';
    } else if (response.status === 'not even start') {
      notStart = 'selected';
    }
    let tanggal = response.due_date.toString().split('T')[0];
    $("#show_todos").empty()
    $("#show_movie").empty()
    $("#form_edit").show()
    $("#form_edit").empty()
    $("#form_edit").append(`
    <div class="col-4">
      <h2>Edit Todo</h2><br>
      <form onsubmit="editDataPut(${id}, event)">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            class="form-control"
            type="text"
            id="edit-title"
            value="${response.title}">
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <input
            class="form-control"
            type="text"
            id="edit-description"
            value="${response.description}">
        </div>
        <div class="form-group">
          <label for="status">Status</label>
          <select id="edit-status">
            <option value="on progress" ${onProgress}>On Progress</option>
            <option value="done" ${done}>Done</option>
            <option value="not even start" ${notStart}>Not Even Start</option>
          </select>
        </div>
        <div class="form-group">
          <label for="due_date">Due Date</label>
          <input
            class="form-control"
            type="date"
            id="edit-due_date"
            value="${tanggal}">
        </div>
        <button type="submit" class="btn btn-primary">Edit</button>
      </form>
    </div>
    `)
  })
  .fail(err => {
    console.log(err)
    showError(err.responseJSON.message)
  })
}

function editDataPut (id, event) {
  event.preventDefault()
  const token = localStorage.getItem("token")
  const title = $("#edit-title").val()
  const description = $("#edit-description").val()
  const status = $("#edit-status").val()
  const due_date = $("#edit-due_date").val()

  $.ajax({
    method: "PUT",
    url: SERVER + `/todos/${id}`,
    headers: {
      access_token: token
    },
    data: {
      title: title,
      description: description,
      status: status,
      due_date: due_date
    }
  })
  .done(response => {
    $("#form_edit").empty()
    afterLogin()
  })
  .fail(err => {
    console.log(err)
    showError(err.responseJSON.message)
  })
}

function fetchMovie () {
  const token = localStorage.getItem("token")

  $.ajax({
    method: 'GET',
    url: SERVER + '/movies/popular',
    headers: {
      access_token: token
    }
  })
  .done(response => {
    let result = `<h2>Popular Movies</h2><div class="row">`
    response.forEach(element => {
      result += `
        <div class="card mb-3" style="max-width: 540px;">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img src="http://image.tmdb.org/t/p/w185/${element.poster_path}" class="card-img" alt="http://image.tmdb.org/t/p/w185/${element.backdrop_path}">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.overview}</p>
                <p class="card-text"><small class="text-muted">Release Date: ${element.release_date}</small></p>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    result += '</div>'
    $("#show_todos").empty()
    $("#form_add").empty()
    $("#form_edit").empty()
    $("#show_movie").show()
    $("#show_movie").empty()
    $("#show_movie").append(`${result}`)
  })
  .fail(err => {
    console.log(err)
    showError(err.responseJSON.message)
  })
}

function deleteData (id) {
  const token = localStorage.getItem("token")

  $.ajax({
    method: "DELETE",
    url: SERVER + `/todos/${id}`,
    headers: {
      access_token: token
    }
  })
  .done(response => {
    afterLogin()
  })
  .fail(err => {
    console.log(err)
    showError(err.responseJSON.message)
  })
}

//google sign-out
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut()
  .then(function () {
    console.log('User signed out.');
  })
  .catch((err) => {
    showError(err.responseJSON.message)
  })
}

function logout () {
  $("#login").show()
  $("#register").hide()
  $("#content").hide()
  $("#error").hide()
  $(".navbar").hide()
  localStorage.removeItem("token")
  signOut()
}