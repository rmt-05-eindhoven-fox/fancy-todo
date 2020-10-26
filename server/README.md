### API ###


### URL ###
URL 



### POST /todo


> Create new todo



_Request Header_

```
{ 
    "Content-type": "application/json"
}
```

_Request Body_

```
{ 
    "title" : "Learn REST API", 
    "description": "Learn to create RESTful API with Express and Sequelize", 
    "due_date" : "2020-01-29" 
}
```


_Response_

```
{ 
    "id" : 1,
    "title" : "Learn REST API", 
    "description": "Learn to create RESTful API with Express and Sequelize", 
    "due_date" : "2020-01-29" 
}
```


