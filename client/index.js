const SERVER = 'http://localhost:3000'

$(document).ready(function() {
    const access_token = localStorage.getItem('access_token')
    if(access_token) {
        $('#content').show()
        $('#login').hide()
        $('#register').hide()
        $('#edit-content').hide()
        fetchTodo()

    } else {
        $('#login').show()
        $('#content').hide()
        $('#register').hide()
        $('#edit-content').hide()
    }

})


function login(event) {
    event.preventDefault()
    console.log('login! clicked')

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
  
    const email = $('#login-email').val()
    const password = $('#login-password').val()

    $.ajax({
        method: "POST",
        url: SERVER + '/login',
        data: {
            email,
            password
        }
    })
        .done(res => {
            const access_token = res.access_token
            localStorage.setItem('access_token', access_token)
            $('#content').show()
            $('#login').hide()
            $('#register').hide()
            $('#edit-content').hide()

            $('#login-email').val('')
            $('#login-password').val('')

            fetchTodo()

            Toast.fire({
                icon: 'success',
                title: 'Log in successfully'
              })
        })
        .fail(err => {
            console.log(err.responseJSON.msg)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.responseJSON.msg
            })
        })
}

function onSignIn(googleUser) {
    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

    let access_token = googleUser.getAuthResponse().id_token;
    // console.log(access_token)

    //verify di backend

    $.ajax({
        method: "POST",
        url: SERVER + '/googleLogin',
        data: {
            access_token
        }
    })
        .done(res => {
            const access_token = res.access_token
            localStorage.setItem('access_token', access_token)
            $('#content').show()
            $('#login').hide()
            $('#register').hide()
            $('#edit-content').hide()

            $('#login-email').val('')
            $('#login-password').val('')

            fetchTodo()

            Toast.fire({
                icon: 'success',
                title: 'Log in successfully'
              })
        })
        .fail(err => {
            console.log(err)
        })
  }

function registerForm(event) {
    event.preventDefault()
    console.log('registerForm! clicked')

    $('#register').show()
    $('#content').hide()
    $('#login').hide()
    $('#edit-content').hide()
}

function register(event) {
    event.preventDefault()
    console.log('register! clicked')
  

    const email = $('#register-email').val()
    const password = $('#register-password').val()
    console.log(email, password)

    $.ajax({
        method: "POST",
        url: SERVER + '/register',
        data: {
            email,
            password
        }
    })
        .done(res => {
            console.log(res)
            $('#login').show()
            $('#content').hide()
            $('#register').hide()
            $('#edit-content').hide()
        })
        .fail(err => {
            console.log(err.responseJSON.msg)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.responseJSON.msg
            })
        })
}

function logout() {
    $('#login').show()
    $('#register').hide()
    $('#content').hide()
    $('#edit-content').hide()
    localStorage.removeItem('access_token')

    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Log out successfully'
      })


}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

function fetchTodo() {
    const access_token = localStorage.getItem('access_token')
    $.ajax({
        method: "GET",
        url: SERVER + '/todos',
        headers: {
            access_token: access_token
        }
    })
        .done(res => {
            // console.log(res)
            $('#todoList').empty()
            res.forEach(el => {
                $('#todoList').append(`
                <tr>
                    <td>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" onclick='updateStatus(${el.status}, ${el.id})' id="status" ${el.status ? 'checked' : 'unchecked'}>
                    </div>
                    </td>
                    <td>${el.title}</td>
                    <td>${el.description}</td>
                    <td>${el.due_date}</td>
                    <td><button type="submit" class="btn btn-primary" onclick='editTodoForm(event, ${el.id}, ${el.status})'>Edit</button></td>
                    <td><button type="submit" onclick='remove(event, ${el.id})' class="btn btn-danger" >Delete</button></td>
                </tr>
                `)
            })
          
        })
        .fail(err => {
            console.log(err.responseJSON.msg)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.responseJSON.msg
            })
        })
}

