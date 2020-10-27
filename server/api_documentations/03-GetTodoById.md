**Get Todo By Id**
----
  Returns a single todo data based on its "Id" on server.

* **URL**

  /todos/:id

* **Method:**
  
  `GET`
  
*  **URL Params**

   **Required:**

   `id=[integer]`

* **Data Params**
   
   None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    `{
      "id": 1,
      "title": "Rest API",
      "description": "Learn how to make API Documentaion and REST API",
      "status": "Done",
      "due_date": "2020-11-01",
      "createdAt": "2020-10-26T07:48:57.394Z",
      "updatedAt": "2020-10-26T07:48:57.394Z"
    }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg : "Error not found!" }`