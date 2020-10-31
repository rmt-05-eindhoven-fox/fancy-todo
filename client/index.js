const SERVER = 'http://localhost:3000';

// Login & Logout Alert
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

// Google Sign In
function onSignIn(googleUser) {
    
  var google_access_token = googleUser.getAuthResponse().id_token;
  console.log(google_access_token);

  $.ajax({
    method: 'POST',
    url: "http://localhost:3000/loginGoogle",
    data: {
      google_access_token
    }
  })
  .done(response => {
    let access_token = response.access_token;
    localStorage.setItem('access_token', access_token);
    
    // Reset Login Form
    $('#inputEmail-login').val('');
    $('#inputPassword-login').val('');

    Toast.fire({
      icon: 'success',
      title: 'Login successfully'
    })
    
    readTodo();
  })
  .fail(err => {
    Swal.fire(
      'Error!',
      err.responseJSON.msg,
      'error'
    )
  })
}

$(document).ready(function () {
  const access_token = localStorage.getItem('access_token');
  if (access_token) {
    readTodo();
  } else {
    loginPage();
  }
});

function loginPage() {
  $('#navbar-main-page').show();
  $('#navbar-home-page').hide();
  $('#login-page').show();
  $('#register-page').hide();
  $('#todo-page').hide();
  $('#footer').hide();
}

function registerPage() {
  $('#navbar-main-page').show();
  $('#navbar-home-page').hide();
  $('#login-page').hide();
  $('#register-page').show();
  $('#todo-page').hide();
  $('#footer').hide();
}

function todoPage() {
  $('#navbar-main-page').hide();
  $('#navbar-home-page').show();
  $('#login-page').hide();
  $('#register-page').hide();
  $('#todo-page').show();
}

function login(e) {
  e.preventDefault();
  const email = $('#inputEmail-login').val();
  const password = $('#inputPassword-login').val();
  $.ajax({
    method: 'POST',
    url: `${SERVER}/login`,
    data: {
      email,
      password
    }
  })
  .done(response => {
    let access_token = response.access_token;
    localStorage.setItem('access_token', access_token);

    // Reset Login Form
    $('#inputEmail-login').val('');
    $('#inputPassword-login').val('');

    Toast.fire({
      icon: 'success',
      title: 'Login successfully'
    })
    
    readTodo();
  })
  .fail(err => {
    Swal.fire(
      'Error!',
      err.responseJSON.msg,
      'error'
    );
  });
}

function register(e) {
  e.preventDefault();
  const email = $('#inputEmail-register').val();
  const password = $('#inputPassword-register').val();
  $.ajax({
    method: 'POST',
    url: `${SERVER}/register`,
    data: {
      email,
      password
    }
  })
  .done(response => {

    // Reset Register Form
    $('#inputEmail-register').val('');
    $('#inputPassword-register').val('');

    Toast.fire({
      icon: 'success',
      title: 'Registered successfully'
    });

    loginPage();
  })
  .fail(err => {
    Swal.fire(
      'Error!',
      err.responseJSON.msg,
      'error'
    );
  });
}

