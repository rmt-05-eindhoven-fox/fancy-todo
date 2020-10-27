# Fancy Todo
Fancy Todo is an application to manage your assets. This app has :
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints

### POST /users/register
> register new user

_Request Body_
```
{
    "email": "joko@mail.com",
    "password": "joko"
}
```
_Response (201 - Created)_
```
{
    "id": 11,
    "email": "joko@mail.com",
    "msg": "register success"
}
```

_Response (400 - Bad Request)_
```
{
    "errors": [
        "password is required"
    ]
}
or
{
    "errors": [
        "invalid email format",
        "email is required",
        "password is required"
    ]
}
or
{
    "errors": [
        "invalid email format",
        "email is required"
    ]
}
```
---
### POST /users/login
> login kalo email dan password cocok

_Request Body_
```
{
    "email": "joko@mail.com",
    "password": "joko"
}
```

_Response (200)_
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoiam9rb0BtYWlsLmNvbSIsImlhdCI6MTYwMzgwMjUwMH0.Vqg7UpWurkJ0o6WCQ_xNAx1W053IBHpIMDIE4lqNCVY"
}
```

_Response (500 - Internal server error)_
```
{
    "errors": [
        "invalid email or password "
    ]
}
```
---
### POST /todos

> Create new todos

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Body_
```
{
    "title": "ini harusnya 29" <string>,
    "description": "harusnya masuk user joko" <string>,
    "due_date": "2020-10-29" <date>
}
string auto set to false
UserId auto set to userId logged in
```

_Response (201 - Created)_
```
{
    "dataTodo": {
        "id": 29,
        "title": "ini harusnya 29",
        "description": "harusnya masuk user joko",
        "status": false,
        "due_date": "2020-10-29T00:00:00.000Z",
        "UserId": 11,
        "updatedAt": "2020-10-27T12:42:49.919Z",
        "createdAt": "2020-10-27T12:42:49.919Z"
    }
}
```

_Response (400 - Bad Request)_
```
{
    "errors": [
        "Title is required",
        "Description is required",
        "date is required",
        "Input date must be date"
    ]
}
or
{
    "errors": [
        "Date cannot yesterday and must be greater than today"
    ]
}
```
---

### GET /todos

> Get all todos

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "dataTodo": [
        {
            "id": 29,
            "title": "ini harusnya 29",
            "description": "harusnya masuk user joko",
            "status": false,
            "due_date": "2020-10-29T00:00:00.000Z",
            "UserId": 11,
            "createdAt": "2020-10-27T12:42:49.919Z",
            "updatedAt": "2020-10-27T12:42:49.919Z"
        }
    ]
}
```

_Response (500 - Internal Server Error)_
```
{
    "errors": [
        "authentication gagal"
    ]
}
```
---

### GET /todos/:id

> Get todos by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Request Params_
```
req.params.id || http://localhost:3000/22
```

_Response (200)_
```
{
    "dataTodo": {
        "id": 22,
        "title": "ini dicoba title dan description aja",
        "description": "semoga bener",
        "status": false,
        "due_date": "2020-10-27T12:22:06.243Z",
        "UserId": 9,
        "createdAt": "2020-10-27T12:22:06.244Z",
        "updatedAt": "2020-10-27T12:22:06.244Z"
    }
}
```

_Response (500 - Internal Server Error)_
```
{
    "errors": [
        "authentication gagal"
    ]
}
```
---

### PUT /todos/:id

> Update todo by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "title": "baru di updat" <string>,
    "description": "tadi salah sih" <string>,
    "status": false <boolean>,
    "due_date": "2020-10-28" <date>
}
status still can be edited
```

_Request Params_
```
req.params.id || http://localhost:3000/4
```

_Response (200)_
```
{
    "dataTodo": [
        1
    ],
    "msg": "succes update put"
}
```

_Response (400 - Bad Request)_
```
{
    "errors": [
        "Title is required",
        "Description is required",
        "Status is required",
        "date is required",
        "Input date must be date"
    ]
}
or
{
    "error": "not authorized"
}
```
---

### PATCH /todos/:id

> Update one todo key by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "status": <boolean>
}
```

_Request Params_
```
req.params.id || http://localhost:3000/4
```

_Response (200)_
```
{
    "dataTodo": [
        1
    ],
    "msg": "succes update patch"
}
```

_Response (400 - Bad Request)_
```
{
    "error": "not authorized"
}
```
---

### DELETE /todos/:id

> Delete todo by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Request Params_
```
req.params.id || http://localhost:3000/4
```

_Response (200)_
```
{
    "msg": "succes delete this todo"
}
```

_Response (400 - Bad Request)_
```
{
    "error": "todo not found"
}
or
{
    "error": "not authorized"
}
```
---