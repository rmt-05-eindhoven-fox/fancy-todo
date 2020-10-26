**Create todo**

return all available todo on server

***URL***

  /todos

**Method:**

  `POST`

***success Response:***

    Code: 201
    RESPONSE : 
    [
    object of new todo 
    ]

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
    RESPONSE : 
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
    RESPONSE : 
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
    RESPONSE : 
    {
        updated One Todo's data
    }

***Error Response:***

    Code: 500 INTERNAL SERVER ERROR
    OR
    404 NOT FO
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
    RESPONSE : 
    {
        "status": "new status",
        
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
    RESPONSE : 
    {
        deleted data todo
        
    }

***Error Response:***

    Code: 500 INTERNAL SERVER ERROR
    or 
    404 NOT FOUND


   





   


