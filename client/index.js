const SERVER = 'http://localhost:3000'

$(document).ready(function() {
  const token = localStorage.getItem('token')
  
  if(token){
    
    afterLogin()
    
  } else {
    
    init()   
  }

})

function init() {

  $('#error').hide()
  $('#success').hide()
  $('#page_home').hide()
  $('#page_register').hide()
  $('#navbar').hide()

  $('#page_login').show()

}

function afterLogin() {
  $('#city').val('jakarta')
  $('#success').hide()
  $('#error').hide()
  $('#page_register').hide()
  $('#page_login').hide()

  $('#page_home').show()
  $('#navbar').show()

  getAllTodo()
  userSummary()
  getWeatherOnLocation()


}

function afterLogout() {
  $('#page_register').hide()
  $('#page_home').hide()
  $('#navbar').hide()

  $('#page_login').show()
}


function login(e) {
  console.log('user signed in')
  e.preventDefault()
  let email = $("#login-email").val()
  let password = $("#login-password").val()
  
  $.ajax({
    method : 'POST',
    url : SERVER + `/login`,
    data : {
      email,password
    }
  })
  .done(response => {
    const token = response.token
    localStorage.setItem('token', token)
    afterLogin()

  })
  .fail(error => {
    showError(error.responseJSON.message)
  })
  .always(_=>{
    $("#login-email").val('')
    $("#login-password").val('')
  })

}

function onSignIn(googleUser) {
  console.log('google sign in')
  let google_access_token = googleUser.getAuthResponse().id_token;

  $.ajax({
    method : 'POST',
    url : SERVER + `/googleLogin`,
    headers : {
      google_access_token
    }
  }).done(response => {
    const token = response.token
    localStorage.setItem('token', token)
    afterLogin()

  }).fail(error => {
    showError(error.responseJSON.message)
  })

}


function register(e) {
  e.preventDefault()
  let email = $("#register-email").val()
  let password = $("#register-password").val()
  // console.log(email, password)
  
  $.ajax({
    method : 'POST',
    url : SERVER + `/register`,
    data : {
      email,password
    }
  })
  .done(response => {
    showSuccess('Registration Successfull')
    toggleReg()
  })
  .fail(error => {
    showError(error.responseJSON.message)
  })
  .always(_=>{
    $("#register-email").val('')
    $("#register-password").val('')
  })
}

function showError(message) {
  $('#error').empty()
  $('#error').show()

  if(Array.isArray(message)){
    $('#error').append(`
      ${message.join(', ')}
    `)
  } else {
    $('#error').append(`
      ${message}
    `)
  }

  setInterval(function(){
    $('#error').hide() 
    }, 5000);

}

function showSuccess(message) {
  $('#success').empty()
  $('#success').show()

  if(Array.isArray(message)){
    $('#success').append(`
      ${message.join(', ')}
    `)
  } else {
    $('#success').append(`
      ${message}
    `)
  }

  setInterval(function(){
    $('#success').hide() 
    }, 5000);

}

function editTodo(todoId) {
  const token = localStorage.getItem('token')

  $.ajax({
    method : 'GET',
    url : SERVER + `/todos/${todoId}`,
    headers : {
      token
    }
  })
  .done(response => {

    $('#formEditTodo_id').val(`${todoId}`)
    $('#formEditTodo_title').val(`${response.title}`)
    $('#formEditTodo_description').val(`${response.description}`)
    $('#formEditTodo_due_date').val(`${response.due_date}`)

    
    // $('#formEditTodo_due_date').val(`2020-10-10`)
    
    $('#modal_editTodo').modal()

  })
  .fail(error => {
    showError(error.responseJSON.message)
  })
  .always(_=> {

  })
}

function userSummary(done, notDone){
  $('#user-summary').empty()
  if(done > 0 || notDone > 0){
    if(notDone > 0){
      if(notDone > 1){
        $('#user-summary').append(`
        <li><h5>${notDone} tasks to do</h5></li>
        `)
      } else {
        $('#user-summary').append(`
        <li><h5>${notDone} task to do</h5></li>
      `)
      }
    }

    if(done > 0){
      if(done > 1){
        $('#user-summary').append(`
        <li><h5>Done ${done} tasks</h5></li>
        `)

      } else {
        $('#user-summary').append(`
        <li><h5>Done ${done} task</h5></li>
        `)
      }
    }
    
  } else {
    $('#user-summary').append(`
        <li><h5>No tasks</h5></li>
    `)
  }
}


