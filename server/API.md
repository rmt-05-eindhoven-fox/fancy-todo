## **Sign Up**

Create new User

- **URL**

  /signup

- **Method:**

  `POST`

- **Data Params**

  **Required:**

  ```
  {
    "email": STRING, // must be email type
    "password": STRING, // must be longer than 5 digit and less than 12
    "username": STRING // must be longer than 3 digit and less than 12
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ id : 1, email: example@example.com}`

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "email must be unique" }`
    message can be various depends on the validation

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`

## **Login**

Sign in to the app

- **URL**

  /login

- **Method:**

  `POST`

- **Data Params**

  **Required:**

```
  {
    "email": STRING,
    "password": STRING
  }
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ access_token : "<jsonwebtoken>" }`

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Invalid email/password" }`

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`

## **Show Todos**

Return json data about all todos

- **URL**

  /todos/

- **Method:**

  `GET`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ todos: [] }`

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Authentication failed" }`

  OR

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "Todos not found" }`

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`

## **Create Todo**

Create new Todo

- **URL**

  /todos

- **Method:**

  `POST`

- **Data Params**

  **Required:**

```
  {
    "title": STRING,
    "description": STRING,
    "status": STRING,
    "due_date": DATE
  }
```

- **Success Response:**

  - **Code:** 201 <br />
    **Content:** `{ id : INTEGER, title: STRING, description: STRING, status: STRING, due_date: DATE, UserId: INTEGER, createdAt: DATE, updatedAt: DATE }`

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Authentication failed" }`

  OR

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Todo.status cannot be null" }`
    message can be various depends on the validation

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`

## **Show Todo**

Show todo by id

- **URL**

  /todos/:id

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `id=[integer]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ id : INTEGER, title: STRING, description: STRING, status: STRING, due_date: DATE, createdAt: DATE, updatedAt: DATE, UserId: INTEGER }`

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Authentication failed" }`

  OR

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Not Authorized" }`
    this happen when user doesn't have right to see the todo

  OR

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "Todo not found" }`

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`

## **Edit Todo**

Change the value of todo

- **URL**

  /todos/:id

- **Method:**

  `PUT`

- **URL Params**

  **Required:**

  `id=[integer]`

- **Data Params**

  **Required:**

```
  {
    "title": STRING,
    "description": STRING,
    "status": STRING,
    "due_date": DATE
  }
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ id : INTEGER, title: STRING, description: STRING, status: STRING, due_date: DATE, createdAt: DATE, updatedAt: DATE, UserId: INTEGER }`

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Authentication failed" }`

  OR

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Not Authorized" }`
    this happen when user doesn't have right to edit the todo

  OR

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Todo.status cannot be null" }`
    message can be various depends on the validation

  OR

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "Todo not found" }`

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`

## **Edit Todo Status**

Change the status of todo

- **URL**

  /todos/:id

- **Method:**

  `PATCH`

- **URL Params**

  **Required:**

  `id=[integer]`

- **Data Params**

  **Required:**

```
  {
    "status": STRING
  }
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ id : INTEGER, title: STRING, description: STRING, status: STRING, due_date: DATE, createdAt: DATE, updatedAt: DATE, UserId: INTEGER }`

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Authentication failed" }`

  OR

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Not Authorized" }`
    this happen when user doesn't have right to edit the todo

  OR

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Todo.status cannot be null" }`
    message can be various depends on the validation

  OR

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "Todo not found" }`

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`

## **Delete Todo**

Delete Todo

- **URL**

  /todos/:id

- **Method:**

  `DELETE`

- **URL Params**

  **Required:**

  `id=[integer]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{message: '<todo title> success to delete'}`

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Authentication failed" }`

  OR

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Not Authorized" }`
    this happen when user doesn't have right to edit the todo

  OR

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "Todos not found" }`

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`
