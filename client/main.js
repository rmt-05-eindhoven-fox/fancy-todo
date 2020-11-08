const baseUrl = 'http://localhost:3050'


let globalTodoId


$(document).ready(function() {
  checkLogin()
})


function register(event) {
  event.preventDefault()
  let email = $("#register-email").val();
  let password = $("#register-password").val();

  $.ajax({
    url: `${baseUrl}/register`,
    method: "POST",
    data: {
      email,
      password
    }
  })
  .done(data => {
    showSuccessToastMessage('Yes! Account has been created!')
    goToLogin()
  })
  .fail(err => {
    showErrorToastMessage(err.responseJSON.errors.join('\n'))
  })
}

function login(event) {
  event.preventDefault()
  let email = $("#login-email").val();
  let password = $("#login-password").val();

  $.ajax({
    url: `${baseUrl}/login`,
    method: "POST",
    data: {
      email,
      password
    }
  })
  .done(data => {
    localStorage.setItem("token", data.token)
    showSuccessToastMessage('Welcome!')
    checkLogin()
  })
  .fail(err => {
    console.log(err.responseJSON.errors)
    showErrorToastMessage(err.responseJSON.errors.join(', '))
  })
  .always(() => {
    $("#login-email").val('');
    $("#login-password").val('');
  })
}

function checkLogin() {
  if (localStorage.token) {
    $('#home-page').show()
    $('#login-page').hide()
    $('#register-page').hide()
    $("#add-page").hide()
    fetchTodo()
  } else {
    $('#login-page').show()
    $('#home-page').hide()
    $('#register-page').hide()
    $("#add-page").hide()
  }
}


function goToLogin() {
  $("#login-email").val('');
  $("#login-password").val('');
  $("#login-page").show()
  $("#register-page").hide()
  $("#add-page").hide()
}

function goToRegister() {
  $("#register-email").val('');
  $("#register-password").val('');
  $("#register-page").show()
  $("#login-page").hide()
  $("#login-page").hide()
  $("#add-page").hide()
}


function onSignIn(googleUser) {
  var google_access_token = googleUser.getAuthResponse().id_token;

  $.ajax({
    url: baseUrl + '/googleLogin',
    method: 'POST',
    data: {
      google_access_token
    }
  })
  .done(data => {
    localStorage.setItem("token", data.token)
    checkLogin()
  })
  .fail(err => {
    console.log(err)
  })
}


function logout() {
  localStorage.clear()
  checkLogin()
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut()
  .then( () => {
    showSuccessToastMessage('Goodbye! See you next time')
  })
  .catch(err =>{
      console.log(err.responseJSON.errors)
  })
}



function showSuccessMessage(message) {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: 1500
  })
}

function showSuccessToastMessage(message) {
  Swal.fire({
    position: 'top',
    icon: 'success',
    toast: true,
    title: message,
    showConfirmButton: false,
    timer: 2000
  })
}

function showErrorToastMessage(message) {
  Swal.fire({
    position: 'top',
    icon: 'error',
    toast: true,
    title: message,
    showConfirmButton: false,
    timer: 3000
  })
}

function fetchTodo(){
  const unfinished = $('#unfinished')
  const finished = $('#finished')

  $.ajax({
    url: `${baseUrl}/todos`,
    method: 'GET',
    headers:{
      token: localStorage.token
    }
  })

  .done(data => {
    console.log(data)
    unfinished.empty()
    finished.empty()
    getWeather()
    $('#container-todo').empty()
    data.forEach(todo => {
      if(todo.status === 'not finished'){
      unfinished.append(`
      <li class="media bg-white rounded p-4 bg-light shadow mt-4" style="width: 100%; height: 100%; border-radius: 40px;">
        <div class="media-body p-1">
        <button onclick="deleteToDo(${todo.id})" type="button" class="close float-right" aria-label="Close">
      <span aria-hidden="true">&times;</span>
      </button>
          <h5 class="mt-0 mb-0">${todo.title}</h5>
          <br>
          <span class="text-muted">${todo.description}</span> 
          <br><br>
          <small>Due: ${new Date(todo.due_date).toDateString()}</small>
      <br><br>
      <button onclick="editPage(${todo.id}, '${todo.title}', '${todo.description}', '${todo.status}', '${todo.due_date}')" class="btn btn-primary mr-2"><i class="fas fa-edit"></i> Update</button>
      <button onclick="updateStatus(${todo.id}, 'finished')" class="btn btn-success"><i class="fas fa-check-circle"></i> Finished</button>
      </li>`)

    } else if (todo.status === 'finished') {
      finished.append(`
      <li class="media bg-white rounded p-4 bg-light shadow mt-4">
      <div class="media-body p-1">
      <button onclick="deleteToDo(${todo.id})" type="button" class="close float-right" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
        <h5 class="mt-0 mb-0">${todo.title}</h5>
        <br>
        <span class="text-muted">${todo.description}</span> 
        <br><br>
        <small>Due: ${new Date(todo.due_date).toDateString()}</small>
    <br><br>
    <button onclick=" "editPage(${todo.id}, '${todo.title}', '${todo.description}', '${todo.status}', '${todo.due_date}')" class="btn btn-primary mr-2"><i class="fas fa-edit"></i> Update</button>
    <button onclick="updateStatus(${todo.id}, 'not finished')" class="btn btn-success"><i class="fas fa-check-circle"></i> Finished</button>
    </li>`)
    }
  })
})
  .fail(err => {
    console.log(err.responseJSON.errors, '<<< error login')
    showErrorToastMessage(err.responseJSON.errors.join(', '))
  })
  .always(() => {
    $("#login-email").val('');
    $("#login-password").val('');
  })
}

