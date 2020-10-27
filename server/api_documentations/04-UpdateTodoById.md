**Update Todo By Id**
----
  Update a single todo data based on its "Id" on server.

* **URL**

  /todos/:id

* **Method:**
  
  `PUT`
  
*  **URL Params**

   **Required:**
   
   `id=[integer]`

* **Data Params**

  **Required:**
   
  `title=[string]`,
  `description=[string]`,
  `status=[string]`,
  `due_date=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    `{
      "id": 2,
      "title": "Fancy Todo App 2",
      "description": "Protofolio project week 1",
      "status": "Done",
      "due_date": "2020-11-01",
      "createdAt": "2020-10-26T07:48:57.394Z",
      "updatedAt": "2020-10-26T11:24:21.311Z"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "..." }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Id doesn't exists!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal server error!" }`