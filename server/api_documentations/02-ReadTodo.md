**Read Todo**
----
  Returns all available json todo data on server.

* **URL**

  /todos

* **Method:**
  
  `GET`
  
*  **URL Params**

   None

* **Data Params**
   
   None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    `[
      {
        "id": 1,
        "title": "Rest API",
        "description": "Learn how to make API Documentaion and REST API",
        "status": "Done",
        "due_date": "2020-11-01",
        "createdAt": "2020-10-26T07:48:57.394Z",
        "updatedAt": "2020-10-26T07:48:57.394Z"
      },
      {
        "id": 2,
        "title": "Fancy Todo App",
        "description": "Protofolio project week 1",
        "status": "Undone",
        "due_date": "2020-11-01",
        "createdAt": "2020-10-26T07:48:57.394Z",
        "updatedAt": "2020-10-26T07:48:57.394Z"
      },
      {
        "id": 3,
        "title": "Todo 3",
        "description": "Kerjakan Todo Jangan Lupa",
        "status": "Undone",
        "due_date": "2020-11-05",
        "createdAt": "2020-10-26T07:49:32.777Z",
        "updatedAt": "2020-10-26T07:49:32.777Z"
      },
      {
        "id": 4,
        "title": "Todo 4",
        "description": "Add Register and Login",
        "status": "Undone",
        "due_date": "2020-11-10",
        "createdAt": "2020-10-26T10:19:58.124Z",
        "updatedAt": "2020-10-26T10:19:58.124Z"
      }
    ]`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`