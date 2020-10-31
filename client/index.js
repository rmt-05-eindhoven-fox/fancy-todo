const baseUrl = "http://localhost:3000";

$(document).ready(() => {
    initScreen()
})

$("#register").click(function () {
    initRegister()
})

$("#login").click(function () {
    initLogin()
})

function logout() {
    var auth2 = gapi.auth2.getAuthInstance();
    localStorage.clear("token");
    initScreen()
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

function initScreen() {
    if(localStorage.getItem("token")){
        screen("project")
    }else{
        initLogin()
    }    
}

function initLogin() {
    screen("login")   
}

function initRegister() {
    screen("register")
}

function initTodo(projectId) {
    $("#todo_project_id").val(projectId)
    screen("todo")    
}

function screen(mode) {
    $("#form-register,#form-login,#home,#register-login,#section-project,#section-todo").hide()
    if(mode==="login"){
        $("#register-login").show()
        $("#form-login").show()        
    }else if(mode==="register"){
        $("#register-login").show()        
        $("#form-register").show()        
    }else if(mode==="project"){
        $("#home,#section-project").show()           
        listProject()
    }else if(mode==="todo"){
        $("#home,#section-todo").show()
        getTodoList()
    }
}

function login() {
    let email = $("#login-email").val()
    let password = $("#login-password").val()

    $.ajax(`${baseUrl}/users/login`, {
        type: 'POST',
        data: {
	        email:email,
	        password:password
        },
        success: function (data) {
            localStorage.setItem("token", data.token)
            initScreen()
        },
        error: function (error) {
            showErrorMessage(error)
        }
    });
}

function register(){
    let email = $("#register-email").val()
    let password = $("#register-password").val()
    
    $.ajax(`${baseUrl}/users/register`, {
        type: 'POST',
        data: {
	        email:email,
	        password:password
        },
        success: function (data) {
            if(data.status)
                toastr.success(data.message);
            else
                toastr.error(data.message);
            
            initLogin()            
        },
        error: function (error) {
            showErrorMessage(error)                        
        }
    });
}

function addProject(params) {
    let name = $("#project_name").val()
    let status = $("#project_status").val()
    
    $.ajax(`${baseUrl}/projects`, {
        type: 'POST',
        headers: {
            'token':localStorage.getItem("token"),
        },
        data: {
	        name:name,
	        status:status,            
        },
        success: function (data) {
            if(data.status)
                toastr.success(data.message);
            else
                toastr.error(data.message);
    
            $('#ModalAddProject').modal('hide');
            listProject()
        },
        error: function (error) {
            showErrorMessage(error)            
            listProject()
        }
    });
}

function addMembers(params) {
    
}

function listProject() {    
    $.ajax(`${baseUrl}/projects`, {
        type: 'GET',
        headers: {
            'token':localStorage.getItem("token"),
        },
        data: {},
        success: function (data) {
            $("#list-project").html("")
            if(data){                
                let pojectList = data.data;
                for(let i=0;i<pojectList.length;i++){
                    $("#list-project").append(
                        `<div class="list-group-item list-group-item-action flex-column align-items-start" >
                            <div class="d-flex w-100 justify-content-between ">
                                <a href="#" onclick="initTodo(${pojectList[i].id})"><h5 class="mb-2 h5">${pojectList[i].project_name}</h5></a>
                                <small>${pojectList[i].project_status}</small>
                            </div>                            
                            <small class="mb-2">
                                <button type="button" class="btn btn-sm btn-deep-purple" data-toggle="modal" data-target="#ModalAddMember" onclick="addMember(${pojectList[i].id})">Members</button>            
                                <button type="button" class="btn btn-danger btn-sm float-right" onclick="deleteProject(${pojectList[i].id})">Delete</button>
                                <button type="button" class="btn btn-cyan btn-sm float-right" onclick="getProjectById(${pojectList[i].id})">Edit</button>
                            </small>
                        </div>`
                    )
                }
            }            
        },
        error: function (error) {
            $("#list-project").html("")          
        }
    });
}


function deleteProject(ProjectId) {
    $.ajax(`${baseUrl}/projects/${ProjectId}`, {
        type: 'DELETE',
        headers: {
            'token':localStorage.getItem("token"),
        },
        data: {},
        success: function (data) {
            if(data.status)
                toastr.success(data.message);
            else
                toastr.error(data.message);
    
            $('#ModalAddProject').modal('hide');
            listProject()
        },
        error: function (error) {
            showErrorMessage(error)            
            listProject()
        }
    });
}

function getProjectById(ProjectId) {
    $.ajax(`${baseUrl}/projects/${ProjectId}`, {
        type: 'GET',
        headers: {
            'token':localStorage.getItem("token"),
        },
        data: {},
        success: function (data) {
            if(data.status){
                $("#project_name_edit").val(data.data.project_name)
                $("#project_status_edit").val(data.data.project_status)
                $("#project_id_edit").val(data.data.id)
                $('#ModalEditProject').modal('show')
            }
        },
        error: function (error) {
            showErrorMessage(error)          
        }
    });
}

function updateProject() {
    let name = $("#project_name_edit").val()
    let status = $("#project_status_edit").val()
    let projectId = $("#project_id_edit").val()

    $.ajax(`${baseUrl}/projects/${projectId}`, {
        type: 'PUT',
        headers: {
            'token':localStorage.getItem("token"),
        },
        data: {
	        name:name,
	        status:status,            
        },
        success: function (data) {
            if(data.status)
                toastr.success(data.message);
            else
                toastr.error(data.message);
    
            $('#ModalEditProject').modal('hide');
            listProject()
        },
        error: function (error) {
            showErrorMessage(error)           
            listProject()
        }
    });
}

function addMember(projectId) {
    $("#project_id").val(projectId)
    getMemberProject(projectId)
}

function saveMember() {
    let userEmail = $("#user_email").val()
    let projectId = $("#project_id").val()
    
    $.ajax(`${baseUrl}/members`, {
        type: 'POST',
        headers: {
            'token':localStorage.getItem("token"),
        },
        data: {
	        user_email:userEmail,
	        project_id:projectId            
        },
        success: function (data) {
            if(data.status)
                toastr.success(data.message);
            else
                toastr.error(data.message);
        
            getMemberProject(projectId)       
        },
        error: function (error) {
            getMemberProject(projectId)
            showErrorMessage(error)            
        }
    });
}

function getMemberProject(ProjectId) {
    $.ajax(`${baseUrl}/projects/${ProjectId}`, {
        type: 'GET',
        headers: {
            'token':localStorage.getItem("token"),
        },
        data: {},
        success: function (data) {
            $("#table-member").html("")
            if(data.status){
                let pojectMember = data.data.members;
                for(let i=0;i<pojectMember.length;i++){
                    $("#table-member").append(
                        `
                            <tr>
                                <th scope="row">${i+1}</th>
                                <td>${pojectMember[i].user.email}</td>
                                <td>${pojectMember[i].member_status}</td>
                                <td>
                                    <button type="button" class="btn btn-danger btn-sm m-0" onclick="deleteMember(${ProjectId},${pojectMember[i].user_id})">Delete</button>
                                </td>
                            </tr>
                        `
                    )
                }
            }
        },
        error: function (error) {
            $("#table-member").html("")
            showErrorMessage(error)          
        }
    });
}

function showErrorMessage(error) {
    if(Array.isArray(error.responseJSON.message)){
        toastr.error(error.responseJSON.message.join());
    }else{
        toastr.error(error.responseJSON.message);
    }
}

function deleteMember(ProjectId,UserId) {
    $.ajax(`${baseUrl}/members/${ProjectId}/${UserId}`, {
        type: 'DELETE',
        headers: {
            'token':localStorage.getItem("token"),
        },
        data: {},
        success: function (data) {
            if(data.status)
                toastr.success(data.message);
            else
                toastr.error(data.message);
    
            getMemberProject(ProjectId)
        },
        error: function (error) {
            showErrorMessage(error)            
            getMemberProject(ProjectId)
        }
    });
}

function saveTodo() {
    let title = $("#todo_title").val()
    let description = $("#todo_description").val()
    let status = $("#todo_status").val()    
    let due_date = $("#todo_due_date").val()    
    let project_id = $("#todo_project_id").val()   
    
    $.ajax(`${baseUrl}/todos`, {
        type: 'POST',
        headers: {
            'token':localStorage.getItem("token"),
        },
        data: {
	        title:title,
	        description:description,
            status:status,
            due_date:due_date,
            project_id:project_id           
        },
        success: function (data) {
            if(data.status)
                toastr.success(data.message);
            else
                toastr.error(data.message);
        
            getTodoList()       
        },
        error: function (error) {
            showErrorMessage(error)
            getTodoList()
                        
        }
    });
}


function getTodoList() {
    let project_id = $("#todo_project_id").val()   
    
    $.ajax(`${baseUrl}/todos/project/${project_id}`, {
        type: 'GET',
        headers: {
            'token':localStorage.getItem("token"),
        },
        data: {},
        success: function (data) {
            resetCardSortable()
            if(data.status){
                let todoList = data.data;
                for(let i=0;i<todoList.length;i++){

                    var todoCard = `
                            <li id="${todoList[i].id}" data-todo="${todoList[i].id}" class="todo-id">
                            <div class="card">
                            <div class="card-body">
                                <h6 class="card-title">${todoList[i].title}</h6>
                                <hr>
                                <p class="card-text">${todoList[i].description}</p>
                            </div>
                            <div class="rounded-bottom mdb-color text-center pt-3" style="padding-bottom:10px">
                                <ul class="list-unstyled list-inline font-small">
                                <li class="list-inline-item pr-2 white-text"><i class="far fa-clock pr-1"></i>                                
                                ${moment(todoList[i].due_date).format("YYYY-MM-DD")}
                                </li>
                                <li class="list-inline-item pr-2"><a href="#" class="blue-text" onclick="getTodoById(${todoList[i].id})">Edit</a></li>
                                <li class="list-inline-item pr-2"><a href="#" class="red-text" onclick="deleteTodo(${todoList[i].id})">Delete</a></li>
                                </ul>
                            </div>
                            </div>
                            </li>
                            `
                    if(todoList[i].status === "New"){
                        $("#col-new").append(
                            todoCard
                        )
                    }else if(todoList[i].status === "Inprogress"){
                        $("#col-inprogress").append(
                            todoCard
                        )
                    }else if(todoList[i].status === "Done"){
                        $("#col-done").append(
                            todoCard
                        )
                    }
                }
            }
        },
        error: function (error) {
            resetCardSortable()          
            showErrorMessage(error)          
        }
    });
}

function resetCardSortable() {
    $("#card-new,#card-inprogress,#card-done").empty()
    $("#card-new").append(`<ul id="col-new" class="draggable status-id" data-id="New"></ul>`)
    $("#card-inprogress").append(`<ul id="col-inprogress" class="draggable status-id" data-id="Inprogress"></ul>`)
    $("#card-done").append(`<ul id="col-done" class="draggable status-id" data-id="Done"></ul>`)
    activateTodo()
}


function deleteTodo(TodoId) {
    $.ajax(`${baseUrl}/todos/${TodoId}`, {
        type: 'DELETE',
        headers: {
            'token':localStorage.getItem("token"),
        },
        data: {},
        success: function (data) {
            if(data.status)
                toastr.success(data.message);
            else
                toastr.error(data.message);
        
            getTodoList()
        },
        error: function (error) {
            showErrorMessage(error)            
            getTodoList()
        }
    });
}

function updateTodoStatus(TodoId,Status) {
    $.ajax(`${baseUrl}/todos/${TodoId}`, {
        type: 'PATCH',
        headers: {
            'token':localStorage.getItem("token"),
        },
        data: {
            status:Status
        },
        success: function (data) {
            if(data.status)
                toastr.success(data.message);
            else
                toastr.error(data.message);
        
            getTodoList()
        },
        error: function (error) {
            showErrorMessage(error)            
            getTodoList()
        }
    });
}

function getTodoById(TodoId) {
    $.ajax(`${baseUrl}/todos/${TodoId}`, {
        type: 'GET',
        headers: {
            'token':localStorage.getItem("token"),
        },
        data: {},
        success: function (data) {
            if(data.status){
                console.log(moment(data.data.due_date).format("YYYY-MM-DD"));
                $("#todo_id").val(data.data.id)
                $("#todo_title_edit").val(data.data.title)
                $("#todo_description_edit").val(data.data.description)
                $("#todo_status_edit").val(data.data.status)
                $("#todo_due_date_edit").val(`${moment(data.data.due_date).format("YYYY-MM-DD")}`)
                $('#ModalEditTodo').modal('show')
            }
        },
        error: function (error) {
            showErrorMessage(error)          
        }
    });
}

function updateTodo() {
    let todo_id = $("#todo_id").val() 
    let title = $("#todo_title_edit").val()
    let description = $("#todo_description_edit").val()
    let status = $("#todo_status_edit").val()    
    let due_date = $("#todo_due_date_edit").val()    
    let project_id = $("#todo_project_id_edit").val()   
    
    $.ajax(`${baseUrl}/todos/${todo_id}`, {
        type: 'PUT',
        headers: {
            'token':localStorage.getItem("token"),
        },
        data: {
	        title:title,
	        description:description,
            status:status,
            due_date:due_date,
            project_id:project_id           
        },
        success: function (data) {
            if(data.status)
                toastr.success(data.message);
            else
                toastr.error(data.message);
        
            getTodoList()       
        },
        error: function (error) {
            showErrorMessage(error)
            getTodoList()
                        
        }
    });
}

function onSignIn(googleUser) {
  var google_access_token = googleUser.getAuthResponse().id_token;
  console.log(google_access_token);

  $.ajax({
    method: 'POST',
    url: baseUrl + '/googlelogin',
    headers: {
      google_access_token
    }
  })
    .done(response => {
        console.log(response);
      localStorage.setItem('token', response.token)
      initScreen()
    })
    .fail(err => {
      console.log(err)
    })
}


// function signOut() {
//   var auth2 = gapi.auth2.getAuthInstance();
//   localStorage.clear('token')
//   $("#content").hide()
//   allContent()
//   auth2.signOut().then(function () {
//     console.log('User signed out.');
//   });
// }



