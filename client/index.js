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

function login(event) {
    event.preventDefault()
    console.log('login! clicked')


      
  
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

function loginForm(event) {
    event.preventDefault()
    console.log('loginForm! clicked')

    $('#login').show()
    $('#content').hide()
    $('#register').hide()
    $('#edit-content').hide()
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

            Toast.fire({
                icon: 'success',
                title: 'your account has been registered'
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
                <a href="#">
                <div class="card-body a">
                        <h5 class="card-title ">${el.title}</h5>
                        
                        <h6 class="card-subtitle mb-2 " style="font-size: .9rem;">${el.due_date}</h6>
                        <p class="card-text">${el.description}</p>



                        <div id="check" class="btn-group btn-group-sm btn-group-toggle" data-toggle="buttons">
                            <label class="btn btn-${el.status ? 'success' : 'secondary'} active">
                                <input type="checkbox" onclick='updateStatus(${el.status}, ${el.id})' id="status" ${el.status ? 'checked' : 'unchecked'} autocomplete="off">${el.status ? 'Done' : 'On Progress'}
                            </label>
                        </div>

                        
                        <button type="submit" class="btn btn-outline-warning btn-sm" data-toggle="modal" data-target="#edit-content" onclick='editTodoForm(event, ${el.id}, ${el.status})'>Edit</button>
                        <button  type="submit" onclick='remove(event, ${el.id})' class="btn btn-outline-danger btn-sm test" >Delete</button>
                        
                </div>
                
                </a>
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
    // $('#content').hide()
    // $('#login').hide()
    // $('#register').hide()
    

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
            $('.modal-backdrop').show();
            $('#edit-content').empty()
            $('#edit-content').append(`
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title" style="color: #38d39f">Todo Edit</h1>
                    </div> 
                    
                        <!-- Todo Edit -->
                        <div class="modal-body">
                            <form class="form-group" onsubmit="editTodo(event, ${res.id}, ${res.status})">
                                <label for="title-edit">
                                    Title
                                </label><br>
                                <input 
                                    class="form-control text-success"
                                    type="text"
                                    id="title-edit"
                                    value="${res.title}"
                                ><br>
                        
                                <label for="description-edit">
                                    Description
                                </label><br>
                                <input 
                                    class="form-control text-success"
                                    type="text"
                                    id="description-edit"
                                    value="${res.description}"
                                ><br>

                                <label for="due-date-edit">
                                    Due date
                                </label><br>
                                <input 
                                    class="form-control text-success"
                                    type="date"
                                    id="due-date-edit"
                                    value="${res.due_date}"
                                ><br>

                                
                                <button type="submit" class="btn btn-success" data-backdrop="false">Edit Todo</button>
                                <button type="submit" class="btn btn-outline-danger" data-dismiss="modal" data-backdrop="false" onclick="cancel(event)">Cancel</button>
                                
                            </form>
                        </div>
                </div>
            </div>
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

            $('.modal-backdrop').hide();

            Toast.fire({
                icon: 'success',
                title: 'Edit has been saved'
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

    $('.modal-backdrop').hide();
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
        confirmButtonColor: '#38d39f',
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

