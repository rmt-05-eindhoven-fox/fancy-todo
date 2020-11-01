const SERVER = "http://localhost:3000";

$(document).ready(function () {
  const token = localStorage.getItem("token");

  if (token) {
    $("#signin").hide();
    $("#signup").hide();
    $("#content").show();
    $("#logout").show();
    $("#editFormSection").hide();
    $("#addTodoForm").hide();
    fetchTodo();
    fetchManga();
  } else {
    $("#signin").show();
    $("#signinError").hide();
    $("#signup").hide();
    $("#content").hide();
    $("#logout").hide();
    $("#addTodoForm").hide();
  }
});

function logout() {
  localStorage.removeItem("token");
  signOut();
  $("#todos").empty();
  $("#signin").show();
  $("#signinError").hide();
  $("#signup").hide();
  $("#content").hide();
  $("#logout").hide();
}

function signin(e) {
  e.preventDefault();
  const email = $("#signin-email").val();
  const password = $("#signin-password").val();

  $.ajax({
    method: "POST",
    url: SERVER + "/signin",
    data: {
      email,
      password,
    },
  })
    .done((res) => {
      const token = res.access_token;
      localStorage.setItem("token", token);
      $("#logout").show();
      $("#signin").hide();
      $("#content").show();
      $("#editFormSection").hide();
      fetchTodo();
      fetchManga();
    })
    .fail((err) => {
      console.log(err);
      $("#signinError").show();
    });
}

function onSignIn(googleUser) {
  const google_token = googleUser.getAuthResponse().id_token;

  $.ajax({
    method: "POST",
    url: SERVER + "/signinGoogle",
    data: {
      google_token,
    },
  })
    .done((res) => {
      const token = res.access_token;
      localStorage.setItem("token", token);
      $("#logout").show();
      $("#signin").hide();
      $("#content").show();
      $("#editFormSection").hide();
      fetchTodo();
      fetchManga();
    })
    .fail((err) => {
      console.log(err);
      $("#signinError").show();
    });
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log("User signed out.");
  });
}

function showSignup() {
  $("#signin").hide();
  $("#signup").show();
}

function cancelSignup() {
  $("#signin").show();
  $("#signup").hide();
}

function signup(e) {
  e.preventDefault();
  const email = $("#signup-email").val();
  const password = $("#signup-password").val();

  $.ajax({
    method: "POST",
    url: SERVER + "/signup",
    data: {
      email,
      password,
    },
  })
    .done((res) => {
      $("#signin").show();
      $("#signup").hide();
      $("#signinError").hide();
    })
    .fail((err) => {
      console.log(err);
    });
}

function showEditTodo(id, err) {
  const token = localStorage.getItem("token");
  $("#todoList").hide();
  $("#editFormSection").show();
  $("#editForm").empty();
  $("mangaRecommend").hide();
  $.ajax({
    method: "GET",
    url: SERVER + `/todos/${id}`,
    headers: {
      token: token,
    },
  })
    .done((res) => {
      console.log(res);
      const todo = res;
      let string = `<form onsubmit="editTodo(event, ${id})">`;
      if (err) {
        string += `
        <div class="form-group">
            <p>${err}</p>
        </div>
        `;
      }
      $("#editForm").append(`
      ${string}
    <div class="form-group">
        <label for="edit-title">Title</label>
        <input type="text" id="edit-title" class="form-control" value="${todo.title}" />
    </div>
    <div class="form-group">
        <label for="edit-description">Description</label>
        <input type="text" id="edit-description" class="form-control" value="${todo.description}" />
    </div>
    <div class="form-group">
        <label for="edit-due_date">Due Date</label>
        <input type="date" id="edit-due_date" class="form-control" value="${todo.due_date}" />
    </div>
    <div class="form-group">
        <button type="submit" class="btn btn-primary">Save</button>
        <button onclick="cancelEdit()" class="btn btn-primary">Cancel</button>
    </div>
</form>
    `);
    })
    .fail((err) => {
      console.log(err);
    });
}

function cancelEdit() {
  $("#todoList").show();
  $("#editFormSection").hide();
}

function editTodo(e, id) {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const title = $("#edit-title").val();
  const description = $("#edit-description").val();
  const due_date = $("#edit-due_date").val();

  $.ajax({
    method: "PUT",
    url: SERVER + `/todos/${id}`,
    headers: {
      token: token,
    },
    data: {
      title,
      description,
      due_date,
    },
  })
    .done((res) => {
      $("#content").show();
      $("#editFormSection").hide();
    })
    .fail((err) => {});
}

