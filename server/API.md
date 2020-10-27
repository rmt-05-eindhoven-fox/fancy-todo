**Create Todo**
----
  Returns json data about a single user.

* **URL**

  /todos

* **Method:**

  `POST`
  
* **URL Params**

  None

* **Data Params**

```json
  {
    "title": "Learn REST API",
    "description": "Learn how to write Documentation",
    "status": "unchecked",
    "due_date": "2020-10-27"
  }
```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 

```json
  {
    "id": 1,
    "title": "Learn REST API",
    "description": "Learn how to write Documentation",
    "status": "unchecked",
    "due_date": "2020-10-27",
    "createdAt": "2020-10-26",
    "updatedAt" : "2020-10-26",
  }
```

* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "The server encountered an unexpected condition that prevented it from fulfilling the request." }`

* **Sample Call:**


**Show All**
----
  Returns json data of all todo.

* **URL**

  /todos

* **Method:**

  `GET`
  
*  **URL Params**

   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `Array of object of all todo in database`
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "The server encountered an unexpected condition that prevented it from fulfilling the request." }`

* **Sample Call:**

**Show Todo**
----
  Returns json data about a single todo.

* **URL**

  /todos/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `A single object of todo with requested id.`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Todo doesn't exist" }`

