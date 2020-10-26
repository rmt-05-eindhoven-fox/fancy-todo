# fancy-todo
------------------
**Add Todo**

  `Create a new todo`

* **URL**

  `/todos`

* **Method:**

  `POST`

* **URL Params**

	none

* **Data Params**

  `
		{
			"title": "new todo",
			"description": "todo description",
			"due date": "2020-11-09",
			"status": "On progress"
		}
	`

* **Success Response:**

  * **Code:** 201 CREATED
    **Content:**
		```json
		[
	  	{
				"title": "new todo",
				"description": "todo description",
				"due date": "2020-11-09",
				"status": "On progress"
	 		}
		]
		```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `{ error : "Server is under attack." }`


------------------
**Show All Todos**

  `Return json data about all todo list`

* **URL**

  `/todos`

* **Method:**

  `GET`   

* **URL Params**
	
	none

* **Data Params**

  none

* **Success Response:**

  * **Code:** 200 OK
    **Content:**
	  ```json
	  [
			{
				"id": 1,
				"title": "todo1",
				"description": "todo1 description",
				"due date": "2020-11-09",
				"status": "On progress"
			},
			{
				"id": 2,
				"title": "todo2",
				"description": "todo2 description",
				"due date": "2020-11-04",
				"status": "Done"
			}
		]
		```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `{ error : "Server is under attack." }`


------------------
**Get One Todo**

  `return json data about specific todo based on id`

* **URL**

  `/todos/:id`

* **Method:**

  `GET`   

* **URL Params**
	
	**Required:**

	`id=[integer]`

* **Data Params**

  none

* **Success Response:**

  * **Code:** 200 OK
    **Content:**
	 	```json
	 	[
			{
				"id": 1,
				"title": "task todo",
				"description": "task description",
				"due date": "2020-11-09",
				"status": "On progress"
			}
		]
		```
 
* **Error Response:**
  * **Code:** 404 NOT FOUND
    **Content:** `{ error : "Data not found" }`

	OR

  * **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `{ error : "Server is under attack." }`


------------------
**Update One Todo**

  `Update specific todo based on id`

* **URL**

  `/todos/:id`

* **Method:**

  `PUT`   

* **URL Params**
	
	**Required:**

	`id=[integer]`

* **Data Params**

  `
		{
			"id": 1,
			"title": "task todo",
			"description": "task description",
			"due date": "2020-11-09",
			"status": "On progress"
	 	}
	`

* **Success Response:**

  * **Code:** 200 OK
    **Content:**
	 	```json
	 	[
			{
				"id": 1,
				"title": "task todo urgent",
				"description": "task description",
				"due date": "2020-11-05",
				"status": "On progress"
			}
		]
		```
 
* **Error Response:**
  * **Code:** 404 NOT FOUND
    **Content:** `{ error : "Data not found" }`

	OR

  * **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `{ error : "Server is under attack." }`


------------------
**Update One Todo Status**

  `Update specific todo status based on id`

* **URL**

  `/todos/:id`

* **Method:**

  `PATCH`   

* **URL Params**
	
	**Required:**

	`id=[integer]`

* **Data Params**

  `
		{
			"status": "On progress"
		}
	`

* **Success Response:**

  * **Code:** 200 OK
    **Content:**
	 	```json
	 	[
			{
				"id": 1,
				"title": "task todo",
				"description": "task description",
				"due date": "2020-11-09",
				"status": "Done"
			}
		]
		```
 
* **Error Response:**
  * **Code:** 404 NOT FOUND
    **Content:** `{ error : "Data not found" }`

	OR

  * **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `{ error : "Server is under attack." }`


------------------
**Delete One Todo**

  `Delete specific todo based on id`

* **URL**

  `/todos/:id`

* **Method:**

  `DELETE`   

* **URL Params**
	
	**Required:**

	`id=[integer]`

* **Data Params**

  none

* **Success Response:**

  * **Code:** 200 OK
    **Content:**
	 	```json
	 	[
			{
				"id": 1,
				"title": "task todo",
				"description": "task description",
				"due date": "2020-11-09",
				"status": "Done"
			}
		]
		```
 
* **Error Response:**
  * **Code:** 404 NOT FOUND
    **Content:** `{ error : "Data not found" }`

	OR

  * **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `{ error : "Server is under attack." }`
