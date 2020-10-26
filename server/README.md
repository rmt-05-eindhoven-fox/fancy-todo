**CREATE TODO**
----
  return json data of one new additional row

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
    **Content:** `{ error : "DATE SHOULD BE GREATER THAN TODAY" }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ error : "INTERNAL SERVER ERROR" }`

------------------------------------------------------------

**READ ALL TODOS**
----
  return all json todos data

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

**READ TODO BY ID**
----
  return updated row of todos data

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

  * **Code:** 404 <br />
    **Content:** `{ error : "ERROR NOT FOUND" }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ error : "INTERNAL SERVER ERROR" }`


------------------------------------------------------------

**UPDATE STATUS TODO**
----
  return updated status of todo

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

  * **Code:** 404 <br />
    **Content:** `{ error : "ERROR NOT FOUND" }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ error : "INTERNAL SERVER ERROR" }`


------------------------------------------------------------

**DELETE TODO**
----
  return deleted data of todos

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

  * **Code:** 500 <br />
    **Content:** `{ error : "INTERNAL SERVER ERROR" }`