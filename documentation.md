**Input Todo**
----
  Returns json data about a single todo.

* **URL**

  /todos

* **Method:**

  `POST`

* **Data Params**

  `{
    title : "masak",
    description : "sayur kangkung",
    status : false,
    due_date : 2020/10/25
  }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
      id : 1,
      title : "masak",
      description : "sayur kangkung",
      status : false,
      due_date : 2020/10/25
    }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User doesn't exist" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

**Show Todo**
----
  Returns json data about a all user.

* **URL**

  /users

* **Method:**

  `GET`
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
      id : 1,
      title : "masak",
      description : "sayur kangkung",
      status : false,
      due_date : 2020/10/25
    }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User doesn't exist" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

