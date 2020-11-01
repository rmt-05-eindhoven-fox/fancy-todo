### 1. POST /todos
Membuat data todos baru

Request
- Header
    ```json
    {
        "token":"eyJhbGccCI6IkpXVCJ9.eyJpZCI6gzNzA3MH0.zaBO7Rcdf3DBQ3MuBAH7I"
    }
   ```

- Body
    ```json
        {
            "title": "Learn REST API",
            "description": "Learn how to write Documentation",
            "status": "unchecked",
            "due_date": "2020-10-27"
        }
    ```
Response
- Success - 201
    ```json
        {
            "id": 1,
            "title": "Learn REST API",
            "description": "Learn how to write Documentation",
            "status": "unchecked",
            "due_date": "2020-10-27"
        }
    ```
- Error - 400 : Bad Request
- Error - 401 : Unauthorized
- Error - 500 : Internal Server Error

### 2. GET /todos
Get semua data todos

Request
- Header
    ```json
    {
        "token":"eyJhbGccCI6IkpXVCJ9.eyJpZCI6gzNzA3MH0.zaBO7Rcdf3DBQ3MuBAH7I"
    }
    ```

Response
- Success - 200
    ```json
    [
        {
            "id": 1,
            "title": "Learn REST API",
            "description": "Learn how to write Documentation",
            "status": "unchecked",
            "due_date": "2020-10-27"
        },
        {},
        {}
    ]
    ```
- Error - 401 : Unauthorized
- Error - 500 : Internal Server Error

### 3. GET /todos/:id
Get satu data todos berdasarkan id yang direquest 

Request
- Header
    ```json
    {
        "token":"eyJhbGccCI6IkpXVCJ9.eyJpZCI6gzNzA3MH0.zaBO7Rcdf3DBQ3MuBAH7I"
    }
    ```
- Params
    ```json
        {
            "id": 1
        }
    ```
Response
- Success - 200
    ```json
        {
            "id": 1,
            "title": "Learn REST API",
            "description": "Learn how to write Documentation",
            "status": "unchecked",
            "due_date": "2020-10-27"
        }
    ```
- Error - 404 : Not Found

### 4. PUT /todos/:id
Update data todos berdasarkan id yang direquest 

Request
- Header
    ```json
    {
        "token":"eyJhbGccCI6IkpXVCJ9.eyJpZCI6gzNzA3MH0.zaBO7Rcdf3DBQ3MuBAH7I"
    }
    ```
- Params
    ```json
        {
            "id": 1
        }
    ```
- Body
    ```json
        {
            "title": "Phase 2: REST API",
            "description": "Learn",
            "status": "unchecked",
            "due_date": "2020-10-30"
        }
    ```
Response
- Success - 200
    ```json
        {
            "id": 1,
            "title": "Phase 2: Learn REST API",
            "description": "Learn how to write RESTful API Documentation",
            "status": "checked",
            "due_date": "2020-10-31"
        }
    ```
- Error - 400 : Bad Request
- Error - 404 : Not Found
- Error - 500 : Internal Server Error

### 5. PATCH /todos/:id
Update data "status" pada suatu row todos berdasarkan id yang direquest 

Request
- Header
    ```json
    {
        "token":"eyJhbGccCI6IkpXVCJ9.eyJpZCI6gzNzA3MH0.zaBO7Rcdf3DBQ3MuBAH7I"
    }
    ```
- Params
    ```json
        {
            "id": 1
        }
    ```
- Body:
    ```json
        {
            "status": "checked"
        }
    ```
Response
- Success - 200
    ```json
        {
            "id": 1,
            "title": "Phase 2: Learn REST API",
            "description": "Learn how to write RESTful API Documentation",
            "status": "checked",
            "due_date": "2020-10-31"
        }
    ```
- Error - 400 : Bad Request
- Error - 404 : Not Found
- Error - 500 : Internal Server Error

### 6. DELETE /todos/:id
Delete data todos berdasarkan id yang direquest 

Request
- Header
    ```json
    {
        "token":"eyJhbGccCI6IkpXVCJ9.eyJpZCI6gzNzA3MH0.zaBO7Rcdf3DBQ3MuBAH7I"
    }
    ```
- Body:
    ```json
        {
            "id": 1
        }
    ```
Response
- Success - 200
    ```json
        {
            "message":"todo success to delete"
        }
    ```
- Error - 404 : Not Found
- Error - 500 : Internal Server Error

### 7. POST /register
User register

Request
- Body:
    ```json
        {
            "email": "doe@mail.com",
            "password": "123qwe"
        }
    ```
Response
- Success - 201 : Created
    ```json
        {
            "id": 1,
            "email": "doe@mail.com",
        }
    ```
- Error - 400 : Bad Request
- Error - 500 : Internal Server Error

### 8. POST /login
User login

Request
- Body:
    ```json
        {
            "email": "doe@mail.com",
            "password": "123qwe"
        }
    ```
Response
- Success - 200
    ```json
    {
        "access_token":"eyJhbGccCI6IkpXVCJ9.eyJpZCI6gzNzA3MH0.zaBO7Rcdf3DBQ3MuBAH7I"
    }
    ```
- Error - 400 : Bad Request
- Error - 500 : Internal Server Error

### 9. GET /movies/popular
User login

Request
- Header:
    ```json
        {
            "token": "<your login token>"
        }
    ```
Response
- Success - 200
    ```json
    {
        "popular-movie-data": "<array of object>"
    }
    ```
- Error - 500 : Internal Server Error

