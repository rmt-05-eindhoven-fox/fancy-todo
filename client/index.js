const SERVER = "http://localhost:3000";

$(document).ready(() => {
  const token = localStorage.token;
  inititialize()
  if (token) {
    afterLogin()
  } else {
    inititialize()
  }
})

function inititialize() {
  $("#beforeLogin").show();
  $("#afterLogin").hide();
  $("#landing-page").show();
  $("#register-page").hide();
  $(".register-success").empty();
  $(".error-message").empty();

}

function afterLogin() {
  $("#beforeLogin").hide();
  $("#afterLogin").show();
  $("#right").show();
  $("#left").show();
  $("#formAddTodo").show();
  $("#formEditTodo").hide();
  helloSalut()
  getAllTodo();
}

$("#register-link").on("click", () => {
  $("#register-page").show();
  $(".register-success").empty();
  $(".error-message").empty();
  $("#landing-page").hide();
  $("#home-page").hide();
})

$(".cancel-button").on("click", () => {
  inititialize()
})

$("#logout-button").on("click", () => {
  signOut()
})

function helloSalut() {
  $.ajax({
    method: "GET",
    url: SERVER + "/salut",
  }).done(response => {
    const user = localStorage.getItem("email").split('@')[0]
    $("#hello-salut").empty();
    $("#hello-salut").append(`
      <h1>${response.hello} ${user}</h1>
      <p class="text-muted">Hello ${user}</p>
    `);
    setTimeout(() => {
      $("#hello-salut").empty();
    }, 5000)
  }).fail(err => {
    console.log(err)
  })
}

function login(e) {
  e.preventDefault()
  const email = $("#login-email").val()
  const password = $("#login-password").val()
  console.log({ email, password })
  $.ajax({
    method: "POST",
    url: SERVER + "/login",
    data: {
      email: email,
      password: password
    }
  })
    .done(response => {
      console.log({ response })
      const { tokenAkses, email } = response;

      localStorage.setItem("token", tokenAkses);
      localStorage.setItem("email", email);
      afterLogin()
    })
    .fail(err => {
      $(".error-message").empty();
      console.log(err)
      $(".error-message").append(`
      <p class="alert alert-danger" role="alert" style="color: red;">${err.responseJSON.message}</p>
    `);
      setTimeout(() => {
        $(".error-message").empty();
      }, 3000)
    })
}

function register(event) {
  event.preventDefault();
  const email = $("#reg-email").val();
  const password = $("#reg-password").val();
  $.ajax({
    method: "POST",
    url: SERVER + "/register",
    data: {
      email,
      password
    }
  }).done(response => {
    $("#landing-page").show();
    $("#home-page").hide();
    $("#register-page").hide();
    $(".register-success").empty();
    $(".register-success").append(`
        <p class="alert alert-success" role="alert" style="color: green;">Successful register</p>
      `)
    setTimeout(() => {
      $(".register-success").empty();
    }, 3000)
  }).fail(err => {
    $(".error-message").empty();
    $(".error-message").append(`
        <p class="alert alert-danger" role="alert" style="color: red;">${err.responseJSON.message}</p>
      `)
    setTimeout(() => {
      $(".error-message").empty();
    }, 3000)
  })
}

function onSignIn(googleUser) {
  var google_access_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: 'POST',
    url: SERVER + '/googleLogin',
    data: {
      google_access_token
    }
  })
    .done(response => {
      console.log(response.tokenAkses)
      localStorage.setItem("token", response.tokenAkses)
      localStorage.setItem("email", response.email)
      // helloSalut()
      // ready()
      afterLogin()
    })
    .fail(err => {
      console.log(err)
    })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    // console.log('User signed out.');
    localStorage.clear()
    clearForm()
    inititialize()

  });
}

