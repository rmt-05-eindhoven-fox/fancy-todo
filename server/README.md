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

**LOGIN**
----
  Login into the web app

* **URL**

  /users/login

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

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    {
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoiYWRseW1zQGdtYWlsLmNvbSIsImlhdCI6MTYwNDEzMTkyMn0.ZT1EwUalysX7Z4DkLOWHivhi3f1PdpEEKREVLXAqK2I"
    }
    ```

    * **Code:**  401 Unauthorized <br />
    **Content:** 
    ```javascript
  { 
        "error": "wrong email/password"

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


