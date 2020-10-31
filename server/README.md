# Fancy Todo
    Merupakan aplikasi untuk memanage todo pada sebuah project

**Fitur Apps**
* Register user
* Login User
* Oauth gmail
* Send Email saat register user & menjadi member project
* Membuat Project 
* Membuat Todo


**Running Apps**

```json
npm install
npx sequelize db:migrate all
npx nodemon app.js
```

**Env Config**
```json
JWT_KEY=secret
EMAIL=ujioba12345@gmail.com
PASS=ujicobaferdian
SMTP=smtp.gmail.com
CLIENT_ID=790332648718-5ij89p1a3db2kkas7g28833sd2iqo3ku.apps.googleusercontent.com
```

**Kendala**
```
1. Membuat code yang rapih & bagus agar mudah di pahami
2. Membuat tampilan UI, masih berantakan tampilannya, karna masih belum terlalu menguasai css sehingga masih buka tutorial dan dokumentasi
3. Membuat authorization untuk multiple kondisi
4. Membuat sending email, sempet gagal ga kekirim terus emailnya ini karna config di gmailnya
5. Menghubungkan relasi antar table
6. Deploy aplikasi ke heroku dan 000webhost, saat deploy error terus web dan apinya
7. Oauth gagal terus saat config
```

**Dokumentasi Postman**
* [api-postman](../dokumentasi/FancyTodo.postman_collection.json) : `FancyTodo.postman_collection.json`
* [api-heroku](https://fancy-todo-apps.herokuapp.com/)
* [Web-fancy-todo](https://fancy-tod-appss.000webhostapp.com/)

# Login


**URL** : `{{base_url}}/users/login`

**Method** : `POST`

**Auth required** : NO

**Data example**

```json
{
    "username": "adhi@gmail.com",
    "password": "12345"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiZmVyZGlhbkBnbWFpbC5jb20iLCJpYXQiOjE2MDQxMTI4MTh9.DKY3uz5S8BLFSoD_JZOkoN6-uTGtXEXkzhZXP9ZxZRQ"
}
```

## Error Response

**Condition** : If 'password' is wrong.

**Code** : `401 Unauthorized`

**Content** :

```json
{
  "status": false,
  "message": "invalid password"
}
```

## Error Response

**Condition** : If 'email' is wrong.

**Code** : `401 Unauthorized`

**Content** :

```json
{
    "status":false,
    "message":"invalid email"
}
```



# Register


**URL** : `{{base_url}}/users/register`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "username": "[valid email address]",
    "password": "[password in plain text]"
}
```

**Data example**

```json
{
    "username": "adhi@gmail.com",
    "password": "12345"
}
```

## Success Response

**Code** : `201 OK`

**Content example**

```json
{
    "status": true,
    "message": "success register account",
    "data": {
        "id": 13,
        "email": "ferdian@gmail.com",
        "password": "$2a$10$imo5f/C26RAwLkbgQc5zouTHsHYU5vD0ay6biv3HQV4uR409KT76y",
        "createdAt": "2020-10-31T02:49:54.317Z",
        "updatedAt": "2020-10-31T02:49:54.318Z"
    }
}
```

## Error Response

**Condition** : If 'email' already registered.

**Code** : `409 Conflict`

**Content** :

```json
{
    "status": false,
    "message": "email already exists"
}
```


# Add Project


**URL** : `{{base_url}}/projects`

**Method** : `POST`

**Auth required** : true


**Header**
```json
{
	Content-Type: application/json,
	token: {{token}}
}
```

**Data example**

```json
{
	"name":"Hacktiv 8 Phase 2",
	"status":"open"
}
```

## Success Response

**Code** : `201 OK`

**Content example**

```json
{
  "status": true,
  "message": "success create project",
  "data": {
    "id": 36,
    "project_name": "Hacktiv 8 Phase 2",
    "project_status": "open",
    "createdAt": "2020-10-31T02:58:35.603Z",
    "updatedAt": "2020-10-31T02:58:35.605Z"
  }
}
```

## Error Response

**Condition** : If 'required' field.

**Code** : `400 Bad Request`

**Content** :

```json
{
  "status": false,
  "message": [
    "project name is required",
    "project status is required",
    "project status should be open or close"
  ]
}
```

## Error Response

**Condition** : If 'token' header invalid.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status":false,
    "message":"invalid token"
}
```


# Get List Project


**URL** : `{{base_url}}/projects`

**Method** : `GET`

**Auth required** : true


**Header**
```json
{
	Content-Type: application/json,
	token: {{token}}
}
```

**Data example**

```json
{}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "status": true,
  "message": "success get project",
  "data": [
    {
      "id": 35,
      "project_name": "Hacktiv 8 Phase 2",
      "project_status": "open",
      "createdAt": "2020-10-31T02:34:04.032Z",
      "updatedAt": "2020-10-31T02:34:04.034Z",
      "members": [
        {
          "id": 82,
          "member_status": "author",
          "user_id": 12
        }
      ]
    },
    {
      "id": 36,
      "project_name": "Hacktiv 8 Phase 2",
      "project_status": "open",
      "createdAt": "2020-10-31T02:58:35.603Z",
      "updatedAt": "2020-10-31T02:58:35.605Z",
      "members": [
        {
          "id": 83,
          "member_status": "author",
          "user_id": 12
        }
      ]
    }
  ]
}
```

## Error Response

**Condition** : If 'required' field.

**Code** : `400 Bad Request`

**Content** :

```json
{
  "status": false,
  "message": [
    "project name is required",
    "project status is required",
    "project status should be open or close"
  ]
}
```

## Error Response

**Condition** : If 'token' header invalid.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status":false,
    "message":"invalid token"
}
```


# Get Project By Id


**URL** : `{{base_url}}/projects/{{project_id}}`

**Method** : `GET`

**Auth required** : true


**Header**
```json
{
	Content-Type: application/json,
	token: {{token}}
}
```

**Data example**

```json
{}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "status": true,
  "message": "success get project",
  "data": {
    "id": 35,
    "project_name": "Hacktiv 8 Phase 2",
    "project_status": "open",
    "createdAt": "2020-10-31T02:34:04.032Z",
    "updatedAt": "2020-10-31T02:34:04.034Z",
    "members": [
      {
        "id": 82,
        "member_status": "author",
        "user_id": 12,
        "user": {
          "email": "adhi@gmail.com"
        }
      }
    ]
  }
}
```

## Error Response

**Condition** : If 'project' not found.

**Code** : `404 Not Found`

**Content** :

```json
{
  "status": false,
  "message": "project not found"
}
```

## Error Response

**Condition** : If 'token' header invalid.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status":false,
    "message":"invalid token"
}
```

