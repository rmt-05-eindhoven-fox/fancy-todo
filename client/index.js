
// const base_url = 'http://localhost:3000';
const base_url = 'https://fancytoodoapi.herokuapp.com';

let accesstoken = ''

$(document).ready(() => {
  // $('#page-authetication').show();
  verifyToken();
})

function verifyEmail(mail) {
  var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (mail.match(mailformat)) {
    return true
  }
  return false
}

function verifyToken() {
  $.ajax({
    method: "POST",
    url: base_url + "/users/verifytoken",
    headers: {
      accesstoken: localStorage.getItem('accesstoken')
    }
  })
    .done(response => {
      afterLogin();
    })
    .fail(err => {
      let message = checkError(err)
      afterSignOut();
      // console.log(message)
      // Swal.fire('Access Denied!', message, 'error')
    })
}

function showRegister(e) {
  e.preventDefault()
  $('#form-login').hide();
  $('#form-register').show();
}

function register(e) {
  e.preventDefault()
  const fullname = $('#register-fullname').val()
  const username = $('#register-username').val()
  const email = $('#register-email').val()
  const password = $('#register-password').val()
  const retypePassword = $('#register-retype-password').val()
  if (password !== retypePassword) {
    Swal.fire('Register Failed', 'Password not match', 'error')
  } else {
    prosesRegister({ fullname, username, email, password });
  }
}

function prosesRegister(input) {
  $.ajax({
    method: "POST",
    url: base_url + "/users/register",
    data: input
  })
    .done(response => {
      Swal.fire({
        title: 'Register Succesfully!',
        text: 'Please Login first!',
        icon: 'success',
        willClose: () => {
          clearRegisterValue()
          showLogin()
        }
      })
    })
    .fail(err => {
      let message = checkError(err);
      Swal.fire('Failed to Register!', message, 'error')
    })
}

function clearRegisterValue() {
  $('#register-fullname').val('')
  $('#register-username').val('')
  $('#register-email').val('')
  $('#register-password').val('')
  $('#register-retype-password').val('')
}

function checkError(err) {
  // console.log(err.message)
  if (Array.isArray(err.responseJSON)) {
    message = err.responseJSON[0].message;
  } else if (err.responseJSON.hasOwnProperty('message')) {
    message = err.responseJSON.message;
  } else {
    // console.log(err)
    message = 'Something error while connecting to the server'
  }

  return message;
}

function showLogin(e) {
  if (e) {
    e.preventDefault()
  }
  $('#form-login').show();
  $('#form-register').hide();
}

function login(e) {
  e.preventDefault();
  const username = $("#login-username").val()
  const password = $("#login-password").val()

  $.ajax({
    method: "POST",
    url: base_url + "/users/login",
    data: {
      username,
      password
    }
  })
    .done(response => {
      saveUserInfo(response);
      Swal.fire({
        title: 'Access Granted!',
        text: 'Welcome, enjoy plan your task!',
        icon: 'success',
        willClose: () => {
          afterLogin()
          clearLogin()
        }
      })
    })
    .fail(err => {
      let message = checkError(err)
      Swal.fire('Access Denied!', message, 'error')
    })
}

function setProfile() {
  $('#fullname').html(`<strong>${localStorage.fullname}</strong>`);
  $('#email').html(`<strong>${localStorage.email}</strong>`);
}

function clearLogin() {
  const username = $("#login-username").val('')
  const password = $("#login-password").val('')
}

function afterLogin() {
  accesstoken = localStorage.getItem('accesstoken');
  $('#page-authetication').hide();
  $('#form-login').hide();
  $('#form-register').hide();
  $('#right-sidebar').show();
  $('#page-home').show();
  clearRegisterValue();
  clearLogin();
  setProfile();
  loadTodo();
  loadHoliday();
}

function afterSignOut() {
  $('#page-authetication').show();
  $('#form-login').show();
  $('#form-register').hide();
  $('#page-home').hide();
  $('#right-sidebar').hide();
}

//google signin
function onSignIn(googleUser) {

  let google_access_token = googleUser.getAuthResponse().id_token;

  $.ajax({
    method: 'POST',
    url: base_url + '/users/googlesignin',
    data: {
      google_access_token
    }
  }).done(response => {
    saveUserInfo(response)
    afterLogin()
  }).fail(err => {
    let message = checkError(err)
    Swal.fire('Access Denied!', message, 'error')
  })
}

function signOut(e) {
  e.preventDefault()
  Swal.fire({
    title: 'Are you sure Want Logout?',
    text: "You will redirect to login page!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Logout!'
  }).then((result) => {
    if (result.isConfirmed) {
      afterSignOut();
      googleSignOut();
    }
  })
}

function googleSignOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    // console.log('User signed out.');
    destroyUserInfo();
  });
}

function saveUserInfo(user) {
  const { fullname, username, email, userid, accesstoken } = user
  localStorage.setItem('fullname', fullname)
  localStorage.setItem('username', username)
  localStorage.setItem('email', email)
  localStorage.setItem('userid', userid)
  localStorage.setItem('accesstoken', accesstoken)
}

function destroyUserInfo() {
  localStorage.clear();
}

function showAddTodo(e) {
  e.preventDefault();
  const currentDate = new Date().toISOString().slice(0, 10);
  $('#add-todo-due_date').attr('min', currentDate);
  $('#defaultModalLabel').text('Add Todo')
  $('#add-todo').show()
  $('#edit-todo').hide()
  $('#modalTodo').modal({ backdrop: 'static', keyboard: false });
}

function showEditTodo(e, todoId) {
  e.preventDefault()
  const currentDate = new Date().toISOString().slice(0, 10);
  $('#edit-todo-due_date').attr('min', currentDate);
  $('#defaultModalLabel').text('Edit Todo')
  $('#add-todo').hide()
  $('#edit-todo').show()

  getTodo(todoId, (todo) => {
    // console.log(todo)
    if (todo != 'err') {
      $('#edit-todo-id').val(todoId);
      $('#edit-todo-title').val(todo.title)
      $('#edit-todo-description').val(todo.description)
      $('#edit-todo-due_date').val(new Date(todo.due_date).toISOString().slice(0, 10))
      $('#modalTodo').modal({ backdrop: 'static', keyboard: false });
      $('#' + todo.status).attr('checked', 'checked');
    }
  })
}

function loadTodo() {
  $.ajax({
    method: "GET",
    url: base_url + "/todos",
    headers: {
      accesstoken
    }
  })
    .done(response => {
      // console.log(response)
      due_date = $("#todo-filter-date-mobile").val()
      due_date = $("#todo-filter-date-dekstop").val()
      filterTodo(response)
    })
    .fail(err => {
      let message = checkError(err);
      Swal.fire('Failed to Retrieve!', message, 'error')
    })
}

function getTodo(todoId, callback) {
  $.ajax({
    method: "GET",
    url: base_url + `/todos/${todoId}`,
    headers: {
      accesstoken
    }
  })
    .done(response => {
      // console.log(response)
      callback(response)
    })
    .fail(err => {
      callback('err')
      let message = checkError(err);
      Swal.fire('Failed to Retrieve Todo!', message, 'error')
    })
}

function addTodo(e) {
  e.preventDefault();
  const title = $('#add-todo-title').val()
  const description = $('#add-todo-description').val()
  const due_date = $('#add-todo-due_date').val()
  const input = {
    title,
    description,
    due_date
  }
  $.ajax({
    method: "POST",
    url: base_url + "/todos",
    data: input,
    headers: {
      accesstoken
    }
  })
    .done(response => {
      Swal.fire({
        title: 'Succesfully Add Todo!',
        text: '',
        icon: 'success',
        willClose: () => {
          afterAddTodo()
          loadTodo()
        }
      })
    })
    .fail(err => {
      let message = checkError(err);
      Swal.fire('Failed to Add!', message, 'error')
    })
}

function editTodo(e, todoId) {
  e.preventDefault();
  const id = $('#edit-todo-id').val()
  const title = $('#edit-todo-title').val()
  const description = $('#edit-todo-description').val()
  const due_date = $('#edit-todo-due_date').val()
  const status = $('input[name="edit-todo-status"]:checked').val();

  const input = {
    title,
    description,
    status,
    due_date
  }
  $.ajax({
    method: "PUT",
    url: base_url + `/todos/${id}`,
    data: input,
    headers: {
      accesstoken
    }
  })
    .done(response => {
      // console.log(response)
      Swal.fire({
        title: 'Succesfully Edit Todo!',
        text: ``,
        icon: 'success',
        willClose: () => {
          afterEditTodo()
        }
      })
    })
    .fail(err => {
      let message = checkError(err);
      Swal.fire('Failed to Update!', message, 'error')
    })
}

function updateStatus(e, todoId) {
  e.preventDefault()
  $.ajax({
    method: "PATCH",
    url: base_url + `/todos/${todoId}`,
    headers: {
      accesstoken
    },
    data: {
      status: 'finished'
    }
  })
    .done(response => {
      loadTodo()
    })
    .fail(err => {
      let message = checkError(err);
      Swal.fire('Failed to Change Status!', message, 'error')
    })
}

