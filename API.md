# FANCY TODO

## API DOCUMENTATION


**RESTful ENDPOINT**
---
- `POST /users/register`

**Show Movie**
---
  Returns json data about User name, email, password.

* **URL**

  `/users/register`

* **Method:**

  `GET`

* **Header:**

  None
  
*  **URL Params**

   **Required:**
 
  none

* **Data Params**

  userName, email, password

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
      "userName": null,
      "email": "yuliafirdaus@gmail.com",
      "password": "$2a$10$AeZ2apK4Wh2x04jqpFGLJu7Rm0nR6Xj2xorsg.pdqllPN7W57nPjS"
    }
    
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:**
    ```json
    {
      "message": "NOT FOUND"
    }
    ```


**RESTful ENDPOINT**
---
- `POST /users/login`

**Show Movie**
---
  Returns json data about access Token and User name.

* **URL**

  `/users/login`

* **Method:**

  `GET`

* **Header:**

  None
  
*  **URL Params**

   **Required:**
 
  none

* **Data Params**

  email, password

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlck5hbWUiOiJhbmluZGl0YSIsImlhdCI6MTYwNDIxNjYzN30.Qwrl3uho6iVUJIADDxigkMq8rKc24S-6MO5jS4ud-SA",
    "userName": "anindita"
}
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:**
    ```json
    {
      "message": "NOT FOUND"
    }
    ```

    
**RESTful ENDPOINT**
---
- `POST /users/googleLogin`

**Show Movie**
---
  Returns json data about user google.

* **URL**

  `/users/googleLogin`

* **Method:**

  `POST`

* **Header:**

  None
  
*  **URL Params**

   **Required:**
 
  none

* **Data Params**

  email

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlck5hbWUiOiJhbmluZGl0YSIsImlhdCI6MTYwNDIxNjYzN30.Qwrl3uho6iVUJIADDxigkMq8rKc24S-6MO5jS4ud-SA",
    "userName": "anindita"
}
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:**
    ```json
    {
      "message": "NOT FOUND"
    }
    ```

