const SERVER = "http://localhost:3000"

$("#navregister").click(() => {
  $("#register").show()
  $("#login").hide()
})

$("#navlogin").click(() => {
  $("#register").hide()
  $("#login").show()
})

$("#navregister1").click(() => {
  $("#register").show()
  $("#login").hide()
})

$("#navlogin1").click(() => {
  $("#register").hide()
  $("#login").show()
})

$(document).ready(() => {
  const token = localStorage.getItem("token")

  if (token) {
    $("#register").hide()
    $("#login").hide()
    $("#navbar").hide()
    listTodo()
    checkBox()
  } else {
    $("#register").hide()
    $("#login").show()
    $("#navbar").show()
    $("#addTodo").hide()
  }
})

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  var id_token = googleUser.getAuthResponse().id_token;
  console.log(id_token)
  $.ajax({
    method: "POST",
    url: SERVER + "/googleLogin",
    data: {
      id_token
    }
  })
    .done(response => {
      console.log(response)
      const token = response.access_token
      localStorage.setItem("token", token)
      $("#register").hide()
      $("#login").hide()
      $("#navbar").hide()
      $("#addTodo").show()
      listTodo()

    })
    .fail(err => {
      console.log(err)
    })
}

function register(e) {
  e.preventDefault()
  const email = $("#register-email").val()
  const password = $("#register-password").val()

  $.ajax({
    method: "POST",
    url: SERVER + "/register",
    data: { email, password }
  })
    .done(response => {
      $("#register").hide()
      $("#login").show()
      $("#addTodo").hide()
    })
    .fail(err => {
      console.log(err.responseJSON)
    })
}

function login(e) {
  e.preventDefault()
  const email = $("#login-email").val()
  const password = $("#login-password").val()

  $.ajax({
    method: "POST",
    url: SERVER + "/login",
    data: { email, password }
  })
    .done(response => {
      const token = response.access_token
      localStorage.setItem("token", token)
      $("#register").hide()
      $("#login").hide()
      $("#navbar").hide()
      $("#addTodo").show()
      listTodo()
    })
    .fail(err => {
      console.log(err.responseJSON)
    })
}

