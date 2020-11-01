const SERVER = "http://localhost:3000"

$(document).ready(() => {
  var date = new Date().toISOString().slice(0,10);
  $('#todo-due_date').attr('min', date);
  const token = localStorage.getItem('token')
  console.log(token)
  if(token){
    $("#home").show()
    $("#login").hide()
    $("#register").hide()
    $("#errors").hide()
    $("#reg-errors").hide()
    $("#todo-errors").hide()
    $("#weatherbar").show();
    $("#add-todo").hide();
    $("#update-todo").hide()
    $("#update-status-todo").hide()
    showWeather();
    getTodo()
  } else {
    $("#home").hide()
    $("#login").show()
    $("#register").hide()
    $("#errors").hide()
    $("#reg-errors").hide()
    $("#todo-errors").hide()
    $("#weatherbar").hide();
  }

  $("#logout").on("click", () => {
    logout()
  })

  $("#login-button").on("click", () => {
    showLogin()

  })

  $("#register-button").on("click", () => {
    showRegister()
  })

  $("#add-todo-button").on("click", () => {
    showAddTodo()
  })
})

function showLogin() {
  $("#home").hide()
  $("#login").show()
  $("#register").hide()
  $("#errors").hide()
}

function showRegister() {
  $("#home").hide()
  $("#login").hide()
  $("#register").show()
  $("#reg-errors").hide()
}

function showAddTodo() {
  $("#add-todo").show();
}

function register(event) {
  event.preventDefault()
  console.log('register')
  const email = $("#register-email").val()
  const password = $("#register-password").val()
  let errors = []
  $("#reg-errors").empty()

  console.log(email, password)
  $.ajax({
    method: "POST",
    url: SERVER + "/register", 
    data: {
      email,
      password,
    }
  }).done(response => {
    $("#register").hide()
    $("#login").show()
    console.log(response)
  }).fail(err => {
    errors.push(err.responseJSON.msg)
    $("#reg-errors").append(
      errors
    )
    $("#reg-errors").show()
    console.log(err)
  })
}

function login(event) {
  event.preventDefault()
  console.log('login')
  const email = $("#login-email").val()
  const password = $("#login-password").val()
  let errors = []
  $("#errors").empty()
  $("#errors").hide()

  console.log(email, password)
  $.ajax({
    method: "POST",
    url: SERVER + "/login", 
    data: {
      email,
      password,
    }
  }).done(response => {
    const token = response.access_token
    localStorage.setItem('token', token)
    // console.log(response)
    $("#login").hide()
    $("#register").hide()
    $("#home").show()
    $("#login-email").val("")
    $("#login-password").val("")
    $("#weatherbar").show();
    $("#add-todo").hide();
    $("#update-todo").hide()
    $("#update-status-todo").hide()
    showWeather();
    getTodo()

  }).fail(err => {
    errors.push(err.responseJSON.message)
    $("#errors").append(
      errors
    )
    $("#errors").show()
    console.log(err)
  })
}

function onSignIn(googleUser) {
  var google_access_token = googleUser.getAuthResponse().id_token;
  console.log(google_access_token)

  $.ajax({
    method: "POST",
    url: SERVER + "/googleLogin",
    data: {
      google_access_token
    }
  }).done(response => {
    const token = response.access_token
    localStorage.setItem('token', token)
    // console.log(response)
    $("#login").hide()
    $("#register").hide()
    $("#home").show()
    $("#login-email").val("")
    $("#login-password").val("")
    $("#weatherbar").show();
    $("#add-todo").hide();
    $("#update-todo").hide()
    $("#update-status-todo").hide()
    showWeather();
    getTodo()
  }).fail(err => {
    console.log(err)
  })
}


