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
[
  {
    "id": 1,
    "title": "<todos title>",
    "description": "<todos description>",
    "status": "<todos status>",
    "due_date": "<todos due_date>",
    "createdAt": "2020-10-20T07:15:12.149Z",
    "updatedAt": "2020-10-20T07:15:12.149Z"
  },
  {
    "id": 2,
    "title": "<todos title>",
    "description": "<todos description>",
    "status": "<todos status>",
    "due_date": "<todos due_date>",
    "createdAt": "2020-10-20T07:15:12.149Z",
    "updatedAt": "2020-10-20T07:15:12.149Z"
  }
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
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

_Response (200)_
```
[
  {
    "id": 1,
    "title": "<todos title>",
    "description": "<todos description>",
    "status": "<todos status>",
    "due_date": "<todos due_date>",
    "createdAt": "2020-10-20T07:15:12.149Z",
    "updatedAt": "2020-10-20T07:15:12.149Z"
  }
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
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
  "title": "<name to get insert into>",
  "description": "<description to get insert into>"
  "status":"<status to get insert into>"
  "due_date": "<due_date to get insert into>"
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "title": "<insert title>",
  "description": "<insert description>",
  "status": "insert status",
  "due_date": "<todos due_date>",
  "createdAt": "2020-10-20T07:15:12.149Z",
  "updatedAt": "2020-10-20T07:15:12.149Z"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```
---
### PUT /todos/:id

> Update existing todos

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<name to get insert into>",
  "description": "<description to get insert into>"
  "status":"<status to get insert into>"
  "due_date": "<due_date to get insert into>"
}
```

_Response (200 - Success)_
```
{
  "id": <given id by system>,
  "title": "<insert title>",
  "description": "<insert description>",
  "status": "insert status",
  "due_date": "<todos due_date>",
  "createdAt": "2020-10-20T07:15:12.149Z",
  "updatedAt": "2020-10-20T07:15:12.149Z"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```
---
### PATCH /todos/:id

> Update Status existing todos

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "status":"<status to get insert into>"
}
```

_Response (200 - Success)_
```
{
  "id": <given id by system>,
  "title": "<insert title>",
  "description": "<insert description>",
  "status": "insert status",
  "due_date": "<todos due_date>",
  "createdAt": "2020-10-20T07:15:12.149Z",
  "updatedAt": "2020-10-20T07:15:12.149Z"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```
---
### DELETE /todos/:id

> delete existing todos

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Response (200 - Success)_
```
{
  "id": <given id by system>,
  "title": "<insert title>",
  "description": "<insert description>",
  "status": "insert status",
  "due_date": "<todos due_date>",
  "createdAt": "2020-10-20T07:15:12.149Z",
  "updatedAt": "2020-10-20T07:15:12.149Z"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```