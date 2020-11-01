**SIGN UP**
----
  return email of new user

* **Data Headers**

  NONE

* **URL**

  /users/signup

* **Method:**

  `POST`
  
* **URL Params**

  NONE

* **Data Params**

  `email=[string]`,
  `password=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "email": "we2y.tansil@gmail.com"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `[
    { error : "email should not be empty"},
    { error : "password should not be empty"}
    ]`

  OR

  * **Code:** 500 <br />
    **Content:** `{ error : "INTERNAL SERVER ERROR" }`

------------------------------------------------------------

**SIGN IN**
----
  return access_token

* **Data Headers**

  NONE

* **URL**

  /users/signup

* **Method:**

  `POST`
  
* **URL Params**

  NONE

* **Data Params**

  `email=[string]`,
  `password=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "email": "we2y.tansil@gmail.com"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `[
    { error : "invalid email/password"},
    { error : "email should not be empty"},
    { error : "password should not be empty"}
    ]`

  OR

  * **Code:** 500 <br />
    **Content:** `{ error : "INTERNAL SERVER ERROR" }`

------------------------------------------------------------

**CREATE TODO**
----
  return json data of one new additional row

* **Data Headers**

  `{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoid2UyeS50YW5zaWxAZ21haWwuY29tIiwiaWF0IjoxNjAzODE3NTQ0fQ.sHZWSmO4t6xp4BiAWrQSXx182foRtMhEVtabHdyoU14"
  }`

* **URL**

  /todos

* **Method:**

  `POST`
  
* **URL Params**

  NONE

* **Data Params**

  `title=[string]`,
  `description=[string]`,
  `status=[boolean]`,
  `due_date=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "id": 1,
    "title": "Breakfast",
    "description": "Having meal in the morning",
    "status": false,
    "due_date": "2020-11-01",
    "updatedAt": "2020-10-26T16:16:21.066Z",
    "createdAt": "2020-10-26T16:16:21.066Z"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `[{ error : "date should be greater than today"},
    { error : "title should not be empty TODAY"},
    { error : "description should not be empty"},
    { error : "due_date should not be empty"}
    ]`

  OR

  * **Code:** 500 <br />
    **Content:** `{ error : "INTERNAL SERVER ERROR" }`

------------------------------------------------------------

**READ ALL TODOS**
----
  return all json todos data

* **Data Headers**

  `{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoid2UyeS50YW5zaWxAZ21haWwuY29tIiwiaWF0IjoxNjAzODE3NTQ0fQ.sHZWSmO4t6xp4BiAWrQSXx182foRtMhEVtabHdyoU14"
  }`
  
* **URL**

  /todos

* **Method:**

  `GET`
  
* **URL Params**

  NONE

* **Data Params**

  `title=[string]`,
  `description=[string]`,
  `status=[boolean]`,
  `due_date=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{
    "id": 1,
    "title": "Breakfast",
    "description": "Having meal in the morning",
    "status": false,
    "due_date": "2020-11-01",
    "updatedAt": "2020-10-26T16:16:21.066Z",
    "createdAt": "2020-10-26T16:16:21.066Z"
    },
    {
    "id": 2,
    "title": "Lunch",
    "description": "Recharging your energy",
    "status": false,
    "due_date": "2020-11-01",
    "updatedAt": "2020-10-26T16:16:21.066Z",
    "createdAt": "2020-10-26T16:16:21.066Z"
    }],`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : "INTERNAL SERVER ERROR" }`

------------------------------------------------------------

**READ TODO BY STATUS**
----
  return row of todos data with status true

* **Data Headers**

  `{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoid2UyeS50YW5zaWxAZ21haWwuY29tIiwiaWF0IjoxNjAzODE3NTQ0fQ.sHZWSmO4t6xp4BiAWrQSXx182foRtMhEVtabHdyoU14"
  }`
  

* **URL**

  /todos/status

* **Method:**

  `GET`
  
* **URL Params**

  NONE

* **Data Params**

  NONE

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "id": 2,
    "title": "Early Morning Meal",
    "description": "Having meal befor flight departure",
    "status": false,
    "due_date": "2020-12-01",
    "updatedAt": "2020-10-26T16:16:21.066Z",
    "createdAt": "2020-10-26T16:16:21.066Z"
    }`
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ error : "ERROR! NOT FOUND" }`

