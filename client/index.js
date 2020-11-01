const SERVER = "http://localhost:3000/"



$(document).ready(function () {
    const token = localStorage.getItem("access_token")
    if (token) {
      $("#login-page").show()
      $("#navbar").show()     
      $("#register-page").hide()
   
    } else {
      $("#landing-page").hide()
      $("#register-page").hide()
    }
  })



  // GOOGLE OAUTH
function onSignIn(googleUser) {
	var google_access_token = googleUser.getAuthResponse().id_token;

	$.ajax({
		method: "POST",
		url: 'http://localhost:3000/user/googleLogin',
		data: {
			google_access_token
		}
	})
		.done(response => {
			console.log(response.access_token)
			localStorage.setItem("access_token", response.access_token)
		
			$("#landing-page").show()
			$("#login-page").hide()
		})
		.fail(err => {
			console.log(err)
		})
}

//GOOGLE OAUTH
function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
		console.log('User Log Out.');
	});

	localStorage.clear()
}

//LOG IN
function UserLogin() {
	$("#login-page").show()
	$("#register-page").hide()
}

//LOG IN
function login(event) {
    event.preventDefault()
    const email = $("#login-email").val()
    const password = $("#login-password").val()
    $.ajax({
      method: "POST",
      url: SERVER + "user/login",
      data: {
        email,
        password
      }
    })
      .done(response => {
        const token = response.access_token
        localStorage.setItem("access_token", token)
        $("#landing-page").hide()
        $("#register-page").hide()
        $("#login-page").show()
      })
      .fail(err => {
        console.log(err)
      })
  }


// REGISTER FORM
function UserRegister() {
	$("#login-page").hide()
	$("#register-page").show()
}
// REGISTER
function register(event) {
	event.preventDefault()
	const email = $("#register-email").val()
	const password = $("#register-password").val()

	$.ajax({
		method: "POST",
		url: SERVER + "user/register",
		data: {
			email,
			password
		}
	})
		.done(response => {
			//when successfully registered
			console.log("Register success!")
			$("#login-page").show()
			$("#register-page").hide()
			$("#content-page").hide()
		})
		.fail(err => {
			console.log(err)
		})
}
