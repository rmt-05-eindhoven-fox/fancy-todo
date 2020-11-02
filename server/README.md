### API ###

List of available endpoints:
* POST   /users/register
* POST   /users/login
* GET    /tudos
* GET    /tudos/:id
* POST   /tudos/
* PUT    /tudos/:id
* PATCH  /tudos/:id
* DELETE /tudos/:id

----
**REGISTER**
----
  Register into the web app

* **URL**

  /users/register

* **Method:**

  `POST`

* **Data Params**
    ```javascript
    {
        email: "string",
        password: "string"
    }
    ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```javascript
    {     
    "id": 11,
    "email": "adlyms@gmail.com",
    "msg": "register success"
    }
    ```

  * **Error Response:** 

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```javascript
  { 
      "error": "Email is required, Should be in email format, Password is required, Password minimum length is 6 characters"

  }
    ```
  OR
    ```javascript
  {
      "error": "User.email cannot be null, User.password cannot be null"
  }
    ```
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    {
        msg : "internal server error"
    }
    ```
----

**TODOS**
----
 Get all Todo

* **URL**

  /todos

* **Method:**

  `GET`

* **Data Headers**
    ```javascript
    {
        token: "string",
    }
    ```
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJmYXV6YW5AZ21haWwuY29tIiwiaWF0IjoxNjA0MjE0MDkxfQ.n8P4_eh95A3a-BZ_lFXcMUetTIyCQWrqmVeYgIy8NGU"
    }
    ```

    * **Code:**  400 Bad Request <br />
    **Content:** 
    ```javascript
  { 
         "error": "Authentication failed"

  }
    ```
    * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
     ```
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    {
        msg : "internal server error"
    }
    ```
----


**GET TODOS BY ID**
----
  Get Todos By Id

* **URL**

  /todos/id

* **Method:**

  `GET`

* **Data Params**
    ```javascript
    {
        token: "string"
    }
    ```
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJmYXV6YW5AZ21haWwuY29tIiwiaWF0IjoxNjA0MTc2ODcwfQ.KGwolyhW6hsWvkYMGNTky2Z2UaX7XCHLiTMeRKd1NEo"
    }
    ```

    * **Code:**  400 BadRequest <br />
    **Content:** 
    ```javascript
  { 
        "error": "Authentication failed"
  }
    ```
    * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
     ```
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    {
        msg : "internal server error"
    }
    ```
----
  


**POST TODOS BY ID**
----
  Post Todos By Id

* **URL**

  /todos/id

* **Method:**

  `POST`

* **Data Params**
    ```javascript
    {
        token: "string"
    }
    ```
* **Success Response:**

  * **Code:** 200 <br />
    **HEADERS:** 
    ```javascript
    {
        "id": 31,
        "title": "ini punya id 7 1",
        "description": "hallo",
        "status": true,
        "due_date": "2020-11-09T00:00:00.000Z",
        "UserId": 4,
        "createdAt": "2020-11-01T07:12:10.381Z",
        "updatedAt": "2020-11-01T07:21:14.337Z"
    }
    ```



    * **Code:**  400 BadRequest <br />
    **Content:** 
    ```javascript
  { 
    "error": "Due date should not in the past time"
  }
    ```
    * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
     ```
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    {
        msg : "internal server error"
    }
    ```
----

### URL ###
URL 



### POST /todo


> Create new todo



_Request Header_

```
{ 
    "Content-type": "application/json"
}
```

_Request Body_

```
{ 
    "title" : "Learn REST API", 
    "description": "Learn to create RESTful API with Express and Sequelize", 
    "due_date" : "2020-01-29" 
}
```


_Response_

```
{ 
    "id" : 1,
    "title" : "Learn REST API", 
    "description": "Learn to create RESTful API with Express and Sequelize", 
    "due_date" : "2020-01-29" 
}
```


