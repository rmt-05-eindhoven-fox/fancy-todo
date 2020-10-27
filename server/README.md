# Fancy Todo
My Assets App is an application to manage your assets. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### POST /todos

> Create new todo

_Request Header_
```
{
  "accesstoken": "<your access token>"
}
```

_Request Body_
```
{
  "title": "menanam padi",
  "description": "di halaman belakang",
  "status": "not done",
  "due_date": "2020-11-02"
}
```

_Response (201 - Created)_
```
{
  "id": 1,
  "title": "menanam padi",
  "description": "di halaman belakang",
  "status": "not done",
  "due_date": "2020-11-02"
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```
_Response (400 - Internal server error)_
```
{
  "errors": "Title is required!, Description is required!, Status is required!,
             Please insert a valid date!, Cannot insert passed date!"
}
```

_Response (500 - Internal server error)_
```
{
  "errors": "internal server error"
}
```
---
### GET /todos

> Get all todos

_Request Header_
```
{
  "accesstoken": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": 2,
    "title": "bermain game",
    "description": "mobile lejen",
    "status": "undone",
    "due_date": "2020-10-29T00:00:00.000Z",
    "userId": 4,
    "createdAt": "2020-10-27T04:25:39.378Z",
    "updatedAt": "2020-10-27T09:43:19.354Z"
  },
  {
    "id": 6,
    "title": "menanam ubi",
    "description": "di halaman belakang",
    "status": "undone",
    "due_date": "2020-12-03T00:00:00.000Z",
    "userId": 4,
    "createdAt": "2020-10-27T07:42:54.553Z",
    "updatedAt": "2020-10-27T09:43:36.773Z"
  }
]
```

_Response (500 - Internal server error)_
```
{
  "errors": "internal server error"
}
```
---
### GET /todos:id

> Get a specific todo by id

_Request Header_
```
{
  "accesstoken": "<your access token>"
}
```

_Request Params_
```
{
  "id": "<your id>"
}
```

_Response (200)_
```
{
  "id": 2,
  "title": "bermain game",
  "description": "mobile lejen",
  "status": "undone",
  "due_date": "2020-10-29T00:00:00.000Z",
  "userId": 4,
  "createdAt": "2020-10-27T04:25:39.378Z",
  "updatedAt": "2020-10-27T09:43:19.354Z"
}
```

_Response (404 - Not Found)_
```
{
  "errors": "todo not found"
}
```
_Response (500 - Internal server error)_
```
{
  "errors": "internal server error"
}
```
### PUT /todos:id

> Update one of an existing todo in tables

_Request Header_
```
{
  "accesstoken": "<your access token>"
}
```
_Request Params_
```
{
  "id": "<your id>"
}
```
_Request Body_
```
{
  "title": "olahraga",
  "description": "lifting dumbbell",
  "status": "done",
  "due_date": "2020-12-22"
}
```

_Response (200 - OK)_
```
{
  "id": 1,
  "title": "olahraga",
  "description": "lifting dumbbell",
  "status": "done",
  "due_date": "2020-12-22"
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z"
}
```
_Response (400 - Internal server error)_
```
{
  "errors": "Title is required!, Description is required!, Status is required!,
             Please insert a valid date!, Cannot insert passed date!"
}
```
_Response (404 - Not Found)_
```
{
  "errors": "todo not found"
}
```

_Response (500 - Internal server error)_
```
{
  "errors": "internal server error"
}
```

### PATCH /todos:id

> Update status attribute in one of an existing todo in tables

_Request Header_
```
{
  "accesstoken": "<your access token>"
}
```
_Request Params_
```
{
  "id": "<your id>"
}
```
_Request Body_
```
{
  "status": "undone"
}
```

_Response (200 - OK)_
```
{
  "id": 1,
  "title": "olahraga",
  "description": "lifting dumbbell",
  "status": "done",
  "due_date": "2020-12-22"
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z"
}
```
_Response (400 - Internal server error)_
```
{
  "errors": "Status is required!"
}
```
_Response (404 - Not Found)_
```
{
  "errors": "todo not found"
}
```

_Response (500 - Internal server error)_
```
{
  "errors": "internal server error"
}
```
### DELETE /todos:id

> Delete one of an existing todo by id

_Request Header_
```
{
  "accesstoken": "<your access token>"
}
```

_Request Params_
```
{
  "id": "<your id>"
}
```

_Response (200)_
```
{
  "message": "todo success to delete"
}
```

_Response (404 - Not Found)_
```
{
  "errors": "todo not found"
}
```
_Response (500 - Internal server error)_
```
{
  "errors": "internal server error"
}
```
### POST /register

> Create a new user

_Request Header_
```
not needed
```
_Request Body_
```
{
  "email": "franku@gmail.com",
  "password": "qweqwe",
}
```

_Response (200 - OK)_
```
{
  "id": 1,
  "email": "franku@gmail.com"
}
```
_Response (400 - Internal server error)_
```
{
  "errors": "Insert a valid Email!, Password min. 5 characters!, Password may
             not contain space!, Password must be unique!"
}
```
_Response (500 - Internal server error)_
```
{
  "errors": "internal server error"
}
```
### POST /login

> Create a new user

_Request Header_
```
not needed
```
_Request Body_
```
{
  "email": "franku@gmail.com",
  "password": "qweqwe",
}
```

_Response (200 - OK)_
```
{
  "accesstoken": "<your access token>"
}
```
_Response (400 - Internal server error)_
```
{
  "errors": "email/password is wrong!"
}
```
_Response (500 - Internal server error)_
```
{
  "errors": "internal server error"
}
```