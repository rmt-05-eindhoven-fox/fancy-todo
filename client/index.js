// let tog = true

// $("#btn-click").on("click", () => {
//   console.log('button clicked')
//   tog = !tog
//   if(tog) $("#p1").show()
//   else {
//     $("#p1").hide()
//   }
// })

const SERVER = "http://localhost:3000"

$(document).ready(() => {
  const token = localStorage.getItem('token')
  console.log(token)
  if(token){
    $("#home").show()
    $("#login").hide()
    $("#register").hide()
    getTodo()
    // showAllTodos()
  } else {
    $("#home").hide()
    $("#login").show()
  }

  $("#logout").on("click", () => {
    logout()
  })
})

function register(event) {
  event.preventDefault()
  console.log('register')
  const email = $("#register-email").val()
  const password = $("#register-password").val()

  console.log(email, password)
  $.ajax({
    method: "POST",
    url: SERVER + "/register", 
    data: {
      email,
      password,
    }
  }).done(response => {
    $("#register").hide()
    console.log(response)
  }).fail(err => {
    console.log(err)
  })
}

function login(event) {
  event.preventDefault()
  console.log('login')
  const email = $("#login-email").val()
  const password = $("#login-password").val()

  console.log(email, password)
  $.ajax({
    method: "POST",
    url: SERVER + "/login", 
    data: {
      email,
      password,
    }
  }).done(response => {
    const token = response.access_token
    localStorage.setItem('token', token)
    // console.log(response)
    $("#login").hide()
    $("#register").hide()
    $("#home").show()
    $("#login-email").val("")
    $("#login-password").val("")
    getTodo()
    // showAllTodos()

  }).fail(err => {
    console.log(err)
  })
}

function logout() {
  $("#home").hide()
  $("#login").show()
  localStorage.removeItem("token")
}

function getTodo() {
  const token = localStorage.getItem("token")
  $.ajax({
    method: "GET",
    url: SERVER + `/todos/`,
    headers: {
      token: token
    }
  }).done(response => {
    let todo;

    for (let i= 0; i< response.length; i++) {
      let todo = response[i]
      let due_date = new Date(response[i].due_date.toString().slice(0, 10)).toDateString()

      $("#todo").append(`

      <div class="col my-2 p-3 card">
      <p><strong>Title</strong>: ${todo.title}</p>
      <p><strong>Description</strong>: ${todo.description}</p>
      <p><strong>Status</strong>: ${todo.status}</p>
      <p><strong>Due date</strong>: ${due_date}</p>
      <hr/>
      <div class="d-flex justify-content-between">
      <button class="btn text-danger" onclick="deleteTodo(${todo.id})">Delete task</button>
      </div>
      
      `)
      todo = response[i+1]
    }
    console.log(response)
  }).fail(err => {
    console.log(err)
  })
}

function addTodo(event) {
  event.preventDefault()
  console.log('add todo')
  const token = localStorage.getItem("token")
  const title = $("#todo-title").val()
  const description= $("#todo-description").val()
  const status= $("#todo-status").val()
  const due_date= $("#todo-due_date").val()


  $.ajax({
    method: "POST",
    url: SERVER + "/todos",
    headers: {
      token: token
    }, 
    data: {
      title,
      description,
      status,
      due_date
    }
  }).done(response => {
    // console.log(response)
    $("#home").show()
  }).fail(err => {
    console.log(err)
  })
}

function deleteTodo(id) {
  // event.preventDefault()
  const token = localStorage.getItem("token")

  $.ajax({
    method: "DELETE",
    url: SERVER + `/todos/${id}`,
    id: id,
    headers: {
      token
    }
  })
}