const SERVER = 'http://localhost:3000'

$(document).ready(() => {
	const token = localStorage.getItem('token')
	console.log(token);
	if (token) {
		$('#landing-page').hide()
		$('#home-page').show()
		showTodo()
	} else {
		$('.register-form').hide()
		$('.login-cover').hide()
	}
})

function login_form() {
	$('.login-cover').fadeOut("slow", "linear", () => {
		$('.login-form').fadeIn("slow")
	})
	$('.register-form').fadeOut("slow", "linear", () => {
		$('.register-cover').fadeIn("slow")
	})
}

function register_form() {
	$('.login-form').fadeOut("slow", "linear", () => {
		$('.login-cover').fadeIn("slow")
	})
	$('.register-cover').fadeOut("slow", "linear", () => {
		$('.register-form').fadeIn("slow")
	})
}

function landingPage() {
	$('#home-page').fadeOut("slow", "linear", () => {
		$('#landing-page').show()
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
			login_form()
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
			const token = result.access_token
			localStorage.setItem('token', token)
			$('#landing-page').fadeOut("slow", "linear", () => {
				$('#home-page').fadeIn("slow")
			})
			showTodo()
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
			$('#landing-page').fadeOut("slow", "linear", () => {
				$('#home-page').fadeIn("slow")
			})
			showTodo()
		}) .fail((err) => {
			console.log(err);
		})
}

function create(e) {
	e.preventDefault()
	const token = localStorage.getItem('token')

	const title = $("#title").val()
	const description = $("#description").val()
	const status = $("input[name='status']:checked").val()
	const due_date = $("#due_date").val()

	console.log(title, description, status, due_date);
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
			$("#list_todo").empty()
			// $("#home-page").fadeOut("fast", "linear", () => {
			// 	$("#home-page").fadeIn("fast")
			// })
			// showTodo()
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
			result.forEach(el => {
				if (el.status === 'pending') {
					$('#pending').append(`
						<div id="list_todo">
							<p>${el.title}</p>
							<p>${el.description}</p>
							<p>${el.due_date.split('T')[0]}</p>
							<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
  						Edit
							</button>
							<button onclick='deleteTodo(${el.id})'>Delete</button>
						</div><br>
					`)
				} else if (el.status === 'on progress') {
					$('#on_progress').append(`
						<div id="list_todo">
							<p>${el.title}</p>
							<p>${el.description}</p>
							<p>${el.due_date.split('T')[0]}</p>
							<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
  						Edit
							</button>
							<button onclick='deleteTodo(${el.id})'>Delete</button>
						</div><br>
					`)
				} else if (el.status === 'done') {
					$('#done').append(`
						<div id="list_todo">
							<p>${el.title}</p>
							<p>${el.description}</p>
							<p>${el.due_date.split('T')[0]}</p>
							<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
  						Edit
							</button>
							<button onclick='deleteTodo(${el.id})'>Delete</button>
						</div><br>
					`)
				}
			})
		})
		.catch((err) => {
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
			// $("#home-page").fadeOut("fast", "linear", () => {
				$("#list_todo").empty()
			// })
		})
		.catch((err) => {
			console.log(err);
		})
}

function logout() {
	localStorage.clear()
	landingPage()
}

function signOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
	});
	localStorage.clear()
	landingPage()
}
