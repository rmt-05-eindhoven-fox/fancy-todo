const SERVER = 'http://localhost:3000'
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container-fluid");
const form = document.getElementById("todo_create");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

$(document).ready(() => {
	const token = localStorage.getItem('token')
	
	if (token) {
		goToHomepage()
	} else {
		$('#profile-page').hide()
		$('#login-signup-form').show()
	}
})

function emptyTodo() {
	$('#pending #list_todo').empty()
	$('#on_progress #list_todo').empty()
	$('#done #list_todo').empty()
}

function registerSuccess() {
	container.classList.remove("sign-up-mode");
}

function goToHomepage() {
	$('#login-signup-form').fadeOut("slow", "linear", () => {
		$('#profile-page').fadeIn()
		showTodo()
	})
}

function logoutSuccess() {
	$('#profile-page').fadeOut("slow", "linear", () => {
		$('#login-signup-form').fadeIn()
	})
}

function register(e) {
	e.preventDefault()

	const email = $("#register-email").val()
	const password = $("#register-password").val()
	
	$.ajax({
		url: SERVER + '/users/register',
		method: 'POST',
		data: {
			email, password
		}
	})
		.done((result) => {
			console.log(`register success`);
		})
		.fail((err) => {
			console.log(err)
		})
}

function login(e) {
	e.preventDefault()

	const email = $("#login-email").val()
	const password = $("#login-password").val()

	$.ajax({
		url: SERVER + '/users/login',
		method: "POST",
		data: {
			email, password
		}
	})
		.done((result) => {
			console.log(`login success`);
			const token = result.access_token
			localStorage.setItem('token', token)
			goToHomepage()
		}) 
		.fail((err) => {
			console.log(err)
		})
}

function onSignIn(googleUser) {
	const google_access_token = googleUser.getAuthResponse().id_token;
	
	$.ajax({
		url: SERVER + '/users/googleLogin',
		method: "POST",
		data: {
			google_access_token
		}
	})
		.done((response) => {
			const token = response.access_token
			localStorage.setItem('token', token)
			console.log(`login success`);
			goToHomepage()
		}) .fail((err) => {
			console.log(err);
		})
}
  
function signOut() {
	const auth2 = gapi.auth2.getAuthInstance();
	localStorage.clear()
  auth2.signOut().then(function () {
    console.log('User signed out.');
	});
	logoutSuccess()
}

function create(e) {
	e.preventDefault()
	const token = localStorage.getItem('token')

	const title = $("#title").val()
	const description = $("#description").val()
	const status = $("input[name='status']:checked").val()
	const due_date = $("#due_date").val()
	
	$.ajax({
		url: SERVER + '/todos',
		method: 'POST',
		headers: {
			token
		},
		data: {
			title, description, status, due_date
		}
	})
		.done((result) => {
			console.log(`create success`);
			form.reset();
			showTodo()
		})
		.fail((err) => {
			console.log(err.responseJSON);
		})
}

function showTodo() {
	const token = localStorage.getItem('token')
	
	$.ajax({
		url: SERVER + '/todos',
		method: 'GET',
		headers: {
			token
		}
	})
		.done((result) => {
			emptyTodo()

			result.forEach(el => {
				if (el.status === 'pending') {
					$('#pending #list_todo').append(`
						<div class="card" style="width: 16rem;">
							<div class="card-body">
								<h5 class="card-title">${el.title}</h5>
								
								<p class="card-text">${el.description}</p>
								<p class="card-text">${el.due_date}</p>
								<button type="button" data-toggle="modal" data-target="#exampleModal" onclick="findOneTodo(${el.id})">
								Edit
								</button>
								<button onclick='deleteTodo(${el.id})'>Delete</button>		
							</div>
						</div>
					`)
				} else if (el.status === 'on progress') {
					$('#on_progress #list_todo').append(`
					<div class="card" style="width: 16rem;">
						<div class="card-body">
							<h5 class="card-title">${el.title}</h5>

							<p class="card-text">${el.description}</p>
							<p class="card-text">${el.due_date}</p>
							<button type="button" data-toggle="modal" data-target="#exampleModal" onclick="findOneTodo(${el.id})">
							Edit
							</button>
							<button onclick='deleteTodo(${el.id})' >Delete</button>		
						</div>
					</div>
					`)
				} else if (el.status === 'done') {
					$('#done #list_todo').append(`
					<div class="card" style="width: 16rem;">
						<div class="card-body">
							<h5 class="card-title">${el.title}</h5>
						
							<p class="card-text">${el.description}</p>
							<p class="card-text">${el.due_date}</p>
							<button type="button" data-toggle="modal" data-target="#exampleModal" onclick="findOneTodo(${el.id})">
							Edit
							</button>
							<button onclick='deleteTodo(${el.id})'>Delete</button>		
						</div>
					</div>
					`)
				}
			})
		})
		.catch((err) => {
			console.log(err);
		})
}

function findOneTodo(id) {
	const token = localStorage.getItem('token')

	$.ajax({
		url: SERVER + `/todos/${id}`,
		method: 'GET',
		headers: {
			token
		}
	})
		.done((response) => {
			$('.modal-body').empty()
			$('.modal-body').append(`
				<form id="todo_edit">
					<div class="form-group">
						<label for="title">Title</label>
						<input type="text" id="edit_title" class="form-control" value="" autocomplete="title">
					</div>
					<div class="form-group">
						<label for="description">Description</label>
						<textarea id="edit_description" class="form-control" cols="20" rows="3"></textarea>
					</div>
					<div class="form-group">
						<input type="radio" name="edit_status" value="pending">
						<label for="pending">Pending</label><br>
						<input type="radio" name="edit_status" value="on progress">
						<label for="on_progress">On progress</label><br>
						<input type="radio" name="edit_status" value="done">
						<label for="done">Done</label>
					</div>
					<div class="form-group">
						<label for="due_date">Due Date</label>
						<input type="date" id="edit_due_date" name="due_date" class="form-control">
					</div> 
					<button type="submit" value="Edit" onclick="editTodo(event, ${id})" class="btn btn-primary" data-dismiss="modal">Edit</button>
				</form>
			`)
			$('.form-group #edit_title').val(response.title)
			$('.form-group #edit_description').val(response.description)
			$('.form-group #edit_due_date').val(response.due_date.split('T')[0])
		})
		.fail((err) => {
			console.log(err);
		})
}

function editTodo(e, id) {
	e.preventDefault()
	const token = localStorage.getItem('token')

	const title = $("#edit_title").val()
	const description = $("#edit_description").val()
	const status = $("input[name='edit_status']:checked").val()
	const due_date = $("#edit_due_date").val()

	console.log(title)
	$.ajax({
		url: SERVER + `/todos/${id}`,
		method: 'PUT',
		headers: {
			token
		},
		data: {
			title, description, status, due_date
		}
	})
		.done((response) => {
			console.log(response);
			console.log(`edit success`);
			showTodo()
		})
		.fail((err) => {
			console.log(err);
		})
}

function deleteTodo(id) {
	const token = localStorage.getItem('token')
	
	$.ajax({
		url: SERVER + `/todos/${id}`,
		method: 'DELETE',
		headers: {
			token
		}
	})
		.done((result) => {
			console.log(`delete successful`);
			showTodo()
		})
		.catch((err) => {
			console.log(err);
		})
}
