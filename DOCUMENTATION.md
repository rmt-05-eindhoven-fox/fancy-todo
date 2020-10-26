**Create todo**

return all available todo on server

***URL***

  /todos

**Method:**

  `POST`

***Data Params***

`title=[string]`,
`description=[string]`,
`status=[Boolean]`,
`due_date=[date]`,

***success Response:***

    Code: 201
    CONTENT : 
    {
    "id": 4,
    "title": "Bangun Malam",
    "description": "belajar",
    "status": false,
    "due_date": "2020-10-28T00:00:00.000Z",
    "updatedAt": "2020-10-26T14:50:04.305Z",
    "createdAt": "2020-10-26T14:50:04.305Z"
    }


***Error Response:***

    Code: 500 INTERNAL SERVER ERROR
    OR
    400 VALIDATION ERROR 

=========================================================================================

**Find All Data todo**

return all available todo on server

***URL***

  /todos

**Method:**

  `GET`

***success Response:***

    Code: 200
    CONTENT : 
    [
    object of all available todo on server 
    ]

***Error Response:***

    Code: 500 INTERNAL SERVER ERROR

========================================================================================


**Find Data todo by id**

return todo's data with coresponding id

***URL***

  /todos/;id

**Method:**

  `GET`

***success Response:***

    Code: 200
    CONTENT : 
    [
    object of todo's data with coresponding id
    ]

***Error Response:***

    Code: 404 NOT FOUND

========================================================================================

**Update One Todo's Data**

return updated todo

***URL***

  /todos/:id

**Method:**

  `PUT`

***URL Params***

**Required:**

`id=[integer]`

***Data Params***

`title=[string]`,
`description=[string]`,
`status=[Boolean]`,
`due_date=[date]`,

***success Response:***

    Code: 200
    CONTENT : 
    {
    "id": 4,
    "title": "Bangun Malam",
    "description": "tahajud",
    "status": false,
    "due_date": "2020-10-28T00:00:00.000Z",
    "updatedAt": "2020-10-26T14:50:04.305Z",
    "createdAt": "2020-10-26T14:50:04.305Z"
    }

***Error Response:***

    Code: 500 INTERNAL SERVER ERROR
    OR
    404 NOT FOUND
    OR UND
    400 VALIDATION ERROR

========================================================================================

**Update Todo's Status**

return updated Todo

***URL***

  /todos/:id

**Method:**

  `PATCH`

***URL Params***

**Required:**

`id=[integer]`

***Data Params***

`status=[boolean]`


***success Response:***

    Code: 200
    CONTENT : 
    {
        
    "id": 4,
    "title": "Bangun Malam",
    "description": "tahajud",
    "status": true,
    "due_date": "2020-10-28T00:00:00.000Z",
    "updatedAt": "2020-10-26T14:50:04.305Z",
    "createdAt": "2020-10-26T14:50:04.305Z"

        
    }

***Error Response:***

    Code: 500 INTERNAL SERVER ERROR
    OR
    404 NOT FO
    OR UND
    400 VALIDATION ERROR

======================================================================================

**Delete Todo**

return deleted todo

***URL***

  /todos/:id

**Method:**

  `DELETE`

***URL Params***

**Required:**

`id=[integer]`

***Data Params***


***success Response:***

    Code: 200
    CONTENT : 
    {
        todo success to delete
        
    }

***Error Response:***

    Code: 500 INTERNAL SERVER ERROR
    or 
    404 NOT FOUND
    Content: { error: `delete gagal. data id ke ${+ req.params.id} tidak ditemukan`}

   





   


