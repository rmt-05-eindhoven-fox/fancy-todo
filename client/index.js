const SERVER = "https://fancytodobyrisyad.herokuapp.com";
// const SERVER = "http://localhost:3000";
let idTemp = null;

$(document).ready(function() {

    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
        afterLogin();
        fetchTodo();
        fetchdoneTodo()
    } else {
        beforeLogin();
    }
});

function beforeLogin(event) {
    $("#content-undone").hide()
    $("#content-done").hide()
    $("#login-form").hide();
    $("#logout-button").hide()
    $("#go-to-movielist").hide()
    $("#trendingmovies").hide()
    $("#header").show();
    $("#hero").show();
    $("#main").show();
    $("#about").show();
    $("#register-form").hide();
    $("#go-to-addtodo").hide()
    $("#add-form-todo").hide();
     $("#edit-form-todo").hide();
    $("#go-to-register").on("click", function(event) {
        console.log('test regist')
        event.preventDefault()
        $("#hero").hide();
        $("#main").hide();
        $("#about").hide();
        $("#register-form").show();
        $("#login-form").hide();
        $("#add-form").hide();
    });
    $("#go-to-login").on("click", function(event) {
        $("#login-form").show();
        $("#register-form").hide();
        $("#add-form").hide();
        $("#hero").hide();
        $("#main").hide();
        $("#about").hide();
    });
}

function afterRegister(event) {
    event.preventDefault()
  $("#hero").hide();
  $("#main").hide();
  $("#about").hide();
  $("#login-form").show();
  $("#register-form").hide();
  $("#navbar-logout").hide();
}

function afterLogin(event) {
    fetchTodo()
    fetchdoneTodo()
    trendingMovie()
    $("#content-done").show()
    $("#content-undone").show()
    $("#content-movies").hide()
    $("#hero").hide();
    $("#main").hide();
    $("#about").hide();
    $("#login-form").hide();
    $("#register-form").hide();
    $("#add-form-todo").hide();
    $("#edit-form-todo").hide();
    $("#logout-button").show();
    $("#logout-button").on("click", () => {
        signOut()

    })

     $("#go-to-addtodo").show()
        $("#go-to-addtodo").on("click", function(event) {
        $("#add-form-todo").show();
        $("#content-done").hide()
        $("#content-undone").hide()
        $("#content-movies").hide();
    });
     $("#go-to-movielist").show();
        $("#go-to-movielist").on("click", function(event) {
        $("#content-movies").show();
        // $("#trendingmovies").show();
        $("#content-done").hide()
        $("#content-undone").hide()
         $("#add-form-todo").hide();
    });
        $("#go-to-listtodo").show();
        $("#go-to-listtodo").on("click", function(event) {
       $("#content-movies").hide();
        $("#content-done").show()
        $("#content-undone").show()
        $("#add-form-todo").hide();
        });
    

}

function logout() {
    localStorage.clear();
    beforeLogin()
}

function login(event) {
    event.preventDefault();

    const email = $("#login-email").val();
    const password = $("#login-password").val();

    console.log(email, password);

    $.ajax({
            method: "POST",
            url: SERVER + "/user/login",
            data: {
                email,
                password,
            },
        })
        .done((response) => {
            console.log(response)
        $("#login-email").val('');
        $("#login-password").val();
            const token = response;
            localStorage.setItem("token", token);
            afterLogin()
            fetchTodo();
        })
        .fail((err) => {
            console.log(err);
        });
}

//google login

function onSignIn(googleUser) {
//   var profile = googleUser.getBasicProfile();
//   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//   console.log('Name: ' + profile.getName());
//   console.log('Image URL: ' + profile.getImageUrl());
//   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

  var google_access_token = googleUser.getAuthResponse().id_token;
  console.log(google_access_token)
  $.ajax({
      method: "POST",
      url: SERVER +'/user/googleLogin',
      data: {
          google_access_token
      }
  })
  .done(response => {
const token = response.access_token;
            localStorage.setItem("token", token);
            fetchTodo();
            fetchdoneTodo()
            afterLogin()
  })
  .fail(err => {
      console.log(err)
  })

}


// google logout 

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    localStorage.clear();
    beforeLogin()
  }


function register(event) {
    event.preventDefault();

    const email = $("#register-email").val();
    const password = $("#register-password").val();

    $.ajax({
            method: "POST",
            url: SERVER + '/user/register',
            data: {
                email: email,
                password: password,
            },
        })
        .done((data) => {
            afterRegister()
            $("#email").val("");
            $("#password").val("");
        })
        .fail((err) => {
            console.log(err);
        });
}

function addForm(event) {
    event.preventDefault();
    $.ajax({
            method: "POST",
            url: SERVER + "/todos",
            data: {
                title: $("#title-add").val(),
                description: $("#description-add").val(),
                status: $("#status-add").val(),
                due_date: $("#due_date-add").val(),
            },
            headers: { token: localStorage.token },
        })
        .done((response) => {
            console.log(response);
            afterLogin()
            fetchTodo()
            fetchdoneTodo()
        })
        .fail((err) => {
            console.log(err);
        });
}

