const SERVER = "http://localhost:3000"

function beforeLogin() {
  $("#landingPage").show()
  $("#addTodo").hide()
  $("#listTodo").hide()
  $("#logout").hide()
}

function afterLogin() {
  $("#landingPage").hide()
  $("#addTodo").show()
  $("#listTodo").show()
  $("#logout").show()
  $("#title").val(null)
  $("#description").val(null)
  $("#due_date").val(null)
  listTodo()
  checkBox()
}

$(document).ready(() => {
  const token = localStorage.getItem("token")

  if (token) {
    afterLogin()
  } else {
    beforeLogin()
  }
})

// Login with google
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: "POST",
    url: SERVER + "/googleLogin",
    data: {
      id_token
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

// Register
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
      swal({
        title: "Success",
        text: "Your email has been added!",
        icon: "success",
        buttons: false,
        timer: 3000,
      });
    })
    .fail(err => {
      swal({
        title: "Register Field!",
        text: err.responseJSON.error,
        icon: "warning",
      });
    })
}

// Login
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
      swal({
        title: "Success",
        text: "Welcome back!",
        icon: "success",
        buttons: false,
        timer: 3000,
      });
      setTimeout(() => {
        afterLogin()
      }, 3000)
    })
    .fail(err => {
      swal({
        title: "Failed!",
        text: err.responseJSON.error,
        icon: "warning",
      });
    })
}

// Logout
const logout = () => {
  localStorage.removeItem('token')
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    beforeLogin()
  });
}

// Add todo list
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
      swal({
        title: "Success",
        text: "Your todo has been added!",
        icon: "success",
        buttons: false,
        timer: 3000,
      });
      afterLogin()
    })
    .fail(err => {
      swal({
        title: "Check Field!",
        text: err.responseJSON.error,
        icon: "warning",
      });
    })
}

// Show todo list
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
      swal({
        title: "Error!",
        text: err.responseJSON.error,
        icon: "warning",
      });
    })
}

// For check status if true, check checkbox
function finishedTodo(id, title, status) {
  $("#todoContainer").append(`
  <div class="row">
    <div class="col">
      <div class="form-check form-check-inline">
        <div class="d-flex align-items-center">
          <label>
            <input type="checkbox" class="option-input radio" value="${id}" checked><span class="completed">${title} <span class="badge badge-success">${status}</span></span>
          </label>
        </div>
      </div>
    </div>
    <div class="col col-lg-2">
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-success" onclick="editTodoForm(${id})">Edit</button>
        <button type="button" class="btn btn-secondary" onclick="willDelete(${id})">Delete</button>
      </div>
    </div>
  </div>
  `)
}

// For check status if true, check checkbox
function unfinishedTodo(id, title, status) {
  let input = ""
  if (status === "Tomorrow") {
    input = `<input type="checkbox" class="option-input radio" value="${id}"><span class="label-text">${title} <span class="badge badge-warning">${status}</span></span>`
  } else {
    input = `<input type="checkbox" class="option-input radio" value="${id}"><span class="label-text">${title} <span class="badge badge-info">${status}</span></span>`
  }
  $("#todoContainer").append(`
  <div class="row">
    <div class="col">
      <div class="form-check form-check-inline">
        <div class="d-flex align-items-center">
          <label>
            ${input}
          </label>
        </div>
      </div>
    </div>
    <div class="col col-lg-2">
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-success" onclick="editTodoForm(${id})">Edit</button>
        <button type="button" class="btn btn-secondary" onclick="willDelete(${id})">Delete</button>
      </div>
    </div>
  </div>
  `)
}

// checked checkbox
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

// Patch status to true
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
      swal({
        title: "Check Field!",
        text: err.responseJSON.error,
        icon: "warning",
      });
    })
}

// Get todo
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

// Put todo
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

// Sweet alert delete
function willDelete(id) {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this todo!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your todo has been deleted!", {
          icon: "success",
        });
        deleteTodo(id)
      }
    });
}

// Delete todo
function deleteTodo(id) {
  const token = localStorage.getItem("token")
  $.ajax({
    method: "DELETE",
    url: SERVER + `/todos/${id}`,
    headers: { token: token },
  })
    .done(response => {
      listTodo()
    })
    .fail(err => {
      console.log(err.responseJSON)
    })
}

// Function for deadline
function calculateDate(date1, date2) {
  dt1 = new Date(date1);
  dt2 = new Date(date2);
  const date = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
  if (date > 1) {
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

// Function for check status
function statusCheck(date, status) {
  if (status || date === true) {
    return ("Done")
  }
  return date
}

// Function for transisi nav landing page
$(function () {
  $(".butn").click(function () {
    $(".form-signin").toggleClass("form-signin-left");
    $(".form-signup").toggleClass("form-signup-left");
    $(".signup-inactive").toggleClass("signup-active");
    $(".signin-active").toggleClass("signin-inactive");
  });
});
