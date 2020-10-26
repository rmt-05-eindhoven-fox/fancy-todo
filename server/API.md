**Show All Todos**
----
  Returns json data about all todos.

* **URL**

  /todos

* **Method:**

  `GET`
  
*  **URL Params** <br />
  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
    {
        "id": 1,
        "title": "Learn REST API",
        "description": "Learn‌ ‌how‌ ‌to‌ ‌create‌ ‌RESTful‌ ‌API‌ ‌with‌ ‌Express‌ ‌and‌ ‌Sequelize",
        "status": "false",
        "due_date": "2020-10-27",
        "createdAt": "2020-10-26T06:15:39.664Z",
        "updatedAt": "2020-10-26T06:15:39.664Z"
    },
    {
        "id": 2,
        "title": "REST API",
        "description": "Learn‌ ‌how‌ ‌to‌ ‌create‌ ‌RESTful‌ ‌API‌ ‌with‌ ‌Express‌ ‌and‌ ‌Sequelize",
        "status": "false",
        "due_date": "2020-10-27",
        "createdAt": "2020-10-26T06:38:41.291Z",
        "updatedAt": "2020-10-26T06:38:41.291Z"
    }
]`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br /><br />

**Add Todo**
----
  Returns json data after created todo.

* **URL**

  /todos

* **Method:**

  `POST`
  
*  **URL Params** <br />
  None

* **Data Params**

  title, description, status, due_date

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
    "id": 6,
    "title": "Tes API",
    "description": "Learn‌ ‌how‌ ‌to‌ ‌create‌ ‌RESTful‌ ‌API‌ ‌with‌ ‌Express‌ ‌and‌ ‌Sequelize",
    "status": "false",
    "due_date": "2020-10-26T00:00:00.000Z",
    "updatedAt": "2020-10-26T12:11:09.886Z",
    "createdAt": "2020-10-26T12:11:09.886Z"
}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
  **Content:** `"Validation error: Date must be greater than today,\nValidation error: Title cannot be empty"`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br /><br />

**Show One Todo**
----
  Returns json data about one todo.

* **URL**

  /todos/:id

* **Method:**

  `GET`
  
*  **URL Params** <br />
   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "id": 1,
    "title": "REST APIs",
    "description": "Learn‌ ‌!",
    "status": "false",
    "due_date": "2020-10-12T00:00:00.000Z",
    "createdAt": "2020-10-26T07:14:29.370Z",
    "updatedAt": "2020-10-26T07:20:15.940Z"
}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
  **Content:** `{ "error": "Id not found" }`

**Update One Todo**
----
  Returns json data after update one todo.

* **URL**

  /todos/:id

* **Method:**

  `PUT`
  
*  **URL Params** <br />
   **Required:**
 
   `id=[integer]`

* **Data Params**

  title, description, status, due_date

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "id": 3,
    "title": "REST API",
    "description": "Learn‌ ‌s‌o‌m‌e‌t‌h‌i‌n‌g‌!",
    "status": false,
    "due_date": "2020-10-26T00:00:00.000Z",
    "createdAt": "2020-10-26T07:48:21.562Z",
    "updatedAt": "2020-10-26T12:32:55.081Z"
}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
  **Content:** `{ "error": "Id not found" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
  **Content:** `"Validation error: Date must be greater than today,\nValidation error: Title cannot be empty"`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br /><br />

**Update Status One Todo**
----
  Returns json data after update status one todo.

* **URL**

  /todos/:id

* **Method:**

  `PATCH`
  
*  **URL Params** <br />
   **Required:**
 
   `id=[integer]`

* **Data Params**

  status

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "id": 3,
    "title": "REST API",
    "description": "Learn‌ ‌s‌o‌m‌e‌t‌h‌i‌n‌g‌!",
    "status": "true",
    "due_date": "2020-10-26T00:00:00.000Z",
    "createdAt": "2020-10-26T07:48:21.562Z",
    "updatedAt": "2020-10-26T12:32:55.081Z"
}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
  **Content:** `{ "error": "Id not found" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
  **Content:** `"Validation error: Date must be greater than today,\nValidation error: Title cannot be empty"`

  OR


  * **Code:** 500 INTERNAL SERVER ERROR <br /><br />

**Delete One Todo**
----
  Returns json data after delete one todo.

* **URL**

  /todos/:id

* **Method:**

  `DELETE`
  
*  **URL Params** <br />
   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message: "todo success to delete" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
  **Content:** `{ "error": "Id not found" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br /><br />