//ADD PAGE To Do

function toAddPage() {
  $('#add-page').show()
  $('#home-page').hide()
  hideEditForm()
  

}

//ADD To Do

function addTask(event){
  event.preventDefault()
  const title = $('#add-title').val()
  const description = $('#add-description').val()
  const due_date = $('#add-due').val()
  const status = 'not finished'

  $.ajax({
    url: `${baseUrl}/todos/`,
    method:'POST',
    headers: {
      token:localStorage.token
    },
    data: {
      title,
      description,
      due_date,
      status
    }
  })
  .done(() => {
    fetchTodo()
    $('#home-page').show()
    $('#add-page').hide()
    showSuccessMessage('Task has been created')
  })
  .fail(err => {
    console.log(err.responseJSON.errors)
  })
  .always (() => {
    $('#add-title').val('')
    $('#add-description').val('')
    $('#add-due').val('')
  })
}

// Update Status

function updateStatus(id, status) {
  $.ajax({
    url: `${baseUrl}/todos/${id}`,
    method: "patch",
    headers: {
      token: localStorage.token 
    },
    data: {
      status
    }
  })
  .done(data => {
    showSuccessMessage('Successfully Updated!')
    fetchTodo()
  })
  .fail(err => {
    showErrorToastMessage(err.responseJSON.errors.join('\n'))
  })
}

//Edit Form

function editPage(id, title, description, status, due_date) {
  $('#home-page').hide()
  $('#edit-page').show()
  globalTodoId = id
  $('#edit-title').val(title)
  $('#edit-description').val(description)
  $('#edit-due').val(new Date(due_date).toISOString().slice(0,10))
  $('#edit-status').val(status) 
}



// Update
function editTask(event) {
  event.preventDefault()
  const title = $('#edit-title').val()
  const description = $('#edit-description').val()
  const due_date = $('#edit-due').val()
  const status = $('#edit-status').val()
  $.ajax({
    url: `${baseUrl}/todos/${globalTodoId}`,
    method: "PUT",
    headers: {
      token: localStorage.token 
    },
    data: {
      title,
      description,
      due_date,
      status
    }
  })
  .done(data => {
    $('#edit-title').val('')
    $('#edit-description').val('')
    $('#edit-due').val('')
    $('#edt-status').val('')
    showSuccessMessage('Woohoo! Successfully Updated!')
    hideEditForm()
    fetchTodo()
  })
  .fail(err => {
    showErrorToastMessage(err.responseJSON.errors.join('\n'))
  })
}

function hideEditForm(event) {
  if (event) event.preventDefault()
  $('#edit-page').hide()
  $('#add-page').show()
}

//DELETE To Do

function deleteToDo(id) {
  Swal.fire({
    title: 'Oops! Are you sure?',
    text: "You won't be able to see this task again!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete!'
  })
  .then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: `${baseUrl}/todos/${id}`,
        method: "delete",
        headers: {
          token: localStorage.token 
        },
        data: {
          status
        }
      })
      .done(data => {
        Swal.fire(
          'Deleted!',
          'Successfully deleted!',
          'success'
        )
        fetchTodo()
      })
      .fail(err => {
        showErrorToastMessage(err.responseJSON.errors.join('\n'))
      })
    }
  })  
}


function getWeather() {
  $.ajax({
    url: `${baseUrl}/weathers/`,
    method: 'GET',

  })
  .done(data => {
    $("#icon").empty();
    const condition = data.weatherData.weather[0].main;
    const temperature = Math.floor((Number(data.weatherData.main.temp) - 270 )).toString() + '°C';
    const wind = (data.weatherData.wind.speed).toString() + 'm/s';
    const location = data.weatherData.name;
    const icon = data.weatherData.weather[0].icon

    //$("#condition").text(condition)
    $("#temperature").text(temperature)
    $("#wind").text(`Wind speed:${wind}`)
    $("#location").text(`Welcome to ${location}`)
    //
    $("#icon").prepend(`<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="">
    <h4 id="condition"> ${condition}</h4> `)
  })
  .fail(err => {
    showErrorToastMessage(err.responseJSON.errors.join('\n'))
  })
}
