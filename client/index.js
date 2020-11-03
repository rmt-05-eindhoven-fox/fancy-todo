const server = 'https://my-fancy-todos.herokuapp.com';


// ! SETUP ON REFRESH
$(document).ready(() => {
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name')
  if(token) {
    $('#home-page').hide()
    $('#user-page').show()
    $('#fullname').empty();
    $('#fullname').append(`Hello ${name}!`)  
    $('#signOut').show()    
    getTodos();
    getCalendar();            
  } else {
    $('#user-page').hide()
    $('#signOut').hide()    
    $('#home-page').show()
  }
});

$('.btn').click(e => {
  e.preventDefault();
})



$('#list-calendar-list').click(e => {
  getCalendar(e);
})

// ! SWAL button client

function errorHandler (error) {
  Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: `${error}`,
})
}

function todo (message) {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: 1500
  })
}

function confirmSignOut(e) {
  Swal.fire({
    title: 'Are you sure?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes!'
  }).then((result) => {
    if (result.isConfirmed) {
      signOut(e);
    }
  })
}

function confirmDelete(e, id) {
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
      deleteTodo(e, id);
      Swal.fire(
        'Deleted!',
        'Your todo has been deleted.',
        'success'
      )
    }
  })
}

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


// ! SIGN UP FUNCTION

function signUp(e) {
  e.preventDefault();
  Swal.showLoading();
  const name = $('#signUpName').val();
  const email = $('#signUpEmail').val();
  const password = $('#signUpPassword').val();
  $.ajax({
    method: "post",
    url: server + '/register',
    data: {
      name,
      email,
      password
    }
  })
    .done(response => {
      Swal.close();
      $('#exampleModal').modal('toggle');
      setTimeout(() => {
        $('#exampleModal2').modal('toggle');
      }, 1000);
      $('#sign-up-form').trigger('reset');
    })
    .fail(err => {
      Swal.close(); 
      errorHandler(err.responseJSON.error);
    })
}


// ! ALL SIGN IN RESPONSE

function completeSignIn (token, name) {
  Swal.hideLoading(); 
  Toast.fire({
    icon: 'success',
    title: 'Signed in successfully'
  });
  localStorage.setItem('name', name);  
  localStorage.setItem('token', token);
  $('#fullname').empty();
  $('#fullname').append(`Hello ${name}!`)
  $('#home-page').hide()
  $('#user-page').show() 
  $('#signOut').show();
  getTodos();
  getCalendar();
}


// ! SIGN IN FUNCTION

function signIn(e, password) {
  let email;
  if(e) {
    e.preventDefault();
    Swal.showLoading();
    email = $('#signInEmail').val();
    password = $('#signInPassword').val();
  } else {
    email = localStorage.email;
    localStorage.clear();
  }



  $.ajax({
    method: "post",
    url: server + '/login',
    data: {
      email,
      password
    }
  })
    .done(response => {
      // console.log(response);    
      completeSignIn(response.accessToken, response.name);
    })
    .fail(err => {
      // console.log(err);
      errorHandler(err.responseJSON.error);
    })
  // console.log(name, email);
}

// ! GOOGLE SIGN IN

function onSignIn(googleUser) {
  if($('#exampleModal').attr('aria-hidden') == 'true') {
    $('#exampleModal2').modal('toggle');
  } else if ($('#exampleModal2').attr('aria-hidden') == 'true') {
    $('#exampleModal').modal('toggle');
  }
  Swal.showLoading();
  let google_access_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: 'post',
    url: server + '/login/google',
    headers: {
      google_access_token
    }
  })
    .done(response => {
      Swal.close();
      if(response.accessToken) {
        completeSignIn(response.accessToken, response.name);
      } else {
        setTimeout(() => {
          $('#modal-password').click();
        }, 1000)
        
        localStorage.setItem('name', response.name);
        localStorage.setItem('email', response.email);
      }


        function signOut() {
          var auth2 = gapi.auth2.getAuthInstance();
          auth2.signOut().then(function () {
            console.log('User signed out.');
          });
        }
        signOut();
    })
    .fail(err => {
      Swal.close();
      errorHandler(err.responseJSON.error);
    })
}

// ! THIRD PARTY SIGN IN AFTER INPUT PASSWORD

function tryRegister(e) {
  if (e) {
    e.preventDefault(); 
  }
  Swal.showLoading();
  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');
  // localStorage.clear();
  const password = $('#thirdPartyPassword').val();
  $('#thirdPartyPassword').val('');
  
  $.ajax({
    method: "post",
    url: server + '/register',
    data: {
      name,
      email,
      password
    },
  })
    .done(response => {
      signIn(null, password);
    })
    .fail(err => {
      console.log(err);
      errorHandler(err.responseJSON.error);
    });

}

// ! SIGN OUT FUNCTION

function signOut(e) {
  e.preventDefault();
  localStorage.clear();
  $('#signOut').hide();
  $('#fullname').empty();
  $('#home-page').show();
  $('#user-page').hide();
  $('input').val('');    
}

