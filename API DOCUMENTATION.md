# todo-fancy 🔥

***
## Register
***
register with new user info
1. URL  `localhost:8080/register`
2. Method `POST`
3. URL Param `not required`
4. Data Param
```javascript
{
	"email": "email",
	"password": "password",
}

```
5. Success Response
```javascript
CODE : 201 (created)

CONTENT :
{
  id,
  email
}
```
6. Error Response
```javascript
CODE: 400 (BAD REQUEST)
CONTENT: 
  "message": "Email has already registered"

OR:
CODE: 500 (INTERNAL SERVER ERROR)
CONTENT:
  "message": "Internal Server Error"

```
***
## Login
***
login while get an access token based on credentials
1. URL  `localhost:8080/login`
2. Method `POST`
3. URL Param `not required`
4. Data Param
```javascript
{
	"email": "yourmail@mail.com",
	"password": "yourpassword",
}

```
5. Success Response
```javascript
CODE : 200

CONTENT :
( redirect next page )
```
6. Error Response
```javascript
CODE: 500
CONTENT:
{
  message: "internal server eror"
}

OR 

CODE: 400
CONTENT:
{
  message: "bad request"
}

```
***
## Sign In Using Google
***
sign in while get an access token based on credentials
1. URL  `localhost:8080/googleLogin`
2. Method `POST`
3. URL Param `not required`
4. Data
```javascript
your google account
{
	"email": "yourmail@mail.com",
	"password": "yourpassword",
}

```
5. Success Response
```javascript
CODE : 201

CONTENT :
{
  token,
  message: "success login"
}
```
6. Error Response
```javascript
CODE: 500 

CONTENT:
{
  error,
  message: 'Internal Server Error'
}
```
***
## logout
***
1. URL  `localhost:8080/signout`
2. Method `GET`
3. URL Param `not required`
4. Data Param
```javascript
```
5. Success Response
```javascript
```
6. Error Response
```javascript
```
***
## Create Todo
***
create todo list ( authenticated only )

1. URL  `localhost:8080/todo`
2. Method `POST`
3. URL Param `not required`
4. Data Param
```javascript

data: {
  title : 'STRING', 
  description: 'STRING', 
  status: 'STRING',
  dueDate: 'DATE', 
  token : <your-auth-token>
}

headers: {
      'Authorization': `${token}`
    }

```
5. Success Response
```javascript
CODE : 200
show all todo list
```
6. Error Response
```javascript
CODE: 400
CONTENT: {
  message: "bad request"
}
```
***
## Read Todo / Show your list todo
***
show all todo list ( authenticated user only )

1. URL  `localhost:8080/todos`
2. Method `GET`
3. URL Param 
4. Data Param
```javascript
headers: {
      'Authorization': `${token}`
    }
```
5. Success Response
```javascript
CODE : 200
show all todo list
```
6. Error Response
```javascript
CODE: 500
CONTENT: {
  message: "internal server error"
}
```
***
## Edit Todo
***
edit todo list ( authenticated user only )
1. URL  `localhost:8080/todos/:id`
2. Method `PUT`
3. URL Param `not required`
4. Data Param
```javascript
data: {
      id: 'number',
      title: 'string',
      description: 'string',
      status: 'string'
      dueDate: 'date',
      token: '<your token>'
    },
    headers: {
      'Authorization': `${token}`
    }
```
5. Success Response
```javascript
CODE : 200(OK)
CONTENT: {
  title,
  description,
  status,
  due_date
}
```
6. Error Response
```javascript
CODE: 400
CONTENT: "json" {
  message: "Bad request"
}

OR 
CODE: 500('internal server error')

CONTENT:

```
***
## Delete Todo
***
delete todo list ( authenticated user only )

1. URL  `localhost:8080/todos/:id`
2. Method `DELETE`
3. URL Param 
4. Data Param
```javascript
data: {
      id,
      token
    },
headers: {
      'Authorization': `${token}`
    }
```
5. Success Response
```javascript
CODE : 200

CONTENT : JSON {
  'todo success to delete'
}

```
6. Error Response
```javascript
CODE: 404 (NOT FOUND)

```