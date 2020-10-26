**Show Todos**
----
  Return json data about all todos

* **URL**

  /todos/

* **Method:**
  
  `GET`
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : INTEGER, title: STRING, description: STRING, status: STRING, due_date: <DATE> }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You need to login first" }`
    
  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Todos not found" }`

  OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

* **Sample Call:**

  <_Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable._> 

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 