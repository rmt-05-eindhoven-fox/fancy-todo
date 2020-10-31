# TODO

**Add new ToDo**
----
  Create new ToDo Object

* **URL**

  `/todos`

* **Method:**
  
  `POST` 

* **URL Params**

  None

* **Header Params**

  ```json
    {
      "token" : "userToken"
    }
  ```

* **Data Params**
```json
  {
    "title" : "Work on API Docs",
    "description" : "API Docs for Fancy ToDos",
    "status" : "Not Done",
    "due_date" : "2020-10-30"
  }
```

* **Success Response:**

  * **Code:** 201 CREATED <br />
  **Content:** 
  ```json
    {
      "id" : 1,
      "title" : "Work on API Docs",
      "description" : "API Docs for Fancy ToDos",
      "due_date" : "2020-10-30"
    }
  ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
  <!-- **Content:** `{ error : "Log in" }` -->



-------

**Get all ToDos** 
----
  Return an array of objects with all ToDo data

* **URL**

  `/todos`

* **Method:**
  
  `GET` 

* **URL Params**

  None

* **Header Params**

  ```json
    {
      "token" : "userToken"
    }
  ```
* **Data Params**

  None


* **Success Response:**

  * **Code:** 200 OK<br/>
  **Content:** 
  ```json
    [
      {
        "id" : 1,
        "title" : "Work on API Docs",
        "description" : "API Docs for Fancy ToDos",
        "due_date" : "2020-10-30"
      },
      {
        "id" : 2,
        "title" : "Learn Rest API",
        "description" : "Go to restapitutorial.com",
        "due_date" : "2020-10-31"
      }
    ]

  ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    <!-- **Content:** `{ error : "Log in" }` -->

-------

**Get one ToDo**
----
  Return a ToDo object based on given URL params

* **URL**

  `/todos/:id`

* **Method:**
  
  `GET` 

* **URL Params**

  id refers to id of ToDo object

  **Required:**

  `id=[integer]`

* **Header Params**

  ```json
    {
      "token" : "userToken"
    }
  ```

* **Data Params**

  None


* **Success Response:**

  * **Code:** 200 OK <br />
  **Content:** 
  ```json    
    {
      "id" : 1,
      "title" : "Work on API Docs",
      "description" : "API Docs for Fancy ToDos",
      "due_date" : "2020-10-30"
    }

  ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    <!-- **Content:** `{ error : "Log in" }` -->


-------

**Put Updated Data on one ToDo**
----
  Return the updated ToDo object

* **URL**

  `/todos/:id`

* **Method:**
  
  `PUT` 

* **URL Params**

  id refers to id of ToDo object

  **Required:**

  `id=[integer]`

* **Header Params**

  ```json
    {
      "token" : "userToken"
    }
  ```

* **Data Params**

  ```json
  {
    "title" : "Work on API Docs",
    "description" : "API Docs for Fancy ToDos",
    "status" : "Not Done",
    "due_date" : "2020-10-30"
  }
  ```


* **Success Response:**

  * **Code:** 200 OK<br />
  **Content:** 
  ```json   
    {
      "id" : 1,
      "title" : "Work on API Docs",
      "description" : "API Docs for Fancy ToDos",
      "status" : "Not Done",
      "due_date" : "2020-10-30"
    }

  ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    <!-- **Content:** `{ error : "Log in" }` -->

-------

**Patch Status on one ToDo**
----
  Return the updated ToDo object

* **URL**

  `/todos/:id`

* **Method:**
  
  `PATCH` 

* **URL Params**

  id refers to id of ToDo object

  **Required:**

  `id=[integer]`

* **Header Params**

  ```json
    {
      "token" : "userToken"
    }
  ```

* **Data Params**

   ```json
  {
    "status" : "Done"
  }
    ```


