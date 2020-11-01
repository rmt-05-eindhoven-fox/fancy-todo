# FANCY TODO
## User Sign Up
#
* **URL**

  `/signup`

* **Method:**
  
   `POST` 
  
*  **URL Params**

   **Required:**
 
   `email=[string]`

   `password=[string]`

* **Data Params**

  `{
    "email": "2@gmail.com",
    "password": "123456"
}`

* **Success Response:**
  
  * **Code:** 201 Created <br />
    **Content:** `{   "id": 13,
    "email": "2@gmail.com",
    "msg": "register succes" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Log in" }`

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

  * **Code:** 500 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

* **Sample Call:**
 ```javascript
    function signup(e) {
        e.preventDefault()
        const email = $('#signup-email').val()
        const password = $('#signup-password').val()

        $.ajax({
            method:"POST",
            url: SERVER + "/signup",
            data:{
                email, 
                password
            }
        }).done(res => {
            console.log(res)
            $("#login-page").show()
            $("#signup-page").hide()
            $("#home-page").hide()
        }).fail(err => {
            console.log(err)
        })
    }
  ```

#
## User Log In
#
* **URL**

 ` /login`

* **Method:**
  
   `POST` 
  
*  **URL Params**

   **Required:**
 
   `email=[string]`
   
   `password=[string]`


* **Data Params**
```javascript
  {
    "email": "2@gmail.com",
    "password": "123456"
  }
```

* **Success Response:**
  
  * **Code:** 200 OK<br />
    **Content:** 
      `{
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQxNzcwMjl9.e9124E_EFtwI3etyrS8ABRGvPyPP6Wl1UWhowpnTkws" 
        }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Log in" }`

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

  * **Code:** 500 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

* **Sample Call:**
 ```javascript
    function login(e) {
      e.preventDefault()
      console.log("login !")
      const email = $('#login-email').val()
      const password = $('#login-password').val()

      console.log(email, password)
      $.ajax({
          method:"POST",
          url: SERVER + "/login",
          data:{
              email, 
              password
          }
      }).done(res => {
          const token = res.token
          localStorage.setItem("token", token)
          $("#login-page").hide()
          $("#signup-page").hide()
          $("#home-page").show()
          getTodo()
      }).fail(err => {
          console.log(err)
      })
    }
  ```

#
## Google Log In
#
* **URL**

  `/googleLogin`

* **Method:**
  
   `POST` 
  
*  **URL Params**

   `None`
    
* **Required:**

  * **Headers:**  <br />
    `{
      token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQxNzcwMjl9.e9124E_EFtwI3etyrS8ABRGvPyPP6Wl1UWhowpnTkws
    }`

*  **Data Params**

   `None`
    
* **Success Response:**
  
  * **Code:** 200 OK<br />
    **Content:** 
      `{
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQxNzcwMjl9.e9124E_EFtwI3etyrS8ABRGvPyPP6Wl1UWhowpnTkws" 
        }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Log in" }`

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

  * **Code:** 500 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

* **Sample Call:**
 ```javascript
    function onSignIn(googleUser){
        const google_token = googleUser.getAuthResponse().id_token;
        
        $.ajax({
            method:"POST",
            url: SERVER + "/googleLogin",
            data:{
                google_token
            }
        }).done(res => {
            // console.log(res)
            localStorage.setItem("token", google_token)
            $("#login-page").hide()
            $("#signup-page").hide()
            $("#home-page").show()
            $("#myModal").show()
        }).fail(err => {
            console.log(err)
        })
    }
  ```

#
## GET List Todo
#
* **URL**

  `/todos`

* **Method:**
  
   `GET` 
  
*  **URL Params**

   **Required Headers:**
   `{
     token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQxNzcwMjl9.e9124E_EFtwI3etyrS8ABRGvPyPP6Wl1UWhowpnTkws"
   }`

   **Optional:**
 
   None

* **Data Params**
  `None`

* **Success Response:**
  
  * **Code:** 200 OK<br />
    **Content:** 
  `[
    {
        "id": 25,
        "title": "Makan Apel",
        "description": "sambil BELAJAR JS",
        "status": true,
        "due_date": "2020-11-20",
        "UserId": 13,
        "createdAt": "2020-10-31T21:21:26.825Z",
        "updatedAt": "2020-11-01T00:41:19.243Z"
    }
    ]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Log in" }`

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

  * **Code:** 500 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

