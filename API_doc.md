# Branded Things API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `GET /categories`
- `GET /products`
- `GET /products/:id`
- `POST /products/add`
- `DELETE /products/:id`

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
    "email": "string",
    "role": "string"
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

## 3. GET /categories

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

## 4.GET /products

Description:
- Get all products from database

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
    ]
}
```

&nbsp;

## 5. GET /products/:id

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

## 6. POST /products/add

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

## 7. DELETE /products/:id

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
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```