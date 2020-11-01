const SERVER ="http://localhost:3000"

$(document).ready(function () {
    const token = localStorage.getItem("access_token")
    if (token) {
        $("#content").show()
        $("#landing").hide()
        fetchTodo()
        homepage()
        $("#quote").empty()
       
    } else {
        $("#content").hide()
        $("#landing").show()
    }
})

function tologin(){
  $(".error-message").empty();
  $("#register").hide()
  $("#landing").show()
}

function login(e){
  e.preventDefault()
  const email = $('#login-email').val()
  const password = $('#login-password').val()
  $(".error-message").empty();
  $.ajax({
    method: "POST", 
    url: SERVER + "/login",
    data: {
      email,
      password
    }
  })
  .done(response => {
    const token = response.access_token
    const first_name = response.first_name;
    localStorage.setItem("access_token", token)
    localStorage.setItem("first_name", first_name);
    $("#landing").hide()
    $("#content").show()
    $("#register").trigger("reset")
    fetchTodo()
    homepage()
  })
  .fail(err => {
    $(".error-message").empty();
    $(".error-message").append(`
      <p class="alert alert-danger" role="alert" style="color: red;">${err.responseJSON.error}</p>
    `)
    setTimeout(() => {
      $(".error-message").empty();
    }, 3000)
  })
}



function register(e){
  e.preventDefault()
  const email = $('#register-email').val()
  const password = $('#register-password').val()
  const first_name= $('#first_name').val()
  const last_name= $('#last_name').val()
  $(".error-message").empty();
  $.ajax({
    method: "POST", 
    url: SERVER + "/register",
    data: {
      email,
      password,
      first_name,
      last_name,
    }
  })
  .done(response => {
    $("#register").hide()
    $("#landing").show()
    $("#register").trigger("reset")
  })
  .fail(err => {
    $(".error-message").empty();
    $(".error-message").append(`
      <p class="alert alert-danger" role="alert" style="color: red;">${err.responseJSON.error}</p>
    `)
    setTimeout(() => {
      $(".error-message").empty();
    }, 3000)
  })
}

function toRegister(){
  $(".error-message").empty();
  $("#register").show()
  $("#landing").hide()
}

function onSignIn(googleUser) {
  var google_access_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method:'POST',
    url:SERVER+ '/googleLogin',
    data:{
        google_access_token
    }
  }) 
  .done(response => {
    // console.log(response.access_token)
    localStorage.setItem("access_token", response.access_token)
    localStorage.setItem("first_name", response.first_name)
    $("#content").show()
    $("#landing").hide()
    fetchTodo()
    homepage()
  })
  .fail(err => {
      console.log(err)
  })
}


function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function logout(){
  $("#landing").show();
  $("#content").hide();
  $("#login").trigger("reset")
  $(".error-message").empty();
  signOut()
  localStorage.clear()
}

function fetchTodo(){
  $(".error-message").empty();
  const token = localStorage.getItem("access_token")
  $.ajax({
    method:"get",
    url: SERVER + "/todos",
    headers:{
      token
    }
  })
  .done(data => {
    $('#homepage').hide()
    $('#todolist').show()
    $('#project').hide()
    $("#todolist").empty()
    data.forEach(el => {
      let status
      if(el.status === false){
        status = "Not Done"
        $("#todolist").append(`
        <div class="card text-white bg-dark mb-3 col-3 mx-2" style="max-width: 18rem;">
                <div class="card-header">${el.title}</div>
                <div class="card-body">
                  <h5 class="card-title btn btn-danger">${status}</h5>
                  <p class="card-text" style="font-size:20px;">${el.description}</p>
                  <hr>
                  <p class="card-text" style="font-size:14px;">${el.due_date.slice(0,10)}</p>
                </div>
                <button onclick="if(confirm('Are you sure to delete this todo?')){deletetodo(${el.id})}else{return false};" class="btn btn-warning">delete</button>
                <button onclick="toedit(${el.id})" class="btn btn-primary">edit</button>
                <button onclick="markasdone(${el.id})" class="btn btn-success">mark as done</button>
              </div>
        `)
      }else{
        status = "Done"
        $("#todolist").append(`
        <div class="card text-white bg-dark mb-3 col-3 mx-2" style="max-width: 18rem;">
                <div class="card-header">${el.title}</div>
                <div class="card-body">
                  <h5 class="card-title btn btn-primary">${status}</h5>
                  <p class="card-text">${el.description}</p>
                  <hr>
                  <p class="card-text" style="font-size:14px;">${el.due_date.slice(0,10)}</p>
                </div>
                <button onclick="if(confirm('Are you sure to delete this todo?')){deletetodo(${el.id})}else{return false};" class="btn btn-warning">delete</button>
                <button onclick="toedit(${el.id})" class="btn btn-primary">edit</button>
                <button onclick="markasdone(${el.id})" class="btn btn-success">mark as done</button>
              </div>
        `)
      }
     
    })
    
  })
}

function addtodo(e){
  e.preventDefault()
  $(".error-message").empty();
  const token = localStorage.getItem("access_token")
  const title = $("#title").val()
  const description = $("#description").val()
  const due_date = $("#due_date").val()

  $.ajax({
    method:"post",
    url:SERVER + "/todos",
    headers:{
      token
    },
    data:{
      title,
      description,
      due_date
    }
  })
  .done(() => {
    console.log("Success Input Todo")
    fetchTodo()
    $("#addtodoform").trigger("reset")
  })
  .fail(err => {
    $(".error-message").empty();
      console.log(err)
      $(".error-message").append(`
        <p class="alert alert-danger" role="alert" style="color: red;font-size:17px;">${err.responseJSON.error}</p>
      `);
      setTimeout(() => {
        $(".error-message").empty();
      }, 5000)
    })
  }

