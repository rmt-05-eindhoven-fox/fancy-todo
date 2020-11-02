const user = "http://localhost:3000/users";
const todo = "http://localhost:3000/todos";

$(document).ready(() => {
  const token = localStorage.getItem("token");

  if (token) {
    $("#content").show();
    $("#login").hide();
    $("#head").hide();
    $("#register").hide();
    $("#bg-todoform").hide();
    $("#bg-edittodo").hide();
    fetchTodos();
  } else {
    $("#content").hide();
    $("#login").hide();
    $("#register").hide();
    $("#bg-todoform").hide();
    $("#bg-edittodo").hide();

    $("#head").show();
  }

  $("#logout").on("click", () => {
    logout();
  });
});

//Google Server Sign-In
function onSignIn(googleUser) {
  const googleToken = googleUser.getAuthResponse().id_token;

  $.ajax({
    method: "POST",
    url: user + "/googleLogin",
    data: {
      googleToken,
    },
  })
    .done((response) => {
      const token = response.accessToken;
      localStorage.setItem("token", token);
      $("#content").show();
      $("#login").hide();
      $("#register").hide();
      $("#bg-todoform").hide();
      $("#bg-edittodo").hide();

      $("#email").val("");
      $("#password").val("");
      fetchTodos();
    })
    .fail((err) => {
      console.log(err);
    });
}

function toLogin() {
  $("#head").hide();
  $("#content").hide();
  $("#register").hide();
  $("#login").show();
  $("#bg-todoform").hide();
  $("#bg-edittodo").hide();
}

function toRegister() {
  $("#head").hide();
  $("#content").hide();
  $("#login").hide();
  $("#register").show();
  $("#bg-todoform").hide();
  $("#bg-edittodo").hide();
}

// TodoApp Server Sign-In
function login(e) {
  e.preventDefault();
  const email = $("#getEmail").val();
  const password = $("#getPassword").val();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  console.log(email, password);
  $.ajax({
    method: "POST",
    url: user + "/login",
    data: {
      email,
      password,
    },
  })
    .done((response) => {
      const token = response.accessToken;
      localStorage.setItem("token", token);
      $("#login").hide();
      $("#head").hide();
      $("#register").hide();
      $("#bg-todoform").hide();
      $("#bg-edittodo").hide();

      $("#content").show();
      $("#getEmail").val("");
      $("#getPassword").val("");
      fetchTodos();

      Toast.fire({
        icon: "success",
        title: `Log in successfully`,
      });
    })
    .fail((err) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Wrong email/password",
      });
      console.log(err.responseJSON.msg);
    });
}

function register(e) {
  e.preventDefault();
  const email = $("#regEmail").val();
  const password = $("#regPassword").val();

  console.log(email, password);
  $.ajax({
    method: "POST",
    url: user + "/register",
    data: {
      email,
      password,
    },
  })
    .done((response) => {
      $("#login").show();
      $("#register").hide();
      $("#head").hide();
      $("#content").hide();
      $("#bg-todoform").hide();
      $("#bg-edittodo").hide();

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Shall we login, now?",
      });
    })
    .fail((err) => {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Invalid email/password",
      });
    });
}

function showContent() {
  $("#login").hide();
  $("#head").hide();
  $("#register").hide();
  $("#bg-todoform").hide();
  $("#content").show();
  $("#bg-edittodo").hide();
}

function logout() {
  Swal.fire({
    title: "Are you sure?",
    text: "I'm afraid you accidentally clicked it!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, log me out!",
  }).then((result) => {
    if (result.isConfirmed) {
      $("#head").show();
      $("#content").hide();
      localStorage.removeItem("token");
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log("User signed out.");
      });
      Swal.fire("Logged out!", "See you later, ciao.", "success");
    } else {
      showContent();
    }
  });
}

function fetchTodos() {
  const token = localStorage.getItem("token");
  $.ajax({
    method: "GET",
    url: todo,
    headers: {
      token: token,
    },
  })
    .done((response) => {
      $("#allTodo").empty();
      const todos = response;
      todos.forEach((eachTodo, index) => {
        const d = new Date(eachTodo.due_date);
        const date = d.getDate();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        const fulldate = `${date}/${month}/${year}`;
        $("#allTodo").append(
          ` <tr>
             <th scope="row">${index + 1}</th>
             <td>${eachTodo.title}</td>
             <td>${eachTodo.description}</td>
             <td>${eachTodo.status}</td>
             <td>${fulldate}</td>
             <td><button type="button" onclick="deleteTodo('${
               eachTodo.id
             }', event)" class="btn btn-outline-dark">Delete</button> - <button type="button" onclick="editTodo('${
            eachTodo.id
          }', event)" class="btn btn-outline-dark">Edit</button>
           </tr>`
        );
      });
    })
    .fail((err) => {
      console.log(err);
    });
}

