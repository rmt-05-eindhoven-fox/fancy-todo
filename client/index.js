const server = "http://localhost:3000"

$(document).ready(() => {
   const token = localStorage.getItem("token")
   $("#add-discord-username").hide()
   if (token) {
      $("#homepage").show()
      $("#login").hide()
      $("#register").hide()
      $("#nav-bar").show()
      getAllTodos()
   } else {
      $("#homepage").hide()
      $("#login").show()
      $("#register").hide()
      $("#nav-bar").hide()
   }

   $("#btn-add-discord").on("click", function () {
      $("#homepage").hide()
      $("#add-discord-username").show()
      $("#discord-add-form").show()
      $("#discord-add-success").hide()
   })

   $("#btn-logout").on("click", function () {
      logout()
   })

   $("#btn-register").on("click", function () {
      // registerForm()
      $("#login").hide()
      $("#register").show()
   })

   $("#btn-login").on("click", function () {
      $("#login").show()
      $("#register").hide()
   })
   
})

login = (event) => {
   event.preventDefault()
   // console.log("login");
   const email = $("#login-email").val()
   const password = $("#login-password").val()
   // console.log(email, password);
   $("#nav-bar").show()
   $.ajax({
         type: "POST",
         url: server + "/user/login",
         data: {
            email,
            password
         },
      }).done(res => {
         const token = res.access_token
         localStorage.setItem('token', token)
         $("#homepage").show()
         $("#login").hide()
         $("#register").hide()
         $("#login-email").val("")
         $("#login-password").val("")

         $("#btn-logout-google").hide()
         $("#btn-logout-normal").show()
         getAllTodos()

      })
      .fail(err => {
         $("#alert-message").empty()
         $("#alert-message").append(`
         <div class="alert alert-danger ">
            <strong>Error! ${err.responseJSON.error}</strong>.
         </div>   
         `)
         $("#homepage").hide()
         $("#navbar").hide()
         console.log(err);
      })
}

onSignIn = (googleUser) => {
   // $("#login").hide()

   var id_token = googleUser.getAuthResponse().id_token;
   
   $.ajax({
      method: "POST",
      url: server + "/user/googleLogin",
      data: {
         id_token
      },
   })
   .done(res => {
      const token = res.access_token
      localStorage.setItem('token', token)
      $("#homepage").show()
      $("#login").hide()
      $("#register").hide()
      $("#login-email").val("")
      $("#login-password").val("")

      $("#btn-logout-google").show()
      $("#btn-logout-normal").hide()
      $("#todo-list").empty()
      getAllTodos()
   })
   .fail(err => {
      console.log(err);
   })
}

addDiscordUsername = (event) => {
   event.preventDefault()
   // $("#add-discord-username").show()
   // $("#homepage").hide()
   // $("discord-add-form").show()
   // $("#discord-add-success").hide()
   const token = localStorage.getItem('token')
   const username = $("#discord-username").val()

   $.ajax({
      method: "PATCH",
      url: server + "/user/add-discord",
      data: {
         token,
         username
      },
   })
   .done(res => {
      $("#discord-add-form").hide()
      $("#alert-message-discord-sucess").empty()
      $("#alert-message-discord-sucess").append(`
         <div class="alert alert-success ">
            <strong>Congratulations!</strong>.
            <br>Your account is now integrated with Discord.
            <br>And you can click the link below to join our server to start getting reminder from our Bot.
         </div>

         
         <button type="button" class="btn btn-outline-success" onclick="backToHome()">Back To Homepage</button>
         <a target="_blank" style="margin-right: 30px;" class="btn btn-outline-info" href="https://discord.gg/s5kJQTzUJ2" role="button">Join Discord Server</a>
      `)
      $("#discord-add-success").show()
   })
   .catch(err => {
      $("#alert-message-discord").empty()
      $("#alert-message-discord").append(`
         <div class="alert alert-danger ">
            <strong>Error! ${err.responseJSON.error}</strong>.
         </div>   
      `)
      console.log(err);
   })
}