function searchTodo(e) {
  e.preventDefault();
  const query = $('#todo-search').val()
  $('#search').removeClass('open');
  $('#todo-search').val('');
  // console.log(query)
  $.ajax({
    method: "POST",
    url: base_url + `/todos/search`,
    headers: {
      accesstoken
    },
    data: {
      title: `%${query}%`
    }
  }).done(response => {
    // console.log(response)
    filterTodo(response)
  }).fail(err => {
    let message = checkError(err);
    Swal.fire('Failed to Find!', message, 'error')
  })
}

function deleteTodo(e, todoId) {
  e.preventDefault()
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        method: "DELETE",
        url: base_url + `/todos/${todoId}`,
        headers: {
          accesstoken
        }
      }).done(response => {
        Swal.fire(
          'Deleted!',
          response.message,
          'success'
        )
        loadTodo()
      }).fail(err => {
        let message = checkError(err);
        Swal.fire('Failed to Delete!', message, 'error')
      })
    }
  })
}

function filterDueDate(e, source) {
  e.preventDefault()

  let due_date = '';
  if (source === 'mobile') {
    due_date = $("#todo-filter-date-mobile").val()
  } else {
    due_date = $("#todo-filter-date-dekstop").val()
  }

  $.ajax({
    method: "POST",
    url: base_url + `/todos/filterdue`,
    headers: {
      accesstoken
    },
    data: {
      due_date
    }
  }).done(response => {
    // console.log(response)
    filterTodo(response)
  }).fail(err => {
    let message = checkError(err);
    Swal.fire('Failed to Find!', message, 'error')
  })
}

function loadHoliday() {
  $.ajax({
    method: "GET",
    url: base_url + `/todos/calender/holiday`,
    headers: {
      accesstoken
    }
  }).done(response => {
    // console.log(response)
    appendHolidays(response)
  }).fail(err => {
    let message = checkError(err);
    Swal.fire('Failed to Find!', message, 'error')
  })
}

function filterTodo(todos) {
  let missed = 0, active = 0, complete = 0;
  const currentDate = new Date()
  beforeLoadTodo()
  todos.forEach(todo => {
    const { id, UserId, title, description, status, due_date, updatedAt } = todo;
    const dueStatus = compareDate(due_date);
    if (status == 'finished') {
      appendCompleteTodo(todo);
      complete++;
      // console.log('appendCompleteTodo', todo.id)
    }
    switch (dueStatus) {
      case 'willDue':
        if (status === 'pending') {
          appendWillDue(todo);
          appendActiveTodo(todo);
          active++;
          // console.log('appendWillDue', todo.id)
        }
        break;
      case 'active':
        if (status === 'pending') {
          appendActiveTodo(todo);
          active++;
        }
        break;
      case 'isDue':
        if (status === 'pending') {
          appendMissedTodo(todo);
          missed++;
        }
        break
    }
  });
  $('#total-missed').text(missed)
  $('#total-active').text(active)
  $('#total-completed').text(complete)
}

function appendWillDue(todo) {
  const wildue =
  /*html*/ `<li>
    <a href="javascript:void(0);" onclick="showEditTodo(event, ${todo.id})" title="${todo.description}">
      <div class="icon-circle bg-blue"><i class="zmdi zmdi-assignment-check"></i></div>
      <div class="menu-info">
        <h4>${todo.title}</h4>
        <p><i class="zmdi zmdi-time"></i> will due today </p>
      </div>
    </a>
  </li>`;
  $('#todo-wildue').append(wildue);
}

function appendMissedTodo(todo) {
  const missed = /*html*/ `
  <li class="dd-item" data-id="2">
    <div class="d-flex justify-content-between align-items-center">
      <div class="dd-handle  h6 mb-0">${todo.title}</div>
    </div>
    <div class="dd-content p-15">
      <p>${todo.description}</p>
      <ul class="list-unstyled d-flex bd-highlight align-items-center">
        <li class="mr-2 flex-grow-1 bd-highlight">
          <span class="badge badge-default">
            <i class="zmdi zmdi-time"></i> ${formatDate(todo.due_date)}
          </span>
        </li>
        <li class="ml-3 bd-highlight action" onclick="showEditTodo(event, ${todo.id})">
          <a href="javascript:void(0);" class="text-muted">
            <i class="zmdi zmdi-edit" style="font-size: 1.2rem; color: grey;"></i>
          </a>
        </li>
        <li class="ml-3 bd-highlight action" onclick="deleteTodo(event, ${todo.id})">
          <a href="javascript:void(0);" class="text-muted">
            <i class="zmdi zmdi-delete" style="font-size: 1.2rem; color: grey;"></i>
          </a>
        </li>
      </ul>
    </div>
  </li>
  `
  $('#todo-isdue').append(missed);
}

