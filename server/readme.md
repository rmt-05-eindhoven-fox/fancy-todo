**Fancy-Todo API Documentation**
----
    Returns added object. 

* **URL**

    /todos

* **Method:**

    `POST`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    `{ title : "Milestone day 1", description : "do API Documentation and REST API", status : "on going", due_date : "2020-10-26T18:25:43-05:00" }`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

----
    Returns array of objects contains all todos data. 

* **URL**

    /todos

* **Method:**

    `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `[{ title : "Milestone day 1", description : "do API Documentation and REST API", status : "on going", due_date : "2020-10-26T18:25:43-05:00" }, { title : "Milestone day 2", description : "REST API Auth", status : "on going", due_date : "2020-10-27T18:25:43-05:00" }, { title : "Milestone day 3", description : "jQuery and Fancy-Todo Social login", status : "on going", due_date : "2020-10-28T18:25:43-05:00" } ]`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

----
    Returns object based on request.params.id. 

* **URL**

    /todos/:id

* **Method:**

    `GET`

*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `{ title : "Milestone day 2", description : "REST API Auth", status : "on going", due_date : "2020-10-27T18:25:43-05:00" }`
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ error : "Not Found" }`

  * **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

----
    Returns object contains all its contents updated from request.body based on request.params.id. 

* **URL**

    /todos/:id

* **Method:**

    `PUT`

*  **URL Params**

   **Required:**
 
   `id=[integer]`

*  **Data Params**

   **Required:**
 
   `title=[integer]`
   `description=[string]`
   `status=[string]`
   `due_date=[date]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `{ title : "Milestone day 2", description : "REST API oAuth", status : "on going", due_date : "2020-10-27T18:25:43-05:00" }`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ error : "Date must be higher or equals on today" }`

  * **Code:** 404 <br />
    **Content:** `{ error : "Not Found" }`

  * **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

----
    Returns object contains newly updated data from request.body based on request.params.id. 

* **URL**

    /todos/:id

* **Method:**

    `PATCH`

*  **URL Params**

   **Required:**
 
   `id=[integer]`

*  **Data Params**

   **Required:**
 
   `status=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `{ status : "completed" }`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ error : "status must be completed or on going" }`

  * **Code:** 404 <br />
    **Content:** `{ error : "Not Found" }`

  * **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

----
    Returns message deleted object based on request.params.id. 

* **URL**

    /todos/:id

* **Method:**

    `DELETE`

*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `{ message : "todo Milestone day 2 deleted successfully" }`
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ error : "Not Found" }`

  * **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`