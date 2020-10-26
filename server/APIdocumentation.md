# Fancy Todo Documentation

Fancy Todo is an application to manage your task. This app has : 
* RESTful endpoint for todo's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### GET /todos

> Get all assets

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
    "id": "<todos id>",
    "title": "<todos title>",
    "description": "<todos description>",
    "status": "<todos status>",
    "due_date": "<todos due_date>"
  }
]
```

_Response (500 - Bad Request)_
```
{
  "message": "Internal server error"
}
```
---
### POST /todos

> Create new asset

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>"
  "status": "<status to get insert into>",
  "due_date": "<due_date to get insert into>"
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>"
}
```

_Response (500 - Bad Request)_
```
{
  "message": "Internal server error"
}
```

### PUT /todos/:id

> Update todos with specific id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "id": "<todos id>",
  "title": "<todos previous title>",
  "description": "<todos previous description>"
  "status": "<todos previous status>",
  "due_date": "<todos previous due_date>"
}
```

_Response (200)_
```
{
  "id": <todos id>,
  "title": "<todos updated title>",
  "description": "<todos updated description>",
  "status": "<ptodos updated status>",
  "due_date": "<todos updated due_date>"
}
```

_Response (500 - Bad Request)_
```
{
  "message": "Internal server error"
}
```

