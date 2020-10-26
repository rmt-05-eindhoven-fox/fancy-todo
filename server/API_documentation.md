**Add a ToDo task**
----
  Create new task into ToDo List

* **URL**

  /todos

* **Method:**
  
  `POST`
  
*  **URL Params**

    none

* **Data Params**
```
  title=[string]
  description=[string] 
  status=[string]
  due_date=[date]
```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    { 
      "title": "assignment day 1", 
      "description": "API docs and todos CRUD", 
      "status": "on progress",
      "due_date": "2020-10-31"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />

-------

**Get ToDo List**
----
  Get all tasks from ToDo List

* **URL**

  /todos

* **Method:**
  
  `GET`
  
*  **URL Params**

    none

* **Data Params**

    none

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    [
      { 
        "title": "assignment day 1", 
        "description": "API docs and todos CRUD", 
        "status": "on progress",
        "due_date": "2020-10-31"
      },
      { 
        "title": "assignment day 2", 
        "description": "REST API Authentication", 
        "status": "on progress",
        "due_date": "2020-10-31"
      },
    ]
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />

------

**Add a ToDo task**
----
  Get a ToDo task

* **URL**

  /todos/:id

* **Method:**
  
  `GET`
  
*  **URL Params**

    :id

    **Required:**
    `id=[integer]`

* **Data Params**

    none

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    { 
      "id": 1 
      "title": "assignment day 1", 
      "description": "API docs and todos CRUD", 
      "status": "on progress",
      "due_date": "2020-10-31"
    }
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />

-------

**Update a ToDo task**
----
  Update all details of a task from ToDo List

* **URL**

  /todos/:id

* **Method:**
  
  `PUT`
  
*  **URL Params**

    :id

    **Required:**
    `id=[integer]`

* **Data Params**

```
  title=[string]
  description=[string] 
  status=[string]
  due_date=[date]
```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    { 
      "id": 1 
      "title": "assignment day 1", 
      "description": "API docs and todos CRUD", 
      "status": "on progress",
      "due_date": "2020-10-31"
    }
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />

-------

**Patch a ToDo task**
----
  Update one detail of a task from ToDo List

* **URL**

  /todos/:id

* **Method:**
  
  `PATCH`
  
*  **URL Params**

    :id

    **Required:**
    `id=[integer]`

* **Data Params**

  `{"status": "completed"}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    { 
      "id": 1 
      "title": "assignment day 1", 
      "description": "API docs and todos CRUD", 
      "status": "completed",
      "due_date": "2020-10-31"
    }
    ```
    OR 
    **Content:**   `{"status": "completed"}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />

-------

**Patch a ToDo task**
----
  Update one detail of a task from ToDo List

* **URL**

  /todos/:id

* **Method:**
  
  `DELETE`
  
*  **URL Params**

    :id

    **Required:**
    `id=[integer]`

* **Data Params**

    none 

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{message: "task deleted successfully"}`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />

-------