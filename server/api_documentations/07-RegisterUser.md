**Register User**
----
  Register user on server.

* **URL**

  /register

* **Method:**
  
  `POST`
  
*  **URL Params**
   
   None

* **Data Params**

   **Required:**

   `email=[string]`
   `password=[string]`

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:**
    `{
      "id": 2,
      "email": "user@gmail.com"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "..." }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal server error!" }`