register = (event) => {
   event.preventDefault()
   const username = $("#register-username").val()
   const email = $("#register-email").val()
   const password = $("#register-password").val()
   // console.log(email, password);
   $.ajax({
         type: "POST",
         url: server + "/user/register",
         data: {
            username,
            email,
            password
         },
      }).done(res => {
         $("#sucessfull-register").append(`
            <div class="alert alert-success">
               <strong>Success!</strong> Indicates a successful or positive action.
            </div>
         `)
         $("#login").show()
         $("#register").hide()
      })
      .fail(err => {
         $("#alert-message-register").empty()
         $("#alert-message-register").append(`
         <div class="alert alert-danger ">
            <strong>Error! ${err.responseJSON.error}</strong>.
         </div>   
         `)
         console.log(err);
      })
}

logout = () => {
   $("#homepage").hide()
   $("#login").show()
   $("#todo-list").empty()
   $("#nav-bar").hide()
   localStorage.removeItem("token")

   var auth2 = gapi.auth2.getAuthInstance();
   auth2.signOut().then(function () {
      console.log('User signed out.');
   });
}

getAllTodos = () => {
   $("#btn-logout-normal").show()
   $("#todos").show()
   $("#discord").hide()
   $("#edit-todo-form").hide()
   // $("#edit-user-form").empty()
   $("#nav-bar").show()
   
   const token = localStorage.getItem("token")
   $.ajax({
         type: "GET",
         url: server + "/todos",
         headers: {
            token
         },
      }).done(todos => {
         if (todos.length === 0) {
            $("#todo-list").append(`
            <div class="alert alert-success alert-dismissible">
               <strong>Congratulations! You've cleared all your todo list</strong>.
               <br>You can add more todo by using create Todo menu in the right.
               <br>Or you can enjoy your well-deserved rest.
            </div>   
         `)
         } else {
            todos.forEach(todo => {
               $("#todo-list").append(`
               <div class="card" style="width: 25rem;">
                  <div class="card-body">
                     <h5 class="card-title">${todo.title}</h5>
                     <h6 class="card-subtitle mb-2 text-muted">${formatDate(todo.due_date)}</h6>
                     <p class="card-text">${todo.description}</p>
                     <button id="btn-edit" type="button" class="btn btn-outline-warning" onclick="editTodoForm(${todo.id})" >Edit</button>
                     <button id="btn-delete" type="button" class="btn btn-outline-danger" onclick="deleteTodo(${todo.id})">Delete</button>
                     <button id="btn-done" type="button" class="btn btn-outline-success" onclick="markAsDone(${todo.id})">Mark As Done</button>
                  </div>
               </div>
         `);
            });
         }
      })
      .fail(err => {
         console.log(err);
      })
}

editTodoForm = (id) => {
   $("#todos").hide()
   $("#edit-todo-form").empty()
   $("#edit-todo-form").show()
   const token = localStorage.getItem("token")
   $.ajax({
         type: "GET",
         url: server + `/todos/${id}`,
         headers: {
            token
         },
      }).done(res => {
         // console.log(res);
         $("#edit-todo-form").append(`
         <div class="card card-body">
            <div id="edit-alert-message">

            </div>
            <h1 style="text-align: center;">Edit Todo</h1>
            
            <form id="create-todo-form">
            <div class="form-group">
               <label for="todo-title">Todo Title</label>
               <input type="text" id="edit-todo-title" name="title" class="form-control" value="${res.title}"
                  placeholder="Todo Title" />
            </div>

            <div class="form-group">
               <label for="todo-description">Todo Description</label>
               <input type="text" id="edit-todo-description" name="description" class="form-control" value="${res.description}"
                  placeholder="Todo Description" />
            </div>

            <div class="form-group">
               <label for="todo-due_date">Todo Title</label>
               <input type="date" id="edit-todo-due_date" name="due_date" class="form-control" value="${formatDate(res.due_date)}"/>
            </div>
            
            <button id="btn-edit" type="button" class="btn btn-outline-warning" onclick="editTodoPost(${res.id})" >Edit</button>
            <button id="btn-delete" type="button" class="btn btn-outline-success" onclick="backToHome()">Cancel</button>

         </form>
         </div>
      `);
      })
      .fail(err => {
         console.log(err);
      })
}

editTodoPost = (id) => {
   const token = localStorage.getItem("token")

   $.ajax({
         type: "PUT",
         url: server + `/todos/${id}`,
         headers: {
            token
         },
         data: {
            title: `${$("#edit-todo-title").val()}`,
            description: `${$("#edit-todo-description").val()}`,
            due_date: `${$("#edit-todo-due_date").val()}`
         }
      }).done(res => {
         $("#todo-list").empty()
         getAllTodos()
      })
      .fail(err => {
         $("#edit-alert-message").empty()
         $("#edit-alert-message").append(`
         <div class="alert alert-danger ">
            <strong>Error! ${err.responseJSON.error}</strong>.
         </div>   
         `)
         console.log(err);
      })
}

