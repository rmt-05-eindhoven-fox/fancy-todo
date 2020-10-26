# Fancy Todo
Fancy Todo is an application to manage your assets. This app has :
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints

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
  "msg": "Invalid request"
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
  "msg": "Invalid request"
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
  "msg": "Invalid request"
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
  "msg": "Invalid request"
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
  "msg": "Invalid request"
}
```
---