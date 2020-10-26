**Fancy Todo App**
----
  <_Additional information about your API call. Try to use verbs that match both request type (fetching vs modifying) and plurality (one vs multiple)._>

* **URL**

  /todos <br>
  /todos/:id

* **Method:**
  
  <_The request type_>

  `GET` | `POST` | `DELETE` | `PUT` | `PATCH`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  {
    "title": "ketemu dia",
    "description": "disini",
    "status": false,
    "due_date": "2020-10-21"
  } <br>
  `title=[string]`
  `description=[string]`
  `status=[boolean]`
  `due_date=[date]`

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
    `{
    "id": 10,
    "title": "ketemu dia",
    "description": "disini",
    "status": false,
    "due_date": "2020-10-29T00:00:00.000Z",
    "updatedAt": "2020-10-26T18:00:14.619Z",
    "createdAt": "2020-10-26T18:00:14.619Z"
    }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{
    "error": "Row with id \"9\" not found"
}`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{
    "message": "Date must to greater than today",
    "type": "Validation error",
    "path": "due_date",
    "value": "2020-10-21T00:00:00.000Z",
    "origin": "FUNCTION",
    "instance": {
        "id": null,
        "title": "ketemu dia",
        "description": "disini",
        "status": false,
        "due_date": "2020-10-21T00:00:00.000Z",
        "updatedAt": "2020-10-26T18:03:58.382Z",
        "createdAt": "2020-10-26T18:03:58.382Z"
    },
    "validatorKey": "tanggal",
    "validatorName": null,
    "validatorArgs": [],
    "original": {}
}`
