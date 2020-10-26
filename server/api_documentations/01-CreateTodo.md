**Create Todo**
----
  Create a new single todo list data on server into a database.

* **URL**

  /todos

* **Method:**
  
  `POST`
  
*  **URL Params**

   None

* **Data Params**

  `title=[string]`,
  `description=[string]`,
  `status=[string]`,
  `due_date=[string]`

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{
    "id": 4,
    "title": "Todo 4",
    "description": "Add Register and Login",
    "status": "Undone",
    "due_date": "2020-11-10",
    "updatedAt": "2020-10-26T10:19:58.124Z",
    "createdAt": "2020-10-26T10:19:58.124Z"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "..." }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal server error!" }`