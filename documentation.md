# TODO

**addTodo**
----
add new todo

* **URL**

  `/todos`

* **Method:**
  
  `POST` 

* **headers**

  ```json
    {
      "token" : "response.token"
    }
  ```

* **params**
```json
{
    "id": 45,
    "title": "makan pagi",
    "description": " pake bubur",
    "status": "undone",
    "due_date": "2020-11-12T00:00:00.000Z",
    "UserId": 2,
    "updatedAt": "2020-11-01T08:14:57.968Z",
    "createdAt": "2020-11-01T08:14:57.968Z"
}
```

* **Success Response:**

  * **Code:** 201 CREATED <br />
  **Content:** 
  ```json
  {
    "id": 45,
    "title": "makan pagi",
    "description": " pake bubur",
    "status": "undone",
    "due_date": "2020-11-12T00:00:00.000Z",
    "UserId": 2,
    "updatedAt": "2020-11-01T08:14:57.968Z",
    "createdAt": "2020-11-01T08:14:57.968Z"
  }
  ```
 
* **Error Response:**

  * **Code:** 500

-------

**ShowTodo** 
----
 show todo list

* **URL**

  `/todos`

* **Method:**
  
  `GET` 

* **headers**

  ```json
    {
      "token" : "token"
    }
  ```
* **params**

  None

* **Success Response:**

  * **Code:** 200 OK
  **Content:** 
  ```json
    [
      {
        "id" : 1,
        "title" : "makan pake bubur",
        "description" : "diaduk",
        "status":"undone",
        "due_date" : "2020-11-01"
      },
      {
        "id" : 2,
        "title" : "makan pake bubur",
        "description" : "gadiaduk",
        "status":"done",
        "due_date" : "2020-11-03"
      }
    ]

  ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR 
-------

**detailsTodo**
----
get one specificated todo

* **URL**

  `/todos/:id`

* **Method:**
  
  `GET` 

* **headers**

  ```json
    {
      "token" : "token"
    }
  ```

* **params**

  None


* **Success Response:**

  * **Code:** 200 OK

  **Content:** 
  ```json    
      {
        "id" : 1,
        "title" : "makan pake bubur",
        "description" : "diaduk",
        "status":"undone",
        "due_date" : "2020-11-01"
      }

  ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND 


-------
**editTodo**
----
edit the todo

* **URL**

  `/todos/:id`

* **Method:**
  
  `PUT` 

* **headers**

  ```json
    {
      "token" : "userToken"
    }
  ```

* **params**

  ```json
  {
        "id" : 1,
        "title" : "makan pake bubur",
        "description" : "diaduk",
        "status":"undone",
        "due_date" : "2020-11-01"
  }
  ```


* **Success Response:**

  * **Code:** 200 OK

  **Content:** 
  ```json   
    {
        "id" : 1,
        "title" : "makan pake mie ayam",
        "description" : "pake pangsit",
        "status":"undone",
        "due_date" : "2020-11-01"
    }

  ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND
-------

**statusTodo**
----
  change status

* **URL**

  `/todos/:id`

* **Method:**
  
  `PATCH` 

* **headers**

  ```json
    {
      "token" : "token"
    }
  ```

* **params**

   ```json
  {
    "status" : "Done"
  }
    ```


* **Success Response:**

  * **Code:** 200 OK

  **Content:** 
  ```json    
    {
        "id" : 1,
        "title" : "makan pake mie ayam",
        "description" : "pake pangsit",
        "status":"done",
        "due_date" : "2020-11-01"
    }

  ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND 

-------

**DeleteTodo**
----
  Delete todo

* **URL**

  `/todos/:id`

* **Method:**
  
  `DELETE` 

* **headers**

  ```json
    {
      "token" : "userToken"
    }
  ```

* **params**

  NONE


* **Success Response:**

  * **Code:** 200 OK 

  **Content:** 

  ```json
  {
    "message" : "delete success"
  }
    
  ```

 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR
-------

# USER

**Register User**
----
  register new user

* **URL**

  `/user/register`

* **Method:**
  
  `POST` 

* **headers**

  NONE

* **params**

  ```json
    {
      "email" : "admin@admin.com",
      "password" : "admin1234"
    }

  ```


* **Success Response:**

  * **Code:** 200 OK 

  **Content:** 
  ```json    
    {
      "message" : "registration success"
    }
    ```

 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR 


-------

**Login User**
----
  user login

* **URL**

  `/user/login`

* **Method:**
  
  `POST` 


* **headers**

  NONE

* **params**

  ```json
    {
      "email" : "admin@admin.com",
      "password" : "admin1234"
    }

  ```


* **Success Response:**

  * **Code:** 200 OK 

  **Content:** 
  ```json    
    {
      "token"
    }

  ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR
-------


* **Google Oauthlogin**
----
  login via google Oauth

* **URL**

  `/users/googleLogin`

* **Method:**
  
  `POST` 

* **headers**

  ```json
    {
      "google_access_token"
    }
  ```

* **params**

  NONE


* **Success Response:**

  * **Code:** 200 OK 

  **Content:** 
  ```json    
    {
      "token"
    }

  ```

 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR 


-------
