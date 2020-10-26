**Add new ToDo**
----
  Create new ToDo Object

* **URL**

  `/todos`

* **Method:**
  
  `POST` 

* **URL Params**

  None

* **Data Params**
```json
  {
    "title" : "Work on API Docs",
    "description" : "API Docs for Fancy ToDos",
    "status" : "Not Done",
    "due_date" : "2020-10-30"
  }
```

* **Success Response:**

  * **Code:** 201 CREATED <br />
  **Content:** 
  ```json
    {
      "id" : 1,
      "title" : "Work on API Docs",
      "description" : "API Docs for Fancy ToDos",
      "due_date" : "2020-10-30"
    }
  ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
  <!-- **Content:** `{ error : "Log in" }` -->



-------

**Get all ToDos** 
----
  Return an array of objects with all ToDo data

* **URL**

  `/todos`

* **Method:**
  
  `GET` 

* **URL Params**

  None

* **Data Params**

  None


* **Success Response:**

  * **Code:** 200 OK<br/>
  **Content:** 
  ```json
    [
      {
        "id" : 1,
        "title" : "Work on API Docs",
        "description" : "API Docs for Fancy ToDos",
        "due_date" : "2020-10-30"
      },
      {
        "id" : 2,
        "title" : "Learn Rest API",
        "description" : "Go to restapitutorial.com",
        "due_date" : "2020-10-31"
      }
    ]

  ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    <!-- **Content:** `{ error : "Log in" }` -->

-------

**Get one ToDo**
----
  Return a ToDo object based on given URL params

* **URL**

  `/todos/:id`

* **Method:**
  
  `GET` 

* **URL Params**

  id refers to id of ToDo object

  **Required:**

  `id=[integer]`

* **Data Params**

  None


* **Success Response:**

  * **Code:** 200 OK <br />
  **Content:** 
  ```json    
    {
      "id" : 1,
      "title" : "Work on API Docs",
      "description" : "API Docs for Fancy ToDos",
      "due_date" : "2020-10-30"
    }

  ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    <!-- **Content:** `{ error : "Log in" }` -->


-------

**Put Updated Data on one ToDo**
----
  Return the updated ToDo object

* **URL**

  `/todos/:id`

* **Method:**
  
  `PUT` 

* **URL Params**

  id refers to id of ToDo object

  **Required:**

  `id=[integer]`

* **Data Params**

  ```json
  {
    "title" : "Work on API Docs",
    "description" : "API Docs for Fancy ToDos",
    "status" : "Not Done",
    "due_date" : "2020-10-30"
  }
  ```


* **Success Response:**

  * **Code:** 200 OK<br />
  **Content:** 
  ```json   
    {
      "id" : 1,
      "title" : "Work on API Docs",
      "description" : "API Docs for Fancy ToDos",
      "status" : "Not Done",
      "due_date" : "2020-10-30"
    }

  ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    <!-- **Content:** `{ error : "Log in" }` -->

-------

**Patch Status on one ToDo**
----
  Return the updated ToDo object

* **URL**

  `/todos/:id`

* **Method:**
  
  `PATCH` 

*  **URL Params**

  id refers to id of ToDo object

  **Required:**

  `id=[integer]`

* **Data Params**

   ```json
  {
    "status" : "Done"
  }
    ```


* **Success Response:**

  * **Code:** 200 OK <br />
  **Content:** 
  ```json    
    {
      "id" : 1,
      "title" : "Work on API Docs",
      "description" : "API Docs for Fancy ToDos",
      "status" : "Done",
      "due_date" : "2020-10-30"
    }

  ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    <!-- **Content:** `{ error : "Log in" }` -->

-------

**Delete one ToDo**
----
  Delete a ToDo object based on params

* **URL**

  `/todos/:id`

* **Method:**
  
  `DELETE` 

*  **URL Params**

  id refers to id of ToDo object

  **Required:**

  `id=[integer]`

* **Data Params**

  NONE


* **Success Response:**

  * **Code:** 200 OK <br />

  **Content:** 
  ```json    
    {
      "id" : 1,
      "title" : "Work on API Docs",
      "description" : "API Docs for Fancy ToDos",
      "status" : "Done",
      "due_date" : "2020-10-30"
    }

  ```
  **OR** <br><br>
  **Content:** <br>
    `message : 'todo success to delete'`

 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
  <!-- **Content:** `{ error : "Log in" }` -->

-------