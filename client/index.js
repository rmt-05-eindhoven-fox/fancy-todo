const SERVER = "http://localhost:3000"

$(document).ready(() => {
  checkLogin();
})

$("#logout").on("click", ()=>{
  logout();
})

function checkLogin(){
  const token = localStorage.getItem("token");
  console.log(token);
  if(token){
    $("#Home-page").show();
    $("#Login-page").hide();
    $("#Register-page").hide();
    getQuotes();
    getTodos();
  }
  else{
    $("#Login-page").show();
    $("#Home-page").hide();
    $("#Register-page").hide();
  }
}

function login(e){
  e.preventDefault();
  const username = $("#login-username").val();
  const password = $("#login-password").val();

  console.log(`username: ${username}, password : ${password}`);

  $.ajax({
    method: "POST",
    url: SERVER + "/login",
    data: {
      email: username,
      password
    }
  })
  .done(response => {
    localStorage.setItem("token", response);
    checkLogin()
  })
  .fail(err => {
    // showErrorMessage(err.errors.message);
    console.log(err.responseText)
  })
  .always(()=>{
    $("#login-username").val("");
    $("#login-password").val("");
  })
}

function logout(){
  localStorage.removeItem("token");
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
  console.log('User signed out.')});
  checkLogin();
}

function register(e){
  e.preventDefault();
  const username = $("#register-username").val();
  const password = $("#register-password").val();

  console.log(`username: ${username}, password : ${password}`);

  $.ajax({
    method: "POST",
    url: SERVER + "/register",
    data: {
      email: username,
      password
    }
  })

  .done(response => {
    console.log("User berhasil di buat!!");
    toLoginPage();
  })
  .fail(err => {
    // showErrorMessage(err);
    console.log(err.responseText)
  })

}

function toRegisterPage(){
  $("#Login-page").hide();
  $("#Register-page").show();
  $("#Home-page").hide();
}

function toLoginPage(){
  $("#Login-page").show();
  $("#Home-page").hide();
  $("#Register-page").hide();
}

function getQuotes(){
  $.ajax({
    method: "GET",
    url: SERVER + "/quotes",
    headers: {
      token: localStorage.token
    }
  })
  .done(response =>{
    $("#block-quotes").empty();
    $("#block-quotes").append(`
    <p class="mb-0">${response.en}</p>
      <footer class="blockquote-footer">${response.author}
    `)
  })
  .fail(err => {
    console.log(err);
  })
}

function getTodos(){
  $.ajax({
    method: "GET",
    url: SERVER + "/todos",
    headers: {
      token: localStorage.token
    }
  })
  .done(response => {
    console.log(response);
    $("#todo-card").empty();
    response.forEach(el => {
      let date = new Date(el.due_date);
      let tanggal = date.getDate();
      let bulan = date.getMonth();
      let tahun = date.getFullYear();
      if(tanggal < 10){
        tanggal = "0" + tanggal;
      }
      if(bulan < 10){
        bulan = "0" + bulan;
      }
      let newDate = `${tahun}-${bulan}-${tanggal}`;
      $("#todo-card").append(`
        <div class="card">
          <div class="card-header">
            <h3>Title: ${el.title}</h3>
          </div>
          <div class="card-body">
            <blockquote class="blockquote mb-0">
              <p>Description: ${el.description}</p>
              <p>Status: ${el.status}</p>
              <p>Due Date: ${newDate}</p>
              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-edit-todos${el.id}">Edit</button>
                <div class="modal fade" id="modal-edit-todos${el.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Edit Todos</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                       </button>
                      </div>
                      <form onsubmit="editTodos(${el.id})">
                        <div class="modal-body">
                          <div class="form-group">
                            <label for="edit-title${el.id}">Title</label>
                            <input type="text" class="form-control" id="edit-title${el.id}" value="${el.title}">
                          </div>
                          <div class="form-group">
                            <label for="edit-description${el.id}">Description</label>
                            <input type="text" class="form-control" id="edit-description${el.id}" value="${el.description}">
                          </div>
                          <div class="form-group">
                            <label for="edit-duedate${el.id}">Due Date</label>
                            <input type="date" class="form-control" id="edit-duedate${el.id}" value="${newDate}">
                          </div>
                          <div class="form-group">
                          <label for="edit-status${el.id}">Status</label>
                          <select class="form-control" id="edit-status${el.id}">
                            <option ${el.status === "Uncompleted" ? 'selected': "" }>Uncompleted</option>
                            <option ${el.status === "Completed" ? 'selected': ""}>Completed</option>
                          </select>
                        </div>
                        </div>
                        <div class="modal-footer">
                          <button type="submit" class="btn btn-primary">Edit Todo</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              <button class="btn btn-primary" onclick="deleteTodos(${el.id})">Delete</button>
            </blockquote>
          </div>
        </div>
      `)
    });
  })
  .fail(err => {
    console.log(err);
  })
}

function deleteTodos(id){
  console.log(id)
  $.ajax({
    method: "DELETE",
    url: SERVER + `/todos/${id}`,
    headers: {
      token: localStorage.token
    }
  })
  .done(response=>{
    console.log(response)
    checkLogin();
  })
  .fail(err=>{
    console.log(err);
  })
}

function addTodos(){
  const title = $("#add-title").val();
  const description = $("#add-description").val();
  const due_date = $("#add-duedate").val();
  // due_date = new Date(due_date);
  console.log(title, description, due_date)
  $.ajax({
    method: "POST",
    url: SERVER + '/todos',
    data: {
      title,
      description,
      due_date
    },
    headers:{
      token: localStorage.token
    }
  })
  .done(response=>{
    console.log(response);
    checkLogin();
  })
  .fail(err=> {
    console.log(err);
  })
}

function editTodos(id){
  const title = $(`#edit-title${id}`).val();
  const description = $(`#edit-description${id}`).val();
  const due_date = $(`#edit-duedate${id}`).val();
  const status = $(`#edit-status${id}`).val();
  console.log(title, description, due_date, status);
  $.ajax({
    method: "PUT",
    url: SERVER + `/todos/${id}`,
    headers: {
      token: localStorage.token
    },
    data:{
      title,
      description,
      due_date,
      status
    }
  })
  .done(response=>{
    console.log(response);
    checkLogin();
  })
  .fail(err => {
    console.log(err);
  })
}

function onSignIn(googleUser) {
  // var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  let google_access_token = googleUser.getAuthResponse().id_token;
  console.log(google_access_token);

  $.ajax({
    method: "POST",
    url: SERVER + "/googleLogin",
    data:{
      google_access_token
    }
  })
  .done(response => {
    console.log(response);
    localStorage.setItem("token", response);
    checkLogin();
  })
  .fail(err => {
    console.log(err);
  })
}
//Alert

// function showSuccessMessage(message) {
//   Swal.fire({
//     position: 'top',
//     icon: 'success',
//     toast: true,
//     title: message,
//     showConfirmButton: false,
//     timer: 2000
//   })
// }

// function showErrorMessage(message) {
//   Swal.fire({
//     position: 'top',
//     icon: 'success',
//     toast: true,
//     title: message,
//     showConfirmButton: false,
//     timer: 3000
//   })
// }