function getAllTodo() {
  let token = localStorage.getItem('token')
  $.ajax({
    type: 'get',
    url: SERVER + '/todos',
    headers: {
      'Authorization': `${token}`
    }
  })
    .done(result => {
      let todos = result
      $('#listTodo').empty()
      todos.forEach((e, i) => {
        $('#listTodo').append(`<h4> <input type="checkbox" id="status" ${e.status ? "checked" : ''} onclick="editTodoStatus('${e.status}', '${e.id}')"> ${i + 1}.${e.title} - ${e.description}<small><a href="#" onclick="setFormEdit('${e.id}')"> Edit </a> | <a href="/#" onclick="deleteList('${e.id}')">Delete</a></td></small></h4><br> `)
      });
    })
    .fail(err => {
      console.log(err)
    })
}
function createTodo() {
  let title = $('#add-todo-title').val()
  let description = $('#add-todo-description').val()
  // let status = $('input[name="status"]:checked').val()
  let due_date = $('#add-todo-dueDate').val()
  let token = localStorage.getItem('token')
  $.ajax({
    type: "post",
    url: SERVER + '/todos',
    data: {
      title,
      description,
      status: false,
      due_date,
      token
    },
    headers: {
      'Authorization': `${token}`
    }
  })
    .done(result => {
      getAllTodo()
      $('#add-todo-title').val("")
      $('#add-todo-description').val("")
      $('input[name="status"]').val("")
      $('#add-todo-dueDate').val("")
    })
    .fail(err => {
      console.log(err)
    })
}

function setFormEdit(id) {
  let token = localStorage.getItem('token')
  $.ajax({
    type: 'get',
    url: SERVER + `/todos/${id}`,
    headers: {
      'Authorization': `${token}`
    }
  })
    .done(result => {
      console.log(result)
      $('#formAddTodo').hide()
      $('#formEditTodo').show()
      $("#edit-todo").append(`
        <div>
          <label>Title</label>
          <input id="todo-title" type="text" value="${result.title}">
        </div>
        <div>
          <label>Description</label>
          <textarea id="todo-description" type="text">${result.description}</textarea>
        </div>
        <br>
        Due Date:
        <br>
        <input id="todo-dueDate" type="date" value="${result.due_date.slice(0, 10)}">
        <br><br>
        <button onclick="editTodo('${id}')"> Submit </button>
      `)
    })
    .fail(err => {
      console.log({ err })
    })


}

function editTodo(id) {
  let title = $('#todo-title').val()
  let description = $('#todo-description').val()
  // let status = $('#todo-status').val(statusTodo)
  let due_date = $('#todo-dueDate').val()
  let token = localStorage.getItem('token')

  $.ajax({
    type: "put",
    url: SERVER + `/todos/${id}`,
    data: {
      title,
      description,
      due_date,
      token
    },
    headers: {
      'Authorization': `${token}`
    }
  })
    .done(result => {
      getAllTodo()
    })
    .fail(err => {
      console.log(err)
    })
}


function editTodoStatus(status, id) {

  // let status = $('#').val()
  let token = localStorage.getItem('token')
  let todoStatus = JSON.parse(status)
  // console.log("oke", status, !status, id)

  $.ajax({
    type: "patch",
    url: SERVER + `/todos/${id}`,
    data: {
      id,
      status: !todoStatus,
      token
    },
    headers: {
      'Authorization': `${token}`
    }
  })
    .done(result => {
      getAllTodo()

    })
    .fail(err => {
      console.log(err)
    })
}

function deleteList(id) {
  let token = localStorage.getItem('token')
  $.ajax({
    type: "delete",
    url: SERVER + `/todos/${id}`,
    data: {
      id, token
    },
    headers: {
      'Authorization': `${token}`
    }
  })
    .done(result => {
      getAllTodo()
    })
    .fail(err => {
      console.log(err)
    })
}

function clearForm(){
  $("#login-email").val('')
  $("#login-password").val('')
  $("#reg-email").val('');
  $("#reg-password").val('');
}