## Error Response

**Condition** : If 'token' not authorized.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status": false,
    "message": "not authorized"
}
```


# Update Project By Id


**URL** : `{{base_url}}/projects/{{project_id}}`

**Method** : `PUT`

**Auth required** : true


**Header**
```json
{
	Content-Type: application/json,
	token: {{token}}
}
```

**Data example**

```json
{
	"name":"Makan YUK v1",
	"status":"close"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "status": true,
  "message": "success update project",
  "data": {
    "id": 35,
    "project_name": "Makan YUK v1",
    "project_status": "close",
    "createdAt": "2020-10-31T02:34:04.032Z",
    "updatedAt": "2020-10-31T03:09:57.415Z"
  }
}
```

## Error Response

**Condition** : If 'project' not found.

**Code** : `404 Not Found`

**Content** :

```json
{
  "status": false,
  "message": "project not found"
}
```

## Error Response

**Condition** : If 'token' header invalid.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status":false,
    "message":"invalid token"
}
```

## Error Response

**Condition** : If 'token' not authorized.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status": false,
    "message": "not authorized"
}
```


# Delete Project By Id


**URL** : `{{base_url}}/projects/{{project_id}}`

**Method** : `DELETE`

**Auth required** : true


**Header**
```json
{
	Content-Type: application/json,
	token: {{token}}
}
```

**Data example**

```json
{
  "status": true,
  "message": "success delete project",
  "data": []
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "status": true,
  "message": "success update project",
  "data": {
    "id": 35,
    "project_name": "Makan YUK v1",
    "project_status": "close",
    "createdAt": "2020-10-31T02:34:04.032Z",
    "updatedAt": "2020-10-31T03:09:57.415Z"
  }
}
```

## Error Response

**Condition** : If 'user' not author.

**Code** : `400 Bad Request`

**Content** :

```json
{
  "status": false,
  "message": "you are not author, please contact author to delete project"
}
```


## Error Response

**Condition** : If 'project' not found.

**Code** : `404 Not Found`

**Content** :

```json
{
  "status": false,
  "message": "project not found"
}
```

## Error Response

**Condition** : If 'token' header invalid.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status":false,
    "message":"invalid token"
}
```

