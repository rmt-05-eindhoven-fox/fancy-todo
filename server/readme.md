# Fancy Todo API Documentation

## 1. Add new Todo

* URL

    /todos

* Method

    `POST`

* URL Params

    None

* Data Params
```
{
    "title" : "Todo Title",
    "description" : "Todo Description",
    "status" : "Not done",
    "due_date" : "2020-10-26"
}
```

* Success Response
    
    Code: `201 CREATED`
    
    Content:
```
{
    "title" : "API Documentation",
    "description" : "Fancy Todos API Documentation",
    "status" : "In progress",
    "due_date" : "2020-10-26"
}
```

* Error Response
    
    Code: `400 BAD REQUEST`
    
    Content:
```
{
    error: ['Title is required', 
            ...,
            'Description is missing']
}
```

Code: `500 INTERNAL SERVER ERROR`
    
    Content:
```
{
    error: 'Our server ran into troubles. Please wait few moments for our engineer to fix the problem.'
}
```
    
## 2. Get all Todos

* URL

    /todos

* Method

    `GET`

* URL Params

    None

* Data Params

    None


* Success Response
        
    Code: `200 OK`
        
    Content:
```
[
    {
        "id" : 1,
        "title" : "API Documentation",
        "description" : "Fancy Todos API Documentation",
        "status" : "In progress",
        "due_date" : "2020-10-26"
    },
    {
        "id" : 2,
        "title" : "Read REST API Tutorial",
        "description" : "Read REST API Tutorial",
        "status" : "In progress",
        "due_date" : "2020-10-30"
    }
]
```

* Error Response
    
    Code: `500 INTERNAL SERVER ERROR`
    
    Content:
        
    ```
    {
        error: 'Our server ran into troubles. Please wait few moments for our engineer to fix the problem.'
    }
    ```

## 3. Get specific Todo by ID

* URL

    /todos/:id

* Method

    `GET`

* URL Params

    Required: `id = [integer]`

* Data Params

    None


* Success Response
        
    Code: `200 OK`
        
    Content:
    
```
{
    "id" : 1,
    "title" : "API Documentation",
    "description" : "Fancy Todos API Documentation",
    "status" : "In progress",
    "due_date" : "2020-10-26"
},
```

* Error Response
    
    Code: `404 NOT FOUND`
    
    Content:
        
    ```
    {
        error: 'Content not found.'
    }
    ```
    
    Code: `500 INTERNAL SERVER ERROR`
    
    Content:
        
    ```
    {
        error: 'Our server ran into troubles. Please wait few moments for our engineer to fix the problem.'
    }
    ```
    
## 4. Update specific Todo by ID

* URL

    /todos/:id

* Method

    `GET`

* URL Params

    Required: `id = [integer]`

* Data Params

    ```
    {
        "title" : "Edited Todo Title",
        "description" : "Edited Todo Description",
        "status" : "Edited Todo Status",
        "due_date" : "2020-10-26"
    }
    ```


* Success Response
        
    Code: `200 OK`
        
    Content:
    
    ```
    {
        "id" : 1,
         "title" : "Edited Todo Title",
        "description" : "Edited Todo Description",
        "status" : "Edited Todo Status",
        "due_date" : "2020-10-26"
    },
    ```

* Error Response

    Code: `400 BAD REQUEST`
    
    Content:
```
{
    error: ['Title is required', 
            ...,
            'Description is missing']
}
```
    
    Code: `404 NOT FOUND`
    
    Content:
        
    ```
    {
        error: 'Content not found.'
    }
    ```
    
    Code: `500 INTERNAL SERVER ERROR`
    
    Content:
        
    ```
    {
        error: 'Our server ran into troubles. Please wait few moments for our engineer to fix the problem.'
    }
    ```
    
## 5. Update Todo status by ID

* URL

    /todos/:id

* Method

    `GET`

* URL Params

    Required: `id = [integer]`

* Data Params

    ```
    {
        "status" : "done"
    }
    ```


* Success Response
        
    Code: `200 OK`
        
    Content:
    
    ```
    {
        "id" : 1,
         "title" : "Edited Todo Title",
        "description" : "Edited Todo Description",
        "status" : "done",
        "due_date" : "2020-10-26"
    },
    ```

* Error Response
    
    Code: `404 NOT FOUND`
    
    Content:
        
    ```
    {
        error: 'Content not found.'
    }
    ```
    
    Code: `500 INTERNAL SERVER ERROR`
    
    Content:
        
    ```
    {
        error: 'Our server ran into troubles. Please wait few moments for our engineer to fix the problem.'
    }
    ```

## 6. Delete specific Todo by ID

* URL

    /todos/:id

* Method

    `PATCH`

* URL Params

    Required: `id = [integer]`

* Data Params

   None


* Success Response
        
    Code: `200 OK`
        
    Content:
    
    ```
    {
        "message" : "Successfuly deleted Todo"   
    }
    ```

* Error Response
    
    Code: `404 NOT FOUND`
    
    Content:
        
    ```
    {
        error: 'Content not found.'
    }
    ```
    
    Code: `500 INTERNAL SERVER ERROR`
    
    Content:
        
    ```
    {
        error: 'Our server ran into troubles. Please wait few moments for our engineer to fix the problem.'
    }
    ```