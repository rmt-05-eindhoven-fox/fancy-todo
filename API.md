**Sign Up**
----
  Create new User

* **URL**

  /signup

* **Method:**
  
  `POST`
  
* **Data Params**

  {
    "email": STRING,
    "password": STRING,
    "username": STRING
  }

  example:
  {
    "email": sample@sample.com,
    "password": test123,
    "username": myusername
  }

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : 1, email: example@example.com}`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Invalid email/password" }`

* **Sample Call:**

  <_Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable._> 

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 


**Login**
----
  <_Additional information about your API call. Try to use verbs that match both request type (fetching vs modifying) and plurality (one vs multiple)._>

* **URL**

  /login/

* **Method:**

  `GET`
  
* **Data Params**

  {
      "email": STRING,
      "password": STRING
  }

* **Success Response:**
  
  <_What should the status code be on success and is there any returned data? This is useful when people need to to know what their callbacks should expect!_>

  * **Code:** 200 <br />
    **Content:** `{ id : 12 }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Invalid email/password" }`

* **Sample Call:**

  <_Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable._> 

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 


**Show Todos**
----
  Return json data about all todos

* **URL**

  /todos/

* **Method:**
  
  `GET`
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : INTEGER, title: STRING, description: STRING, status: STRING, due_date: <DATE> }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You need to login first" }`
    
  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Todos not found" }`

  OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

* **Sample Call:**

  <_Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable._> 

* **Notes:**


  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 

**Create Todo**
----
  Create new Todo

* **URL**

  /todos

* **Method:**
  
  `POST`
  
* **Data Params**

  {
    "title": STRING,
    "description": STRING,
    "status": STRING,
    "due_date": DATE
  }

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ id : INTEGER, title: STRING, description: STRING, status: STRING, due_date: DATE }`
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "SequelizeValidationError" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "" }`

* **Sample Call:**

  <_Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable._> 

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 


**Show Todo**
----
  Show todo by id

* **URL**

  /todos/:id

* **Method:**
  
  <_The request type_>

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ id : INTEGER, title: STRING, description: STRING, status: STRING, due_date: DATE }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Todos not found" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "" }`

* **Sample Call:**

  <_Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable._> 

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 

**Edit Todo**
----
  Change the value of todo

* **URL**

  /todos/:id

* **Method:**
  
  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  {
    "title": STRING,
    "description": STRING,
    "status": STRING,
    "due_date": DATE
  }

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : INTEGER, title: STRING, description: STRING, status: STRING, due_date: DATE }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "SequelizeValidationError" }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Todos not found" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "" }`

* **Sample Call:**

  <_Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable._> 

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 

**Edit Todo Status**
----
  Change the status of todo

* **URL**

  /todos/:id

* **Method:**
  
  `PATCH`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  {
    "status": STRING
  }

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : INTEGER, title: STRING, description: STRING, status: STRING, due_date: DATE }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "SequelizeValidationError" }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Todos not found" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "" }`

* **Sample Call:**

  <_Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable._> 

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 

**Delete Todo**
----
  Delete Todo

* **URL**

  /todos/:id

* **Method:**
  
  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{message: 'todo success to delete'}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Todos not found" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "" }`

* **Sample Call:**

  <_Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable._> 

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 