function trendingMovie() {
    const Authorization = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YzZlYjRhYTFjZmNlZGQzMTU0NDA5ZTFjMjc4N2Q3OSIsInN1YiI6IjVmOWRhYzU3MTk2NzU3MDAzNjlmNjIwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ib-wB06eYzZVbg9Wh5kvPszAqsFpeTpyFg8nZ6iGR0Q`
    $.ajax({
         method: "GET",
            url: SERVER + "/movies/trending",
            headers: {
                Authorization: Authorization,
            },
    })
    .done((response) => {
        const trending = response
        console.log('sebelum response gais')
        console.log(response);
        $("#showtrendingmovie").empty();
        trending.forEach((i) => {
            if (!i.original_title && i.name) {
            $("#trendingmovies").append(`
            <ul class="media bg-white rounded p-2 shadow mt-3">
			<div>
                <h5 class="mt-0 mb-0 text-primary">${i.name}</h5>
                <br>
                <img src=http://image.tmdb.org/t/p/w185${i.poster_path}  width="185" height="185">
                <p>${i.overview}</p>
            </div>
            <ul>
            `)
            }else{ $("#trendingmovies").append(`
            <ul class="media bg-white rounded p-2 shadow mt-3">
			<div>
				<h5 class="mt-0 mb-0 text-primary">${i.original_title}</h5>
                <br>
                <img src=http://image.tmdb.org/t/p/w185${i.poster_path}  width="185" height="185">
                <p>${i.overview}</p>
            </div>
            <ul>
            `)

            }
 
        })
    })
    
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
        .done((response) => {
            const todos = response;
            $("#showtodo").empty();
            todos.forEach((i) => {
                if (i.status === 'undone') {
                    $("#showtodo").append(`
            <li class="media bg-white rounded p-2 shadow mt-3">
			<div class="col">
				<h5 class="mt-0 mb-0 text-primary">${i.title}</h5>
				<p>${i.description}</p>
				<p>${i.status}</p>
				<p>${i.due_date.split("T")[0]}</p>
				
				<button onclick="statustodo(${i.id})" type="button" class="btn btn-success">done</button>
				<button onclick="toEditTodo(${i.id},'${i.title}','${i.description}','${i.status}','${i.due_date.split("T")[0]}')" class="btn btn-warning"> edit </button>
				<button onclick="deleteTodo(${i.id})" type="button" class="btn btn-danger">delete</button>
				</div>
				</li>`);
                } 
            });
        })
        .fail((err) => {
            console.log(err);
        });
}


function fetchdoneTodo() {
    const token = localStorage.getItem("token");
    $.ajax({
            method: "GET",
            url: SERVER + "/todos",
            headers: {
                token: token,
            },
        })
        .done((response) => {
            const todos = response;
            $("#showdonetodo").empty();
            todos.forEach((i) => {
                 if (i.status === 'done') {
                    $("#showdonetodo").append(`
            <li class="media bg-white rounded p-2 shadow mt-3">
			<div class="col">
				<h5 class="mt-0 mb-0 text-primary">${i.title}</h5>
				<p>${i.description}</p>
				<p>${i.status}</p>
				<p>${i.due_date.split("T")[0]}</p>
				<button onclick="toEditTodo(${i.id},'${i.title}','${i.description}','${i.status}','${i.due_date.split("T")[0]}')" class="btn btn-warning"> edit </button>
				<button onclick="deleteTodo(${i.id})" type="button" class="btn btn-danger">delete</button>
				</div>
				</li>`);
                    
                }
                
            });
        })
        .fail((err) => {
            console.log(err);
        });
}

function toEditTodo(id, title, description, status, due_date) {
    console.log(id, title, description, status, due_date, "<<< edit");
    $("#edit-form-todo").show();
    $("#add-form-todo").hide();
    $("#content-undone").hide();
    $("#content-done").hide();
            $("#title-edit").val(title),
            $("#description-edit").val(description),
            $("#status-edit").val(status),
            $("#due_date-edit").val(due_date),
            idTemp = id
}

function editTodo(event){
    event.preventDefault()
    $("#add-form-todo").hide();
    $("#content-undone").hide();
    $("#content-done").hide();
    const token = localStorage.getItem("token");
                let title= $("#title-edit").val()
                let description= $("#description-edit").val()
                let status= $("#status-edit").val()
                let due_date= $("#due_date-edit").val()
        $.ajax({
            
        method: "PUT",
        url:SERVER + `/todos/${idTemp}`,
        headers: {
            token: token
        },
        data: {
            title,
            description,
            status,
            due_date
        }
    })
        .done((response) => {
            $("#edit-form-todo").hide
            fetchTodo()
            fetchdoneTodo()
           afterLogin()
        })
        .fail((err) => {
            console.log(err, "<<<<<<<<<<<<<<< error gan");
        });


}

function statustodo(id) {
    // e.preventDefault()
     const token = localStorage.getItem("token");
     $.ajax({
         method: "PATCH",
         url: SERVER + `/todos/${id}`,
         headers: {
             token:token
         },
         data: {status: 'done'},
     })
     .done(response => {
         fetchTodo()
         fetchdoneTodo()
     })
             .fail((err) => {
            console.log(err, "<<<<<<<<<<<<<<< error gan");
        });
}



function deleteTodo(id) {
    const token = localStorage.getItem("token");

    $.ajax({
        method: "DELETE",
        url: `${SERVER}/todos/${id}`,
        headers: {
            token
        }
    })

    .done((response) => {
            console.log(response);
            fetchTodo();
            fetchdoneTodo()
        })
        .fail((err) => {
            console.log(err);
        });
}

function showError(error) {
    $("#error").empty();
    $("#error").show();
    $("#error").append(`
	<p>failed please try again</p>`);
    // $("#error").append(`
    // <p>${error.join(",")}</p>`);
    setTimeout(() => {
        $("#error").hide();
    }, 1000);
}

