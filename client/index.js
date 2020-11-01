const SERVER = 'http://localhost:3000/'

$("document").ready(() => {
  if(!localStorage.getItem('token')) {
    hideAll()
    $("#login").show()
  } else {
    hideAll()
    userTodos()
    $("#addTodo").show()
    $("#logout").show()
  }
})

// Event Listeners Collections

// Login
$("#submitLogin").on('click', (event) => {
  event.preventDefault()
  if(!localStorage.getItem('token')) {
    let email =  $('#email').val()
    let password =  $('#password').val()
    $('#email').val("")
    $('#password').val("")
    console.log(email, password)  
    $.ajax({
      method: 'POST',
      url: SERVER + 'users/login/',
      data: { email, password }
    }).done(hasil => {
      localStorage.setItem('token', hasil.token)
      hideAll()
    }).fail(err => {
      console.log(err.responseJSON, "dari fail");
    })
  } else {
    alert('you have to log out first')
  }
})

// Add User Todo
$("#addTodoForm").submit((event) => {
  event.preventDefault()
  const token = localStorage.getItem('token')

  let temp = $("#addTodoForm").serializeArray()
  let data = {}
  temp.forEach(el => data[el.name] = el.value )
  console.log(data);

  $.ajax({
    method: "post",
    url: SERVER + 'todos',
    headers: { token },
    data
  }).done(hasil => userTodos())
  .fail(err => console.log(err.responseJSON))
})

// Edit User Todo
$("#editTodo").submit(event => {
  event.preventDefault()
  hideAll()
  const token = localStorage.getItem('token')
  let data = {}
  $("#editTodoForm").serializeArray().forEach(el => data[el.name] = el.value)
  let id = Number(data.id)
  delete data.id
  console.log(data, id);  
  $.ajax({
    method: 'put',
    url: SERVER + 'todos/' + id,
    headers: { token },
    data
  }).done(data => {
    $("#addTodo").show()
    userTodos()
  }).fail(err => console.log(err.responseJSON))
})

// Link Register Now!
$("#redirectRegister").on('click', e=> {
  e.preventDefault()
  hideAll()
  $("#register").show()
})

// Register User
$("#registerForm").submit(e => {
  e.preventDefault()
  let data = {}
  $("#registerForm").serializeArray().forEach(el => data[el.name] = el.value)
  console.log(data);
  $.ajax({
    method: 'post',
    url: SERVER + "users/register",
    data
  }).done(result => {
    hideAll()
    $("#login").show()
  }).fail(err => {
    console.log(err.responseJSON);
  })
})

// Log Out User
$("#logout").on('click', _=> {
  localStorage.removeItem('token')
  signOut()
  hideAll()
  $("#login").show()
})

// Functions Collections

// List user todo, and automatically clear user todo before
const userTodos = () => {
  const token = localStorage.getItem('token')

  $("#todo").empty()
  $.ajax({
    method: 'get',
    url: SERVER + 'todos',
    headers: { token }
  }).done(hasil => {
    hasil.forEach(datum => {
      let status
      if(!datum.status) status = `<button onclick="done(${datum.id})">Mark as done</button>`
      else status = `Done!`
      $("#todo").append(`
        ${datum.title}<br>
        ${datum.description}<br>
        ${datum.status}<br>
        ${datum.due_date}<br>
        ${status}
        <button onclick="edit(${datum.id})">Edit</button>
        <button onclick="hapus(${datum.id})">Delete</button>
        <br><br>
      `)})
      $("#todo").show()
  }).fail(err => {
    console.log(err);
  })
}

// Mark as done a User Todo
function done(id) {
  const token = localStorage.getItem('token')
  $.ajax({
    method: 'patch',
    url: SERVER + 'todos/' + id,
    headers: { token }
  }).done(hasil => {
    userTodos()
  })
}

// Edit user Todo with Populated data from DB
async function edit(id) {
  try {    
    const token = localStorage.getItem('token')
    let result = await $.ajax({
      method: "get",
      url: SERVER + "todos/" + id,
      headers: { token }
    })
    hideAll()
    let date = new Date(result.due_date).toISOString().substring(0, 10)
    $("#editTodo").empty()
    $("#editTodo").append(`
      <form id="editTodoForm">
      <input type="text" name="id" value="${result.id}" id="id">
      <input type="text" name="title" value="${result.title}">
      <input type="text" name="description" value="${result.description}">
      <input type="date" name="due_date" value="${date}">
      <input type="radio" id="false" name="status" value="false" ${!result.status ? 'checked' : ""}>
      <label for="false">Not Yet</label>
      <input type="radio" id="true" name="status" value="true" ${result.status ? 'checked' : ""}>
      <label for="true">Done</label>
      <input type="submit" value="Edit Todo">
      </form>
    `)
    $("#id").hide()
    $("#editTodo").show()
  } catch (error) {
    console.log(error.responseJSON)
  }
}

// Delete user Todo
function hapus(id) {
  const token = localStorage.getItem('token')

  $.ajax({
    method: 'delete',
    url: SERVER + 'todos/' + id,
    headers: { token }
  }).done(hasil => {
    userTodos()
  })
}

function hideAll() {
  $("#register").hide()
  $("#login").hide()
  $("#todo").hide()
  $("#addTodo").hide()
  $("#editTodo").hide() 
  $("#logout").hide() 
}

// Google Signin
// <script>
// var googleUser = {};
// var startApp = function() {
//   gapi.load('auth2', function(){
//     // Retrieve the singleton for the GoogleAuth library and set up the client.
//     auth2 = gapi.auth2.init({
//       client_id: '390207241181-48b99jgbdiscpqticbdpoo6hvcfkcvvr.apps.googleusercontent.com',
//       cookiepolicy: 'single_host_origin',
//       // Request scopes in addition to 'profile' and 'email'
//       //scope: 'additional_scope'
//     });
//     attachSignin(document.getElementById('customBtn'));
//   });
// };

// function attachSignin(element) {
//   console.log(element.id);
//   auth2.attachClickHandler(element, {},
//       function(googleUser) {
//         document.getElementById('name').innerText = "Signed in: " +
//             googleUser.getBasicProfile().getName();
//       }, function(error) {
//         alert(JSON.stringify(error, undefined, 2));
//       });
// }
// </script>
startApp()


// Google sign out
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}