------------------------------------------------------------

**READ TODO BY ID**
----
  return updated row of todos data

* **Data Headers**

  `{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoid2UyeS50YW5zaWxAZ21haWwuY29tIiwiaWF0IjoxNjAzODE3NTQ0fQ.sHZWSmO4t6xp4BiAWrQSXx182foRtMhEVtabHdyoU14"
  }`
  

* **URL**

  /todos/:id

* **Method:**

  `GET`
  
* **URL Params**

  `id=[integer]`

* **Data Params**

  NONE

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "id": 2,
    "title": "Early Morning Meal",
    "description": "Having meal befor flight departure",
    "status": false,
    "due_date": "2020-12-01",
    "updatedAt": "2020-10-26T16:16:21.066Z",
    "createdAt": "2020-10-26T16:16:21.066Z"
    }`
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ error : "ERROR NOT FOUND" }`

------------------------------------------------------------

**UPDATE TODO**
----
  return updated data of todos

* **Data Headers**

  `{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoid2UyeS50YW5zaWxAZ21haWwuY29tIiwiaWF0IjoxNjAzODE3NTQ0fQ.sHZWSmO4t6xp4BiAWrQSXx182foRtMhEVtabHdyoU14"
  }`
  

* **URL**

  /todos/:id

* **Method:**

  `PUT`
  
* **URL Params**

  `id=[integer]`

* **Data Params**

  `title=[string]`,
  `description=[string]`,
  `status=[boolean]`,
  `due_date=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "id": 1,
    "title": "Workout",
    "description": "Burn all those fat from breakfast",
    "status": false,
    "due_date": "2020-12-01",
    "updatedAt": "2020-10-26T16:16:21.066Z",
    "createdAt": "2020-10-26T16:16:21.066Z"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "DATE SHOULD BE GREATER THAN TODAY" }`

  OR

  * **Code:** 401 <br />
    **Content:** `{ error : "Not Authorized" }`

  OR

  * **Code:** 404 <br />
    **Content:** `{ error : "ERROR NOT FOUND" }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ error : "INTERNAL SERVER ERROR" }`


------------------------------------------------------------

**UPDATE STATUS TODO**
----
  return updated status of todo

* **Data Headers**

  `{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoid2UyeS50YW5zaWxAZ21haWwuY29tIiwiaWF0IjoxNjAzODE3NTQ0fQ.sHZWSmO4t6xp4BiAWrQSXx182foRtMhEVtabHdyoU14"
  }`
  

* **URL**

  /todos/:id

* **Method:**

  `PATCH`
  
* **URL Params**

  `id=[integer]`

* **Data Params**

  `status=[boolean]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "id": 1,
    "title": "Workout",
    "description": "Burn all those fat from breakfast",
    "status": true,
    "due_date": "2020-12-01",
    "updatedAt": "2020-10-26T16:16:21.066Z",
    "createdAt": "2020-10-26T16:16:21.066Z"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "DATE SHOULD BE GREATER THAN TODAY" }`

  OR

  * **Code:** 401 <br />
    **Content:** `{ error : "Not Authorized" }`

  OR

  * **Code:** 404 <br />
    **Content:** `{ error : "ERROR NOT FOUND" }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ error : "INTERNAL SERVER ERROR" }`


------------------------------------------------------------

**DELETE TODO**
----
  return deleted data of todos

* **Data Headers**

  `{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoid2UyeS50YW5zaWxAZ21haWwuY29tIiwiaWF0IjoxNjAzODE3NTQ0fQ.sHZWSmO4t6xp4BiAWrQSXx182foRtMhEVtabHdyoU14"
  }`
  

* **URL**

  /todos/:id

* **Method:**

  `DELETE`
  
* **URL Params**

  `id=[integer]`

* **Data Params**

  NONE

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "id": 1,
    "title": "Workout",
    "description": "Burn all those fat from breakfast",
    "status": true,
    "due_date": "2020-12-01",
    "updatedAt": "2020-10-26T16:16:21.066Z",
    "createdAt": "2020-10-26T16:16:21.066Z"
    }`
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ error : "ERROR NOT FOUND" }`

  OR

  * **Code:** 401 <br />
    **Content:** `{ error : "Not Authorized" }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ error : "INTERNAL SERVER ERROR" }`

