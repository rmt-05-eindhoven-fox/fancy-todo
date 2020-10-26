## Show Todos

`Show all Todos data from json`

**URL**

`/todos/`

**Method:**

`GET`

**Success Response:**

  Code: 200
  Content: 
```json
{ 
  id : 1,
  title: 'rest api',
  desciption: 'study rest api',
  status: 'on progress',
  due_date: '2020-10-26 17:16:09'
}
```

**Error Response:**

  Code: 500 INTERNAL SERVER ERROR
  Content: 
  ```json
  { error : "Internal Server Error" }
  ```


## Create Todos

`add data to todos`

**URL**

`/todos/create`

**Method:**

`POST`

**Data Params**

`title = [string]`
`description = [string]`
`status = [string]`
`due_date = [date]`

**Success Response:**

  Code: 201
  Content: 
```json
{ 
  id : 1,
  title: 'rest api',
  desciption: 'study rest api',
  status: 'on progress',
  due_date: '2020-10-26 17:16:09'
}
```

**Error Response:**

  Code: 500 INTERNAL SERVER ERROR
  Content: 
  ```json
  { error : "Internal Server Error" }
  ```


## Show Todos by Id

`Show Todos data from json with specific id`

**URL**

`/todos/:id`

**Method:**

`GET`

**RL Params**

Required:

`id=[integer]`

**Success Response:**

  Code: 200
  Content: 
```json
{ 
  id : 1,
  title: 'rest api',
  desciption: 'study rest api',
  status: 'on progress',
  due_date: '2020-10-26 17:16:09'
}
```

**Error Response:**

  Code: 500 INTERNAL SERVER ERROR
  Content: 
  ```json
  { error : "Internal Server Error" }
  ```


## Update Todos

`Update all Todos data and show it from json`

**URL**

`/todos/edit/:id`

**Method:**

`PUT`

**URL Params**

Required:

`id=[integer]`

**Data Params**

`title = [string]`
`description = [string]`
`status = [string]`
`due_date = [date]`

**Success Response:**

  Code: 200
  Content: 
```json
{ 
  id : 1,
  title: 'rest api documentation',
  desciption: 'study rest api & documentation',
  status: 'on progress',
  due_date: '2020-10-26 17:32:24'
}
```

**Error Response:**

  Code: 500 INTERNAL SERVER ERROR
  Content: 
  ```json
  { error : "Internal Server Error" }
  ```


## Update One Todos

`Update one Todos data and show it from json`

**URL**

`/todos/edit/:id`

**Method:**

`PATCH`

**URL Params**

Required:

`id=[integer]`

**Data Params**

`status = [string]`

**Success Response:**

  Code: 200
  Content: 
```json
{ 
  id : 1,
  title: 'rest api documentation',
  desciption: 'study rest api & documentation',
  status: 'done',
  due_date: '2020-10-26 17:32:24'
}
```

**Error Response:**

  Code: 500 INTERNAL SERVER ERROR
  Content: 
  ```json
  { error : "Internal Server Error" }
  ```


## Delete Todos

`Delete a specific Todos data from json`

**URL**

`/todos/delete/:id`

**Method:**

`DELETE`

**URL Params**

Required:

`id=[integer]`

**Success Response:**

  Code: 200
  Content: `message: "deleted successfully"`

**Error Response:**

  Code: 500 INTERNAL SERVER ERROR
  Content: 
  ```json
  { error : "Internal Server Error" }
  ```