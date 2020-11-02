## Show Todos

`Show all Todos data from json`

**URL**

`/todos/`

**Method:**

`GET`

**Headers:**

```json
{
  access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXNAbWFpbC5jb20iLCJpYXQiOjE2MDM3ODQ3MTV9.Jp3TQazB8fnEl8k5qtcoyoSbTtBbHu9fIvmDMPrBX-E'
}
```

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

**Headers:**

```json
{
  access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXNAbWFpbC5jb20iLCJpYXQiOjE2MDM3ODQ3MTV9.Jp3TQazB8fnEl8k5qtcoyoSbTtBbHu9fIvmDMPrBX-E'
}
```

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

**Headers:**

```json
{
  access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXNAbWFpbC5jb20iLCJpYXQiOjE2MDM3ODQ3MTV9.Jp3TQazB8fnEl8k5qtcoyoSbTtBbHu9fIvmDMPrBX-E'
}
```

**URL Params**

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

**Headers:**

```json
{
  access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXNAbWFpbC5jb20iLCJpYXQiOjE2MDM3ODQ3MTV9.Jp3TQazB8fnEl8k5qtcoyoSbTtBbHu9fIvmDMPrBX-E'
}
```

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

**Headers:**

```json
{
  access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXNAbWFpbC5jb20iLCJpYXQiOjE2MDM3ODQ3MTV9.Jp3TQazB8fnEl8k5qtcoyoSbTtBbHu9fIvmDMPrBX-E'
}
```

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

**Headers:**

```json
{
  access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXNAbWFpbC5jb20iLCJpYXQiOjE2MDM3ODQ3MTV9.Jp3TQazB8fnEl8k5qtcoyoSbTtBbHu9fIvmDMPrBX-E'
}
```

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


## Show Movies

`Show Popular Movies data from The Movie Database (3rd party API`

**URL**

`/movies/popular`

**Method:**

`GET`

**Headers:**

```json
{
  access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXNAbWFpbC5jb20iLCJpYXQiOjE2MDM3ODQ3MTV9.Jp3TQazB8fnEl8k5qtcoyoSbTtBbHu9fIvmDMPrBX-E'
}
```

**Success Response:**

  Code: 200
  Content: 
```json
{ 
  "popularity": 2235.816,
  "vote_count": 34,
  "video": false,
  "poster_path": "/ugZW8ocsrfgI95pnQ7wrmKDxIe.jpg",
  "id": 724989,
  "adult": false,
  "backdrop_path": "/86L8wqGMDbwURPni2t7FQ0nDjsH.jpg",
  "original_language": "en",
  "original_title": "Hard Kill",
  "genre_ids": [
      28,
      53
  ],
  "title": "Hard Kill",
  "vote_average": 4.5,
  "overview": "The work of billionaire tech CEO Donovan Chalmers is so valuable that he hires mercenaries to protect it, and a terrorist group kidnaps his daughter just to get it.",
  "release_date": "2020-10-23"
}
```

**Error Response:**

  Code: 500 INTERNAL SERVER ERROR
  Content: 
  ```json
  { error : "Internal Server Error" }
  ```