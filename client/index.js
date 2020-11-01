const SERVER = "http://localhost:3000/"



$(document).ready(function () {
    const token = localStorage.getItem("access_token")
    if (token) {
      $("#login-page").show()
      $("#register-page").hide()
   
    } else {
      $("#landing-page").show()
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