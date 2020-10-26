**Find All To Dos**
----
 return all to dos in server

* **URL**

  /todos

* **Method:**

  `GET` 

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ 
      id: 1,
      title: 'Learn JQuery',
      description: 'Phase 1 week 1',
      status: 'to do',
      due_date: '2020-10-30',
      createdAt: '2020-10-26',
      updatedAt: '2020-10-26',
      }, {
      id: 2,
      title: 'Learn REST API',
      description: 'Phase 1 week 1',
      status: 'doing',
      due_date: '2020-10-30',
      createdAt: '2020-10-26',
      updatedAt: '2020-10-26',
      }]`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : "Internal server error" }`


**Add To Dos**
----
 Create new to do object

* **URL**

  /todos

* **Method:**

  `POST` 

* **Data Params**

  **Required:**
 
  `{
    title: [string],
    description: [string],
    status: [string],
    due_date: [date]
  }`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ 
      id: 3,
      title: 'Finish Portfolio Week 1',
      description: 'Fancy to do',
      status: 'to do',
      due_date: '2020-10-30',
      createdAt: '2020-10-26',
      updatedAt: '2020-10-26',
      }`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ error : "Req body validation" }`
  
  OR

  * **Code:** 500 <br />
    **Content:** `{ error : "Internal server error" }`
  
**Find One To Dos**
----
 return object to do with id 

* **URL**

  /todos/:id

* **URL Params**

  **Required:**
 
  `id=[integer]`

* **Method:**

  `GET` 

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ 
      id: 1,
      title: 'Learn JQuery',
      description: 'Phase 1 week 1',
      status: 'to do',
      due_date: '2020-10-30',
      createdAt: '2020-10-26',
      updatedAt: '2020-10-26',
      }`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : "Internal server error" }`
  
  OR

  * **Code:** 404 <br />
    **Content:** `{ error : "Not found" }`

**Edit To Do**
----
 edit to do with id 

* **URL**

  /todos/:id

* **URL Params**

  **Required:**
 
  `id=[integer]`

* **Method:**

  `PUT` 

* **Data Params**

  **Required:**
 
  `{
    title: [string],
    description: [string],
    status: [string],
    due_date: [date]
  }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ 
      id: 4,
      title: 'Plan group project',
      description: 'Fancy to do',
      status: 'to do',
      due_date: '2020-10-30',
      createdAt: '2020-10-26',
      updatedAt: '2020-10-26',
      }`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ error : "Req body validation" }`
  
  OR

  * **Code:** 404 <br />
    **Content:** `{ error : "Not found" }`
  
  OR 

  * **Code:** 500 <br />
    **Content:** `{ error : "Internal server error" }`

**Edit Status**
----
 edit to do status with id 

* **URL**

  /todos/:id

* **URL Params**

  **Required:**
 
  `id=[integer]`

* **Method:**

  `PATCH` 

* **Data Params**

  **Required:**
 
  `{
    status: [string]
  }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ 
      id: 1,
      title: 'Learn JQuery',
      description: 'Phase 1 week 1',
      status: 'doing',
      due_date: '2020-10-30',
      createdAt: '2020-10-26',
      updatedAt: '2020-10-26',
      }`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ error : "Req body validation" }`
  
  OR

  * **Code:** 404 <br />
    **Content:** `{ error : "Not found" }`
  
  OR 

  * **Code:** 500 <br />
    **Content:** `{ error : "Internal server error" }`

**Delete To Do**
----
 Delete object to do with id 

* **URL**

  /todos/:id

* **URL Params**

  **Required:**
 
  `id=[integer]`

* **Method:**

  `DELETE` 

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message: `to do success to delete` }`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : "Internal server error" }`
  
  OR

  * **Code:** 404 <br />
    **Content:** `{ error : "Not found" }`