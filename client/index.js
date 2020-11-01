const SERVER = 'http://localhost:3000'

let toggleLoginReg = true

// Goolge sign in/out
function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: 'POST',
    url: SERVER + '/googleLogin',
    data: {
      id_token
    }
  }).done(response => {
    const token = response.access_token
    localStorage.setItem("token", token)
    fetchTodo()
    $("#login").hide()
    $("#home").show()
  }).fail(error => {
    console.log("ERROR GOOGLE SIGN IN",error)
  })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

$(document).ready(function () {
  const token = localStorage.getItem("token")

  if (token) {
    $("#home").show()
    $("#login").hide()
    $("#todo").hide() 
    fetchTodo()
  } else {
    $("#home").hide()
    $("#login").show()
    $("#todo").hide() 
  }

  $("#btn-logout").on("click", function() {
    logout()
  })
})

function login(e) {
  e.preventDefault()

  const email = $("#login-email").val()
  const password = $("#login-password").val()

  $.ajax({
    method: "POST",
    url: SERVER + "/login",
    data: {
      email, password
    }
  })
    .done(response => {
      const token = response.access_token
      localStorage.setItem("token", token)

      $("#login").hide()
      $("#home").show()
      $("#login-email").val('')
      $("#login-password").val('')
      $("#login-error-message").empty()
      fetchTodo()
    })
    .fail(error => {
      $("#login-error-message").empty()
      $("#login-error-message").append(`<p class="text-danger">${error.responseJSON}</p>`)
      $("#login-error-message").show()
    })
}

function logout() {
  $("#home").hide()
  $("#login").show()
  localStorage.removeItem("token")
  location.reload()
  signOut()
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
    console.log("===ERROR FETCH MOVIE===")
    console.log(err)
  })
}

function fetchTodo() {
  const token = localStorage.getItem("token")
  if (token) {
    $.ajax({
      method: "GET",
      url: SERVER + '/todos',
      headers: {
        token
      }
    })
      .done(response => {
        if (response.length) {
          $("#showAllTodo").empty()
          response.forEach(todo => {
            let status = todo.status === "checked" ? "Done" : "Not done"
            $("#showAllTodo").append(`
            <div class="col-4 mt-5 ">
              <p class="text-right font-weight-bold">${todo.title}</p>
              <p>
                ${todo.description}
              </p>
              <p class="text-muted" >
                <span id="status-update-${todo.id}">
                  ${status} 
                </span>
                <span id="status-update-${todo.id}-button">
                  <button type="button" class="btn btn-light btn-sm" onclick="todoStatusUpdate(${todo.id})">
                    Change status
                  </button>
                </span>
              </p>
              <p class="text-muted">${todo.due_date.substr(0, 10)}</p>
              <hr/>
              <div class="d-flex justify-content-between">
                <i class="btn fas fa-star text-muted"></i>
                <button class="btn btn-link p-0" onclick="todoEdit(${todo.id})">Edit</button>
                <div id="del-${todo.id}">
                  <button class="btn btn-link p-0" onclick="todoDelete(${todo.id})">Delete</button>
                </div>
              </div>
            </div>`)
          })
        }
      })
      .fail(error => {
        console.log("ERROR FETCH TODO")
        console.log(error)
      })
  }
}

function todo() {
  $("#todo").show() 
  $("#home").hide()
}

function home() {
  $("#todo").hide() 
  $("#home").show()
}

function loginRegForm() {
  toggleLoginReg = !toggleLoginReg
  if (toggleLoginReg) {
    $('#login-reg-toggle').html('Register')
    $('.login-form').show()
    $('.register-form').hide()
  } else {
    $('#login-reg-toggle').html('Login')
    $('.login-form').hide()
    $('.register-form').show()
  }
}

function register(e) {
  e.preventDefault()

  const email = $("#register-email").val()
  const password = $("#register-password").val()

  $.ajax({
    method: "POST",
    url: SERVER + "/register",
    data: {
      email, password
    }
  })
    .done(response => {
      $("#register-email").val("")
      $("#register-password").val("")
      $("#register-error-message").empty()
      $("#login-email").val(email)
      $("#login-password").val(password)
      login(e)
    })
    .fail(error => {
      $("#register-error-message").empty()
      $("#register-error-message").append(`<p class="text-danger">${error.responseJSON}</p>`)
      $("#register-error-message").show()
    })
}

function showTodoCreateForm() {
  $("#todo-create").show()
  $("#showAllTodo").hide()
  $("#todo-list-nav").attr("class","nav-item")
  $("#todo-create-nav").attr("class","nav-item active")
}

