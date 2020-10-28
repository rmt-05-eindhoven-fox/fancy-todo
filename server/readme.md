<style>
summary h1, summary h2{ display: inline-block; }
</style>
# **API Documentation** Fancy Todo

## Todos
----
<details><summary><strong><b><h2>1. Create Todos</h2></b></strong></summary> 
  
  Post/Create new todo.

* **URL**

  `/todos`


* **Method:**

  `POST`

* **URL Headers**
  
  **required**
  ```js
    {
      accesstoken: "accessToken" 
    }
  ```

* **Data Params**
  
  *data*

  ```js
  {
    title: "Todo Title", 
    description: "Todo Description",  
    due_date: "2020-10-26", 
  }
  ```

* **Success Response**

  * **Code:** 201 <br />
    **Content:** 
    ```javascript
    { 
      id: 1, 
      title: "Todo Title", 
      description: "Todo Description", 
      status: "pending", 
      due_date: "2020-10-26T05:29:38.084Z", 
      createdAt: "2020-10-26T05:17:59.133Z", 
      updatedAt: "2020-10-26T05:17:59.133Z" 
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD  REQUEST <br />
    **Content:** 
    ```javascript
    [
      { "message": "Title is require, cannot be empty!" },
      { "message": "due date is required, cannot be empty!" },
      { "message": "due date mus valid date!" }
    ]
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { error : "Something error message from server" }
    ``` 
    
</details>
 
<details>
<summary><strong><b><h2>2. Get All Todos</h2></b></strong></summary>  

  Get all todos data.

* **URL**

  `/todos`

* **Method:**

  `GET`

* **URL Headers**
  
  **required**
  ```js
    {
      accesstoken: "accessToken" 
    }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    [
      { 
        id: 1, 
        title: "Todo Title", 
        description: "Todo Description", 
        status: "pending", 
        due_date: "2020-10-26T05:29:38.084Z", 
        createdAt: "2020-10-26T05:17:59.133Z", 
        updatedAt: "2020-10-26T05:17:59.133Z" 
      }, 
      { 
        id: 2, 
        title: "Todo Title 2", 
        description: "Todo Description 2", 
        status: "pending", 
        due_date: "2020-10-26T05:29:38.084Z", 
        createdAt: "2020-10-26T05:17:59.133Z", 
        updatedAt: "2020-10-26T05:17:59.133Z" 
      }, 
      { ... }
    ]
    ```

* **Error Response:** 

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { error : "Something error message from server" }
    ```
</details>

<details>
<summary><strong><b><h2>3. Get Todo by ID</h2></b></strong></summary>  

  Get todos data by id.

* **URL**

  `/todos/:id`

* **Method:**

  `GET`

* **URL Params**

   **Required:**
 
   `id=[integer]`

* **URL Headers**
  
  **required**
  ```js
    {
      accesstoken: "accessToken" 
    }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    { 
      id: 1, 
      title: "Todo Title", 
      description: "Todo Description", 
      status: "pending", 
      due_date: "2020-10-26T05:29:38.084Z", 
      createdAt: "2020-10-26T05:17:59.133Z", 
      updatedAt: "2020-10-26T05:17:59.133Z" 
    }
    ```

* **Error Response:** 

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```javascript
    { error : "Todo ID Not Found!" }
    ```
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { error : "Something error message from server" }
    ```
    
</details>

<details>
<summary><strong><b><h2>4. Update Todo by ID</h2></b></strong></summary>  

  Update todos data by id.

* **URL**

  `/todos/:id`

* **Method:**

  `PUT`

* **URL Params**

   **Required:**
 
   `id=[integer]`

* **URL Headers**
  
  **required**
  ```js
    {
      accesstoken: "accessToken" 
    }
  ```

* **Data Params**

  ***required***
    token: <accessToken>
  *accesstoken**

  ```javascript
  {
    title: "New Todo Title",
    status: "pending", 
    description: "New Todo Description",  
    due_date: "2020-10-26", 
  }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    { 
      id: 1, 
      title: "New Todo Title", 
      description: "New Todo Description", 
      status: "pending", 
      due_date: "2020-10-26T05:29:38.084Z", 
      createdAt: "2020-10-26T05:17:59.133Z", 
      updatedAt: "2020-10-26T06:00:52.393Z" 
    }
    ```

* **Error Response:** 

  * **Code:** 400 BAD  REQUEST <br />
    **Content:** 
    ```javascript
    [
      { "message": "Title is require, cannot be empty!" },
      { "message": "due date is required, cannot be empty!" },
      { "message": "due date mus valid date!" }
    ]
    ```
  
  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```javascript
    { error : "Todo ID Not Found!" }
    ```
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { error : "Something error message from server" }
    ```