## Error Response

**Condition** : If 'token' not authorized.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status": false,
    "message": "not authorized"
}
```



# Add members


**URL** : `{{base_url}}/members`

**Method** : `POST`

**Auth required** : true


**Header**
```json
{
	Content-Type: application/json,
	token: {{token}}
}
```

**Data example**

```json
{
	"user_email":"adhi@gmail.com",
	"project_id":39
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "status": true,
  "message": "success register member",
  "data": {
    "id": 84,
    "project_id": 35,
    "member_status": "user",
    "createdAt": "2020-10-31T03:13:51.370Z",
    "updatedAt": "2020-10-31T03:13:51.390Z",
    "user_id": 14
  }
}
```

## Error Response

**Condition** : If 'email' already registered.

**Code** : `409 Conflict`

**Content** :

```json
{
  "status": false,
  "message": "member already register in project"
}

```

## Error Response

**Condition** : If 'email' not exists.

**Code** : `400 Bad Request`

**Content** :

```json
{
  "status": false,
  "message": "can't register a member, email does not exists"
}
```

## Error Response

**Condition** : If 'user' not author.

**Code** : `400 Bad Request`

**Content** :

```json
{
  "status": false,
  "message": "can't register a member, please contact author to add member"
}
```


## Error Response

**Condition** : If 'token' header invalid.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status":false,
    "message":"invalid token"
}
```

## Error Response

**Condition** : If 'token' not authorized.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status": false,
    "message": "not authorized"
}
```


# Delete Member


**URL** : `{{base_url}}/members/{{project_id}}/{{user_id}}`

**Method** : `DELETE`

**Auth required** : true


**Header**
```json
{
	Content-Type: application/json,
	token: {{token}}
}
```

**Data example**

```json
{}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "status": true,
  "message": "success delete member",
  "data": []
}
```

## Error Response

**Condition** : If 'user' not author.

**Code** : `400 Bad Request`

**Content** :

```json
{
  "status": false,
  "message": "can't delete a member, please contact author to delete member"
}
```

## Error Response

**Condition** : If 'token' header invalid.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status":false,
    "message":"invalid token"
}
```

## Error Response

**Condition** : If 'token' not authorized.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status": false,
    "message": "not authorized"
}
```


# Add todo


**URL** : `{{base_url}}/todos`

**Method** : `POST`

**Auth required** : true


**Header**
```json
{
	Content-Type: application/json,
	token: {{token}}
}
```

**Data example**

```json
{
	"title":"Fancy Todo Login",
	"description":"Membuat fancy todo fitur login",
	"status":"New",
	"due_date":"2020-10-31",
	"project_id":"35"
}

```

## Success Response

**Code** : `201 Created`

**Content example**

```json
{
  "status": true,
  "message": "success save todo",
  "data": {
    "id": 12,
    "title": "Fancy Todo Login",
    "description": "Membuat fancy todo fitur login",
    "status": "New",
    "due_date": "2020-10-31T00:00:00.000Z",
    "project_id": 39,
    "creator_id": 14,
    "createdAt": "2020-10-31T03:29:25.496Z",
    "updatedAt": "2020-10-31T03:29:25.497Z"
  }

```

## Error Response

**Condition** : If 'validate' required.

**Code** : `400 Bad Request`

**Content** :

```json
{
  "status": false,
  "message": [
    "Title is required",
    "Description is required",
    "Status is required",
    "todo status should be New, Inprogress or Done ",
    "date is required",
    "Input date must be date"
  ]
}
```

## Error Response

**Condition** : If 'token' header invalid.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status":false,
    "message":"invalid token"
}
```

## Error Response

**Condition** : If 'token' not authorized.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status": false,
    "message": "not authorized"
}
```


# Get todo


**URL** : `{{base_url}}/todos/project/{{project_id}}`

**Method** : `GET`

**Auth required** : true


**Header**
```json
{
	Content-Type: application/json,
	token: {{token}}
}
```

**Data example**

```json
{
}

