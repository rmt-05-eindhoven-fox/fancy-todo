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
  "email": <string>,
  "password": <string>
}
```
_Response (201 - Created)_
```
{
  "id": <id automatic by system>,
  "email": "aan@mail.com"
  "msg": "register succes"
}
```

_Response (401 - Bad Request)_
```
{
  "msg": "invalid requests"
}
```
---
### POST /users/login
> login kalo email dan password cocok



_Request Body_
```
{
  "email": <string>,
  "password": <string>
}
```

_Response (200)_
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJhYW5AbWFpbC5jb20iLCJpYXQiOjE2MDM3MjczNjZ9.gAogdpUQoJGpURYqsqBt91s8b9nyxBsw2lRSriWblp4"
}
```

_Response (400 - Bad Request)_
```
{
  "msg": invalide email or password"
}
or
{
  "msg": "invalid requests"
}
```
---
### POST /todos

> Create new todos

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": <string>,
  "description": <string>,
  "status": <boolean>,
  "due_date": <date>
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "title": "beli laptop rog",
  "description": "di rumah pak ahmad",
  "status": false,
  "due_date": "2020-10-26 17:25:00",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```
{
  "msg": "Invalid requests"
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
            "id": 4,
            "title": "beli laptop rog",
            "description": "minta duit papa",
            "status": false,
            "due_date": "2020-10-26T10:25:00.000Z",
            "createdAt": "2020-10-26T10:34:11.463Z",
            "updatedAt": "2020-10-26T10:34:11.463Z"
        },
        ...
    ]
}
```

_Response (400 - Bad Request)_
```
{
  "msg": "Invalid requests"
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
req.params.id || http://localhost:3000/4
```

_Response (200)_
```
{
    "dataTodo": [
        {
            "id": 4,
            "title": "beli laptop rog",
            "description": "minta duit papa",
            "status": false,
            "due_date": "2020-10-26T10:25:00.000Z",
            "createdAt": "2020-10-26T10:34:11.463Z",
            "updatedAt": "2020-10-26T10:34:11.463Z"
        },
        ...
    ]
}
```

_Response (400 - Bad Request)_
```
{
  "msg": "Invalid requests"
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
  "title": <string>,
  "description": <string>,
  "status": <boolean>,
  "due_date": <date>
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
        {
            "id": 4,
            "title": "beli laptop rog",
            "description": "minta duit papa",
            "status": false,
            "due_date": "2020-10-26T10:25:00.000Z",
            "createdAt": "2020-10-26T10:34:11.463Z",
            "updatedAt": "2020-10-26T10:34:11.463Z"
        },
        ...
    ]
}
```

_Response (400 - Bad Request)_
```
{
  "msg": "Invalid requests"
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
        {
            "id": 4,
            "title": "beli laptop rog",
            "description": "minta duit papa",
            "status": false,
            "due_date": "2020-10-26T10:25:00.000Z",
            "createdAt": "2020-10-26T10:34:11.463Z",
            "updatedAt": "2020-10-26T10:34:11.463Z"
        },
        ...
    ]
}
```

_Response (400 - Bad Request)_
```
{
  "msg": "Invalid requests"
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
    "msg": "todo success to delete"
}
```

_Response (400 - Bad Request)_
```
{
  "msg": "Invalid requests"
}
```
---