function showAddTodoForm() {
  $("#todoList").hide();
  $("#addTodoForm").show();
  $("#addError").hide();
  $("#mangaRecommend").hide();
}

function cancelAdd() {
  $("#todoList").show();
  $("#addTodoForm").hide();
  $("#mangaRecommend").show();
}

function addTodo(e) {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const title = $("#add-title").val();
  const description = $("#add-description").val();
  const status = $("#add-status").val();
  const due_date = $("#add-due_date").val();

  $.ajax({
    method: "POST",
    url: SERVER + "/todos",
    headers: {
      token: token,
    },
    data: {
      title,
      description,
      status,
      due_date,
    },
  })
    .done((res) => {
      console.log(res);
      fetchTodo();
      $("#todoList").show();
      $("#addTodoForm").hide();
    })
    .fail((err) => {
      $("#addError").show();
      console.log(err);
    });
}

function addMangaTodo(id) {
  const token = localStorage.getItem("token");
  const title = $(`#manga${id}-title`).text();
  const description = $(`#manga${id}-description`).text();
  const status = `not done`;
  const today = new Date();
  let nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);
  const due_date = nextWeek;

  $.ajax({
    method: "POST",
    url: SERVER + "/todos",
    headers: {
      token: token,
    },
    data: {
      title,
      description,
      status,
      due_date,
    },
  })
    .done((res) => {
      fetchTodo();
      fetchManga();
      $("#todoList").show();
      $("#addTodoForm").hide();
    })
    .catch((err) => {
      $("#addError").show();
      console.log(err);
    });
}

function deleteTodo(id) {
  const token = localStorage.getItem("token");

  $.ajax({
    method: "DELETE",
    url: SERVER + `/todos/${id}`,
    headers: {
      token: token,
    },
  })
    .done((res) => {
      console.log(res);
      fetchTodo();
    })
    .fail((err) => {
      console.log(err);
    });
}

function markAsDone(id) {
  const token = localStorage.getItem("token");
  const status = `Done`;

  $.ajax({
    method: "PATCH",
    url: SERVER + `/todos/${id}`,
    headers: {
      token: token,
    },
    data: {
      status,
    },
  })
    .done((res) => {
      fetchTodo();
    })
    .fail((err) => {
      console.log(err);
    });
}

function fetchTodo() {
  const token = localStorage.getItem("token");

  $.ajax({
    method: "GET",
    url: SERVER + "/todos",
    headers: {
      token: token,
    },
  })
    .done((res) => {
      $("#todos").empty();
      const todos = res.todos;

      if (todos.length > 0) {
        let string = "";
        todos.forEach((todo) => {
          string += `
            <div onclick="showEditTodo(${todo.id})"> 
            <div>${todo.title}</div>
            <div>
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-calendar-date-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-6.664-1.21c-1.11 0-1.656-.767-1.703-1.407h.683c.043.37.387.82 1.051.82.844 0 1.301-.848 1.305-2.164h-.027c-.153.414-.637.79-1.383.79-.852 0-1.676-.61-1.676-1.77 0-1.137.871-1.809 1.797-1.809 1.172 0 1.953.734 1.953 2.668 0 1.805-.742 2.871-2 2.871zm.066-2.544c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2zm-2.957-2.89v5.332H5.77v-4.61h-.012c-.29.156-.883.52-1.258.777V8.16a12.6 12.6 0 0 1 1.313-.805h.632z"/>
              </svg>
            ${todo.due_date}
          </div>    
            <div>${todo.description}</div>
            <div onclick="markAsDone(${todo.id})">Mark as Done</div>
            <button onclick="deleteTodo(${todo.id})" class="btn btn-primary">Delete</button>
            </div>
            `;
        });
        $("#todos").append(`
                ${string}
          `);
      } else {
        $("#todos").append(`You don't have todos yet`);
      }
    })
    .fail((err) => {
      console.log(err);
    });
}

function fetchManga() {
  const token = localStorage.getItem("token");

  $.ajax({
    method: "GET",
    url: SERVER + "/manga",
    headers: {
      token: token,
    },
  })
    .done((res) => {
      $("#mangaList").empty();
      const list = res.list;
      let manga;
      let string = "";
      for (let i = 0; i < 10; i++) {
        manga = list[i];
        string += `
        <div id="manga${i}">
        <div id="manga${i}-title">${manga.title}</div>
        <div id="manga${i}-description">Read ${manga.title}</div>
        <div onclick="addMangaTodo(${i})" class="btn btn-primary">Add to list</div>
        </div>
        `;
      }
      $("#mangaList").append(`${string}`);
    })
    .fail((err) => {
      console.log(err);
    });
}
