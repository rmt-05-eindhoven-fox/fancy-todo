**Create ToDo**
----
  Create new ToDo object
* **URL**

  /todos

* **Method**

  `POST`

* **URL Params**

  None

* **Data Params**

  ```
      {
        "title": "Fancy Todo",
        "decription": "Week 1 task",
        "status": "Unfinished",
        "due_date": "2020-10-30"
      }
  ```

* **Success Response**
  * **Code:** 201 CREATED <br/>
    **Content:**
  ```
      {
        "id": "1",
        "title": "Fancy Todo",
        "decription": "Week 1 task",
        "due_date": "2020-10-30"
      }
  ```

* **Error Response**
  * **Code:** 400 BAD REQUEST
----

**Read ToDo**
----
  Return array of object with content of ToDo

* **URL**

  /todos

* **Method**

  `GET`

* **URL Params**

  None

* **Success Response**
  * **Code:** 200 OK<br />
    **Content:**
  ```
     [
        {
            "id" : 1,
            "title" : "Fancy ToDo",
            "description" : "Week 1 task",
            "due_date" : "2020-10-30"
        },
        {
            "id" : 2,
            "title" : "Learn Rest API",
            "description" : "You can do it",
            "due_date" : "2020-10-31"
        }
      ]
  ```

* **Error Response**
  * **Code:** 500 INTERNAL SERVER ERROR
----

**Read Specified ToDo**
----
Show ToDo object based by id

* **URL**

  /todos/:id

* **Method**

  `GET`

* **URL Params**

  **Required**

  `id=[integer]`

* **Data Params**

  None

* **Success Response**
  * **Code:** 200 OK <br/>
    **Content:**

  ```
    {
        "id" : 1,
        "title" : "Fancy ToDo",
        "description" : "Week 1 task",
        "due_date" : "2020-10-30"
    }
  ```

* **Error Response**
  * **Code:** 404 NOT FOUND
----

**Update ToDo**
----
Update ToDo object

* **URL**

  /todos/:id

* **METHOD**

  `PUT`

* **URL params**

  **Required:**<br/>
  `id=[integer]`

* **Data Params**

  ```
    {
      "title": "Fancy Todo",
      "decription": "Week 1 task",
      "status": "Unfinished",
      "due_date": "2020-10-30"
    }
  ```

* **Success Response**

  * **Code:** 200 OK <br/>
    **Content:**

  ```
    {
      "id" : "1"
      "title": "Fancy Todo App",
      "decription": "Week 1 task",
      "status": "Unfinished",
      "due_date": "2020-10-30"
    }
  ```

* **Error Response**

  **Code:** 404 NOT FOUND
---

**Update Status ToDo**
----
Update status attribute on ToDo object

* **URL**

  /todos/:id

* **Method**

  `PATCH`

* **URL Params**
  **Required:**

  `id=[integer]`

* **Data Params**
    ```
      {
        "status": "Finished"
      }
    ```
    

* **Success Response**
  * **Code:** 200 OK <br/>
    **Content:**
  ```
    {
      "id" : "1"
      "title": "Fancy Todo App",
      "decription": "Week 1 task",
      "status": "Finished",
      "due_date": "2020-10-30"
    }
  ```  

* **Error Response**
  * **Code:** 404 NOT FOUND
----

**Delete ToDo**
----
Delete selected ToDo Object by id

* **URL**

  /todos/:id

* **Method**

  DELETE

* **URL Params**

  **Required**

  `id=[integer]`

* **Data Params**

  None

* **Success Response**

  * **Code:** 200 OK <br/>
    **Content:**
  ```
    {
      "id" : "1"
      "title": "Fancy Todo App",
      "decription": "Week 1 task",
      "status": "Finished",
      "due_date": "2020-10-30"
    }
  ```
    OR
  ```
    message: "todo success to delete"
  ```
  
* **Error Response**
  * **Code:** 500 INTERNAL SERVER ERROR