function getAllTodo() {
  $('#error').hide()

  const token = localStorage.getItem('token')
  $.ajax({
    method : 'GET',
    url : SERVER + `/todos`,
    headers : {
      token
    }
  })
  .done(response => {
    // console.log(response)
    $('#content-todo').empty()
    $('#content-todo-done').empty()
    
    let doneCounter = 0;
    let notDoneCounter = 0;

    if(response.length > 0){
      

      response.forEach(todo => {
      let projectName = '';

      if(todo.Project){
        projectName = todo.Project.name
      }
      if(todo.status !== "Done"){
        notDoneCounter ++

        $('#content-todo').append(`
        `)
        
        $('#content-todo').append(`
          <div class="card mb-2 mr-2 todo-card">
          <div class="card-body">
          <h5 class="card-title">${todo.title}</h5>
          <span class="badge badge-pill badge-info">${projectName}</span>

        <hr>
          <p class="card-text">${todo.description}</p>
          <p class="card-text"><b>Due on :</b> ${todo.due_date_words}</p>
          </div>
          <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-light" onclick="editTodo(${todo.id}); getAllProjects('#formEditTodo_project')">Edit</button>
          <button type="button" class="btn btn-outline-success" onclick="markAsDone(${todo.id}, 'Done')">Done</button>
          </div>
          </div>
        `)

      } else {
        doneCounter++

        $('#content-todo-done').append(`
        <div class="card mb-1 mr-2 todo-card todo-card-done">
        <div class="card-body">
        <h5 class="card-title">${todo.title}</h5> 
        
        </div>
        
          <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-danger" onclick="deleteToDo(${todo.id})">Delete</button>
          <button type="button" class="btn btn-light" onclick="markAsDone(${todo.id}, 'Not Done')">Not Done</button>
          </div>
          </div>
        `)
      }

      })

      userSummary(doneCounter, notDoneCounter)


    } else {
      $('#content-todo').append(`
      <div class="card mb-3" >
      <div class="card-body">
        <h5 class="card-title">You have nothing to do!</h5>
        <hr>
        <a href="#" onclick="$('#modal_addTodo').modal('toggle')
        " class="card-link">Add New Todo</a>
      </div>
    </div>
      `)
    }

  })
  .fail(error => {
    showError(error.responseJSON.message)
  })
}

// function testAppend(formName) {

//   $(formName).append(`
//   <option>Hello</option>
//   `)
// }

function deleteProject(){
  let projectId = $('#formDelete_project').val()
  let token = localStorage.getItem('token')

  if(projectId === "none") projectId = -1

  $.ajax({
    method : 'DELETE',
    url : SERVER + `/projects/${projectId}`,
    headers : {
      token
    }
  })
  .done(_=> {
    showSuccess('Project Successfully deleted')
    getAllTodo()
  })
  .fail(error => {
    showError(error.responseJSON.message)
  })
  .always(_=> {
    $('#modal_deleteProject').modal('toggle')

  })
}

function getAllProjects(formName) {

  const token = localStorage.getItem('token')
  console.log(formName)
  $.ajax({
    method : 'GET',
    url : SERVER + `/projects`,
    headers : {
      token
    }
  })
  .done(response => {
    const data = response.data

    if(!formName){

      console.log (data)
    } else {
  
      $(formName).empty()
      $(formName).append(`
      <option selected value="none">-- Select Project --</option>
      `)

      data.forEach(datum => {

        console.log(datum.name)

        $(formName).append(`
        <option value = ${datum.id}>${datum.name}</option>
        `)
      
      })
      // <option value="${datum.id}">${datum.name}</option>

    }

  })
  .fail(error => {
    showError(error.responseJSON.message)
  })
}

function postNewProject() {
  
  let name = $('#formProject_name').val()
  const token = localStorage.getItem('token')

  $.ajax({
    method : 'POST',
    url : SERVER + `/projects`,
    headers : {
      token
    },
    data : {
      name
    }
  })
  .done(_ => {
    console.log("success")
    $('#modal_addProject').modal('toggle')
    getAllTodo()
  })
  .fail(error => {

    $('#modal_addProject').modal('toggle')
    showError(error.responseJSON.message)
  })
  .always(_=> {
    emptyAllForms()

  })
}

