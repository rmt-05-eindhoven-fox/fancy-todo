**Title**
----
  Fancy TODO List

* **URL**

  /todos

* **Method:**

  `POST`

* **Data Params**

        ```
        {
            "title" : "Learn REST API",
            "description" : "Learn how to create  RESTful API with Express and Sequelize",
            "due_date" : "2020-01-29"
        }
        ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {
        "id": 1,
        "title" : "Learn REST API",
        "description" : "Learn how to create  RESTful API with Express and Sequelize",
        "status" : "Not Done",
        "due_date" : "2020-01-29"
    }
    ```
 
* **Error Response:**

   * **Code:** 500 INTERNAL SERVER ERROR <br />

    OR

   * **Code:** 400 BAD REQUEST <br />
     **Content:** `{ error : "Validation error" }`


<hr>


* **URL**

  /todos

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    [ {
        "id": 1,
        "title" : "Learn REST API",
        "description" : "Learn how to create  RESTful API with Express and Sequelize",
        "status" : "Not Done",
        "due_date" : "2020-01-29"
    },
    {
        "id": 1,
        "title" : "Learn Vue JS",
        "description" : "Learn how to use VUE",
        "status" : "Not Done",
        "due_date" : "2020-02-05"
    } ]
    ```
 
* **Error Response:**

  * **Code:** 500 NOT FOUND <br />
    **Content:** `{ error : "Data Not Found." }`

<hr>


* **URL**

  /todos/:id

* **Method:**
  
  <_The request type_>

  `GET`
  
*  **URL Params** 

   **Required:**
 
   `id=[integer]`


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "id": 1,
        "title" : "Learn REST API",
        "description" : "Learn how to create  RESTful API with Express and Sequelize",
        "status" : "Not Done",
        "due_date" : "2020-01-29"
    }
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not Found" }`

<hr>


* **URL**

  /todos/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`


* **Data Params**
    ```
    {
        "title" : "Learn Vue",
        "description" : "Learn how to create  RESTful API with Express and Sequelize",
        "status" : "Not Done",
        "due_date" : "2020-01-29"
    }
    ```

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "title" : "Learn Vue",
        "description" : "Learn how to create  RESTful API with Express and Sequelize",
        "status" : "Not Done",
        "due_date" : "2020-01-29"
    }
    ```
 
* **Error Response:**


   * **Code:** 404 NOT FOUND <br />
     **Content:** `{ error : "Not Found" }`

    OR

   * **Code:** 500 INTERNAL SERVER ERROR <br />

    OR

   * **Code:** 400 BAD REQUEST <br />
     **Content:** `{ error : "Validation error" }`


<hr>


* **URL**

  /todos/:id

* **Method:**
  

  `PATCH`
  
*  **URL Params**


   **Required:**
 
   `id=[integer]`

* **Data Params**

  `{ status : Done }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "title" : "Learn Vue",
        "description" : "Learn how to create  RESTful API with Express and Sequelize",
        "status" : "Done",
        "due_date" : "2020-01-29"
    }
    ```
 
* **Error Response:**

   * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Validation error" }`

    OR

    * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not Found" }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />

<hr>

* **URL**

  /todos/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message : 'todo success to delete' }`
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "error" }`

    OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not Found" }`
