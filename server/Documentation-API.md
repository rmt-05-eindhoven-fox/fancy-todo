**Add new ToDo**
----
    Create new ToDo Data with format Object

* **URL**

  `/todos`

* **Method:**

  `POST` 

* **URL Params**

  None

* **Data Params**
```json
  {
    "title" : "API Todo Documentation",
    "description" : "API Todo Documentation",
    "status" : "On Proggress",
    "due_date" : "2020-10-28"
  }
```

* **Success Response:**

  * **Code:** 201 CREATED <br />
  **Content:** 
  ```json
    {
      "id" : 1,
      "title" : "API Todo Documentation",
      "description" : "API Todo Documentation",
      "status" : "On Proggress",
      "due_date" : "2020-10-28"
    }
  ```

* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
  <!-- **Content:** `{ error : "Log in" }` -->



-------

**Get all ToDos** 
----
    Show all Todo data in format array of object 

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
      "title" : "API Todo Documentation",
      "description" : "API Todo Documentation",
      "status" : "On Proggress",
      "due_date" : "2020-10-28"
    },
      {
      "id" : 2,
      "title" : "API Todo CRUD Function",
      "description" : "Making API Todo CRUD Function",
      "status" : "On Proggress",
      "due_date" : "2020-10-29"
    }
    ]
  ```

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    <!-- **Content:** `{ error : "Log in" }` -->

-------

**Get one ToDo**
----
    Show Todo Data based on parameter that given on URL params

* **URL**

  `/todos/:id`

* **Method:**

  `GET` 

* **URL Params**

  targetId refers to id of ToDo object

  **Required:**

  `targetId=[integer]`

* **Data Params**

  None


* **Success Response:**

  * **Code:** 200 OK <br />
  **Content:** 
  ```json    
    {
      "id" : 1,
      "title" : "API Todo Documentation",
      "description" : "API Todo Documentation",
      "status" : "On Proggress",
      "due_date" : "2020-10-28"
    }
  ```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    <!-- **Content:** `{ error : "Log in" }` -->


-------

**Put Updated Data on one ToDo**
----
    Updating all rows Todo Data based on parameter that given in URL params

* **URL**

  `/todos/:id`

* **Method:**

  `PUT` 

* **URL Params**

  targetId refers to id of ToDo object

  **Required:**

  `targetId=[integer]`

* **Data Params**

  ```json
  {
      "title" : "API Todo Documentation",
      "description" : "Updating API Todo Documentation",
      "status" : "On Proggress",
      "due_date" : "2020-10-28"
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
    Updating spesific property Todo Data based on parameter that given in URL params

* **URL**

  `/todos/:id`

* **Method:**

  `PATCH` 

*  **URL Params**

  targetId refers to id of ToDo object

  **Required:**

  `targetId=[integer]`

* **Data Params**

   ```json
  {
    "status" : "Task Done"
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
      "status" : "Task Done",
      "due_date" : "2020-10-30"
    }
  ```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    <!-- **Content:** `{ error : "Log in" }` -->

-------

**Delete one ToDo**
----
  Delete Todo Data based on parameter that given in URL params

* **URL**

  `/todos/:id`

* **Method:**

  `DELETE` 

*  **URL Params**

  targetId refers to id of ToDo object

  **Required:**

  `targetId=[integer]`

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
      "status" : "Task Done",
      "due_date" : "2020-10-30"
    }
  ```
  **OR** <br><br>
  **Content:** <br>
    `message : 'todo id = ${targetId} success to delete'`


* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
  <!-- **Content:** `{ error : "Log in" }` -->

-------