function showTodoList() {
  $("#todo-create").hide()
  $("#showAllTodo").show()
  $("#todo-create-nav").attr("class","nav-item")
  $("#todo-list-nav").attr("class","nav-item active")
  $("#todo-update").hide()
}

function todoCreate(e) {
  e.preventDefault()

  const title = $("#title").val()
  const description = $("#description").val()
  const due_date = $("#due_date").val()
  const status = 'unchecked'

  const token = localStorage.getItem("token")

  $.ajax({
    method: "POST",
    url: SERVER + "/todos",
    data: {
      title, description, due_date, status
    },
    headers: {
      token
    }
  })
    .done(response => {
      $("#title").val('')
      $("#description").val('')
      $("#due_date").val('')
      $("#create-todo-error-message").empty()
      fetchTodo()
    })
    .fail(error => {
      $("#create-todo-error-message").empty()
      $("#create-todo-error-message").append(`<p class="text-danger">${error.responseJSON}</p>`)
      $("#create-todo-error-message").show()
    })
}

function todoEdit(id) {
  $("#todo-update").show()
  $("#showAllTodo").hide()
  
  const token = localStorage.getItem("token")

  $.ajax({
    method: "GET",
    url: SERVER + `/todos/${id}`,
    headers: {
      token
    }
  })
    .done(response => {
      $("#title_update").val(response.title)
      $("#description_update").val(response.description)
      $("#due_date_update").val(response.due_date.substr(0, 10))
      $("#todo-update").append(`<div id="id_update" style="display: none;">${response.id}</div>`)
    })
    .fail(error => {
      console.log('+====== ERROR GET TODOS ID')
      console.log(error)
    })
}

function todoUpdate(e) {
  e.preventDefault()

  let id = $("#id_update").html()
  let title = $("#title_update").val()
  let description = $("#description_update").val()
  let status = $("#status_update").val()
  let due_date = $("#due_date_update").val()
  
  const token = localStorage.getItem("token")

  $.ajax({
    method: "PUT",
    url: SERVER + `/todos/${id}`,
    data: {
      title, description, status, due_date
    },
    headers: {
      token
    }
  })
    .done(response => {
      $("#title_update").val('')
      $("#description_update").val('')
      $("#status_update").val('')
      $("#due_date_update").val('')
      $("#todo-update").remove("id_update")
      $("#update-todo-error-message").empty()
      fetchTodo()
      showTodoList()
    })
    .fail(err => {
      $("#update-todo-error-message").empty()
      $("#update-todo-error-message").append(`<p class="text-danger">${err.responseJSON}</p>`)
      $("#update-todo-error-message").show()
    })
}

function todoDelete(id) {
  $(`#del-${id}`).empty()
  $(`#del-${id}`).append(`
    <button class="btn btn-link p-0" onclick="todoDeleteConfirm(${id})">Confirm</button>
    <button class="btn btn-link p-0" onclick="todoDeleteCancel(${id})">Cancel</button>
  `)
}

function todoDeleteCancel(id) {
  $(`#del-${id}`).empty()
  $(`#del-${id}`).append(`<button class="btn btn-link p-0" onclick="todoDelete(${id})">Delete</button>`)
}

function todoDeleteConfirm(id) {
  const token = localStorage.getItem("token")

  $.ajax({
    method: "DELETE",
    url: SERVER + `/todos/${id}`,
    headers: {
      token
    }
  })
    .done(response => {
      fetchTodo()
    })
    .fail(err => {
      console.log("ERROR DELETE TODO",err)
    })
}

function todoStatusUpdate(id) {
  $(`#status-update-${id}`).empty()
  $(`#status-update-${id}`).append(`
  <select name="status_update_patch" id="status_update_patch-${id}">
    <option value="unchecked">Not Done</option>
    <option value="checked">Done</option>
  </select>
  `)
  $(`#status-update-${id}-button`).empty()
  $(`#status-update-${id}-button`).append(`
  <button type="button" class="btn btn-light btn-sm" onclick="todoStatusUpdateCancel()">
    Cancel
  </button>
  <button type="button" class="btn btn-light btn-sm" onclick="todoStatusUpdateConfirm(${id})">
    Update
  </button>
  `)
}

function todoStatusUpdateCancel() {
  fetchTodo()
}

function todoStatusUpdateConfirm(id) {
  const token = localStorage.getItem("token")
  let status = $(`#status_update_patch-${id}`).val()

  $.ajax({
    method: "PATCH",
    url: SERVER + `/todos/${id}`,
    data: {
      status
    },
    headers: {
      token
    }
  })
    .then(response => {
      fetchTodo()
    })
    .fail(err => {
      console.log("ERROR STATUS UPDATE",err)
    })
}