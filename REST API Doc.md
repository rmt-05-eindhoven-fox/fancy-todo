### 1. POST /todos
Membuat todos baru
- Request body:
```json
    {
        "title": "Learn REST API",
        "description": "Learn how to write Documentation",
        "status": "unchecked",
        "due_date": "2020-10-27"
    }
```
- Response
```json
    {
        "id": 1,
        "title": "Learn REST API",
        "description": "Learn how to write Documentation",
        "status": "unchecked",
        "due_date": "2020-10-27"
    }
```
### 2. GET /todos
Get semua data todos
- Response
```json
[
    {
        "id": 1,
        "title": "Learn REST API",
        "description": "Learn how to write Documentation",
        "status": "unchecked",
        "due_date": "2020-10-27"
    },
    ...
]
```
### 3. GET /todos/:id
Get satu data todos berdasarkan id yang direquest 
- Request body:
```json
    {
        "id": 1
    }
```
- Response
```json
[
    {
        "id": 1,
        "title": "Learn REST API",
        "description": "Learn how to write Documentation",
        "status": "unchecked",
        "due_date": "2020-10-27"
    },
    ...
]
```
### 4. PUT /todos/:id
Update data todos berdasarkan id yang direquest 
- Request body:
```json
    {
        "title": "Phase 2: Learn REST API",
        "description": "Learn how to write RESTful API Documentation",
        "status": "unchecked",
        "due_date": "2020-10-30"
    }
```
- Response
```json
    {
        "id": 1,
        "title": "Phase 2: Learn REST API",
        "description": "Learn how to write RESTful API Documentation",
        "status": "unchecked",
        "due_date": "2020-10-30"
    }
```
### 5. PATCH /todos/:id
Update data "status" pada suatu row todos berdasarkan id yang direquest 
- Rjsonequest body:
```
    {
        "status": "checked"
    }
```
- Response
```json
    {
        "id": 1,
        "title": "Phase 2: Learn REST API",
        "description": "Learn how to write RESTful API Documentation",
        "status": "checked",
        "due_date": "2020-10-30"
    }
```
### 6. PATCH /todos/:id
Delete data todos berdasarkan id yang direquest 
- Request body:
```json
    {
        "id": 1
    }
```
- Response
```json

```