function toAdd() {
  $("#login").hide();
  $("#head").hide();
  $("#register").hide();
  $("#content").hide();
  $("#bg-todoform").show();
  $("#bg-edittodo").hide();
}

function addTodo(e) {
  e.preventDefault();
  const token = localStorage.getItem("token");

  const title = $("#addTitle").val();
  const description = $("#addDescription").val();
  const status = $("#addStatus").val();
  const due_date = $("#addDate").val();

  $.ajax({
    method: "POST",
    url: todo,
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
    .done((response) => {
      console.log(response);
      Swal.fire({
        icon: "success",
        title: "Yeay. here is Kanye Quote for you",
        text: response[1].quote,
      });
      fetchTodos();
      showContent();
    })
    .fail((err) => {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Invalid data input",
      });
    });
}

function deleteTodo(id, e) {
  e.preventDefault();
  const token = localStorage.getItem("token");

  console.log(token);
  $.ajax({
    method: "DELETE",
    url: todo + `/${id}`,
    headers: { token: token },
  })
    .done((resolve) => {
      Swal.fire({
        icon: "success",
        title: "Deleted Successfully",
      });
      fetchTodos();
      showContent();
    })
    .fail((err) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete",
      });
    });
}

function editTodo(id, e) {
  e.preventDefault();
  $("#bg-edittodo").empty();
  const token = localStorage.getItem("token");

  console.log(token);
  $.ajax({
    method: "GET",
    url: todo + `/${id}`,
    headers: { token: token },
  })
    .done((resolve) => {
      console.log(resolve);
      const d = new Date(resolve.due_date);
      const date = d.getDate();
      const month = d.getMonth() + 1;
      const year = d.getFullYear();
      const fulldate = `${year}-${month}-${date}`;

      $("#bg-edittodo").append(`
      <section
        class="row justify-content-center"
        style="background-color: rgba(0, 0, 0, 0)"
      >
        <section class="col-12 col-sm-6 col-md-3" style="margin-top: 100px">
          <form class="form-addtodo bg-light" onsubmit="edited(${resolve.id}, event)">
            <div class="form-group">
              <label for="editTitle">Title</label>
              <input
                type="text"
                class="form-control"
                placeholder="Your todo title"
                id="editTitle"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="form-group">
              <label for="editDescription">Description</label>
              <input
                type="text"
                class="form-control"
                id="editDescription"
                placeholder="Your todo description"
              />
            </div>
            <div class="form-group">
              <label for="editStatus">Status</label>
              <select id="editStatus" class="custom-select custom-select-sm">
                <option selected>What's your todo status?</option>
                <option value="NOT COMPLETED">NOT COMPLETED</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>
            </div>
            <div class="form-group">
              <label for="editDate">Due Date</label>
              <br>
              <input type="date" class="form-control" id="editDate">
            </div>
            
            </div>
            <button type="submit" class="btn btn-primary btn-block">
              Edit
            </button>
            <button type="button" onclick="showContent()" class="btn btn-danger btn-block">
              Go Back
            </button>
          </form>
        </section>
      </section>
      `);
      $("#editTitle").val(resolve.title);
      $("#editDescription").val(resolve.description);
      $("#editStatus").val(resolve.status);
      $("#editDate").val(fulldate);
      showEdit();
    })
    .fail((err) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Id is mismatched",
      });
    });
}

function showEdit() {
  $("#login").hide();
  $("#head").hide();
  $("#register").hide();
  $("#bg-todoform").hide();
  $("#content").hide();
  $("#bg-edittodo").show();
}

function edited(id, e) {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const title = $("#editTitle").val();
  const description = $("#editDescription").val();
  const status = $("#editStatus").val();
  const due_date = $("#editDate").val();

  console.log(token);
  $.ajax({
    method: "PUT",
    url: todo + `/${id}`,
    headers: { token: token },
    data: {
      title,
      description,
      status,
      due_date,
    },
  })
    .done((resolve) => {
      console.log(resolve);
      Swal.fire({
        icon: "success",
        title: "Edited Successfully",
      });
      fetchTodos();
      showContent();
    })
    .fail((err) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete",
      });
    });
}
