**Register User**
----
  Login user on server.

* **URL**

  /login

* **Method:**
  
  `POST`
  
*  **URL Params**
   
   None

* **Data Params**

   **Required:**

   `email=[string]`
   `password=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    `{
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJib2JieXNlcHRpYW50b0BnbWFpbC5jb20iLCJpYXQiOjE2MDM3NzI0MDl9.9qrGweDS0gnrqGAnhOvd7wFu4SnU8gje34G2PvLB79g"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "..." }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal server error!" }`