function addTodo(event) {
    event.preventDefault()
    console.log('addTodo! clicked')

    const title = $('#title-form').val()
    const description = $('#description-form').val()
    const due_date = $('#due-date-form').val()

    // console.log(title, description, due_date)

    const access_token = localStorage.getItem('access_token')
    $.ajax({
        method: "POST",
        url: SERVER + '/todos',
        data: {
            title,
            description,
            due_date
        },
        headers: {
            access_token: access_token
        }
    })
        .done(res => {
            fetchTodo()
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Add Todo successfully'
            })
        })
        .fail(err => {
            console.log(err.responseJSON.msg)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.responseJSON.msg
            })
        })
}

function updateStatus(status, id) {
    console.log('status clicked!')

    const access_token = localStorage.getItem('access_token')
    $.ajax({
        method: "PATCH",
        url: SERVER + `/todos/${id}`,
        data: {
            status: (status) ? false : true
        },
        headers: {
            access_token: access_token
        }
    })
        .done(res => {
            fetchTodo()
        })
        .fail(err => {
            console.log(err.responseJSON.msg)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.responseJSON.msg
            })
        })
}

function editTodoForm(event, id, status) {
    event.preventDefault()
    console.log('editForm clicked!')

    $('#edit-content').show()
    $('#content').hide()
    $('#login').hide()
    $('#register').hide()

    const access_token = localStorage.getItem('access_token')
    $.ajax({
        method: "GET",
        url: SERVER + `/todos/${id}`,
        headers: {
            access_token: access_token
        }
    })
        .done(res => {
            console.log(res)
            $('#edit-content').empty()
            $('#edit-content').append(`
                <h1>Todo Edit</h1>
                    <!-- Todo Edit -->
                    <form onsubmit="editTodo(event, ${res.id}, ${res.status})">
                        <label for="title-edit">
                            Title
                        </label><br>
                        <input 
                            type="text"
                            id="title-edit"
                            value="${res.title}"
                        ><br>
                
                        <label for="description-edit">
                            Description
                        </label><br>
                        <input 
                            type="text"
                            id="description-edit"
                            value="${res.description}"
                        ><br>

                        <label for="due-date-edit">
                            Due date
                        </label><br>
                        <input 
                            type="date"
                            id="due-date-edit"
                            value="${res.due_date}"
                        ><br>
                
                        <button type="submit" class="btn btn-primary">Edit Todo</button>
                        <button type="submit" class="btn btn-danger" onclick="cancel(event)">Cancel</button>
                    </form>
            `)
            
        })
        .fail(err => {
            console.log(err.responseJSON.msg)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.responseJSON.msg
            })
        })

}

function editTodo(event, id, status) {
    event.preventDefault()
    console.log('edit clicked!')


    const title = $('#title-edit').val()
    const description = $('#description-edit').val()
    const due_date = $('#due-date-edit').val()
   
    console.log(id, title, description, due_date, status)
    
    const access_token = localStorage.getItem('access_token')
    $.ajax({
        method: "PUT",
        url: SERVER + `/todos/${id}`,
        data: {
            title,
            description,
            due_date,
            status
        },
        headers: {
            access_token: access_token
        }
    })
        .done(res => {
            $('#content').show()
            $('#edit-content').hide()
            $('#login').hide()
            $('#register').hide()
            fetchTodo()

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Edit has been saved',
                showConfirmButton: false,
                timer: 1500
              })
        })
        .fail(err => {
            console.log(err.responseJSON.msg)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.responseJSON.msg
            })
        })
}

function cancel(event) {
    event.preventDefault()
    console.log('cancel clicked')
    $('#content').show()
    $('#edit-content').hide()
    $('#login').hide()
    $('#register').hide()
}

function remove(event, id) {
    event.preventDefault()
    console.log('delete clicked')

    const access_token = localStorage.getItem('access_token')
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )

          $.ajax({
            method: "DELETE",
            url: SERVER + `/todos/${id}`,
            headers: {
                access_token: access_token
            }
        })
        .done(res => {
            console.log('deleted successfully')
            fetchTodo()
        })
        .fail(err => {
            console.log(err.responseJSON.msg)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.responseJSON.msg
            })
        })
        }
      })
    
}

