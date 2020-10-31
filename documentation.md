**Create Todo**
----
  Returns json data about a single todo.

* **URL**

  /todos

* **Method:**

  `POST`

* **Data Params**

  `{
    title : "masak",
    description : "sayur kangkung",
    status : false,
    due_date : 2020/10/25
  }`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
      id : 1,
      title : "masak",
      description : "sayur kangkung",
      status : false,
      due_date : 2020/10/25
    }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User doesn't exist" }`

  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

**ShowAll Todo**
----
  Returns json data about a all todo.

* **URL**

  /users

* **Method:**

  `GET`
  
* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
      id : 1,
      title : "masak",
      description : "sayur kangkung",
      status : false,
      due_date : 2020/10/25
    }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User doesn't exist" }`

  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`


**Show Todo**
----
  Returns json data about a single todo.

* **URL**

  /users/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
      id : 1,
      title : "masak",
      description : "sayur kangkung",
      status : false,
      due_date : 2020/10/25
    }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User doesn't exist" }`

  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`


**UpdateAll Todo**
----
  Returns json data about a single todo.

* **URL**

  /users/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  `{
    title : "masak enak",
    description : "sayur bayam",
    status : true,
    due_date : 2020/10/26
  }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
      id : 1,
      title : "masak enak",
      description : "sayur bayam",
      status : true,
      due_date : 2020/10/26
    }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User doesn't exist" }`

  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

**UpdateOne Todo**
----
  Returns json data about a single todo.

* **URL**

  /users/:id

* **Method:**

  `PATCH`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  `{
    status : false,
  }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
      id : 1,
      title : "masak enak",
      description : "sayur bayam",
      status : false,
      due_date : 2020/10/26
    }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User doesn't exist" }`

  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

**Delete Todo**
----
  Returns json data about a single todo.

* **URL**

  /users/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message : 'todo success to delete' }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User doesn't exist" }`

  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`