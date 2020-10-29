const SERVER = "http://localhost:3000";

$(document).ready(function () {
  const token = localStorage.getItem("token");

  if (token) {
    $("#signin").hide();
    $("#signup").hide();
    $("#content").show();
    $("#logout").show();
    $("#editFormSection").hide();
    fetchTodo();
  } else {
    $("#signin").show();
    $("#signinError").hide();
    $("#signup").hide();
    $("#content").hide();
    $("#logout").hide();
  }
});

function logout() {
  localStorage.removeItem("token");
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
    })
    .fail((err) => {
      console.log(err);
      $("#signinError").show();
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
  const username = $("#signup-username").val();

  $.ajax({
    method: "POST",
    url: SERVER + "/signup",
    data: {
      email,
      password,
      username,
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

function cancelSignup() {
  $("#signup").hide();
  $("#signin").show();
}

function showEditTodo(id, err) {
  const token = localStorage.getItem("token");
  $("#content").hide();
  $("#editFormSection").show();
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
      const todos = res.todos;

      if (todos.length > 0) {
        let string = "";
        todos.forEach((todo) => {
          string += `
            <tr>
                <td>${todo.title}</td>
                <td>${todo.description}</td>
                <td>${todo.due_date}</td>
                <td><button onclick="showEditTodo(${todo.id})" class="btn btn-primary">Edit</button></td>
            </tr>
            `;
        });
        $("#todos").append(`
            <table>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Due date</th>
                  <th>Action</th>
                </tr>
                ${string}
            </table>
          `);
      } else {
        $("#todos").append(`You don't have todos yet`);
      }
    })
    .fail((err) => {
      console.log(err);
    });
}
