Fancy Todo Project. Simple web application to manage Your TODO List. 
This app has features such as :

* Register
* Login
* Login with Google
* Create Todo List
* Edit Todo List
* Delete Todo List
* See all Todo List sort by status

------------------

Fancy Todo Guides:

* Login - this button will direct you to our main page
* Register - this button will store your data as a user to the application
* Google Button - this button will allow you to register using your google account
* Logout - this button will log yourself out from the application
* Add Todo - this button will help you to create new Todo
* Edit - this button will help you to edit your Todo list
* Status - this button will provide the status of your Todo list
  These are the button option for the status of your Todo list
  * hasn't started
  * on progress
  * done 

Error responses

(500 - Unknown error)
{ "message": "Interval Server Error" }

---
* POST /register
> Create a new user account

{ 
  email: <email input>,
  password: <password input>
}