function logout() {

  Toast.fire({
    icon: 'success',
    title: 'Logout successfully'
  })

  loginPage();
  localStorage.clear();

  // Google Signout di Taruh disini!
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function readTodo() {
  const access_token = localStorage.getItem('access_token');
  $.ajax({
    method: "GET",
    url: `${SERVER}/todos`,
    headers: {
      access_token
    }
  })
  .done(response => {
    $('#todo-undone').empty();
    $('#todo-done').empty();
    response.forEach(todo => {
      if (todo.status === 'Undone') {
        $('#todo-undone').append(`
        <div class="card bg-dark text-light">
          <h5 class="card-header bg-danger">${todo.title}</h5>
          <div class="card-body">
            <h5 class="card-title">Due Date : ${todo.due_date}</h5>
            <p class="card-text">${todo.description}</p>
            <a class="btn btn-outline-warning" onclick="editTodoModal(${todo.id}, '${todo.title}', '${todo.description}', '${todo.status}', '${todo.due_date}')" data-toggle="modal" data-target="#myModal">EDIT</a>
            <a class="btn btn-outline-danger" onclick="deleteTodo(${todo.id})">DELETE</a>
            <a class="btn btn-outline-success" onclick="updateStatusTodo(${todo.id}, '${todo.status}')">DONE</a>
          </div>
        </div><br>

        <!-- Modal -->
        <div class="modal fade" id="myModal" role="dialog">
          <div id="edit-modal-content" class="modal-dialog">
            <!-- APPEND -->
          </div>
        </div>
        `);
      } else {
        $('#todo-done').append(`
        <div class="card bg-dark text-light">
          <h5 class="card-header bg-success">${todo.title}</h5>
          <div class="card-body">
            <h5 class="card-title">Due Date : ${todo.due_date}</h5>
            <p class="card-text">${todo.description}</p>
            <a class="btn btn-outline-danger" onclick="deleteTodo(${todo.id})">DELETE</a>
            <a class="btn btn-outline-success" onclick="updateStatusTodo(${todo.id}, '${todo.status}')">UNDONE</a>
          </div>
        </div><br>
        `);
      }
    });
    todoPage();
  })
  .fail(err => {
    Swal.fire(
      'Error!',
      err.responseJSON.msg,
      'error'
    );
  })
}

function createTodo(e) {
  e.preventDefault();

  const access_token = localStorage.getItem('access_token')

  const title = $('#title-todo').val();
  const description = $('#desc-todo').val();
  const status = $('#status-todo').val();
  const due_date = $('#duedate-todo').val();

  $.ajax({
    method: "POST",
    url: `${SERVER}/todos`,
    headers: {
      access_token
    },
    data: {
      title,
      description,
      status,
      due_date
    }
  })
  .done(response => {
    $('#title-todo').val('');
    $('#desc-todo').val('');
    $('#status-todo').val('Undone');
    $('#duedate-todo').val('');
    Swal.fire(
      'Added!',
      'Your new todo has been added.',
      'success'
    );
    readTodo();
  })
  .fail(err => {
    Swal.fire(
      'Error!',
      err.responseJSON.msg,
      'error'
    );
  })
}

function editTodoModal(id, title, description, status, due_date) {
  $('#edit-modal-content').empty();
  $('#edit-modal-content').append(`
  <!-- Modal content-->
  <div class="modal-content bg-primary">
    <div class="modal-body">
      <div class="col-sm col-md-auto">
        <h3 class="text-center bg-dark text-light rounded-pill">EDIT TODO</h3>
        <div class="card bg-dark text-light">
          <div class="card-body">
            <form onsubmit="editTodoSubmit(${id}, event)">
              <div class="form-group">
                <label for="title-todo">Title :</label>
                <input type="text" class="form-control" id="title-todo-edit" value="${title}" placeholder="Title">
              </div>
              <div class="form-group">
                <label for="desc-todo">Description :</label>
                <input type="text" class="form-control" id="desc-todo-edit" value="${description}" placeholder="Description">
              </div>
              <div class="form-group">
                <label for="status-todo">Status :</label>
                <select id="status-todo-edit" class="form-control">
                  <option value="Undone">Undone</option>
                  <option value="Done">Done</option>
                </select>
              </div>
              <div class="form-group">
                <label for="duedate-todo">Due Date :</label>
                <input class="form-control" type="date" value="${due_date}" id="duedate-todo-edit">
              </div>
              <div class="text-center justify-content-center">
                <button type="submit" class="btn btn-warning">Edit Todo</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  `)
}

function editTodoSubmit(id, e) {
  e.preventDefault();

  const access_token = localStorage.getItem('access_token');

  const title = $('#title-todo-edit').val();
  const description = $('#desc-todo-edit').val();
  const status = $('#status-todo-edit').val();
  const due_date = $('#duedate-todo-edit').val();

  $.ajax({
    method: "PUT",
    url: `${SERVER}/todos/${id}`,
    headers: {
      access_token
    },
    data: {
      title,
      description,
      status,
      due_date
    }
  })
  .done(response => {
    Swal.fire(
      'Edited!',
      'Your todo has been edited.',
      'success'
    );
    readTodo();
  })
  .fail(err => {
    Swal.fire(
      'Error!',
      err.responseJSON.msg,
      'error'
    );
  })
}

function updateStatusTodo(id, status) {
  if (status === 'Done') {
    status = 'Undone';
  } else if (status === 'Undone') {
    status = 'Done';
  }
  const access_token = localStorage.getItem('access_token');
  $.ajax({
    method: 'PATCH',
    url: `${SERVER}/todos/${id}`,
    headers: {
        access_token
    },
    data: {
      status
    }
  })
  .done(response => {
    readTodo();
  })
  .fail(err => {
    Swal.fire(
      'Error!',
      err.responseJSON.msg,
      'error'
    );
  })
}

function deleteTodo(id) {
  const access_token = localStorage.getItem('access_token');
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
        url: `${SERVER}/todos/${id}`,
        method: 'DELETE',
        headers: {
            access_token
        }
      })
      .done(response => {
        readTodo();
      })
      .fail(err => {
        Swal.fire(
          'Error!',
          err.responseJSON.msg,
          'error'
        );
      });
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      );
    }
  })
}