* **Success Response:**

  * **Code:** 200 OK <br />
  **Content:** 
  ```json    
    {
      "id" : 1,
      "title" : "Work on API Docs",
      "description" : "API Docs for Fancy ToDos",
      "status" : "Done",
      "due_date" : "2020-10-30"
    }

  ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    <!-- **Content:** `{ error : "Log in" }` -->

-------

**Delete one ToDo**
----
  Delete a ToDo object based on params

* **URL**

  `/todos/:id`

* **Method:**
  
  `DELETE` 

* **URL Params**

  id refers to id of ToDo object

  **Required:**

  `id=[integer]`


* **Header Params**

  ```json
    {
      "token" : "userToken"
    }
  ```

* **Data Params**

  NONE


* **Success Response:**

  * **Code:** 200 OK <br />

  **Content:** 
  ```json    
    {
      "id" : 1,
      "title" : "Work on API Docs",
      "description" : "API Docs for Fancy ToDos",
      "status" : "Done",
      "due_date" : "2020-10-30"
    }

  ```
  **OR** <br><br>
  **Content:** <br>
    `message : 'todo success to delete'`

 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
  <!-- **Content:** `{ error : "Log in" }` -->

-------

# USER

**Register User**
----
  Create a new user in the database

* **URL**

  `/register`

* **Method:**
  
  `POST` 

* **URL Params**

  NONE

* **Header Params**

  NONE

* **Data Params**

  ```json
    {
      "email" : "user@mail.com",
      "password" : "userPassword"
    }

  ```


* **Success Response:**

  * **Code:** 200 OK <br />

  **Content:** 
  ```json    
    {
      "id" : 1,
      "email" : "user@mail.com"
    }

  ```
  **OR** <br><br>
  **Content:** <br>
    `message : 'Account Successfully Created'`

 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
  <!-- **Content:** `{ error : "Log in" }` -->

-------

**Login User**
----
  Registered User login

* **URL**

  `/login`

* **Method:**
  
  `POST` 

* **URL Params**

  NONE

* **Header Params**

  NONE

* **Data Params**

  ```json
    {
      "email" : "user@mail.com",
      "password" : "userPassword"
    }

  ```


* **Success Response:**

  * **Code:** 200 OK <br />

  **Content:** 
  ```json    
    {
      "token"
    }

  ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
  <!-- **Content:** `{ error : "Log in" }` -->

-------


**Login User via Google**
----
  User login via Google

* **URL**

  `/googleLogin`

* **Method:**
  
  `POST` 

* **URL Params**

  NONE

* **Header Params**

  ```json
    {
      "google_access_token"
    }
  ```

* **Data Params**

  NONE


* **Success Response:**

  * **Code:** 200 OK <br />

  **Content:** 
  ```json    
    {
      "token"
    }

  ```

 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
  <!-- **Content:** `{ error : "Log in" }` -->

-------

# Weather


**Get City's Weather**
----
  Get Today's weather with city query

* **URL**

  `/weather`

* **Method:**
  
  `GET` 

* **URL Params**

  location refers to city

  **Required:**

  `location=[string]`

* **Header Params**

  ```json
    {
      "token" : "userToken"
    }
  ```

* **Data Params**

  NONE


* **Success Response:**

  * **Code:** 200 OK <br />

  **Content:** 
  ```json    
    {
      "id": 5444491201740800,
      "weather_state_name": "Heavy Rain",
      "weather_state_abbr": "hr",
      "wind_direction_compass": "NE",
      "created": "2020-10-31T06:30:11.346411Z",
      "applicable_date": "2020-10-31",
      "min_temp": 26.785,
      "max_temp": 32.56,
      "the_temp": 31.805,
      "wind_speed": 4.8006309040669155,
      "wind_direction": 55.0,
      "air_pressure": 1010.5,
      "humidity": 69,
      "visibility": 9.754595661337788,
      "predictability": 77
    }

  ```

 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
  <!-- **Content:** `{ error : "Log in" }` -->
  **OR**
  * **Code:** 404 City Not Found <br />
  <!-- **Content:** `{ error : "Log in" }` -->

-------