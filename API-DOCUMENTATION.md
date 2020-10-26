## SHOW TODOS
Show all Todos.
## URL:
/todos
## Method:
GET
## Data Params
None
## Success Response:
Code: 200 OK
Content: { id : 1, title : "title 1", description: "desc 01", status: "ongoing",due_date: 2020-10-26 22:11:24, createdAt: 2020-10-26 22:11:24, updatedAt: 2020-10-26 22:11:24 }
## Error Response:
Code: 500 INTERNAL SERVER ERROR
Content: { error : "internal server error" }


## POST TODOS
Send new Todos To database
## URL:
/todos
## Method:
POST
## Data Params
None
## Success Response:
Code: 201 CREATED
Content: { id : 2, title : "title 2", description: "desc 02", status: "ongoing",due_date: 2020-10-26 22:11:24, createdAt: 2020-10-26 22:11:24, updatedAt: 2020-10-26 22:11:24 }
## Error Response:
Code: 400 BAD REQUEST
Content: { error : "validation not empty" }
OR
Code: 500 INTERNAL SERVER ERROR
Content: { error : "internal server error" }


## SHOW TODOS BY ID
Show Todos With specified id
## URL:
/todos/:id
## Method:
GET
## URL Params
### Required:
id=[integer]
## Data Params
None
## Success Response:
Code: 200 OK
Content: { id : 2, title : "title 2", description: "desc 02", status: "ongoing",due_date: 2020-10-26 22:11:24, createdAt: 2020-10-26 22:11:24, updatedAt: 2020-10-26 22:11:24 }
## Error Response:
Code: 404 NOT FOUND
Content: { error : "not found" }
OR
Code: 500 INTERNAL SERVER ERROR
Content: { error : "internal server error" }


## UPDATE TODOS
Update all data todos with specified id
## URL:
/todos/:id
## Method:
PUT
## URL Params
### Required:
id=[integer]
## Data Params
{
  title,
  description,
  status,
  due_date,
  createdAt,
  updatedAt
}
## Success Response:
Code: 200 OK
Content: { id : 2, title : "title 2", description: "desc 02", status: "ongoing", due_date: 2020-10-26 22:11:24, createdAt: 2020-10-26 22:11:24, updatedAt: 2020-10-26 22:11:24 }
## Error Response:
Code: 400 BAD REQUEST
Content: { error : "validation not empty" }
OR
Code: 404 NOT FOUND
Content: { error : "not found" }
OR
Code: 500 INTERNAL SERVER ERROR
Content: { error : "internal server error"}

## UPDATE TODOS STATUS
Update status todos with specified id
## URL:
/todos/:id
## Method:
PATCH
## URL Params
### Required:
id=[integer]
## Data Params
{
  status,
}
## Success Response:
Code: 200 OK
Content: { id : 2, title : "title 2", description: "desc 02", status: "completed",due_date: 2020-10-26 22:11:24, createdAt: 2020-10-26 22:11:24, updatedAt: 2020-10-26 22:11:24 }
## Error Response:
Code: 400 BAD REQUEST
Content: { error : "validation not empty" }
OR
Code: 404 NOT FOUND
Content: { error : "not found" }
OR
Code: 500 INTERNAL SERVER ERROR
Content: { error : "internal server error"}

## DELETE TODOS
Delete todos
## URL:
/todos/:id
## Method:
DELETE
## URL Params
### Required:
id=[integer]
## Data Params
none
## Success Response:
Code: 200 OK
Content: { id : 2, title : "title 2", description: "desc 02", status: "completed",due_date: 2020-10-26 22:11:24, createdAt: 2020-10-26 22:11:24, updatedAt: 2020-10-26 22:11:24 }
## Error Response:
Code: 404 NOT FOUND
Content: { error : "not found" }
OR
Code: 500 INTERNAL SERVER ERROR
Content: { error : "internal server error"}