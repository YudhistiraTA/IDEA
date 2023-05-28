# Branded Things API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /gsign`
- `GET /history`
- `GET /categories`
- `POST /categories/add`
- `DELETE /categories/:id`
- `GET /products`
- `GET /products/:id`
- `POST /products/add`
- `PUT /products/:id`
- `PATCH /products/:id`
- `DELETE /products/delete/:id`

&nbsp;

## 1. POST /register

Description:
- Register a new ADMIN to the database

Request:

- body:

```json
{
    "email": "string",
    "password": "string"
}
```

_Response (201 - Created)_

```json
{
    "message": "Registration success",
    "id": "integer",
    "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Input failed",
    "errors": [
        "Email is required",
        "Password is required",
        ...
    ]
}
```

_Response (409 - Constraint Error)_

```json
{
    "message": "Registration failed",
    "error": "Email is already in use"
}
```

&nbsp;

## 2. POST /login

Description:
- Log in into an ADMIN account

Request:

- body:

```json
{
    "email": "string",
    "password": "string"
}
```

_Response (200 - OK)_

```json
{
    "message": "Login success",
    "access_token": "string",
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Input failed",
    "errors": [
        "Email is required",
        "Password is required",
        ...
    ]
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Invalid email or password"
}
```

&nbsp;

## 3. POST /gsign

Description:
- Log in into a STAFF account using a Google account
- Create a new STAFF account if no matching account is found in the database

Request:

- body:

```json
{
    "token": "string"
}
```

_Response (200 - OK)_

```json
{
    "message": "Login success",
    "access_token": "string",
}
```

&nbsp;

## 4. GET /history

Description:
- Get all history from database

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "requestedData": [
        {
            "id": "integer",
            "name": "string",
            "description": "string",
            "updatedBy": "integer",
            "createdAt": "date",
            "updatedAt": "date"
        },
        ...
    ]
}
```

&nbsp;

## 5. GET /categories

Description:
- Get all categories from database

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "message": "Request success",
    "requestedData": [
        {
            "id": "integer",
            "name": "string",
            "createdAt": "date",
            "updatedAt": "date"
        },
        ...
    ]
}
```

&nbsp;

## 6. POST /categories/add

Description:
- Add new category

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string",
  "description": "string",
  "price": "integer",
  "stock": "integer",
  "imgUrl": "string",
  "categoryId": "integer",
  "authorId": "integer",
}
```

_Response (201 - Created)_

```json
{
    "message": "Input success",
    "submittedData": {
        "id": "integer",
        "name": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
}
```

_Response (400 - Bad Request)_

```json
{
    "errors": [
        "Name is required"
    ]
}
```

&nbsp;

## 7. DELETE /categories/:id

Description:
- Delete category by id

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "message": "Category with ID <id> was successfully deleted",
    "deletedData": {
        "id": "integer",
        "name": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden"
}
```

_Response (409 - Database error)_

```json
{
    "message": "This category is still in use!",
}
```

&nbsp;

## 8. GET /products

Description:
- Get all products from database
- Also includes currently logged in user's role for use during app's login update process

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "message": "Request success",
    "requestedData": [
        {
            "id": "integer",
            "name": "string",
            "description": "string",
            "price": "integer",
            "stock": "integer",
            "imgUrl": "string",
            "categoryId": "integer",
            "authorId": "integer",
            "createdAt": "date",
            "updatedAt": "date",
            "User": {
                "id": "integer",
                "username": "string",
                "email": "string",
                "role": "string",
                "phoneNumber": "string",
                "address": "string",
                "createdAt": "date",
                "updatedAt": "date"
            }
        },
        ...
    ],
    "role": "string"
}
```

&nbsp;

## 8. GET /products/:id

Description:
- Get single product by ID from database

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

- Params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "message": "Request success",
    "requestedData": {
        "id": "integer",
        "name": "string",
        "description": "string",
        "price": "integer",
        "stock": "integer",
        "imgUrl": "string",
        "categoryId": "integer",
        "authorId": "integer",
        "createdAt": "date",
        "updatedAt": "date"
    }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Not found"
}
```

&nbsp;

## 8. POST /products/add

Description:
- Add new product

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string",
  "description": "string",
  "price": "integer",
  "stock": "integer",
  "imgUrl": "string",
  "categoryId": "integer",
}
```

_Response (201 - Created)_

```json
{
    "message": "Input success",
    "submittedData": {
        "id": "integer",
        "name": "string",
        "description": "string",
        "price": "integer",
        "stock": "integer",
        "imgUrl": "string",
        "categoryId": "integer",
        "authorId": "integer",
        "updatedAt": "date",
        "createdAt": "date"
    }
}
```

_Response (400 - Bad Request)_

```json
{
    "errors": [
        "Name is required",
        "Description is required",
        "Minimum price is Rp. 100,00",
        ...
    ]
}
```

&nbsp;

## 9. PUT /products/:id

Description:
- Edit product with specified ID

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "name": "string",
  "description": "string",
  "price": "integer",
  "stock": "integer",
  "imgUrl": "string",
  "categoryId": "integer",
}
```

_Response (201 - Created)_

```json
{
    "message": "Product with ID <id> updated"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Not found"
}
```

&nbsp;

## 10. PATCH /products/:id

Description:
- Edit the status of product with specified ID
- Limited only to ADMIN users

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "newStatus": "string"
}
```

_Response (201 - Created)_

```json
{
    "message": "Product status with ID <id> has been updated from <previousStatus> into <newStatus>"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Not found"
}
```

&nbsp;

## 11. DELETE /products/:id

Description:
- Delete product by id

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "message": "Product with ID <id> was successfully deleted",
    "deletedData": {
        "id": "integer",
        "name": "string",
        "description": "string",
        "price": "integer",
        "stock": "integer",
        "imgUrl": "string",
        "categoryId": "integer",
        "authorId": "integer",
        "createdAt": "date",
        "updatedAt": "date"
    }
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Not found"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
  OR
  "message": "Token expired"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```