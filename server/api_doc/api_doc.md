# My Fancy Todo App Server
My Fancy Todo App is an application to list your todo. This app has : 
* RESTful endpoint for todo's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
**Create Todo**
----
  Create a new single todo list data on server into a database.

* **URL**

  /todos

* **Method:**
  
  `POST`

* **Request Headers**

  **Required:**

  ```
  {
    "access_token": "<your access token>"
  }
  ```
  
* **URL Params**

  None

* **Data Params**

  **Required:**

  `title=[string]`,
  `description=[string]`,
  `status=[string]`,
  `due_date=[string]`

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{
    "id": 4,
    "title": "Todo 4",
    "description": "Add Register and Login",
    "status": "Undone",
    "due_date": "2020-11-10",
    "updatedAt": "2020-10-26T10:19:58.124Z",
    "createdAt": "2020-10-26T10:19:58.124Z"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Title is required!, Description is required!, Status is required!, Due date is required!, Wrong date format YYYY-MM-DD!, The due date cannot be before today's date!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;

**Read Todo**
----
  Returns all available json todo data that belongs to User who logged in.

* **URL**

  /todos

* **Method:**
  
  `GET`

* **Request Headers**

  **Required:**

  ```
  {
    "access_token": "<your access token>"
  }
  ```
  
* **URL Params**

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

&nbsp;

**Get Todo By Id**
----
  Returns a single todo data based on its "Id" on server that belongs to User who logged in.

* **URL**

  /todos/:id

* **Method:**
  
  `GET`

* **Request Headers**

  **Required:**

  ```
  {
    "access_token": "<your access token>"
  }
  ```
  
* **URL Params**

  **Required:**

  `id=[integer]`

* **Data Params**
   
   None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    `{
      "id": 1,
      "title": "Rest API",
      "description": "Learn how to make API Documentaion and REST API",
      "status": "Done",
      "due_date": "2020-11-01",
      "createdAt": "2020-10-26T07:48:57.394Z",
      "updatedAt": "2020-10-26T07:48:57.394Z"
    }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg : "Error not found!" }`

&nbsp;

**Update Todo By Id**
----
  Update a single todo data based on its "Id" on server that belongs to User who logged in.

* **URL**

  /todos/:id

* **Method:**
  
  `PUT`

* **Request Headers**

  **Required:**

  ```
  {
    "access_token": "<your access token>"
  }
  ```
  
* **URL Params**

  **Required:**
   
  `id=[integer]`

* **Data Params**

  **Required:**
   
  `title=[string]`,
  `description=[string]`,
  `status=[string]`,
  `due_date=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    `{
      "id": 2,
      "title": "Fancy Todo App 2",
      "description": "Protofolio project week 1",
      "status": "Done",
      "due_date": "2020-11-01",
      "createdAt": "2020-10-26T07:48:57.394Z",
      "updatedAt": "2020-10-26T11:24:21.311Z"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Title is required!, Description is required!, Status is required!, Due date is required!, Wrong date format YYYY-MM-DD!, The due date cannot be before today's date!" }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg : "Error not found!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;

**Update Status Todo By Id**
----
  Update status field on a todo data based on its "Id" on server that belongs to User who logged in.

* **URL**

  /todos/:id

* **Method:**
  
  `PATCH`

* **Request Headers**

  **Required:**

  ```
  {
    "access_token": "<your access token>"
  }
  ```
  
* **URL Params**

  **Required:**

  `id=[integer]`

* **Data Params**

  **Required:**
   
  `status=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    `{
      "id": 3,
      "title": "Todo 3",
      "description": "Kerjakan Todo Jangan Lupa",
      "status": "Done",
      "due_date": "2020-11-05",
      "createdAt": "2020-10-26T07:49:32.777Z",
      "updatedAt": "2020-10-26T11:27:31.187Z"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Status is required!" }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg : "Error not found!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;
  
**Delete Todo**
----
  Delete a todo data based on its "Id" on server that belongs to User who logged in.

* **URL**

  /todos/:id

* **Method:**
  
  `DELETE`

* **Request Headers**

  **Required:**

  ```
  {
    "access_token": "<your access token>"
  }
  ```
  
* **URL Params**

  **Required:**

  `id=[integer]`

* **Data Params**
   
   None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    `{ msg : 'Successfully delete a todo!' }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg : "Error not found!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;

**Register User**
----
  Register user on server.

* **URL**

  /register

* **Method:**
  
  `POST`

* **Request Headers**

  None
  
* **URL Params**
   
  None

* **Data Params**

   **Required:**

   `email=[string]`
   `password=[string]`

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:**
    `{
      "id": 2,
      "email": "user@gmail.com"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Email is required!, Wrong email format!, Password length minimum 6 characters!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;

**Login User**
----
  Login user on server.

* **URL**

  /login

* **Method:**
  
  `POST`

* **Request Headers**

  None
  
* **URL Params**
   
  None

* **Data Params**

   **Required:**

   `email=[string]`
   `password=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    ```
    {
      "access_token": "<your access token>"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Invalid email or password!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;

**Get Qoutes**
----
  Get quotes form Favs 3rd APIs Quotes

* **URL**

  /quotes

* **Method:**
  
  `GET`

* **Request Headers**

  **Required:**

  ```
  {
    "access_token": "<your access token>"
  }
  ```
  
* **URL Params**

  None

* **Data Params**
   
  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
{
    "qotd": "A person with a new idea is a crank until the idea succeeds.",
    "author": "Mark Twain"
}
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
      "error_code": 21,
      "message": "Invalid login or password."
    }`

&nbsp;

**Get News**
----
  Get news form Newsapi.org 3rd APIs news.

* **URL**

  /news

* **Method:**
  
  `GET`

* **Request Headers**

  **Required:**

  ```
  {
    "access_token": "<your access token>"
  }
  ```
  
* **URL Params**

  None

* **Data Params**
   
  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    [
    {
        "source": {
            "id": null,
            "name": "Cnnindonesia.com"
        },
        "author": null,
        "title": "Alvin Lie Kembali Dapat Kuota Subsidi Kemendikbud 35GB - CNN Indonesia",
        "description": "Di periode kedua pemberian subsidi kuota internet, nomor Alvin Lie kembali mendapat 35GB gratis secara otomatis. Bulan lalu, ia sempat menolak subsidi ini.",
        "url": "https://www.cnnindonesia.com/nasional/20201031185951-20-564459/alvin-lie-kembali-dapat-kuota-subsidi-kemendikbud-35gb",
        "urlToImage": "https://akcdn.detik.net.id/visual/2017/03/20/f0209fdc-1541-4663-bde9-a23267949b99_169.jpg?w=650",
        "publishedAt": "2020-10-31T12:20:00Z",
        "content": "Jakarta, CNN Indonesia -- Anggota Ombudsman RI, Alvin Lie, kembali mendapatkan subsidi kuota belajar dari Kementerian Pendidikan dan Kebudayaan sebesar 35 GB lagi. Sebelumnya pada akhir September lal… [+3503 chars]"
    }
]
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
      "status": "error",
      "code": "apiKeyMissing",
      "message": "Your API key is missing. Append this to the URL with the apiKey param, or use the x-api-key HTTP header."
    }`