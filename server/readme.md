**1. Create Todos**
----
  Post/Create new todo.

* **URL**

  /todos


* **Method:**

  `POST`

* **Data Params**

  ```javascript
  {
      title: "Todo Title", 
      description: "Todo Description",  
      due_date: "2020-10-26", 
  }
  ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```javascript
    { 
      id: 1, 
      title: "Todo Title", 
      description: "Todo Description", 
      status: "pending", 
      due_date: "2020-10-26T05:29:38.084Z", 
      createdAt: "2020-10-26T05:17:59.133Z", 
      updatedAt: "2020-10-26T05:17:59.133Z" 
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD  REQUEST <br />
    **Content:** 
    ```javascript
    { error : ["Title is required", "Description is required", ...] }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { error : "Something error at server" }
    ```
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { error : "Something error at server" }
    ```
  

**2. Get All Todos**
----
  Get all todos data.

* **URL**

  /todos

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    [
      { 
        id: 1, 
        title: "Todo Title", 
        description: "Todo Description", 
        status: "pending", 
        due_date: "2020-10-26T05:29:38.084Z", 
        createdAt: "2020-10-26T05:17:59.133Z", 
        updatedAt: "2020-10-26T05:17:59.133Z" 
      }, 
      { 
        id: 2, 
        title: "Todo Title 2", 
        description: "Todo Description 2", 
        status: "pending", 
        due_date: "2020-10-26T05:29:38.084Z", 
        createdAt: "2020-10-26T05:17:59.133Z", 
        updatedAt: "2020-10-26T05:17:59.133Z" 
      }, 
      { ... }
    ]
    ```

* **Error Response:** 

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { error : "Something error at server" }
    ```

**3. Get Todo by ID**
----
  Get todos data by id.

* **URL**

  /todos/:id

* **Method:**

  `GET`

* **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    { 
      id: 1, 
      title: "Todo Title", 
      description: "Todo Description", 
      status: "pending", 
      due_date: "2020-10-26T05:29:38.084Z", 
      createdAt: "2020-10-26T05:17:59.133Z", 
      updatedAt: "2020-10-26T05:17:59.133Z" 
    }
    ```

* **Error Response:** 

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```javascript
    { error : "Data not found!" }
    ```
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { error : "Something error at server" }
    ```
    ```

**4. Update Todo by ID**
----
  Get todos data by id.

* **URL**

  /todos/:id

* **Method:**

  `PUT`

* **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  ```javascript
  {
      title: "New Todo Title",
      status: "pending", 
      description: "New Todo Description",  
      due_date: "2020-10-26", 
  }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    { 
      id: 1, 
      title: "New Todo Title", 
      description: "New Todo Description", 
      status: "pending", 
      due_date: "2020-10-26T05:29:38.084Z", 
      createdAt: "2020-10-26T05:17:59.133Z", 
      updatedAt: "2020-10-26T06:00:52.393Z" 
    }
    ```

* **Error Response:** 

  * **Code:** 400 BAD  REQUEST <br />
    **Content:** 
    ```javascript
    { error : ["Title is required", "Description is required", ...] }
    ```
  
  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```javascript
    { error : "Data not found!" }
    ```
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { error : "Something error at server" }
    ```

**5. Update Todo Status by ID**
----
  Get todos data by id.

* **URL**

  /todos/:id

* **Method:**

  `PATCH`

* **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  ```javascript
  { 
      status: "finished"
  }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    { 
      id: 1, 
      title: "New Todo Title", 
      description: "New Todo Description", 
      status: "finished", 
      due_date: "2020-10-26T05:29:38.084Z", 
      createdAt: "2020-10-26T05:17:59.133Z", 
      updatedAt: "2020-10-26T06:05:17.289Z" 
    }
    ```

* **Error Response:** 

  * **Code:** 400 BAD  REQUEST <br />
    **Content:** 
    ```javascript
    { error : ["Title is required", "Description is required", ...] }
    ``` 
  
  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```javascript
    { error : "Data not found!" }
    ```
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { error : "Something error at server" }
    ```

**6. Delete Todo by ID**
----
  Get todos data by id.

* **URL**

  /todos/:id

* **Method:**

  `PATCH`

* **URL Params**

   **Required:**
 
   `id=[integer]` 

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    { 
      message: "todo success to delete"
    }
    ```

* **Error Response:**  

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```javascript
    { error : "Data not found!" }
    ```
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { error : "Something error at server" }
    ```