function deletetodo(id){
  const token = localStorage.getItem("access_token")
  $.ajax({
    method:"delete",
    url:SERVER + `/todos/${id}`,
    headers:{
      token
    }
  })
  .done(() => {
    console.log("Success Deleting Todos")
    fetchTodo()
  })
  .fail(err => {
    console.log(err)
  })
}
$('#add').click(function() {
  $('#exampleModalLong').modal('hide');
});


function edittodo(e,id){
  e.preventDefault()
  const token = localStorage.getItem("access_token")
  const title = $("#title_edit").val()
  const description = $("#description_edit").val()
  const status = $("#status_edit").val()
  const due_date = $("#due_date_edit").val()

  $.ajax({
    method:"put",
    url:SERVER + `/todos/${id}`,
    headers:{
      token
    },
    data:{
      title,
      description,
      status,
      due_date
    }
  })
  .done(() => {
    console.log("Success edit Todos")
    $("#todolist").show()
    $("#editform").hide()
    fetchTodo()
  })
  .fail(err => {
    $(".error-message").empty();
    $(".error-message").append(`
      <p class="alert alert-danger" role="alert" style="color: red;font-size:17px;">${err.responseJSON.error}</p><br>
    `)
    setTimeout(() => {
      $(".error-message").empty();
    }, 3000)
  })
}

$('#editbutton').click(function() {
  $('#modaledit').modal('show');
});


function toedit(id){
  $("#todolist").hide()
  editform(id)
  $("#editform").show()
}

function editform(id){
  const token = localStorage.getItem("access_token")
  $("#editform").empty()
  $.ajax({
    method:"get",
    url:SERVER + `/todos/${id}`,
    headers:{
      token
    }
  })
  .done(data => {
    if(data.status === true){
    $("#editform").append(`
        <form id="addtodoform" onsubmit="edittodo(event,${id})">
          <div class="form-group">
            <label for="title">Title</label>
            <input id="title_edit" class="form-control" value="${data.title}" type="text">
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <input id="description_edit" value="${data.description}" class="form-control" type="text">
          </div>
          <div class="form-group">
          <label for="due_date">Status</label>
          <select id="status_edit" class="form-control">
            <option value="true" selected>Done</option>
            <option value="false">Not Done</option>
          </select>
          </div>
          <div class="form-group">
            <label for="due_date">Due Date</label>
            <input id="due_date_edit" class="form-control" value="${data.due_date.split("T")[0].toString()}" type="date">
          </div>
          <span class="btn btn-secondary" onclick="closeedit()">Close</span>
          <button type="submit" class="btn btn-primary">Save changes</button>
        </form>
    `)
    }else{
      $("#editform").append(`
        <form id="addtodoform" onsubmit="edittodo(event,${id})">
          <div class="form-group">
            <label for="title">Title</label>
            <input id="title_edit" class="form-control" value="${data.title}" type="text">
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <input id="description_edit" value="${data.description}" class="form-control" type="text">
          </div>
          <div class="form-group">
          <label for="due_date">Status</label>
          <select id="status_edit" class="form-control">
            <option value="true">Done</option>
            <option value="false" selected>Not Done</option>
          </select>
          </div>
          <div class="form-group">
            <label for="due_date">Due Date</label>
            <input id="due_date_edit" class="form-control" value="${data.due_date.split("T")[0].toString()}" type="date">
          </div>
          <span class="btn btn-secondary" onclick="closeedit()">Close</span>
          <button type="submit" class="btn btn-primary">Save changes</button>
        </form>
    `)
    }
  })
  .fail(err => {
    console.log(err)
  }) 
}
function closeedit(){
  $("#editform").hide()
  $("#todolist").show()
  fetchTodo()
}

function markasdone(id){
  const token = localStorage.getItem("access_token")
  const status = true
  $.ajax({
    method:"patch",
    url:SERVER + `/todos/${id}`,
    headers:{
      token
    },
    data:{
      status
    }
  })
  .done(() => {
    fetchTodo()
  })
  .fail(err => {
    console.log(err)
  })
}

// function fetchProject(){
//   const token = localStorage.getItem("access_token")
//   $.ajax({
//     // method:get
//   })
// }
function homepage(){
  $('#todolist').hide()
  $('#project').hide()
  const first_name = localStorage.getItem("first_name")
  
  // window.setInterval(, 1000);
  $("#home").empty()
  $("#home").append(`
    <div class="container-fluid justify-content-center" style="height=100vh">
    <div class="row">
    <div class="col-4">
      <h1>Hello, ${first_name}!</h1>
      <span class="time" style="pointer-events: none;"></div>
    </div>
    </div>
    </div>
  `)
  time()
  window.setInterval(time, 1000);
}

function time(){
  let today = new Date();
  let minutes,seconds
  if(today.getMinutes() < 10){
    minutes = "0" + today.getMinutes()
  }else{
    minutes = today.getMinutes()
  }
  if(today.getSeconds() < 10){
    seconds = "0" + today.getSeconds()
  }else{
    seconds = today.getSeconds()
  }
  let time = today.getHours() + ":" + minutes + ":" + seconds
  $(".time").empty()
  $(".time").append(`
    ${time}
  `)
}

function getquote(){
  const first_name = localStorage.getItem("first_name")
  const token = localStorage.getItem("access_token")
  $.ajax({
    method:"get",
    url: SERVER + "/quote",
    headers:{
      token
    }
  })
  .done(data => {
    $("#quote").empty()
    $("#quote").append(`
    <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLongTitle">For ${first_name}</h3>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div id="quote" class="modal-body">
        ${data}
      </div>
    `)
  })
  .fail(err => {
    console.log(err)
  })
}