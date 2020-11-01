# FANCY TODOS #

1. **CREATE TODOS**

    * **URL**

      `/todos/add`

    * **Method:**

      `POST`

    * **Data Params**

      **Required:**

      - `title = [string]`
      - `description = [string]`
      - `status = [boolean]`
      - `due_date = [date]`

    * **Success Response:**

      * **Code:** `201 CREATED` <br />
        **Content:** 
        ```json 
        json { 
          "id" : 1,
          "title" : "ngoding",
          "description" : "budak ngoding istiqomah",
          "status" : false,
          "due_date" : 2020-12-15
        }
        ```
    
    * **Error Response:**

      * **Code:** `400 BAD REQUEST` <br />
        **Content:** 
        ```json
        { error : "Validation Error" }
        ```

      OR

      * **Code:** `500 INTERNAL SERVER ERROR` <br />
        **Content:** 
        ```json
        { error : "Internal Server Error" }
        ```

2. **LIST TODOS**

    * **URL**

      `/todos`

    * **Method:**

      `GET`

    * **Success Response:**

      * **Code:** `200 OK` <br />
        **Content:** 
        ```json 
        json [{ 
          "id" : 1,
          "title" : "ngoding",
          "description" : "budak ngoding istiqomah",
          "status" : false,
          "due_date" : 2020-12-15
        },{
          "id" : 2,
          "title" : "mandi",
          "description" : "budak mandi istiqomah",
          "status" : true,
          "due_date" : 2020-10-25
        }]
        ```
    
    * **Error Response:**

      * **Code:** `404 NOT FOUND` <br />
        **Content:** 
        ```json
        { "error" : "ToDo Not Found" }
        ```

      OR

      * **Code:** `500 INTERNAL SERVER ERROR` <br />
        **Content:** 
        ```json
        { "error" : "Internal Server Error" }
        ```

3. **LIST TODOS (ID)**

    * **URL**

      `/todos/:id`

    * **Method:**

      `GET`

    *  **URL Params** 

        **Required:**

        - `id = [integer]`

    * **Success Response:**

      * **Code:** `200 OK` <br />
        **Content:** 
        ```json 
        json {
          "id" : 2,
          "title" : "mandi",
          "description" : "budak mandi istiqomah",
          "status" : true,
          "due_date" : 2020-10-25
        }
        ```
    
    * **Error Response:**

      * **Code:** `404 NOT FOUND` <br />
        **Content:** 
        ```json
        { "error" : "ToDo Not Found" }
        ```

      OR

      * **Code:** `500 INTERNAL SERVER ERROR` <br />
        **Content:** 
        ```json
        { "error" : "Internal Server Error" }
        ```

4. **UPDATE TODOS**

    * **URL**

      `/todos/edit/:id`

    * **Method:**

      `PUT`
      
    *  **URL Params** 

        **Required:**

        - `id = [integer]`

    * **Data Params**

        **Required:**

        - `title = [string]`
        - `description = [string]`
        - `status = [boolean]`
        - `due_date = [date]`

    * **Success Response:**

      * **Code:** `200 OK` <br />
        **Content:** 
        ```json 
        json { 
          "id" : 1,
          "title" : "ngopi",
          "description" : "budak ngopi istiqomah",
          "status" : false,
          "due_date" : 2020-10-27
        }
        ```
    
    * **Error Response:**

      * **Code:** `400 BAD REQUEST` <br />
        **Content:** 
        ```json
        { "error" : "Validation Error" }
        ```

      OR

      * **Code:** `404 NOT FOUND` <br />
        **Content:** 
        ```json
        { "error" : "ToDo Not Found" }
        ```

      OR

      * **Code:** `500 INTERNAL SERVER ERROR` <br />
        **Content:** 
        ```json
        { "error" : "Internal Server Error" }
        ```

5. **UPDATE TODOS (STATUS)**

    * **URL**

      `/todos/update/:id`

    * **Method:**

      `PATCH`
      
    *  **URL Params** 

        **Required:**

        - `id = [integer]`

    * **Data Params**

        **Required:**

        - `status = [boolean]`

    * **Success Response:**

      * **Code:** `200 OK` <br />
        **Content:** 
        ```json 
        json { 
          "id" : 1,
          "title" : "ngopi",
          "description" : "budak ngopi istiqomah",
          "status" : true,
          "due_date" : 2020-10-27
        }
        ```
    
    * **Error Response:**

      * **Code:** `400 BAD REQUEST` <br />
        **Content:** 
        ```json
        { "error" : "Validation Error" }
        ```

      OR

      * **Code:** `404 NOT FOUND` <br />
        **Content:** 
        ```json
        { "error" : "ToDo Not Found" }
        ```

      OR

      * **Code:** `500 INTERNAL SERVER ERROR` <br />
        **Content:** 
        ```json
        { "error" : "Internal Server Error" }
        ```

6. **DELETE TODOS**

    * **URL**

      `/todos/delete/:id`

    * **Method:**

      `DELETE`
      
    *  **URL Params** 

        **Required:**

        - `id = [integer]`

    * **Success Response:**

      * **Code:** `200 OK` <br />
        **Content:** 
        ```json 
        { "message" : "ToDo Deleted Succesfully"}
        ```
    
    * **Error Response:**

      * **Code:** `404 NOT FOUND` <br />
        **Content:** 
        ```json
        { "error" : "ToDo Not Found" }
        ```

      OR

      * **Code:** `500 INTERNAL SERVER ERROR` <br />
        **Content:** 
        ```json
        { "error" : "Internal Server Error" }
        ```