deleteTodo = (id) => {
   const token = localStorage.getItem("token")

   $.ajax({
         method: "DELETE",
         url: server + `/todos/${id}`,
         headers: {
            token
         },
      }).done(res => {
         $("#todo-list").empty()
         getAllTodos()
      })
      .fail(err => {
         console.log(err);
      })

}

markAsDone = (id) => {
   const token = localStorage.getItem("token")

   $.ajax({
         method: "PATCH",
         url: server + `/todos/${id}`,
         headers: {
            token
         },
      }).done(res => {
         $("#todo-list").empty()
         getAllTodos()
      })
      .fail(err => {
         console.log(err);
      })
}

createTodo = (event) => {
   event.preventDefault()

   const token = localStorage.getItem("token")

   $.ajax({
         type: "POST",
         url: server + "/todos",
         headers: {
            token
         },
         data: {
            title: `${$("#todo-title").val()}`,
            description: `${$("#todo-description").val()}`,
            due_date: `${$("#todo-due_date").val()}`
         }
      }).done(res => {
         $("#todo-list").empty()
         $("#todo-description").val("")
         $("#todo-due_date").val("")
         $("#todo-title").val("")
         $("#alert-message").empty()
         getAllTodos()
      })
      .fail(err => {
         $("#alert-message-create-todo").empty()
         $("#alert-message-create-todo").append(`
         <div class="alert alert-danger ">
            <strong>Error! ${err.responseJSON.error}</strong>.
         </div>   
         `)
      })
}

formatDate = (date) => {
   var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

   if (month.length < 2)
      month = '0' + month;
   if (day.length < 2)
      day = '0' + day;

   return [year, month, day].join('-');
}

backToHome = () => {
   $("#todo-list").empty()
   $("#edit-todo-form").empty()
   $("#add-discord-username").hide()
   $("#homepage").show()
   getAllTodos()
}

// editUserInfoForm = () => {
//    $("#todos").hide()
//    $("#nav-bar").hide()
//    // $("#edit-todo-form").empty()
//    // $("#edit-todo-form").show()


//    const email = $("#login-email").val()
//    const token = localStorage.getItem('token')
//    $.ajax({
//       type: "GET",
//       url: server + `/check/${email}`,
//       headers: {
//          token
//       },
//    })
//    .done(userInfo => {
//       $("#edit-user-form").append(`
//          <div class="card card-body">
//             <h1 style="text-align: center;">Edit User Information</h1>

//             <form id="edit-todo-form">
//             <div class="form-group">
//                <label for="user-username">Discord Username</label>
//                <input type="text" id="edit-user-username" name="username" class="form-control" value="${userInfo.username}"
//                   placeholder="John#1234" />
//             </div>

//             <div class="form-group">
//                <label for="user-username">Email</label>
//                <input type="text" id="edit-user-email" name="description" class="form-control" value="${userInfo.email}"
//                   placeholder="johndoe@gmail.com" />
//             </div>

//             <div class="form-group">
//                <label for="user-password">Password</label>
//                <input type="text" id="edit-user-password" name="password" class="form-control"/>
//             </div>

//             <button id="btn-edit" type="button" class="btn btn-outline-warning" onclick="editUserPost(${userInfo.id})" >Edit</button>
//             <button id="btn-delete" type="button" class="btn btn-outline-success" onclick="backToHome()">Cancel</button>

//          </form>
//          </div>
//       `);
//    })
//    .fail(err => {
//       console.log(err);
//    })
// }

// editUserPost = (id) => {
//    const token = localStorage.getItem("token")

//    $.ajax({
//       type: "PUT",
//       url: server + `/check/${id}`,
//       headers: {
//          token
//       },
//       data: {
//          username: `${$("#edit-user-username").val()}`,
//          email: `${$("#edit-user-email").val()}`,
//          password: `${$("#edit-user-password").val()}`
//       }
//    }).done(res => {
//       $("#todo-list").empty()
//       getAllTodos()
//    })
//    .fail(err => {
//       console.log(err);
//    })
// }