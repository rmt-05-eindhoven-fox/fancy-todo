## **Show All Todos**

Returns json dataset which contain all todos.

- **URL**

  `/todos`

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  None

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ id : 1, description : "finishing todo app data management", status: "not completed", due_date: "25/10/2020" }, etc`

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "INTERNAL SERVER ERROR" }`

## **Add One Todo**

Returns json dataset which contain all todos.

- **URL**

  `/todos`

- **Method:**

  `POST`

- **URL Params**

  **Required:**

  None

- **Data Params**

  None

- **Success Response:**

  - **Code:** 201 <br />
    **Content:** `{ id : 1, description : "finishing todo app data management", status: "not completed", due_date: "25/10/2020" } (depends on user input)`

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "You can't add" }`

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "INTERNAL SERVER ERROR" }`

## **Show Specific Todo**

Returns json dataset which contain all todos.

- **URL**

  `/todos/:id`

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `id=[integer]`

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ id : 1, description : "finishing todo app data management", status: "not completed", due_date: "25/10/2020" } (only show one data)`

- **Error Response:**

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Todo doesn't exist" }`

## **UPDATE Specific Todo (All Key:Value)**

Returns json dataset which contain all todos.

- **URL**

  `/todos/:id`

- **Method:**

  `PATCH`

- **URL Params**

  **Required:**

  `id=[integer]`

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ id : 1, description : "finishing todo app data managements", status: "completed", due_date: "25/10/2020" } `

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "You can't update" }`

  OR

- **Code:** 404 NOT FOUND <br />
  **Content:** `{ error : "Todo doesnt exist" }`

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "INTERNAL SERVER ERROR" }`

## **UPDATE Specific Todo (Certain Key:Value)**

Returns json dataset which contain all todos.

- **URL**

  `/todos/:id`

- **Method:**

  `PUT`

- **URL Params**

  **Required:**

  `id=[integer]`

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ id : 1, description : "finishing todo app data managements", status: "completed", due_date: "25/10/2020" } `

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "You can't update" }`

  OR

- **Code:** 404 NOT FOUND <br />
  **Content:** `{ error : "Todo doesnt exist" }`

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "INTERNAL SERVER ERROR" }`

## **DELETE Specific Todo**

Returns json dataset which contain all todos.

- **URL**

  `/todos/:id`

- **Method:**

  `DELETE`

- **URL Params**

  **Required:**

  `id=[integer]`

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{message: "todo is deleted successfully"}`

- **Error Response:**

- **Code:** 404 NOT FOUND <br />
  **Content:** `{ error : "Todo doesnt exist" }`

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "INTERNAL SERVER ERROR" }`
