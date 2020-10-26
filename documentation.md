# Fancy ToDo App
to-do-list for your daily activites, this app has:
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

**POST/todos**
----
 menambahkan todo ke aplikasi

* **URL**

  /todos


* **Method:**

  `POST/todos`



* **Success Response:**
  ```md
    Code: 201 (created)
    Content:
    { 
    "message": todo berhasil ditambahkan 
    }
    ```

* **Error Response:**
  ```md
    Code: 400 (bad request)
    Content:
    {
    "message": todo gagal ditambahkan
    }
    ```
---

**GET/todos**
----
 menampilkan todo ke aplikasi

* **URL**

  /todos


* **Method:**

  `GET/todos`



* **Success Response:**
  ```md
    Code: 200 
    Content:
        { 
        "id": 1,
        "title": "<todo title >",
        "description": "<todo description>",
        "status":"true",
        "due_date":2020-12-20T07:15:12.149Z",
        "createdAt": "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z"
        }
    ```

* **Error Response:**
  ```md
    Code: 400 
    Content:
        {
        "message": "gagal menampilkan list todos"
        }
    ```