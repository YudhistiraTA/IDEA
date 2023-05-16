# Movie API Documentation

## Endpoints :

List of available endpoints:

- `POST /products/add`
- `GET /categories`
- `GET /products/:id`
- `GET /products`
- `DELETE /products/:id`

&nbsp;

## 1. POST /products/add

Request:

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

## 2. GET /categories

Description:
- Get all categories from database

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

## 3. GET /products/:id

Description:
- Get single product by ID from database

Request:

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

&nbsp;

## 4.GET /products

Description:
- Get all products from database

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
                "id": 1,
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

## 4. DELETE /products/:id

Description:
- Delete product by id

Request:

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

_Response (404 - Not Found)_

```json
{
  "message": "Product with ID <id> not found"
}
```

&nbsp;

## Global Error


_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```