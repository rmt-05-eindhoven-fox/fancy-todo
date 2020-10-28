const server = "http://localhost:3000"

$(document).ready(() => {
   const token = localStorage.getItem("token")
   if (token) {
      $("#homepage").show()
      $("#login").hide()
      getAllTodos()
   } else {
      $("#homepage").hide()
      $("#login").show()
   }

   $("#btn-logout").on("click", function () {
      logout()
   })
})

login = (event) => {
   event.preventDefault()
   // console.log("login");
   const email = $("#login-email").val()
   const password = $("#login-password").val()
   // console.log(email, password);

   $.ajax({
         type: "POST",
         url: server + "/login",
         data: {
            email,
            password
         },
      }).done(res => {
         const token = res.access_token
         localStorage.setItem('token', token)
         $("#homepage").show()
         $("#login").hide()

         $("#login-email").val("")
         $("#login-password").val("")
         getAllTodos()
      })
      .fail(err => {
         console.log(err);
      })
}

logout = () => {
   $("#homepage").hide()
   $("#login").show()
   localStorage.removeItem("token")
}

getAllTodos = () => {
   const token = localStorage.getItem("token")
   $.ajax({
      type: "GET",
      url: server + "/todos",
      headers: {
         token
      },
   }).done(todos => {
     if(todos.length === 0) {
      $("#todo-list").append(`
         // add celebratory message here
      `)
     }
     else {
      todos.forEach(todo => {
         $("#todo-list").append(`
         <div class="card" style="width: 25rem;">
            <div class="card-body">
               <h5 class="card-title">${todo.title}</h5>
               <h6 class="card-subtitle mb-2 text-muted">${formatDate(todo.due_date)}</h6>
               <p class="card-text">${todo.description}</p>
               <button id="btn-edit" type="button" class="btn btn-outline-warning">Edit</button>
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
      getAllTodos()
   })
   .fail(err => {
      console.log(err);
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