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


