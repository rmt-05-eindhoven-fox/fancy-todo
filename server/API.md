**Show All Todos**
----
  Returns json data about all todos.

* **URL**

  /todos

* **Method:**

  `GET`
  
*  **URL Params** <br />
  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
    {
        "id": 1,
        "title": "Learn REST API",
        "description": "Learn‌ ‌how‌ ‌to‌ ‌create‌ ‌RESTful‌ ‌API‌ ‌with‌ ‌Express‌ ‌and‌ ‌Sequelize",
        "status": null,
        "due_date": "2020-10-27",
        "createdAt": "2020-10-26T06:15:39.664Z",
        "updatedAt": "2020-10-26T06:15:39.664Z"
    },
    {
        "id": 2,
        "title": "REST API",
        "description": "Learn‌ ‌how‌ ‌to‌ ‌create‌ ‌RESTful‌ ‌API‌ ‌with‌ ‌Express‌ ‌and‌ ‌Sequelize",
        "status": null,
        "due_date": "2020-10-27",
        "createdAt": "2020-10-26T06:38:41.291Z",
        "updatedAt": "2020-10-26T06:38:41.291Z"
    }
]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User doesn't exist" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`