// ! GET TODOS

function getTodos(e) {
  if (e) {
    e.preventDefault();
  }

  const token = localStorage.getItem('token');

  $.ajax({
    method: 'get',
    url: server + '/todos',
    headers: {
      access_token: token
    } 
  })
    .done(response => {
      $('#accordion').empty();
      response.sort(function (a, b) {
        if (a.status || b.status) {
          return 1;
        } else {
          return Math.abs(Date.now() - new Date(a.due_date)) - Math.abs(Date.now() - new Date(b.due_date));
        }
      });
      response.forEach(todo => {
        $('#accordion').append(
        `<div class="card mt-2" id="${todo.id}">
          <div class="card-header d-flex bg-dark justify-content-between" id="heading${todo.id}">
            <h5 class="mb-0">
              <button class="btn text-white" data-toggle="collapse" data-target="#collapse${todo.id}" aria-expanded="true" aria-controls="collapse${todo.id}" id="title${todo.id}">
                ${todo.status ? `<del>${todo.title}</del?` : todo.title}
              </button>
              <button disabled="disabled" class="btn bg-white text-dark d-inline-flex">
                <span>
                  <img src="/assets/calendar-2x.png" alt="cal"> 
                </span>
                <span class="mx-2" id="due_date${todo.id}">
                  ${todo.due_date}
                </span>
              </button>
            </h5>
            <h5 class="mb-0">
              <button class="btn btn-light" onclick="replaceContent(event,${todo.id})">
                <img src="/assets/pencil-2x.png" alt="">
              </button>
              <button class="btn btn-light" onclick="doneTodo(event,${todo.id})" value="${todo.status}" id="status${todo.id}">
                <img src="${todo.status ? '/assets/ban-2x.png' : '/assets/check-2x.png'}" alt="">
              </button>
              <button class="btn btn-light" onclick="confirmDelete(event,${todo.id})">
                <img src="/assets/trash-2x.png" alt="">
              </button>
            </h5>
          </div>
          <div id="collapse${todo.id}" class="collapse" aria-labelledby="heading${todo.id}" data-parent="#accordion">
            <div class="card-body" id="description${todo.id}">
              ${todo.description}
            </div>
          </div>
        </div>`
        );    
      });
    })
    .fail(err => {
      errorHandler(err.responseJSON.error);
    })
}

// ! CREATE TODO

function createTodo(e) {
  if (e) {
    e.preventDefault();
  }

  const token = localStorage.getItem('token');

  const title = $('#create-title').val();
  const description = $('#create-description').val();
  const date = $('#create-date').val();
  // console.log(date);
  $.ajax({
    method: 'post',
    url: server + '/todos',
    headers: {
      access_token: token
    },
    data: {
      title,
      description,
      due_date: date
    }
  })
    .done(response => {
      // console.log(response);
      $('input').val('');
      $('textarea').val('');
      todo('Your todo has been created');
      getTodos(e);
    })
    .fail(err => {
      $('input').val('');
      $('textarea').val('');
      errorHandler(err.responseJSON.error);
    });
}

// ! GET TODOS WHEN CLICKED IN DIV USER TODO

$(window).on('click', e => {
  if ($('#user-todo').is(':visible') && e.target.id === 'todos') {
    getTodos(e);
  }
})

// ! REPLACE CONTENT WITH FORM

function replaceContent(e, id) {
  e.preventDefault();

  let status = $(`#status${id}`).val();

  if(status == 'true') {
    Swal.fire({
      icon: 'info',
      title: 'Please undone your todo first'
    })
  } else {

    const token = localStorage.getItem('token');
  
    $.ajax({
      method: 'get',
      url: server + `/todos/${id}`,
      headers: {
        access_token: token
      } 
    })
      .done(todo => {
        $(`#title${todo.id}`).trigger('click');
        $(`#title${todo.id}`).removeAttr('data-toggle');      
        $(`#title${todo.id}`).html(
          `<input type="text" class="form-control" id="update-title${todo.id}" value="${todo.title}">`
        );
        $(`#due_date${todo.id}`).html(
          `<input class="form-control" type="date" id="update-date${todo.id}" value="${todo.due_date}">`
        );
        $(`#description${todo.id}`).html(
          `<textarea class="form-control" rows="8" id="update-desc${todo.id}">${todo.description}</textarea>`
        );
        $(`#description${todo.id}`).append(
          `
          <div class="my-2 float-right">
            <button type="button" class="btn btn-secondary btn-sm" onclick="getTodos(event)">Cancel</button>
            <button type="button" class="btn btn-primary btn-sm" onclick="updateTodo(event,${todo.id})">Save Changes</button>
          </div>`
        )
      })
      .fail(err => {
        errorHandler(err.responseJSON.error);
      });
  }
  

}

// ! UPDATE TODO

