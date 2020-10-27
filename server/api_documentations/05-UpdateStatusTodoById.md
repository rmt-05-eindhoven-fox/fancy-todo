**Update Status Todo By Id**
----
  Update status field on a todo data based on its "Id" on server.

* **URL**

  /todos/:id

* **Method:**
  
  `PATCH`
  
*  **URL Params**

   **Required:**

   `id=[integer]`

* **Data Params**

  **Required:**
   
  `status=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    `{
      "id": 3,
      "title": "Todo 3",
      "description": "Kerjakan Todo Jangan Lupa",
      "status": "Done",
      "due_date": "2020-11-05",
      "createdAt": "2020-10-26T07:49:32.777Z",
      "updatedAt": "2020-10-26T11:27:31.187Z"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Status is required!" }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg : "Error not found!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`