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
    $("#signupButton").hide();
    $("#signinButton").hide();
    fetchTodo();
    fetchManga();
  } else {
    $("#signin").show();
    $("#signinError").hide();
    $("#signup").hide();
    $("#content").hide();
    $("#logout").hide();
    $("#addTodoForm").hide();
    $("#signinButton").hide();
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
  $("#signupButton").hide();
  $("#signinButton").show();
}

function cancelSignup() {
  $("#signin").show();
  $("#signup").hide();
  $("#signupButton").show();
  $("#signinButton").hide();
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
  $("#editFormSection").show();
  $("#editForm").empty();
  $("#todoList").hide();
  $("#mangaRecommend").hide();
  $.ajax({
    method: "GET",
    url: SERVER + `/todos/${id}`,
    headers: {
      token: token,
    },
  })
    .done((res) => {
      // console.log(res);
      const todo = res;
      let date = "";
      let day = `${new Date(todo.due_date).getDate()}`;
      if (day < 10) {
        day = `0${day}`;
      }
      let month = `${new Date(todo.due_date).getMonth() + 1}`;
      let year = `${new Date(todo.due_date).getFullYear()}`;
      date += `${year}-${month}-${day}`;
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
        <input type="date" id="edit-due_date" class="form-control" value="${date}" />
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
  $("#mangaRecommend").show();
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
      $("#mangaRecommend").show();
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
      $("#editFormSection").hide();
      $("#content").show();
      $("#todoList").show();
      $("#mangaRecommend").show();
    })
    .fail((err) => {
      console.log(err);
    });
}

function markAsNotDone(id) {
  const token = localStorage.getItem("token");
  const status = `Not done`;

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
      $("#editFormSection").hide();
      $("#content").show();
      $("#todoList").show();
      $("#mangaRecommend").show();
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
          let title = `${todo.title}`;
          let description = `${todo.description}`;
          let isDone = `<div onclick="markAsDone(${todo.id})">`;
          if (todo.status === "Done") {
            title = `<del>${todo.title}</del>`;
            description = `<del>${todo.description}</del>`;
            isDone = `<div onclick="markAsNotDone(${todo.id})">`;
          }
          let date = "";
          let day = `${new Date(todo.due_date).getDate()}`;
          if (day < 10) {
            day = `0${day}`;
          }
          let month = `${new Date(todo.due_date).getMonth() + 1}`;
          let year = `${new Date(todo.due_date).getFullYear()}`;
          date += `${day}-${month}-${year}`;
          string += `
            <div onclick="showEditTodo(${todo.id})" class="row border justify-content-center"> 
              <div class="col">
              <div>${title}</div>
              <div>${description}</div>
              </div>
              
              <div class="col">
                <div>
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-calendar-date-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-6.664-1.21c-1.11 0-1.656-.767-1.703-1.407h.683c.043.37.387.82 1.051.82.844 0 1.301-.848 1.305-2.164h-.027c-.153.414-.637.79-1.383.79-.852 0-1.676-.61-1.676-1.77 0-1.137.871-1.809 1.797-1.809 1.172 0 1.953.734 1.953 2.668 0 1.805-.742 2.871-2 2.871zm.066-2.544c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2zm-2.957-2.89v5.332H5.77v-4.61h-.012c-.29.156-.883.52-1.258.777V8.16a12.6 12.6 0 0 1 1.313-.805h.632z"/>
                    </svg>
                  ${date}
                </div>
                <div>
                  <button onclick="deleteTodo(${todo.id})" class="btn btn-primary">Delete</button>
                </div>
              </div> 

              <div class="align-items-stretch">
                ${isDone}
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
                  </svg>
                </div>
              </div>
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
        <div id="manga${i}" class="row justify-content-center border">
          <div>
          <img src="${manga.image_url}" alt="Italian Trulli">
          </div>
          <div class="col mt-5 ">
            <div id="manga${i}-title">${manga.title}</div>
            <div id="manga${i}-description">Read ${manga.title}</div>
          </div>
          <div>
            <div onclick="addMangaTodo(${i})" class="btn btn-primary">Add to list</div>
          </div>
        </div>
        `;
      }
      $("#mangaList").append(`${string}`);
    })
    .fail((err) => {
      console.log(err);
    });
}
