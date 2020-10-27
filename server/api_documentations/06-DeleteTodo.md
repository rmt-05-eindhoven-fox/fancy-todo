**Delete Todo**
----
  Delete a todo data based on its "Id" on server.

* **URL**

  /todos/:id

* **Method:**
  
  `DELETE`
  
*  **URL Params**

   **Required:**

   `id=[integer]`

* **Data Params**
   
   None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    `{ msg: 'Successfully delete a todo with Id 4!' }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Id doesn't exists!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal server error!" }`