```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "status": true,
  "message": "success get todo",
  "data": [
    {
      "id": 12,
      "title": "Fancy Todo Login",
      "description": "Membuat fancy todo fitur login",
      "status": "New",
      "due_date": "2020-10-31T00:00:00.000Z",
      "creator_id": 14,
      "project_id": 39,
      "createdAt": "2020-10-31T03:29:25.496Z",
      "updatedAt": "2020-10-31T03:29:25.497Z"
    },
    {
      "id": 14,
      "title": "Fancy Todo Login",
      "description": "Membuat fancy todo fitur login",
      "status": "New",
      "due_date": "2020-10-31T00:00:00.000Z",
      "creator_id": 12,
      "project_id": 39,
      "createdAt": "2020-10-31T04:04:45.717Z",
      "updatedAt": "2020-10-31T04:04:45.718Z"
    }
  ]
}
```


## Error Response

**Condition** : If 'token' header invalid.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status":false,
    "message":"invalid token"
}
```

## Error Response

**Condition** : If 'token' not authorized.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status": false,
    "message": "not authorized"
}
```


# Update todo


**URL** : `{{base_url}}/todos/{{todo_id}}`

**Method** : `PUT`

**Auth required** : true


**Header**
```json
{
	Content-Type: application/json,
	token: {{token}}
}
```

**Data example**

```json
{
	"title": "Test Hacktiv 8",
    "description": "Test Hacktiv 8",
    "status": "New",
    "due_date": "2020-10-31"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "status": true,
  "message": "success update todo",
  "data": {
    "id": 13,
    "title": "Test Hacktiv 8",
    "description": "Test Hacktiv 8",
    "status": "New",
    "due_date": "2020-10-31T00:00:00.000Z",
    "creator_id": 12,
    "project_id": 39,
    "createdAt": "2020-10-31T03:52:35.042Z",
    "updatedAt": "2020-10-31T04:03:36.551Z"
  }
}
```


## Error Response

**Condition** : If 'token' header invalid.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status":false,
    "message":"invalid token"
}
```

## Error Response

**Condition** : If 'token' not authorized.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status": false,
    "message": "not authorized"
}
```


# Delete Todo


**URL** : `{{base_url}}/todos/{{todo_id}}`

**Method** : `DELETE`

**Auth required** : true


**Header**
```json
{
	Content-Type: application/json,
	token: {{token}}
}
```

**Data example**

```json
{
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "status": true,
  "message": "success delete todo",
  "data": []
}
```


## Error Response

**Condition** : If 'token' header invalid.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status":false,
    "message":"invalid token"
}
```

## Error Response

**Condition** : If 'token' not authorized.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status": false,
    "message": "not authorized"
}
```


# Delete Todo


**URL** : `{{base_url}}/todos/{{todo_id}}`

**Method** : `GET`

**Auth required** : true


**Header**
```json
{
	Content-Type: application/json,
	token: {{token}}
}
```

**Data example**

```json
{
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "status": true,
  "message": "success get todo",
  "data": {
    "id": 14,
    "title": "Fancy Todo Login",
    "description": "Membuat fancy todo fitur login",
    "status": "New",
    "due_date": "2020-10-31T00:00:00.000Z",
    "creator_id": 12,
    "project_id": 39,
    "createdAt": "2020-10-31T04:04:45.717Z",
    "updatedAt": "2020-10-31T04:04:45.718Z"
  }
}
```


## Error Response

**Condition** : If 'token' header invalid.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status":false,
    "message":"invalid token"
}
```

## Error Response

**Condition** : If 'token' not authorized.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status": false,
    "message": "not authorized"
}
```