function postNewTodo() {
  $('#error').hide()
  
  let title = $('#formTodo_title').val()
  let description = $('#formTodo_description').val()
  let due_date = new Date($('#formTodo_due_date').val())
  let ProjectId = $('#formTodo_project').val()
  const token = localStorage.getItem('token')

  $.ajax({
    method : 'POST',
    url : SERVER + `/todos`,
    headers : {
      token
    },
    data : {
      title,
      description,
      due_date,
      ProjectId
    }
  })
  .done(_ => {

    $('#modal_addTodo').modal('toggle')
    getAllTodo()
  })
  .fail(error => {

    $('#modal_addTodo').modal('toggle')
    showError(error.responseJSON.message)
  })
  .always(_=> {
    emptyAllForms()

  })
}


function postEditTodo() {
  
  let id = $('#formEditTodo_id').val()
  let title = $('#formEditTodo_title').val()
  let description = $('#formEditTodo_description').val()
  let ProjectId = $('#formEditTodo_project').val()
  let due_date = $('#formEditTodo_due_date').val()

  let token = localStorage.getItem('token')

  $.ajax({
    method : 'PUT',
    url : SERVER + `/todos/${id}`,
    headers : {
      token
    },
    data : {
      id, title, description, due_date, ProjectId
    }
  })
  .done(_=> {
    // modal close
    $('#modal_editTodo').modal('toggle')
    getAllTodo()

  })
  .fail (error => {
    $('#modal_editTodo').modal('toggle')
    showError(error.responseJSON.message)

  })
  .always(_ => {
    $('#modal_editTodo').modal('toggle')
    emptyAllForms()

  })
}

function markAsDone(todoId, status){
  
  let token = localStorage.getItem('token')

  $.ajax({
    method : 'PATCH',
    url : SERVER + `/todos/${todoId}`,
    headers : {
      token
    },
    data : {
      status
    } 
  })
  .done(_=> {
    getAllTodo()
  })
  .fail(error => {
    showError(error.responseJSON.message)
  })
}


function deleteToDo(todoId) {

  const token = localStorage.getItem('token')

  $.ajax({
    method : 'DELETE',
    url : SERVER + `/todos/${todoId}`,
    headers : {
      token
    }
  })
  .done(response => {
    getAllTodo()
    userSummary()
  })
  .fail(error => {
    showError(error.responseJSON.message)
  })
}


function getWeatherOnLocation(){
  //get location id
  //get weather
  let location = $('#city').val()
  const token = localStorage.getItem('token')
  if(!location){ location = "jakarta" }

  $.ajax({
    method : 'GET',
    url : SERVER + `/weather/${location}`,
    headers : {
      token
    }
  })
  .done(response => {
    $('#weather-content').empty()
    $('#weather-content').append(`
    <div class ="mx-auto mb-3 mt-4" style="width: fit-content;">
     <img src="https://www.metaweather.com/static/img/weather/png/64/${response.weather_state_abbr}.png">
    </div>
      <p style="text-align: center;">
        ${response.weather_state_name} in ${location[0].toUpperCase() + location.slice(1).toLowerCase()} <br>
        Min temp : ${Math.round(response.min_temp)} <br>
        Max temp : ${Math.round(response.max_temp)} 
      </p>
    `)
  })
  .fail(error => {
    showError(error.responseJSON.message)

  })

}

function toggleReg() {

  toggleVisible($('#page_register'))
  toggleVisible($('#page_login'))

}


function toggleVisible(selector) {
  if(selector.is(':visible')){
    selector.hide()
  } else {
    selector.show()
  }
}


function emptyAllForms(){

  $('#formTodo_title').val('')
  $('#formTodo_description').val('')
  $('#formTodo_due_date').val('')

  $('#formEditTodo_id').val('')
  $('#formEditTodo_title').val('')
  $('#formEditTodo_description').val('')
  $('#formEditTodo_due_date').val('')

  $('#formProject_name').val('')

}

function logout(e) {
  e.preventDefault()
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
  });

  localStorage.clear()
  afterLogout()
}