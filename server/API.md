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
        "title": "Learn Jquery is easy",
        "decription": "You can do it",
        "status": "Unfinished",
        "due_date": "2020-10-28"
      }
  ```

* **Success Response**
  * **Code:** 201 CREATED <br/>
    **Content:**
  ```
      {
        "id": 5,
        "title": "Learn Jquery is easy",
        "description": "You can do it",
        "status": "Unfinished",
        "due_date": "2020-10-28T00:00:00.000Z",
        "userId": 1
      }
  ```

* **Error Response**
  * **Code:** 400 BAD REQUEST <br/>
    **Content:**
  ```
  message: "Title is required!"
  ```
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
          "id": 1,
          "title": "Fancy Todo App",
          "description": "Well Played",
          "status": "Unfinished",
          "due_date": "2020-10-28T00:00:00.000Z",
          "userId": 1,
          "createdAt": "2020-10-28T14:40:43.245Z",
          "updatedAt": "2020-10-28T14:40:43.245Z"
        },
        {
          "id": 2,
          "title": "Fancy Todo App 2",
          "description": "Well Played",
          "status": "Unfinished",
          "due_date": "2020-10-28T00:00:00.000Z",
          "userId": 1,
          "createdAt": "2020-10-28T15:02:14.564Z",
          "updatedAt": "2020-10-28T15:02:14.564Z"
        },
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
      "id": 4,
      "title": "Hacktiv8 Bootcamp",
      "description": "Space News",
      "status": "Unfinished",
      "due_date": "2020-10-28T00:00:00.000Z",
      "userId": 1
    }
  ```

* **Error Response**
  * **Code:** 404 NOT FOUND <br/>
    **Content:**
  ```
  "error": "Todo not found"
  ```
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
      "title": "Fancy Todo App",
      "decription": "Week 1 task",
      "status": "Finished"
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
      "decription": "Well Played",
      "status": "Finished",
      "due_date": "2020-10-30T00:00:00.000Z",
      "userId": 1,
      "createdAt": "2020-10-27T09:30:59.051Z",
      "updatedAt": "2020-10-27T09:30:59.051Z"
    }
  ```

* **Error Response**

  **Code:** 404 NOT FOUND <br/>
  **Content:**
  ```
  "error": "Todo not found"
  ```
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
  * **Code:** 404 NOT FOUND <br/>
    **Content:** 
  ```
   "error": "Todo not found"
  ```
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
      "due_date": "2020-10-28T00:00:00.000Z",
      "userId": 18,
      "createdAt": "2020-10-27T09:30:59.051Z",
      "updatedAt": "2020-10-27T09:30:59.051Z"
    }
  ```
    OR
  ```
    message: "Todo is succesfully deleted!"
  ```
  
* **Error Response**
  * **Code:** 500 INTERNAL SERVER ERROR <br/>

    OR

  * **Code:** 404 NOT FOUND <br/>
      **Content:** 
  ```
    "error": "Todo not found"
  ```
