
**CREATE TODOS**
----
    create new todos

* **URL**

    /todos

* **Method:**
  
    `POST`
    
*  **URL Params**

    not needed

* **Data Params**

    `title=[string]`,
    `description=[string]`,
    `status=[boolean]`,
    `due_date=[string]`

* **Success Response:**

  * **Code:** 201 CREATED<br />
    **Content:** `
    { 
        "id" : 1,
        "title" : "Lari pagi",
        "description" : "Di sabuga jam 9",
        "status" : "false",
        "due_date" : "2020-10-28T03:26:43.971Z"
        "createdAt" : "2020-10-26T03:26:43.971Z"
        "updatedAt" : "2020-10-26T03:26:43.971Z"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : [
        "Cannot enter a date that has passed",
        "Title is required",
        "Status is required"
        ] 
    }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Server is busy" }`


**GET TODOS**
----
    Get all todos

* **URL**

    /todos

* **Method:**
  
    `GET`

*  **URL Params**

    not needed

* **Data Params**

    not needed

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `[
        { 
            "id" : 1,
            "title" : "Lari pagi",
            "description" : "Di sabuga jam 9",
            "status" : "false",
            "due_date" : "2020-10-28T03:26:43.971Z"
            "createdAt" : "2020-10-26T03:26:43.971Z"
            "updatedAt" : "2020-10-26T03:26:43.971Z"
        },
          { 
            "id" : 2,
            "title" : "Fitness sore",
            "description" : "Di gold gym",
            "status" : "false",
            "due_date" : "2020-10-27T03:26:43.971Z"
            "createdAt" : "2020-10-26T03:26:43.971Z"
            "updatedAt" : "2020-10-26T03:26:43.971Z"
        }
    ]`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Server is busy" }`


**GET TODO**
----
    Get one todo

* **URL**

    /todos/:id

* **Method:**
  
    `GET`

*  **URL Params**

    **Required:**
 
   `id=[integer]`

* **Data Params**

    not needed

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `
    { 
        "id" : 1,
        "title" : "Lari pagi",
        "description" : "Di sabuga jam 9",
        "status" : "false",
        "due_date" : "2020-10-28T03:26:43.971Z"
        "createdAt" : "2020-10-26T03:26:43.971Z"
        "updatedAt" : "2020-10-26T03:26:43.971Z"
    }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not Found" }`


**UPDATE TODO**
----
    Update specific todo

* **URL**

    /todos/:id

* **Method:**
  
    `PUT`

*  **URL Params**

    **Required:**
 
   `id=[integer]`

* **Data Params**

    `title=[string]`,
    `description=[string]`,
    `status=[boolean]`,
    `due_date=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `
    { 
        "id" : 1,
        "title" : "Lari sore",
        "description" : "Di sabuga jam 3 sore",
        "status" : "true",
        "due_date" : "2020-10-28T03:26:43.971Z"
        "createdAt" : "2020-10-26T03:26:43.971Z"
        "updatedAt" : "2020-10-26T03:26:43.971Z"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : [
        "Cannot enter a date that has passed",
        "Title is required",
        "Status is required"
        ] 
    }`

    OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not Found" }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Server is busy" }`


**UPDATE SPECIFIC PROPERTY TODO**
----
    Update specific properti in toDo object

* **URL**

    /todos/:id

* **Method:**
  
    `PATCH`

*  **URL Params**

    **Required:**
 
   `id=[integer]`

* **Data Params**

    `status=[boolean]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `
    { 
        "id" : 1,
        "title" : "Lari sore",
        "description" : "Di sabuga jam 3 sore",
        "status" : "false",
        "due_date" : "2020-10-28T03:26:43.971Z"
        "createdAt" : "2020-10-26T03:26:43.971Z"
        "updatedAt" : "2020-10-26T03:26:43.971Z"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Status is required" }`

    OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not Found" }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Server is busy" }`


**DELETE TODO**
----
    delete one toDo 

* **URL**

    /todos/:id

* **Method:**
  
    `DELETE`

*  **URL Params**

    **Required:**
 
   `id=[integer]`

* **Data Params**

    not needed

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ message: 'todo success to delete' }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not Found" }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Server is busy" }`


**REGISTER**
----
    register user

* **URL**

    /register

* **Method:**
  
    `POST`

*  **URL Params**

    **Required:**
 
    not needed

* **Data Params**

    `email=[string]`,
    `password=[string]`

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** 
    `{
    "id": 14,
    "email": "suma@gmail.com"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : ['Please use email format', 'Email is required', 'Password is required', 'Password minimal 5 characters'] }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Server is busy" }`


**LOGIN**
----
    login user

* **URL**

    /login

* **Method:**
  
    `POST`

*  **URL Params**

    **Required:**
 
    not needed

* **Data Params**

    `email=[string]`,
    `password=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJkZWRlQGdtYWlsLmNvbSIsImlhdCI6MTYwMzgwOTA3MH0.ZOvOmP8v4sPgbE5sAxM2jeNPNPi9hr-UTllXyYaPw9A`
 
* **Error Response:**

  * **Code:** 401 BAD REQUEST <br />
    **Content:** `{ error : 'Wrong email/password' }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Server is busy" }`