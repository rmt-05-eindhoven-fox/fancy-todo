# Fancy To Do App

To Do Application uses Client-server model with specifications as follow:
- API Documentation 
- CRUD (create, read, update, delete) TO Do List endpoints and User endpoints
- JSON formatted response
- Demo link: coming soon
- Documentation link: https://documenter.getpostman.com/view/5729395/TVYGbxDa

# User Endpoints

## POST/register
> Create a new user

Request Params

`id: <todo id>`

Request Header

`not neccessaryily needed`

Request Body

```
{
  "email": "<inserted email>",
  "password": "<inserted password>"
}
```

Response (201 - Create)

```
{
    "id": <given by system>,
    "email": "<inserted email>"
}
```

Response (400 - Bad Request)

```
{
  "errors": [
    "Please enter email!",
    "That is an invalid email format!",
    "Please enter password!",
    "Must be between 6 to 20 characters!"
  ]
}
```

Response (500 - Internal Server Error)

```
{
  "errors": [
    "Internal server error"
  ]
}
```

## POST/login
> User login

Request Params

`not neccessaryily needed`

Request Header

`not neccessaryily needed`

Request Body

```
{
  "email": "<inserted email>",
  "password": "<inserted password>"
}
```

Response (200 - OK)

```
{
  "token": "<user access token given by system>"
}
```

Response (400 - Bad Request)

```
{
  "errors": [
    "Incorrect email or password"
  ]
}
```

Response (500 - Internal Server Error)

```
{
  "errors": [
    "Internal server error"
  ]
}
```


# To Do Endpoints

## POST/todos
> Create new todo

Request Header

```
{
  "token": "<your access token>"
}
```

Request Body

```
{
  "title": "<insert title>",
  "description": "<insert description>",
  "status": "<insert status>",
  "due_date": "<insert due_date>"
}
```

Response(201 - Create)

```
 "id": <id is given by system>,
  "title": "<inserted title>",
  "description": "<inserted description>",
  "status": "<inserted status>",
  "due_date": "2020-09-30T00:00:00.000Z",
  "UserId": <inserted from header>
```

Response (400 - Bad Request)

```
{
  "errors": [
    "Please enter a title!",
    "Please enter a description!",
    "Please enter a status!",
    "Please enter a due_date!"
  ]
}
```

Response (401 - Unauthorized)

```
{
  "errors": [
    "Authentication has failed!"
  ]
}
```

Response (500 - Internal Server Error)

```
{
  "errors": [
    "Internal server error"
  ]
}
```

## GET/todos/:id
> Get all of the todos

Request Params

`id: <todo id>`

Request Header

```
{
  "token": "<your access token>"
}
```

Request Body

`not neccessaryily needed`

Response (200 - OK)

```
{
    "id": 1,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "2020-09-30T00:00:00.000Z"
}
```

Response (401 - Unauthorized)

```
{
  "errors": [
    "Authentication has failed!"
  ]
}
```

Response (403 - Forbidden)

```
{
  "errors": [
    "No access allowed!"
  ]
}
```

Response (404 - Not Found)

```
{
  "errors": [
    "Error not found"
  ]
}
```

Response (500 - Internal Server Error)

```
{
  "errors": [
    "Internal server error"
  ]
}
```

## PUT/todos/:id
> Update any of the todo

Request Params

`id: <todo id>`

Request Header

```
{
  "token": "<your access token>"
}
```

Request Body

{
  "title": "<inserted title>",
  "description": "<inserted description>",
  "status": "<inserted status>",
  "due_date": "<inserted due_date>"
}

Response (200 - OK)

```
{
    "id": <todo id>,
    "title": "<updated title>",
    "description": "<updated description>",
    "status": "<updated status>",
    "due_date": "<updated due_date>"
}
```

Response (400 - Bad Request)

```
{
  "errors": [
    "Please enter a title!",
    "Please enter a description!",
    "Please enter a status!",
    "Please enter a due_date!"
  ]
}
```

Response (401 - Unauthorized)

```
{
  "errors": [
    "Authentication has failed!"
  ]
}
```

Response (403 - Forbidden)

```
{
  "errors": [
    "No access allowed!"
  ]
}
```

Response (404 - Not Found)

```
{
  "errors": [
    "Error not found"
  ]
}
```

Response (500 - Internal Server Error)

```
{
  "errors": [
    "Internal server error"
  ]
}
```

## PATCH/todos/:id
> Update status of todo

Request Params

`id: <todo id>`

Request Header

```
{
  "token": "<your access token>"
}
```

Request Body

{
  "status": "<inserted status>"
}

Response (200 - OK)

```
{
    "id": <todo id>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo  status>",
    "due_date": "<todo  due_date>"
}
```

Response (400 - Bad Request)

```
{
  "errors": [
    "Please enter a status!"
  ]
}
```

Response (401 - Unauthorized)

```
{
  "errors": [
    "Authentication has failed!"
  ]
}
```

Response (403 - Forbidden)

```
{
  "errors": [
    "No access allowed!"
  ]
}
```

Response (404 - Not Found)

```
{
  "errors": [
    "Error not found"
  ]
}
```

Response (500 - Internal Server Error)

```
{
  "errors": [
    "Internal server error"
  ]
}
```

## DELETE/todos/:id
> Delete todo

Request Params

`id: <todo id>`

Request Header

```
{
  "token": "<your access token>"
}
```

Request Body

`not neccessaryily needed`

Response (200 - OK)

```
{
   "message": "Successfully deleted!" 
}
```

Response (401 - Unauthorized)

```
{
  "errors": [
    "Authentication has failed!"
  ]
}
```

Response (403 - Forbidden)

```
{
  "errors": [
    "No access allowed!"
  ]
}
```

Response (404 - Not Found)

```
{
  "errors": [
    "Error not found"
  ]
}
```

Response (500 - Internal Server Error)

```
{
  "errors": [
    "Internal server error"
  ]
}
```

