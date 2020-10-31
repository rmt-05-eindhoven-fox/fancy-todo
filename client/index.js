const server = 'http://localhost:3000';

// ! SETUP ON REFRESH

$('.btn').click(e => {
  e.preventDefault();
})


$(document).ready(() => {
  const token = localStorage.getItem('token');
  // console.log(token);
  if(token) {
    $('#home-page').hide()
    $('#user-page').show()
    getTodos();            
  } else {
    $('#home-page').show()
    $('#user-page').hide()    
  }
});

// ! SIGN UP FUNCTION

function signUp(e) {
  e.preventDefault();
  const name = $('#signUpName').val();
  const email = $('#signUpEmail').val();
  const password = $('#signUpPassword').val();
  $.ajax({
    method: "post",
    url: server + '/register',
    data: {
      email,
      password
    }
  })
    .done(response => {
      $('#exampleModal').modal('toggle');
      setTimeout(() => {
        $('#exampleModal2').modal('toggle');
      }, 1000);
    })
    .fail(err => {
      console.log(err);
    })
  // console.log(name, email);
}


// ! ALL SIGN IN RESPONSE

function completeSignIn (token) {
  // console.log(token);
  localStorage.setItem('token', token);
  $('#home-page').hide()
  $('#user-page').show() 
  $('#signOut').show();
  getTodos();
}


// ! SIGN IN FUNCTION

function signIn(e) {
  e.preventDefault();

  const email = $('#signInEmail').val();
  const password = $('#signInPassword').val();

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
      completeSignIn(response.accessToken);
    })
    .fail(err => {
      console.log(err);
    })
  // console.log(name, email);
}

// ! GOOGLE SIGN IN

function onSignIn(googleUser) {
  let profile = googleUser.getBasicProfile();
  const name = profile.getName();
  const email = profile.getEmail();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  let google_access_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: 'post',
    url: server + '/register',
    headers: {
      google_access_token
    }
  })
    .done(response => {
        if($('#exampleModal').attr('aria-hidden') == 'true') {
          $('#exampleModal2').modal('toggle');
        } else if ($('#exampleModal2').attr('aria-hidden') == 'true') {
          $('#exampleModal').modal('toggle');
        }
        setTimeout(() => {
          $('#modal-password').click();
        }, 1000)

        localStorage.setItem('name', name);
        localStorage.setItem('email', email);

        function signOut() {
          var auth2 = gapi.auth2.getAuthInstance();
          auth2.signOut().then(function () {
            console.log('User signed out.');
          });
        }
        signOut().catch(err => {
          console.log(err);
        });
    })
    .fail(err => {
      console.log(err);
    })
}


// ! THIRD PARTY SIGN IN AFTER INPUT PASSWORD

function tryRegister(e) {
  if (e) {
    e.preventDefault(); 
  }
  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');
  localStorage.clear();
  const password = $('#thirdPartyPassword').val();

  
  $.ajax({
    method: "post",
    url: server + '/register',
    data: {
      email,
      password,
      thirdPartyLogin: true
    },
    success: loginThirdParty(email, password)
  })
    .fail(err => console.log(err));

}

function loginThirdParty(email, password) {
  console.log(password);
  setTimeout(() => {
    $.ajax({
      method: 'post',
      url: server + '/login',
      data: {
        email,
        password
      }
  })
  .done(response => {
    // console.log(response);
    completeSignIn(response.accessToken);
  })
  .fail(err => console.log(err));

  }, 7000);
}

// ! SIGN OUT FUNCTION

function signOut(e) {
  e.preventDefault();
  localStorage.clear();
  $('#signOut').hide();
  $('#home-page').show();
  $('#user-page').hide()    
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
      // console.log(response)
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
              <button class="btn btn-light" onclick="deleteTodo(event,${todo.id})">
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
      console.log(err);
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
  console.log(date);
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
      console.log(response);
      getTodos(e);
    })
    .fail(err => {
      console.log(err);
    });
}

// ! GET TODOS WHEN CLICKED IN DIV USER TODO

$(window).on('click', e => {
  if ($('#user-todo').is(':visible') && e.target.id === 'todos') {
    getTodos(e);
  }
  // console.log(a);
})

// ! REPLACE CONTENT WITH FORM

function replaceContent(e, id) {
  e.preventDefault();
  
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
      console.log(err);
    })

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
    .done(() => getTodos(e))
    .fail(err => {
      console.log(err);
    })
}

// ! TODO DONE

function doneTodo(e, id) {
  if(e) {
    e.preventDefault();
  }

  const token = localStorage.getItem('token');
  let status = $(`#status${id}`).val();
  console.log(status);
  if(status == 'false') {
    status = true;
    console.log(status);
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
    .done(() => getTodos(e))
    .fail(err => console.log(err));
}

// ! DELETE TODO

function deleteTodo(e, id) {
  if (e) e.preventDefault();
  const token = localStorage.getItem('token');

  $.ajax({
    method: 'delete',
    url: server + `/todos/${id}`,
    headers: {
      access_token: token
    }
  })
    .done(() => getTodos(e))
    .fail(err => console.log(err));
}

// ! SIDEBAR TOGGLE
$("#toggle-anchor").click(function (e) { 
  e.preventDefault();
  $('#sidebar').animate({ width: 'toggle', opacity: 'show' }, {
    duration: 'slow'
  });
});

// ! CALENDAR FUNCTION

$('#calendar').fullCalendar({
  header: {
    left: 'prev,next today',
    center: 'title',
    right: 'month,agendaWeek,agendaDay,listWeek'
  },
  defaultDate: '2019-01-12',
  navLinks: true, // can click day/week names to navigate views
  editable: true,
  eventLimit: true, // allow "more" link when too many events
  events: [
    {
      title: 'All Day Event',
      start: '2019-01-01',
    },
    {
      title: 'Long Event',
      start: '2019-01-07',
      end: '2019-01-10'
    },
    {
      id: 999,
      title: 'Repeating Event',
      start: '2019-01-09T16:00:00'
    },
    {
      id: 999,
      title: 'Repeating Event',
      start: '2019-01-16T16:00:00'
    },
    {
      title: 'Conference',
      start: '2019-01-11',
      end: '2019-01-13'
    },
    {
      title: 'Meeting',
      start: '2019-01-12T10:30:00',
      end: '2019-01-12T12:30:00'
    },
    {
      title: 'Lunch',
      start: '2019-01-12T12:00:00'
    },
    {
      title: 'Meeting',
      start: '2019-01-12T14:30:00'
    },
    {
      title: 'Happy Hour',
      start: '2019-01-12T17:30:00'
    },
    {
      title: 'Dinner',
      start: '2019-01-12T20:00:00'
    },
    {
      title: 'Birthday Party',
      start: '2019-01-13T07:00:00'
    },
    {
      title: 'Click for Google',
      url: 'http://google.com/',
      start: '2019-01-28'
    }
  ]
});


