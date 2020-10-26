**Add New Todo**
----
  Create new Todo on server

* **URL**

  /todos

* **Method:**

  `POST`

* **Data Params**

  `title=[string]`
  `description=[string]`
  `status=[boolean]`
  `due_date=[date]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
    "id": 2,
    "title": "Livecode",
    "description": "Livecode week 1",
    "status": false,
    "due_date": "2020-10-28T00:00:00.000Z",
    "updatedAt": "2020-10-26T12:19:39.860Z",
    "createdAt": "2020-10-26T12:19:39.860Z"
}`
 
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:** `{
    "error": [
        "please input future time!"
    ]
}`

  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:** ``


**Find All Todos**
----
  return all todos on server

* **URL**

  /todos

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
    {
        "id": 1,
        "title": "Ngoding",
        "description": "Materi REST API",
        "status": false,
        "due_date": "2020-10-27T00:00:00.000Z",
        "createdAt": "2020-10-26T12:17:46.572Z",
        "updatedAt": "2020-10-26T12:17:46.572Z"
    },
    {
        "id": 2,
        "title": "Livecode",
        "description": "Livecode week 1",
        "status": false,
        "due_date": "2020-10-28T00:00:00.000Z",
        "createdAt": "2020-10-26T12:19:39.860Z",
        "updatedAt": "2020-10-26T12:19:39.860Z"
    }
]`
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{}`


**Find Todo by ID**
----
  Find Todo by id on server

* **URL**

  /todos/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "id": 1,
    "title": "Ngoding selesai",
    "description": "Materi REST API",
    "status": true,
    "due_date": "2020-10-27T00:00:00.000Z",
    "createdAt": "2020-10-26T12:17:46.572Z",
    "updatedAt": "2020-10-26T14:25:29.833Z"
}`
 
* **Error Response:**

  * **Code:** 404 Not Found <br />
    **Content:** `{
    "error": " id not found"
}`

**PUT Todo by ID**
----
  Update all fields of Todo by id on server

* **URL**

  /todos/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  `title=[string]`
  `description=[string]`
  `status=[boolean]`
  `due_date=[date]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "id": 1,
    "title": "Ngoding",
    "description": "Materi REST API",
    "status": false,
    "due_date": "2020-10-27T00:00:00.000Z",
    "createdAt": "2020-10-26T12:17:46.572Z",
    "updatedAt": "2020-10-26T12:17:46.572Z"
}`
 
* **Error Response:**

  * **Code:** 404 Not Found <br />
    **Content:** `{
    "error": " id not found"
}`

  OR

  * **Code:** 400 Bad Request <br />
    **Content:** `{
    "errors": [
        "please input future time!"
      ]
    }`

  OR

   *   **Code:** 500 Internal Server Error <br />
      **Content:** ``


**Patch Todo by ID**
----
  Update several fields of Todo by id on server

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

  * **Code:** 200 <br />
    **Content:** `{
    "id": 1,
    "title": "Ngoding selesai",
    "description": "Materi REST API",
    "status": false,
    "due_date": "2020-10-27T00:00:00.000Z",
    "createdAt": "2020-10-26T12:17:46.572Z",
    "updatedAt": "2020-10-26T15:12:03.321Z"
}`
 
* **Error Response:**

  * **Code:** 404 Not Found <br />
    **Content:** `{
    "error": " id not found"
}`

  OR

   * **Code:** 400 Bad Request <br />
      **Content:** `{
      "errors": [
          "Status is required!"
      ]
  }`

  OR

   * **Code:** 500 Internal Server Error <br />
      **Content:** ``



**Delete Todo by ID**
----
  Delete Todo by id on server

* **URL**

  /todos/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "message": "todo success to delete"
}`
 
* **Error Response:**

  * **Code:** 404 Not Found <br />
    **Content:** `{
    "error": " id not found"
}`

  OR

   * **Code:** 500 Internal Server Error <br />
      **Content:** ``