function appendActiveTodo(todo) {
  const active = /*html*/ `
  <li class="dd-item" data-id="2">
    <div class="d-flex justify-content-between align-items-center">
      <div class="dd-handle  h6 mb-0">${todo.title}</div>
    </div>
    <div class="dd-content p-15">
      <p>${todo.description}</p>
      <ul class="list-unstyled d-flex bd-highlight align-items-center">
        <li class="mr-2 flex-grow-1 bd-highlight">
          <span class="badge badge-default text-dark">
            <i class="zmdi zmdi-time"></i> ${formatDate(todo.due_date)}
          </span>
        </li>
        <li class="ml-3 bd-highlight action" onclick="showEditTodo(event, ${todo.id})">
          <a href="javascript:void(0);" class="text-muted">
            <i class="zmdi zmdi-edit" style="font-size: 1.2rem; color: grey;"></i>
          </a>
        </li>
        <li class="ml-3 bd-highlight action" onclick="updateStatus(event, ${todo.id})">
          <a href="javascript:void(0);" class="text-muted">
            <i class="zmdi zmdi-assignment-check" style="font-size: 1.2rem; color: grey;"></i>
          </a>
        <li class="ml-3 bd-highlight action" onclick="deleteTodo(event, ${todo.id})">
          <a href="javascript:void(0);" class="text-muted">
            <i class="zmdi zmdi-delete" style="font-size: 1.2rem; color: grey;"></i>
          </a>
        </li>
      </ul>
    </div>
  </li>
  `
  $('#todo-active').append(active)
}

function appendCompleteTodo(todo) {
  const active = /*html*/ `
  <li class="dd-item" data-id="2">
    <div class="d-flex justify-content-between align-items-center">
      <div class="dd-handle  h6 mb-0">${todo.title}</div>
    </div>
    <div class="dd-content p-15">
      <p>${todo.description}</p>
      <ul class="list-unstyled d-flex bd-highlight align-items-center">
        <li class="mr-2 flex-grow-1 bd-highlight">
          <span class="badge badge-info">
            <i class="zmdi zmdi-check-square"></i> ${formatDate(todo.updatedAt)}
          </span>
        </li> 
        <li class="ml-3 bd-highlight action" onclick="deleteTodo(event, ${todo.id})">
          <a href="javascript:void(0);" class="text-muted">
            <i class="zmdi zmdi-delete" style="font-size: 1.2rem; color: grey;"></i>
          </a>
        </li>
      </ul>
    </div>
  </li>
  `
  $('#todo-complete').append(active)
}

function appendHolidays(holidays) {
  $('#todo-holiday').empty()
  holidays.forEach(holiday => {
    const holimonth = new Date(holiday.date).getMonth();
    const curtmonth = new Date().getMonth();
    if (holimonth == curtmonth) {
      const temp =
      /*html*/ `
      <li>
        <a href="javascript:void(0);" title="${holiday.description}">
          <div class="icon-circle bg-blue"><i class="zmdi zmdi-calendar"></i></div>
          <div class="menu-info">
            <h4>${holiday.name}</h4>
            <p><i class="zmdi zmdi-time"></i>${formatDate(holiday.date)} </p>
          </div>
        </a>
      </li>`;
      $('#todo-holiday').append(temp);
    }
  })

}

function compareDate(due_date) {
  let duedate = new Date(due_date);
  let dateNow = new Date();
  duedate = duedate.setHours(0, 0, 0, 0);
  dateNow = dateNow.setHours(0, 0, 0, 0);
  // console.log(duedate, dateNow)

  if (duedate === dateNow) {
    return 'willDue'
  } else if (duedate > dateNow) {
    return 'active'
  } else if (duedate < dateNow) {
    return 'isDue'
  }
}

function refreshTodo(e) {
  e.preventDefault()
  loadTodo()
}

function beforeLoadTodo() {
  $('#todo-wildue').empty()
  $('#todo-isdue').empty()
  $('#todo-active').empty()
  $('#todo-complete').empty()
}

function afterAddTodo() {
  $('#add-todo-title').val('')
  $('#add-todo-description').val('')
  $('#add-todo-due_date').val('')
  loadTodo()
}

function afterEditTodo() {
  $('#edit-todo-title').val('')
  $('#edit-todo-description').val('')
  $('#edit-todo-due_date').val('')
  $('#modalTodo').modal('hide');
  loadTodo()
}

function formatDate(date) {
  const bulan = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const newDate = new Date(date);
  return `${newDate.getDate()} ${bulan[newDate.getMonth()]} ${newDate.getFullYear()}`
}