* **Sample Call:**
 ```javascript
    function getTodo() {
        const token = localStorage.getItem("token")
        $.ajax({
            method: "GET",
            url: SERVER + "/todos",
            headers: {
                token
            }
        }).done(res => {
            // console.log(res)
            $("#listTodo").empty();
            res.forEach((data) => {
                // console.log(data)
                $("#listTodo").append(`
                <tr>
                      <td><center><input id="checkbox" onclick="updateStatus(${data.id})" name="status" type="checkbox" ${(data.status === false) ? value="false" : "checked"}></center></td>
                      <td>${data.title}</td>
                      <td>${data.description}</td>
                      <td>${data.due_date}</td>
                      <td> <button onclick="deleteTodo(${data.id})" class="btn btn-primary"><i class="fa fa-trash"></i></button>
                      <button onclick="getEdit(${data.id})" class="btn btn-primary" ><i class="fa fa-pencil-square-o"></i></button>
                    </td>
                  </tr>
                `)
            })
        }).fail(err => {
            console.log(err);
        })
    }
  ```
#
## Create Todo
#
* **URL**

  `/todos`

* **Method:**
  
   `POST` 
  
*  **URL Params**

   **Required Headers:**
   `{
     token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQxNzcwMjl9.e9124E_EFtwI3etyrS8ABRGvPyPP6Wl1UWhowpnTkws"
   }`

   **Optional:**
 
   None

* **Data Params**

`{ "title":"Makan Apel ",
   "description":"ambil BELAJAR JS",
   "due_date":"2020-11-20" }`

* **Success Response:**
  
  * **Code:** 201 CREATED<br />
    **Content:** 
  `[
    {
        "id": 25,
        "title": "Makan Apel",
        "description": "sambil BELAJAR JS",
        "status": true,
        "due_date": "2020-11-20",
        "UserId": 13,
        "createdAt": "2020-10-31T21:21:26.825Z",
        "updatedAt": "2020-11-01T00:41:19.243Z"
    }
    ]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Log in" }`

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

  * **Code:** 500 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

* **Sample Call:**
 ```javascript
    function addTodo(e) {
        const token = localStorage.getItem("token")
        e.preventDefault()
        const title = $('#title').val()
        const description = $('#description').val()
        const due_date = $('#due_date').val()
        const status = $('#status').val()

        $.ajax({
            method:"POST",
            url: SERVER + "/todos",
            headers: {
                token
            },
            data:{
                title, 
                description,
                due_date,
                status
            },    
            success: function() {   
                location.reload();  
            }
        }).done(res => {
            console.log(res)
            $("#login-page").hide()
            $("#signup-page").hide()
            $("#myModal").modal('hide')
            $("#home-page").reload()
        }).fail(err => {
            console.log(err)
        })
    }
  ```

#
## GET List Todo by ID
#
* **URL**

  `/todos/:id`

* **Method:**
  
   `GET` 
  
*  **URL Params**
   **Required:**
 
   `id=[integer]`

   **Required Headers:**
   `{
     token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQxNzcwMjl9.e9124E_EFtwI3etyrS8ABRGvPyPP6Wl1UWhowpnTkws"
   }`

* **Data Params**
  `None`

* **Success Response:**
  
  * **Code:** 200 OK<br />
    **Content:** 
  `[
    {
        "id": 25,
        "title": "Makan Apel",
        "description": "sambil BELAJAR JS",
        "status": true,
        "due_date": "2020-11-20",
        "UserId": 13,
        "createdAt": "2020-10-31T21:21:26.825Z",
        "updatedAt": "2020-11-01T00:41:19.243Z"
    }
    ]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Log in" }`

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

  * **Code:** 500 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

* **Sample Call:**
 ```javascript
    function getEdit(id) {
      const token = localStorage.getItem("token")
      $.ajax({
          method:"GET",
          url: SERVER + `/todos/${id}`,
          headers: {
              token
          },
          success: function() {   
              $("#editModal").modal('show')
          }
      }).done(res => {
          let { title, description, status, due_date } = res
          $("#edit-title").val(title)
          $("#edit-description").val(description)
          $("#edit-status").val(status)
          $("#edit-due_date").val(due_date)
          $("#edit-button").empty().append(`
          <button onclick="postEdit(${id})" class="btn btn-info""> EDIT </button >
            `)
        }).fail(err => {
          console.log(err)
      })
    }
  ```

