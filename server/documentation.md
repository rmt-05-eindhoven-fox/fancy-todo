# Todo App


## Landing Page
- ### URL:
    `/`
- ### Method:
    `GET`
- ### Success Response:
    `Welcome To TODO APP`
***

***

## SHOW LIST TODO

### URL:

	`/todos/show`

- ### Method:

	`GET`

- ### URL Params:

	<_None_>

- ### Data Params:

    <_None_>

- ### Success Response:

	Code: 201 CREATED

	Content :

	```
    [
         { 
            id : 2, 
            title : "<task-title>", 
	        description : "<task-title>", 
	        status : "<status>", 
	        due_date : "<status_date>" 
        },
        { 
            id : 2, 
            title : "<task-title>", 
	        description : "<task-title>", 
	        status : "<status>", 
	        due_date : "<status_date>" 
        },
    ]
	
	```

- ### Error Response:

	Code: 400 BAD REQUEST

	Content: `{ error: "Check Input Value" }`

***

***

## CREATE TODO

 ### URL:

	`/todos/create`

- ### Method:

	`POST`

- ### URL Params:

	None

- ### Data Params:
    ```

	title = [string]

	description = [string]

	status = [string]

	due_date = [date]

    ```

- ### Success Response:

	Code: 201 CREATED

	Content :

	```
    [
        { 
            id : 1, 
            title : "Makan", 
	        description : "Makan Pagi", 
	        status : "<status>", 
	        due_date : "<status_date>" 
        }
    ]
	
	```

- ### Error Response:

	Code: 400 BAD REQUEST

	Content: `{ error: "Check Input Value" }`
***

***

## UPDATE/EDIT TODO

 ### URL:

	`/todos/:id`

- ### Method:

	`PUT`

- ### URL Params:

	`id = [integer]`

- ### Data Params:

    ```

	title = [string]

	description = [string]

	status = [string]

	due_date = [date]

    ```

- ### Success Response:

	Code: 200

	Content :

	```
    [
        { 
            id : 1, 
            title : "Makan", 
	        description : "Makan Pagi", 
	        status : "<status>", 
	        due_date : "<status_date>" 
        }
    ]
	
	```

- ### Error Response:

	Code: 400 BAD REQUEST

	Content: `{ error: "Input Value Invalid" }`
***

***

## UPDATE/EDIT TODO (PATCH)

 ### URL:

	`/todos/:id`

- ### Method:

	`PATCH`

- ### URL Params:

	`id = [integer]`

- ### Data Params:

    ```

	title = [string]

	description = [string]

	status = [string]

	due_date = [date]

    ```

- ### Success Response:

	Code: 200

	Content :

	```
    [
        { 
            id : 1, 
            title : "Makan", 
	        description : "Makan Pagi", 
	        status : "<status>", 
	        due_date : "<status_date>" 
        }
    ]
	
	```

- ### Error Response:

	Code: 400 BAD REQUEST

	Content: `{ error: "Input Value Invalid" }`
***

***

## DELETE TODO

 ### URL:

	`/todos/:id`

- ### Method:

	`DELETE`

- ### URL Params:

	`id = [integer]`

- ### Data Params:

    ```

	None

    ```

- ### Success Response:

	Code: 200

	Content :

	```
    message: "Todo id success deleted"
	
	```

- ### Error Response:

	Code: 400 BAD REQUEST

	Content: `{ error: "error delete id doesn't exist" }`
