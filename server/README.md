### ENV

SECRET=chum is fum
PORT=3000
GOOGLE_CLIENTID=826714744713-kbk43co0cp58c7r4u47kek6vjpu1shbk.apps.googleusercontent.com


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
  "error": "Invalid request"
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
  "error": "Invalid request"
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
  "due_date": "<due_date to get insert into>"
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "title": "<insert title>",
  "description": "<insert description>",
  "status": "false",
  "due_date": "<todos due_date>",
  "createdAt": "2020-10-20T07:15:12.149Z",
  "updatedAt": "2020-10-20T07:15:12.149Z"
}
```

_Response (400 - Bad Request)_
```
{
  "error": "Invalid requests"
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
  "status":"<insert boolean true/false>"
  "due_date": "<due_date to get insert into>"
}
```

_Response (200 - Success)_
```
{
  "id": <given id by system>,
  "title": "<insert title>",
  "description": "<insert description>",
  "status": "<insert status>",
  "due_date": "<todos due_date>",
  "createdAt": "2020-10-20T07:15:12.149Z",
  "updatedAt": "2020-10-20T07:15:12.149Z"
}
```

_Response (400 - Bad Request)_
```
{
  "error": "Invalid requests"
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
  "status":"<status to get insert into boolean true/false>"
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
  "error": "Invalid requests"
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
  msg:"success delete todo"
}
```

_Response (400 - Bad Request)_
```
{
  "error": "Invalid requests"
}
```

### GET /quote

> get quotes of the day

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
  "In love the paradox occurs that two beings become one and yet remain two."
```

_Response (400 - Bad Request)_
```
{
  "error": "Invalid request"
}
```

# USER

### POST Register User /register
----
  Create a new user in the database

 _Request Body_
```json
{
      "email" : "user@mail.com",
      "password" : "userPassword",
      "first_name": "user",
      "last_name" : "name"
}

```

_Response (201)_

  ```json    
    {
      "msg":"Register Success"
    }
  ```
 
_Response (500 - Internal Server error)_
```json
{
  "error": "Internal Server error"
}
``` 
----

### POST login
----
  Login into user in the database

 _Request Body_
```json
{
      "email" : "user@mail.com",
      "password" : "userPassword",
}

```

_Response (200)_

  ```json    
    {
      "access_token":"9aqwe39e39e33r390jw9hdin389hdid89whdionahhOIINhjsi9IJn2jwj934e3n",
      "first_name": "user"
    }
  ```
 
_Response (500 - Internal Server error)_
```
{
  "error": "Internal Server error"
}
```
----


### POST login with Google
----
  Login into user in the database with google account

 _Request Header_
```json
{
    google_access_token
}

```

_Response (200)_

  ```json    
    {
      "access_token":"9aqwe39e39e33r390jw9hdin389hdid89whdionahhOIINhjsi9IJn2jwj934e3n",
      "first_name": "user"
    }
  ```
 
_Response (500 - Internal Server error)_
```
{
  "error": "Internal Server error"
}
----