#
## DELETE List Todo by ID
#
* **URL**

  `/todos/:id`

* **Method:**
  
   `DELETE` 
  
*  **URL Params**
   **Required:**
 
   `id=[integer]`

   **Required Headers:**
   `{
     token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQxNzcwMjl9.e9124E_EFtwI3etyrS8ABRGvPyPP6Wl1UWhowpnTkws"
   }`

* **Data Params**

  `None`

* **Success Response:**
  
  * **Code:** 200 OK<br />
    **Content:** 

  `{
    "message": "todo success to delete"
  }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Log in" }`

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

  * **Code:** 500 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

* **Sample Call:**
 ```javascript
    function deleteTodo(id) {
      const token = localStorage.getItem("token")
      $.ajax({
          method:"DELETE",
          url: SERVER + `/todos/${id}`,
          headers: {
              token
          },
          success: function() {   
              location.reload();  
          }
      }).done(res => {
          console.log(res)
      }).fail(err => {
          console.log(err)
      })
    }
  ```


#
## EDIT List Todo by ID
#
* **URL**

  `/todos/:id`

* **Method:**
  
   `PATCH` 
  
*  **URL Params**
   **Required:**
 
   `id=[integer]`

   **Required Headers:**
   
   `{ "title":"Makan Apel ",
    "description":"ambil BELAJAR JS",
    "due_date":"2020-11-20" }`


* **Data Params**

  `None`

* **Success Response:**
  
  * **Code:** 200 OK<br />
    **Content:** 

  `{
    "id": 18,
    "title": "Belajar CSS",
    "description": "Lihat video tutorial di Youtube",
    "status": false,
    "due_date": "2020-11-05",
    "UserId": 11,
    "createdAt": "2020-10-31T18:45:31.773Z",
    "updatedAt": "2020-10-31T23:10:15.747Z"
  }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Log in" }`

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

  * **Code:** 500 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

* **Sample Call:**
 ```javascript
      function postEdit(id) {
          const token = localStorage.getItem("token")
          const title = $("#edit-title").val()
          const description = $("#edit-description").val()
          const status = $("#edit-status").val()
          const due_date = $("#edit-due_date").val()

          $.ajax({
              method:"PUT",
              url: SERVER + `/todos/${id}`,
              headers: {
                  token
              },
              data:{
                  id,
                  title, 
                  description,
                  due_date,
                  status
              },    
              success: function() {   
                  location.reload();  
              }
          }).done(res => {
              console.log(res)
          }).fail(err => {
              console.log(err)
          })
      }
  ```
  #
## UPDATE STATUS List Todo by ID
#
* **URL**

  `/todos/:id`

* **Method:**
  
   `PATCH` 
  
*  **URL Params**
   **Required:**
 
   `id=[integer]`

   **Required Headers:**
   
   `{ "title":"Makan Apel ",
    "description":"ambil BELAJAR JS",
    "due_date":"2020-11-20" }`


* **Data Params**

  `{ "status": false }`

* **Success Response:**
  
  * **Code:** 200 OK<br />
    **Content:** 

  `{
    "id": 18,
    "title": "Belajar CSS",
    "description": "Lihat video tutorial di Youtube",
    "status": true,
    "due_date": "2020-11-05",
    "UserId": 11,
    "createdAt": "2020-10-31T18:45:31.773Z",
    "updatedAt": "2020-10-31T23:10:15.747Z"
  }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Log in" }`

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

  * **Code:** 500 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

* **Sample Call:**
 ```javascript
function updateStatus(id) {
      const token = localStorage.getItem("token")
      const status = $("#checkbox").val()

      $.ajax({
          method:"PATCH",
          url: SERVER + `/todos/${id}`,
          headers: {
              token
          },
          data:{
              status
          }
      }).done(res => {
          console.log(res)
          let { status } = res
          $("#checkbox").val(status=false)
      }).fail(err => {
          console.log(err)
      })
    }
  ```

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 