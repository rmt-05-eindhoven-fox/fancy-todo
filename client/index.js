const SERVER = "http://localhost:3000";

$(document).ready(function () {
	const token = localStorage.getItem("token");
	console.log(token);

	if (token) {
		$("#content").show();
		$("#landing").hide();
		fetchTodo();
	} else {
		$("#content").hide();
		$("#landing").show();
	}

	$("#btn-logout").on("click", function () {
		logout();
	});
});

function login(e) {
	e.preventDefault();

	console.log("thiis is from login");

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
			// console.log(response)
			const token = response;
			localStorage.setItem("token", token);
			$("#landing").hide();
			$("#content").show();
			$("#login-email").val("");
			$("#login-password").val("");
			fetchTodo();
		})
		.fail((err) => {
			console.log(err);
		});
}

function logout() {
	// localStorage.clear();
	$("#landing").show();
	$("#content").hide();
	localStorage.removeItem("token");
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
				$("#showtodo").append(`
                <div class="col-4 mt-5">

				<p> ${i.title}</p>
				<p>${i.description}</p>
				<p>${i.status}</p>
                <p>${i.due_date}</p>
                
              
                <i id=edit style="color:blue" class="fas fa-edit fa-lg"></i>
                   &nbsp &nbsp
                <i id=add style="color:green" class="fas fa-check-square fa-lg"></i>
                &nbsp &nbsp
                <i id=trash style="color:red" class="fas fa-ban fa-lg"></i>
                </div>`);
			});

			// console.log(todos);
		})
		.fail((err) => {
			console.log(err);
		});
}