function logout() {
  $("#home").hide()
  $("#login").show()
  $("#errors").hide()
  $("#reg-errors").hide()
  $("#todo-errors").hide()
  $("#weatherbar").hide();
  localStorage.removeItem("token")
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function addTodo(event) {
  event.preventDefault()
  console.log('add todo')
  const token = localStorage.getItem("token")
  const title = $("#todo-title").val()
  const description= $("#todo-description").val()
  const status= $("#todo-status").val()
  const due_date= $("#todo-due_date").val()
  let errors = []
  $("#todo-errors").empty()

  $.ajax({
    method: "POST",
    url: SERVER + "/todos",
    headers: {
      token: token
    }, 
    data: {
      title,
      description,
      status,
      due_date
    }
  }).done(response => {
    getTodo()
    clearAllForms()
    $("#todo-errors").hide()
    console.log(response)
  }).fail(err => {
    if (err.responseJSON.message) {
      errors.push(err.responseJSON.message)
    } else if (err.responseJSON.msg) {
      errors.push(err.responseJSON.msg)
    }
    $("#todo-errors").append(
      errors
    )
    $("#todo-errors").show()
    console.log(err)
  })
}

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

function updateTodo(id) {
  $("#update-todo").show()
  $("#add-todo").hide()
  $("#update-status-todo").hide()

  const token = localStorage.getItem("token")
  $("#edit-todo-errors").empty()

  $.ajax({
    method: "GET",
    url: SERVER + `/todos/${id}`,
    headers: {
      token: token
    }
  }).done(response => {

    $("#edit-todo-id").val(`${id}`)
    $("#edit-todo-title").val(`${response.title}`)
    $("#edit-todo-description").val(`${response.description}`)
    $("#edit-todo-status").val(`${response.status}`)
    $("#edit-todo-due_date").val(`${formatDate(response.due_date)}`)

    $("#edit-todo-errors").hide()
  }).fail(err => {
    console.log(err)
  })
}

function upadateStatusTodo(id) {
  $("#update-todo").hide()
  $("#add-todo").hide()
  $("#update-status-todo").show()

  const token = localStorage.getItem("token")
  $("#update-status-todo-errors").empty()

  $.ajax({
    method: "GET",
    url: SERVER + `/todos/${id}`,
    headers: {
      token: token
    }
  }).done(response => {

    $("#update-status-todo-id").val(`${id}`)
    $("#update-status-todo-form").val(`${response.status}`)

    $("#update-status-todo-errors").hide()
  }).fail(err => {
    console.log(err)
  })
}

function postUpdateTodo(event) {
  event.preventDefault()
  const token = localStorage.getItem("token")
  const id = $("#edit-todo-id").val()
  const title = $("#edit-todo-title").val()
  const description= $("#edit-todo-description").val()
  const status= $("#edit-todo-status").val()
  const due_date= $("#edit-todo-due_date").val()
  let errors = []
  $("#edit-todo-errors").empty()

  $.ajax({
    method: "PUT",
    url: SERVER + `/todos/${id}`,
    headers: {
      token: token
    }, 
    data: {
      id,
      title,
      description,
      status,
      due_date
    }
  }).done(response => {
    getTodo()
    clearAllForms()
    $("#add-todo").hide()
    $("#update-todo").hide()
    $("#edit-todo-errors").hide()
    console.log(response)
  }).fail(err => {
    console.log(err)
    if (err.responseJSON.message) {
      errors.push(err.responseJSON.message)
    } else if (err.responseJSON.msg) {
      errors.push(err.responseJSON.msg)
    }
    $("#edit-todo-errors").append(
      errors
    )
    $("#edit-todo-errors").show()
  })
}

function postUpdateStatusTodo(event) {
  event.preventDefault()
  const token = localStorage.getItem("token")
  const id = $("#update-status-todo-id").val()
  const status= $("#update-status-todo-form").val()
  let errors = []
  $("#update-status-todo-errors").empty()

  $.ajax({
    method: "PATCH",
    url: SERVER + `/todos/${id}`,
    headers: {
      token: token
    }, 
    data: {
      id,
      status,
    }
  }).done(response => {
    getTodo()
    clearAllForms()
    $("#add-todo").hide()
    $("#update-todo").hide()
    $("#update-status-todo").hide()
    $("#update-status-todo-errors").hide()
    console.log(response)
  }).fail(err => {
    errors.push(err.responseJSON.msg)
    $("#update-status-todo-errors").append(
      errors
    )
    $("#update-status-todo-errors").show()
    console.log(err)
  })
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

function getTodo() {
  const token = localStorage.getItem("token")
  $.ajax({
    method: "GET",
    url: SERVER + `/todos/`,
    headers: {
      token: token
    }
  }).done(response => {
    let todo;
    $("#todo").empty()
    for (let i= 0; i< response.length; i++) {
      let todo = response[i]
      let due_date = new Date(response[i].due_date.toString().slice(0, 10)).toDateString()

      $("#todo").append(`

      <div class="card border-light bg-light mb-3">
          <div class="card-body bg-transparent border-light">
            <h5 class="card-title">${todo.title.capitalize()}</h5>
            <hr>
            <p class="card-text">${todo.description}</p>
          </div>
        <div class="card-footer bg-transparent border-light">
          <div>
            <strong>Due Date:</strong>&nbsp;${due_date} <br>
            <strong>Status:</strong>&nbsp;${todo.status}
            <button class="btn text-info" onclick="upadateStatusTodo(${todo.id})">Edit status</button>
          </div>
        </div>
        <div class="card-footer bg-transparent border-light ">
          <div class="d-flex justify-content-center">
            <button class="btn text-danger m-1 " onclick="confirmDelete(${todo.id})">Delete task</button>
            <button class="btn text-primary m-1" onclick="updateTodo(${todo.id})">Edit task</button>
          </div>
        </div>
      </div>

      
      `)
      todo = response[i+1]
    }
    console.log(response)
  }).fail(err => {
    console.log(err)
  })
}

function clearAllForms(){

  $('#todo-title').val('')
  $('#todo-description').val('')
  $('#todo-status').val('')
  $('#todo-due_date').val('')

  $('#update-todo-id').val('')
  $('#update-todo-title').val('')
  $('#update-todo-description').val('')
  $('#update-todo-status').val('')
  $('#update-todo-due_date').val('')

  $("#update-status-todo-form").val('')

  $("#register-email").val("")
  $("#register-password").val("")
  $("#login-email").val("")
  $("#login-password").val("")

  $("#register-email").empty()
  $("#register-password").empty()
  $("#login-email").empty()
  $("#login-password").empty()

}

function deleteTodo(id) {
  const token = localStorage.getItem("token")

  $.ajax({
    method: "DELETE",
    url: SERVER + `/todos/${id}`,
    id: id,
    headers: {
      token
    }
  }).done(response => {
    console.log(response)
    getTodo()
  }).fail(err => {
    console.log(err)
  })
}

function confirmDelete(id) {
  if (confirm('Are you sure you want to delete this task?')) {
    deleteTodo(id)
  } else {
    $("home").show()
  }
}

function showWeather(e) {
  $("#kota").empty();
  $("#temp").empty();
  $("#weather").empty();
  $.ajax({
    method: "GET",
    url: SERVER + "/weather",
  })
    .done((result) => {
      // console.log(result);
      $("#kota").append(`${result.name}`);
      $("#temp").append(`Temp: ${result.temp}`);
      $("#weather").append(`Weather: ${result.weather}`);
    })
    .fail((err) => {
      console.log(err);
    });
}