</details>

<details>
<summary><strong><b><h2>5. Update Todo Status by ID</h2></b></strong></summary>  

 Update todo status by id.

* **URL**

  `/todos/:id`

* **Method:**

  `PATCH`

* **URL Params**

   **Required:**
 
   `id=[integer]`

* **URL Headers**
  
  **required**
  ```js
    {
      accesstoken: "accessToken" 
    }
  ```

* **Data Params**

  ***required***
    token: <accessToken>
  *accesstoken**

  ```javascript
  { 
    status: "finished"
  }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    { 
      id: 1, 
      title: "New Todo Title", 
      description: "New Todo Description", 
      status: "finished", 
      due_date: "2020-10-26T05:29:38.084Z", 
      createdAt: "2020-10-26T05:17:59.133Z", 
      updatedAt: "2020-10-26T06:05:17.289Z" 
    }
    ```

* **Error Response:** 

  * **Code:** 400 BAD  REQUEST <br />
    **Content:** 
    ```javascript
    [ 
      { "message": " Status is required, cannot be null!" } 
    ]
    ``` 
  
  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```javascript
    { error : "Todo ID Not Found!" }
    ```
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { error : "Something error message from server" }
    ```
</details>

<details>
<summary><strong><b><h2>6. Delete Todo by ID</h2></b></strong></summary>  

  Delete todos data by id.

* **URL**

  `/todos/:id`

* **Method:**

  `DELETE`

* **URL Params**

   **Required:**
 
   `id=[integer]` 

* **URL Headers**
  
  **required**
  ```js
  {
    accesstoken: "accessToken" 
  }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    { 
      message: "todo success to delete"
    }
    ```

* **Error Response:**  

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```javascript
    { error : "Todo ID Not Found!" }
    ```
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { error : "Something error message from server" }
    ```
</details>

<hr>
<br>

## User
----
<details>
<summary><strong><b><h2>1. Register</h2></b></strong></summary>  
  
  Register new user.

* **URL**

  `/users/register`


* **Method:**

  `POST` 

* **Data Params**
  
  *data*

  ```js
  {
      username: "user94", 
      email: "user_mail@todo.com",  
      password: "user password", 
  }
  ```

* **Success Response**

  * **Code:** 201 <br />
    **Content:** 
    ```javascript
    {
      "id": 1,
      "username": "user94",
      "email": "user_mail@todo.com"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD  REQUEST <br />
    **Content:** 
    ```javascript
    {
      "message": "Email already registered"
    }

    // OR

    [
      { "message": "Username is requiere, can't be empty!" },
      { "message": "Username minimal 6 character" },
      { "message": "Email is requiere, can't be empty!" },
      { "message": "Email must be valid an email address!" },
      { "message": "Password is requiere, can't be empty!" },
      { "message": "Password minimal 8 character" }
    ]
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { error : "Something error message from server" }
    ``` 
  
</details>

<details>
<summary><strong><b><h2>2. Login</h2></b></strong></summary>  
  
  Login user.

* **URL**

  `/users/login`


* **Method:**

  `POST` 

* **Data Params**
  
  *data*

  ```js
  {
    username: "user94",  
    password: "user password", 
  }
  ```

* **Success Response**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    {
      accessToken : "eyJhbGciOiJIUzI1NiJ9. xxxx "
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD  REQUEST <br />
    **Content:** 
    ```javascript
    {
      message: "Wrong Username / Password "
    } 
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { error : "Something error message from server" }
    ``` 
  
</details>