function updateTodo(e, id) {
  if(e) {
    e.preventDefault();
  }

  const token = localStorage.getItem('token');
  const title = $(`#update-title${id}`).val();
  const date = $(`#update-date${id}`).val();
  const desc = $(`#update-desc${id}`).val();

  $.ajax({
    method: 'put',
    url: server + `/todos/${id}`,
    headers: {
      access_token: token
    },
    data: {
      title,
      due_date: date,
      description: desc,
      status: false,
    }
  })
    .done(() => {
      todo('Your todo has been updated');
      getTodos(e);
    })
    .fail(err => {
      errorHandler(err.responseJSON.error);
    })
}

// ! TODO DONE

function doneTodo(e, id) {
  if(e) {
    e.preventDefault();
  }

  const token = localStorage.getItem('token');
  let status = $(`#status${id}`).val();
  // console.log(status);
  if(status == 'false') {
    status = true;
    // console.log(status);
  } else {
    status = false;
  }

  $.ajax({
    method: 'patch',
    url: server + `/todos/${id}`,
    headers: {
      access_token: token
    },
    data: {
      status
    }
  })
    .done((response) => {
      if(response.status) {
        todo('Your todo has been marked as done');
      } else {
        todo('Your todo has been undone');
      }
      getTodos(e)
    })
    .fail(err => {
      errorHandler(err.responseJSON.error);
    });
}

// ! DELETE TODO

function deleteTodo(e, id) {
  if (e) e.preventDefault();
  confirmDelete();
  const token = localStorage.getItem('token');

  $.ajax({
    method: 'delete',
    url: server + `/todos/${id}`,
    headers: {
      access_token: token
    }
  })
    .done(() => getTodos(e))
    .fail(err => {
      errorHandler(err.responseJSON.error);
    });
}

// ! SIDEBAR TOGGLE
$("#toggle-anchor").click(function (e) { 
  e.preventDefault();
  $('#sidebar').animate({ width: 'toggle', opacity: 'show' }, {
    duration: 'slow'
  });
});

// ! CALENDAR FUNCTION

function getCalendar(e) {
  if(e) {
    e.preventDefault()
  }
  const token = localStorage.getItem('token');
  const holidays = $.ajax({
    method: 'get',
    url: server + '/apis/holiday',
    headers: {
      access_token: token
    }
  });
    // .done(response => {
    //   response = response.map(el => {
      //   return {
      //     title: el.title,
      //     start: el.date,
      //     backgroundColor: 'red'
      //   }
      // })
    //   return response;
    // })
    // .fail(err => {
    //   return err.responseJSON.error;
    // });
  
  const todos = $.ajax({
    method: 'get',
    url: server + '/todos',
    headers: {
      access_token: token
    }
  });

  $.when(holidays, todos)
    .then((a, b) => {
      // console.log(a);
      a = a[0].map(el => {
        return {
          title: el.title,
          start: el.date,
          backgroundColor: 'red'
        }
      });

      b = b[0].map(el => {
        return {
          title: el.title,
          start: el.due_date,
          backgroundColor: 'blue'
        }
      });

      const events = a.concat(b);
      // console.log(events);
      // $('#calendar').empty();
      // console.log(events)
      renderCalendar(events);
    })
    .catch(err => {
      console.log(err);
      errorHandler(err.responseJSON.error);
    });
}

function renderCalendar(events) {
  const date = new Date();

  $('#calendar').replaceWith(`<div class="container mt-4" id="calendar">
  </div>`);

  $('#calendar').fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay,listWeek'
    },
    defaultDate: `${date.toISOString().split('T')[0]}`,
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    events: events
    // [
    //   {
    //     title: 'All Day Event',
    //     start: '2020-11-01',
    //     backgroundColor: 'red'
    //   },
    //   {
    //     title: 'Long Event',
    //     start: '2019-01-07',
    //     end: '2019-01-10'
    //   },
    //   {
    //     id: 999,
    //     title: 'Repeating Event',
    //     start: '2019-01-09T16:00:00'
    //   },
    //   {
    //     id: 999,
    //     title: 'Repeating Event',
    //     start: '2019-01-16T16:00:00'
    //   },
    //   {
    //     title: 'Conference',
    //     start: '2019-01-11',
    //     end: '2019-01-13'
    //   },
    //   {
    //     title: 'Meeting',
    //     start: '2019-01-12T10:30:00',
    //     end: '2019-01-12T12:30:00'
    //   },
    //   {
    //     title: 'Lunch',
    //     start: '2019-01-12T12:00:00'
    //   },
    //   {
    //     title: 'Meeting',
    //     start: '2019-01-12T14:30:00'
    //   },
    //   {
    //     title: 'Happy Hour',
    //     start: '2019-01-12T17:30:00'
    //   },
    //   {
    //     title: 'Dinner',
    //     start: '2019-01-12T20:00:00'
    //   },
    //   {
    //     title: 'Birthday Party',
    //     start: '2019-01-13T07:00:00'
    //   },
    //   {
    //     title: 'Click for Google',
    //     url: 'http://google.com/',
    //     start: '2019-01-28'
    //   }
    // ]
  });
}