const logout = () => {
  // $("#login").show()
  // $("#content").hide()
  // $("#navBtn").show()
  localStorage.removeItem('token')
  signOut()
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function addTodo(e) {
  e.preventDefault()
  const token = localStorage.getItem("token")
  const title = $("#title").val()
  const description = $("#description").val()
  const due_date = $("#due_date").val()

  $.ajax({
    method: "POST",
    url: SERVER + "/todos",
    headers: { token: token },
    data: { title, description, due_date }
  })
    .done(response => {
      listTodo()
    })
    .fail(err => {
      console.log(err.responseJSON)
    })
}

function listTodo() {
  const token = localStorage.getItem("token")

  $.ajax({
    method: "GET",
    url: SERVER + "/todos",
    headers: { token: token },
  })
    .done(response => {
      $("#todoContainer").empty()
      response.forEach((el, index) => {
        const date = calculateDate(new Date(), el.due_date)
        const status = statusCheck(date, el.status)
        if (el.status) {
          finishedTodo(el.id, el.title, status)
        } else {
          unfinishedTodo(el.id, el.title, status)
        }
      });
      checkBox()
    })
    .fail(err => {
      console.log(err.responseJSON)
    })
}

function finishedTodo(id, title, status) {
  $("#todoContainer").append(`
  <div class="row">
    <div class="col">
      <div class="form-check form-check-inline">
        <div class="d-flex align-items-center">
          <label>
            <input type="checkbox" class="option-input radio" value="${id}" checked><span class="label-text completed">${title} ${status}</span>
          </label>
        </div>
      </div>
    </div>
  <div class="col col-lg-2">
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-success" onclick="editTodoForm(${id})">Edit</button>
      <button type="button" class="btn btn-secondary" onclick="deleteTodo(${id})">Delete</button>
    </div>
  </div>
  </div>
    `)
}

function unfinishedTodo(id, title, status) {
  $("#todoContainer").append(`
  <div class="row">
    <div class="col">
      <div class="form-check form-check-inline">
        <div class="d-flex align-items-center">
          <label>
            <input type="checkbox" class="option-input radio" value="${id}"><span class="label-text">${title} ${status}</span>
          </label>
        </div>
      </div>
    </div>
  <div class="col col-lg-2">
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-success" onclick="editTodoForm(${id})">Edit</button>
      <button type="button" class="btn btn-secondary" onclick="deleteTodo(${id})">Delete</button>
    </div>
  </div>
  </div>
    `)
}

function checkBox() {
  $("input[type=checkbox]").on('click', function () {
    if (this.checked) {
      $('input[type="checkbox"]:checked').each(function (index, el) {
        updateStatus($(el).val(), true)
      })
    } else {
      $("input:checkbox:not(:checked)").each(function (index, el) {
        updateStatus($(el).val(), false)
      })
    }
  })
}

function updateStatus(id, status) {
  const token = localStorage.getItem("token")
  $.ajax({
    method: "PATCH",
    url: SERVER + `/todos/${id}`,
    headers: { token: token },
    data: { status }
  })
    .done(response => {
      listTodo()
    })
    .fail(err => {
      console.log(err.responseJSON)
    })
}

function editTodoForm(id) {
  const token = localStorage.getItem("token")
  $.ajax({
    method: "GET",
    url: SERVER + `/todos/${id}`,
    headers: { token: token },
  })
    .done(response => {
      console.log(response.id)
      $("#editTodo").append(`
      <div class="row justify-content-center mt-5">
      <div class="col-4">
        <form onsubmit="editTodo(event, ${response.id})">
          <div class="form-group">
            <label style="font-size: larger; font-weight: bold;" for="title">Title</label>
            <input required type="text" id="title-e" class="form-control" value="${response.title}">
          </div>
          <div class="form-group">
            <label style="font-size: larger; font-weight: bold;" for="description">Description</label>
            <input required type="text" id="description-e" class="form-control" value="${response.description}">
          </div>
          <div class=" form-group">
            <label style="font-size: larger; font-weight: bold;" for="due_date">Date</label>
            <input required type="date" id="due_date-e" class="form-control" value="${response.due_date}">
          </div>
          <button type="submit" class="btn btn-secondary">Edit Todo</button>
        </form>
      </div>
    </div>
      `)
      $("#addTodo").hide()

    })
    .fail(err => {
      console.log(err.responseJSON)
    })
}

function editTodo(e, id) {
  e.preventDefault()
  const token = localStorage.getItem("token")
  const title = $("#title-e").val()
  const description = $("#description-e").val()
  const due_date = $("#due_date-e").val()
  $.ajax({
    method: "PUT",
    url: SERVER + `/todos/${id}`,
    headers: { token: token },
    data: { title, description, due_date }
  })
    .done(response => {
      console.log(response)
    })
    .fail(err => {
      console.log(err.responseJSON)
    })
}

function deleteTodo(id) {
  const token = localStorage.getItem("token")
  $.ajax({
    method: "DELETE",
    url: SERVER + `/todos/${id}`,
    headers: { token: token },
  })
    .done(response => {
      console.log(response)
      listTodo()
    })
    .fail(err => {
      console.log(err.responseJSON)
    })
}

function calculateDate(date1, date2) {
  dt1 = new Date(date1);
  dt2 = new Date(date2);
  const date = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
  if (date > 0) {
    return date + " days"
  } else if (date === 1) {
    return "Tomorrow"
  } else if (date === 0) {
    return "Now"
  }
  else {
    return true
  }
}

function statusCheck(date, status) {
  if (status || date === true) {
    return ("Done")
  }
  return date
}