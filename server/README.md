# My Fancy Todo App Server
My Fancy Todo App is an application to manage your todos. This app has : 
* Error case response
* RESTful endpoint for todo's CRUD operation
* JSON formatted response

&nbsp;

## Errors

| Code  | Name                  | Message               |
| ----- | --------------------- | --------------------- |
| 400   | Bad Request           | < Validation error >  |
| 404   | Not Found             | Error not found       |
| 500   | Internal Server Error | Internal server error |

_Response_
```
{
  "error": "error message here"
}
```

## RESTful endpoints
### POST /todos

> Create new todo

_Parameters_
```
not needed
```

_Request Body_
```
{
    "title": "Makan",
    "description": "makan ayam goreng",
    "due_date": "2020-10-26"
}
```

_Response (201 - Created)_
```
{
  "id": 1,
  "title": "Makan",
  "description": "makan ayam goreng",
  "status": false,
  "due_date": "2020-10-26"
}
```
---
### GET /todos

> Get all todos

_Parameters_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": 1,
    "title": "Makan",
    "description": "makan ayam goreng",
    "status": false,
    "due_date": "2020-10-26"
  },
  {
    "id": 2,
    "title": "Tidur",
    "description": "tidur di kasur",
    "status": false,
    "due_date": "2020-10-26"
  },
  { ... },
  { ... }
]
```

### GET /todos/:id

> Get specific todo based on unique id

_Parameters_
```
{
  "id": 1
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "id": 1,
  "title": "Makan",
  "description": "makan ayam goreng",
  "status": false,
  "due_date": "2020-10-26"
}
```
### PUT /todos/:id

> Update title, description, status, and due_date of specific todo based on unique id

_Parameters_
```
{
  "id": 1
}
```

_Request Body_
```
{
  "title": "Minum",
  "description": "minum air putih",
  "status": true,
  "due_date": "2020-10-25"
}
```

_Response (200)_
```
{
  "id": 1,
  "title": "Minum",
  "description": "minum air putih",
  "status": true,
  "due_date": "2020-10-25"
}
```

### PATCH /todos/:id

> Update status of specific todo based on unique id

_Parameters_
```
{
  "id": 1
}
```

_Request Body_
```
{
  "status": true
}
```

_Response (200)_
```
{
  "id": 1,
  "title": "Makan",
  "description": "makan ayam goreng",
  "status": true,
  "due_date": "2020-10-26"
}
```

### DELETE /todos/:id

> Delete specific todo based on unique id

_Parameters_
```
{
  "id": 1
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "message": "todo success to delete"
}
```

### POST /register

> Create new user

_Parameters_
```
not needed
```

_Request Body_
```
{
  "email": "sample@mail.com",
  "password": "asdfgh"
}
```

_Response (201 - Created)_
```
{
  "id": 1,
  "email": "sample@mail.com"
}
```

### POST /login

> Create access token based on user login data

_Parameters_
```
not needed
```

_Request Body_
```
{
  "email": "sample@mail.com",
  "password": "asdfgh"
}
```

_Response (200)_
```
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzYW1wbGVAbWFpbC5jb20iLCJpYXQiOjE2MDM3NzMyNjR9.Gfzf2lF0FRKHaEc9DrE4CrwJp_avuWbdrnlCEW22FTU"
}
```