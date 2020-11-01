
# **API Documentation** My Fancy Todo
## Local server : 
  `http://localhost:3000`
----
## production SERVER
  `https://fancytoodoapi.herokuapp.com`
---- 
## production CLIENT
  `https://fancytoodo.herokuapp.com`
----  
<br>

# Todos  

## 1. Create Todos
<details>
  <summary>Click to expand!</summary>
  
  ### Post/Create new todo.

  * **URL**

    `/todos`


  * **Method:**

    `POST`

  * **URL Headers**
    
    **required**
    ```js
      {
        accesstoken: "accesstoken" 
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
 
----

## 2. Get All Todos
<details>
  <summary>Click to expand!</summary>
  
  ### Get all todos data.

  * **URL**

    `/todos`

  * **Method:**

    `GET`

  * **URL Headers**
    
    **required**
    ```js
      {
        accesstoken: "accesstoken" 
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
  
----

## 3. Get Todo by ID
<details>
  <summary>Click to expand!</summary>
  
  ### Get todos data by id.

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
        accesstoken: "accesstoken" 
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
 
----

## 4. Update Todo by ID
<details>
  <summary>Click to expand!</summary>
  
  ### Update todos data by id.
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
        accesstoken: "accesstoken" 
      }
    ```

  * **Data Params**

    ***required***
      token: <accesstoken>
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

 
----

## 5. Update Todo Status by ID
<details>
  <summary>Click to expand!</summary>
  
  ### Update todo status by id.
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
        accesstoken: "accesstoken" 
      }
    ```

  * **Data Params**

    ***required***
      token: <accesstoken>
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
 
----

## 6. Delete Todo by ID
<details>
  <summary>Click to expand!</summary>
  
  ### Delete todos data by id.

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
      accesstoken: "accesstoken" 
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
 
----

## 7. Search by Todo Title
<details>
  <summary>Click to expand!</summary>
  
  ### Filter todos data by name.
  * **URL**

    `/todos/search`

  * **Method:**

    `POST`

  * **URL Headers**
    
    **required**
    ```js
      {
        accesstoken: "accesstoken" 
      }
    ```
  * **Data Params**
    
    *data*

    ```js
    {
      title: "todo", 
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
 
 
----

## 8. Filter by Due Date
<details>
  <summary>Click to expand!</summary>
  
  ### Filter todos data by due date.
  * **URL**

    `/todos/filterdue`

  * **Method:**

    `POST`

  * **URL Headers**
    
    **required**
    ```js
      {
        accesstoken: "accesstoken" 
      }
    ```
  * **Data Params**
    
    *data*

    ```js
    {
      due_date: "2020-10-26", 
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
 
<hr>
<br>

# 3rd Party API Holiday 

## 1. Get Indonesian Holiday
<details>
  <summary>Click to expand!</summary>
  
  ### Get holiday of indonesia
  * **URL**

    `/todos/calender/holiday`

  * **Method:**

    `GET`

  * **URL Headers**
    
    **required**
    ```js
      {
        accesstoken: "accesstoken" 
      }
    ``` 

  * **Success Response:**

    * **Code:** 200 <br />
      **Content:** 
      ```javascript
      [
        {
          name: "New Year's Day",
          description: "New Year’s Day is the first day of the year, or January 1, in the Gregorian calendar.",
          date: "2020-01-01"
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

<hr>
<br>

# Users 

## 1. Register
<details>
  <summary>Click to expand!</summary>
  
  ### Register new user.
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
 

## 2. Login
<details>
  <summary>Click to expand!</summary>
  
  ### Login user.
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
        accesstoken : "eyJhbGciOiJIUzI1NiJ9. xxxx "
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

## 3. Verify Token
<details>
  <summary>Click to expand!</summary>
  
  ### Verify Token User.

  * **URL**

    `/users/verifytoken`

  * **Method:**

    `POST` 

  * **URL Headers**
    
    **required**
    ```js
    {
      accesstoken: "accesstoken" 
    }
    ```

  * **Success Response**

    * **Code:** 200 <br />
      **Content:** 
      ```javascript
      {
        token : "valid"
      }
      ```
  
  * **Error Response:**

    * **Code:** 401 UNAUTHORIZED <br />
      **Content:** 
      ```javascript
      {
        message: "Authentication failed!"
      } 
      ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:** 
      ```javascript
      { error : "Something error message from server" }
      ``` 
</details> 
   