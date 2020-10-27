# Fancy Todo

**CREATE TODO**
----
  create new ToDo to server

* **URL**

  /todos

* **Method:**
  
  `POST`

* **Data Params**

  {
    "id": 5,
    "title": "mencuci sepatu",
    "description": "mencuci sepatu olahraga",
    "status": "not done"
  }

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
    "id": 5,
    "title": "mencuci sepatu",
    "description": "mencuci sepatu olahraga",
    "status": "not done",
    "due_date": "2020-11-11T00:00:00.000Z",
    "updatedAt": "2020-10-26T17:23:51.737Z",
    "createdAt": "2020-10-26T17:23:51.737Z"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `[
    "Title is required!",
    "Cannot insert passed date!"
  ]`

**GET ALL TODO**
----
  return all ToDos on server

* **URL**

  /todos

* **Method:**
  
  `GET`
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
    {
        "id": 3,
        "title": "Makan bareng Minjuu",
        "description": "makannya di monas",
        "status": "not done",
        "due_date": "2020-11-23T00:00:00.000Z",
        "createdAt": "2020-10-26T12:00:21.870Z",
        "updatedAt": "2020-10-26T12:00:21.870Z"
    },
    {
        "id": 1,
        "title": "menanam padi",
        "description": "di halaman belakang",
        "status": "done",
        "due_date": "2020-11-02T00:00:00.000Z",
        "createdAt": "2020-10-26T11:58:58.019Z",
        "updatedAt": "2020-10-26T14:40:11.087Z"
    }
]`
 
* **Error Response:**

  * **Code:** 500 UNAUTHORIZED <br />
    **Content:** `____________`

**GET TODO**
----
  return a specific Todo by id

* **URL**

  /todos/:id

* **Method:**
  
  `GET`

*  **URL Params**

  req.params.id
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `
    {
        "id": 3,
        "title": "Makan bareng Minjuu",
        "description": "makannya di monas",
        "status": "not done",
        "due_date": "2020-11-23T00:00:00.000Z",
        "createdAt": "2020-10-26T12:00:21.870Z",
        "updatedAt": "2020-10-26T12:00:21.870Z"
    }`
 
* **Error Response:**

  * **Code:** 500 UNAUTHORIZED <br />
    **Content:** `____________`

**UPDATE TODO**
----
  update every attribute in specific ToDo item

* **URL**

  /todos/:id

* **Method:**
  
  `PUT`

* **Data Params**

  {
    "id": 5,
    "title": "mencuci sepatu",
    "description": "mencuci sepatu olahraga",
    "status": "not done"
  }

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "id": 5,
    "title": "mencuci sepatu",
    "description": "mencuci sepatu olahraga",
    "status": "not done",
    "due_date": "2020-11-11T00:00:00.000Z",
    "updatedAt": "2020-10-26T17:23:51.737Z",
    "createdAt": "2020-10-26T17:23:51.737Z"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `[
    "Title is required!",
    "Cannot insert passed date!"
  ]`

  **EDIT STATUS TODO**
----
  edit status attributes in specific Todo by id

* **URL**

  /todos/:id

* **Method:**
  
  `PATCH`

* **Data Params**

  {
    "status": "not done"
  }

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "id": 5,
    "title": "mencuci sepatu",
    "description": "mencuci sepatu olahraga",
    "status": "not done",
    "due_date": "2020-11-11T00:00:00.000Z",
    "updatedAt": "2020-10-26T17:23:51.737Z",
    "createdAt": "2020-10-26T17:23:51.737Z"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `[
    "Status is required!"
  ]`

   **DELETE TODO**
----
  delete a row of Todo by id

* **URL**

  /todos/:id

* **Method:**
  
  `DELETE`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `todo success to delete`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `not found`