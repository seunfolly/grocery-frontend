# INTRODUCTION
This documentation describes how to use the Ecommerce Restful API, enabling the retrieval and manipulation of data.The API follows standard protocols for authorization and response data types to ensure secure and consistent communication between the frontend and backend.

## 1. User Endpoints: 
The user endpoints are responsible for managing user accounts, including creation, retrieval, update, and deletion. Some endpoints are publicly accessible, while others require authentication and authorization. Regular users have limited access to certain endpoints, while admin users have full access to all endpoints and resources in the application.
### 1.1 Signup
* HTTP Method: POST
* URL: api/user/register
* Description: Register a new user.
* Access: Public
* Content-Type: multipart/form
* Request Body:  
   * firstName(string,required):  The user’s first name.
   * lastName(string,required):  The user’s last name.
   * email(string,required):  The user’s email address.
   * phone(string,required):  The user’s phone number.
    * password(string,required): The user’s desired password
    * dob(string in ISO format, optional): The user's date of birth in ISO format (e.g., "YYYY-MM-DD").
    * image(file,optional): The user’s profile picture
* Responses Body:  
    * A JSON object containing information about the logged in user.
    * token: A JSON Web Token (JWT) that can be used to authenticate the user for future requests.
* Error Responses: 
    * 400(Bad Request): The request body is missing one or more required fields or contains invalid data.
    * 409(Conflict): A user with the provided email already exists.
    * 500(Internal Error): An unexpected error occurred on the server.

### 1.2 Login
* HTTP Method: POST
* URL: api/user/login
* Description: Authenticate a registered user.
* Access: Public
* Content-Type: application/json
* Request Body:  
    * email or phone (string,required):  The email or phone number associated with the user account.
    * password(string,required): The user’s  password.
* Responses Body:  
    * A JSON object containing information about the logged in user.
    * token: A JSON Web Token (JWT) that can be used to authenticate the user for future requests.
* Error Responses: 
    * 400(Bad Request): The request body is missing one or more required fields or contains invalid data.
    * 401(Unauthorized): The user credentials are invalid.
    * 500(Internal Error): An unexpected error occurred on the server.

### 1.3 Forgot Password
* HTTP Method: POST
* URL: api/user/forgot-password
* Description: This endpoint allows users to initiate the forgot password process by providing their registered email address.
* Access: Public
* Content-Type: application/json
* Request Body:  
    * email(string,required):  The email address associated with a user's account.
* Responses Body:  If the email address is valid and associated with a user account, the API will return a 200 OK response code with a message indicating that an email has been sent to the user's email address with instructions for resetting their password.
* Error Responses: 
    * 400(Bad Request): The request body contains invalid data.
    * 404(Not found): The provided email address is not associated with any user account.
    * 500(Internal Error): An unexpected error occurred on the server.


### 1.4 Reset Password
* HTTP Method: PUT
* URL: api/user/reset-password/:token
* Description: This endpoint allows users to reset their password.
* Access: Public
* Content-Type: application/json
* Path Parameter:
    * token(string,required): The reset password token sent to the user's email address.
* Request Body:  
    * password(string,required): The user's new password.
* Responses Body:  
    * If the password reset is successful, the API will return a 200 OK response code with a message indicating that the password has been reset.
* Error Responses: 
    * 400(Bad Request): The request body contains invalid data.
    * 404(Not found): The provided token is not valid.
    * 500(Internal Error): An unexpected error occurred on the server.

### 1.5 Read User Profile
* HTTP Method: GET
* URL: api/user
* Description: This endpoint  returns information about the logged in user.
* Access: Private/Admin
* Request Header: 
    * Authorization(string): The JWT access token obtained after a successful login. Must be set to Bearer <token>.
* Responses Body:  
    * When the authentication is successful, the API will respond with a 200 OK status code and return a JSON object containing details about the logged in user.
* Error Responses: 
    * 401(Unauthorized): The user is not authenticated or the provided access token is invalid.
    * 500(Internal Error): An unexpected error occurred on the server.

### 1.6 Update  User Profile
* HTTP Method: PUT
* URL: api/user
* Description: This endpoint allows logged in users to update their profile.
* Access: Private/Admin
* Request Header: 
    * Authorization(string): The JWT access token obtained after a successful login. Must be set to Bearer <token>.
* Content-type: multipart/form
* Request Body:  
    * firstName(string,optional):  The user’s first name.
    * lastName(string,optional):  The user’s last name.
    * email(string,optional):  The user’s email address.
    * phone(string,optional):  The user’s phone number.
    * dob(string in ISO format, optional): The user's date of birth in ISO format (e.g., "YYYY-MM-DD").
    * image(file,optional): The user’s profile picture
* Responses Body:  
    * If the update is successful, the API will return a 200 response code with a JSON object that contains the updated user's information
* Error Responses: 
    * 400(Bad Request): The request body is missing one or more required fields or contains invalid data.
    * 401(Unauthorized): The user is not authenticated or the provided access token is invalid.
    * 500(Internal Error): An unexpected error occurred on the server.

### 1.7 Read All Users
* HTTP Method: GET
* URL: api/user/get-users
* Description: This endpoint returns a list of all users in the database. Only the admin can access this endpoint.
* Access: Admin
* Request Header: 
    * Authorization(string): The JWT access token obtained after a successful login. Must be set to Bearer <token>.
* Responses Body:  
    * If a user with the admin role makes a successful request to this endpoint, the API will respond with a 200 OK status code and return a JSON object that includes a list of all users in the database.
* Error Responses: 
    * 401(Unauthorized): The user is not authorized/authenticated to access this endpoint.
    * 403(Forbidden): The user does not have the admin role.
    * 500(Internal Error): An unexpected error occurred on the server.

### 1.8 Read A User by ID
* HTTP Method: GET
* URL: api/user/:id
* Description: This endpoint returns information about a user with the specified id. Only authenticated users with the role of admin can access this endpoint.
* Access: Admin
* Request Header: 
    * Authorization(string): The JWT access token obtained after a successful login. Must be set to Bearer <token>.
* Path Parameter: 
    * id(string,required): The ID of the user to retrieve.
* Responses Body:  
    * If the request is successful, the API will return a 200 OK response code with a JSON object that contains information about the user.
* Error Responses: 
    * 401(Unauthorized): The user is not authorized/authenticated to access this endpoint.
    * 403(Forbidden): The user does not have the admin role.
    * 404(Not Found): The user with the specified id  does not exist in the database.
    * 500(Internal Error): An unexpected error occurred on the server.

### 1.9 Delete User by ID
* HTTP Method: DELETE
* URL: api/user/:id
* Description: This endpoint deletes a user with the specified id. Only authenticated users with the role of admin can access this endpoint.
* Access: Admin
* Request Header: 
    * Authorization(string): The JWT access token obtained after a successful login. Must be set to Bearer <token>.
* Path Parameter: 
    * id(string): The ID of the user to be deleted.
* Responses Body:  
    * If the request is successful, the API will return a 204 code with a JSON object that contains information about the user that was deleted.
* Error Responses: 
    * 401(Unauthorized): The user is not authorized/authenticated to access this endpoint.
    * 403(Forbidden): The user does not have the admin role.
    * 404(Not Found): The user with the specified id  does not exist in the database.
    * 500(Internal Error): An unexpected error occurred on the server.

### 1.10 Update User by ID
* HTTP Method: PUT
* URL: api/admin/user/:id
* Description: This endpoint updates a user with the specified id. Only authenticated users with the role of admin can access this endpoint.
* Access: Admin
* Request Header: 
    * Authorization(string): The JWT access token obtained after a successful login. Must be set to Bearer <token>.
    * Content-type: multipart/form
* Path Parameter: 
    * id(string): The ID of the user to be updated.
* Request Body:  
    * firstName(string,optional):  The user’s first name.
    * lastName(string,optional):  The user’s last name.
    * email(string,optional):  The user’s email address.
    * phone(string,optional):  The user’s phone number.
    * dob(string in ISO format, optional): The user's date of birth in ISO format (e.g., "YYYY-MM-DD").
    * image(file,optional): The user’s profile picture
* Response Body:  
    * If the request is successful, the API will return a 204 code with a JSON object that contains information about the user that was updated.
* Error Responses: 
    * 400(Bad Request): The request body is missing one or more required fields or contains invalid data.
    * 401(Unauthorized): The user is not authorized/authenticated to access this endpoint.
    * 403(Forbidden): The user does not have the admin role.
    * 404(Not Found): The user with the specified id  does not exist in the database.
    * 500(Internal Error): An unexpected error occurred on the server.

## 2. Category Endpoints: 
The category endpoints provide functionalities for creating, reading, updating, and deleting categories in the database.Each category can have a parent category, and sub-categories can be nested beneath a parent category. However, certain operations such as creating, updating, and deleting of categories can only be performed by authenticated users with admin roles.
### 2.1 Create Category
* HTTP Method: POST
* URL: api/category
* Description: This endpoint is used to add a new category to the database, Only authenticated users with the role of admin can access this endpoint.
* Access: Admin
* Request Header: 
    * Authorization(string): The JWT access token obtained after a successful login. Must be set to Bearer <token>.
    * Content-type: multipart/form
* Request Body:  
    * name(string,required):  The  name of category.
    * parentId(string,optional):  The ID of the parent category, if any.
    * isFeatured(boolean,optional):  Indicating whether the category is featured or not. If not specified, defaults to false.
    * image(file,optional): The user’s profile picture
* Responses Body:  
    * If the request is successful, the API will return a 201  response code with a JSON object that contains the details of the new category.
* Error Responses: 
    * 400(Bad Request): The request body is missing one or more required fields or contains invalid data.
    * 401(Unauthorized): The user is not authorized/authenticated to access this endpoint.
    * 403(Forbidden): The user does not have the admin role.
    * 404(Not Found):  The parent category ID is invalid.
    * 500(Internal Error): An unexpected error occurred on the server.

### 2.2 Read all Categories
* HTTP Method: GET
* URL: api/category
* Description: This endpoint returns a list of all categories in the database.
* Access: Public
* Query Parameter: 
    * level(string,required): The level of the categories to retrieve.
* Responses Body:  
    * The API will respond with a 200 OK status code and return a JSON object that includes a list of all categories in the database..
* Error Responses: 
    * 500(Internal Error): An unexpected error occurred on the server.

### 2.3 Read Category by ID
* HTTP Method: GET
* URL: api/category/:categoryId
* Description: This endpoint returns  a category with the specified id in the database.
* Access: Public
* Path Parameter: 
    * categoryId(string,required): The ID of the category to retrieve.
* Responses Body:  
    * The API will respond with a 200 OK status code and return a JSON object representing the category with the specified ID in the database.
* Error Responses:
    * 500(Internal Error): An unexpected error occurred on the server.

### 2.4 Update Category by ID
* HTTP Method: PUT
* URL: api/category/:categoryId
* Description: This endpoint updates a category with the specified id. Only users with the role of admin can access this endpoint.
* Access: Admin
* Request Header: 
* Authorization(string): The JWT access token obtained after a successful login. Must be set to Bearer <token>.
* Content-type: multipart/form
* Path Parameter: 
    * categoryId(string): The id of the category to update.
* Request Body:  
    * name(string,required):  The  name of category.
    * parentId(string,optional):  The ID of the parent category, if any.
    * isFeatured(boolean,optional):  Indicating whether the category should be featured or not.
    * image(file,optional): The user’s profile picture
* Response Body:  
    * If the request is successful, the API will return a 204 code with a JSON object that contains information about the category that was updated.
* Error Responses: 
    * 400(Bad Request): The request body is missing one or more required fields or contains invalid data.
    * 401(Unauthorized): The user is not authorized/authenticated to access this endpoint.
    * 403(Forbidden): The user does not have the admin role.
    * 404(Not Found): The category with the specified id  does not exist in the database.
    * 500(Internal Error): An unexpected error occurred on the server.

### 2.5 Delete Category by ID
* HTTP Method: DELETE
* URL: api/category/:categoryId
* Description: This endpoint deletes a category with the specified id. Only users with the role of admin can access this endpoint.
* Access: Admin
* Request Header: 
    * Authorization(string): The JWT access token obtained after a successful login. Must be set to Bearer <token>.
* Path Parameter: 
    * categoryId(string): The ID of the category to delete.
* Responses Body:  
    * If the request is successful, the API will return a 204 code with a JSON object that contains information about the category that was deleted.
* Error Responses: 
    * 401(Unauthorized): The user is not authorized/authenticated to access this endpoint.
    * 403(Forbidden): The user does not have the admin role.
    * 404(Not Found): The category with the specified id  does not exist in the database.
    * 500(Internal Error): An unexpected error occurred on the server.

## 3. Brand Endpoints: 
The brand endpoints provide functionalities for creating, reading, updating, and deleting brands in the database. However, certain operations such as creating, updating, and deleting can only be performed by authenticated users with admin roles.

### 3.1 Create Brand
* HTTP Method: POST
* URL: api/brand
* Description: This endpoint is used to add a new brand to the database. Only authenticated users with the role of admin can access this endpoint.
* Access: Admin
* Request Header: 
    * Authorization(string): The JWT access token obtained after a successful login. Must be set to Bearer <token>.
    * Content-type: multipart/form
* Request Body:  
    * name(string,required):  The  name of the brand.
    * isFeatured(boolean,optional):  Indicating whether the brand is featured or not. If not specified, defaults to false.
    * image(file,optional): The brand’s image
* Responses Body:  
    * If the request is successful, the API will return a 201 code with a JSON object that contains information about the  newly created branch .
* Error Responses: 
    * 400(Bad Request): The request body is missing one or more required fields or contains invalid data.
    * 401(Unauthorized): The user is not authorized/authenticated to access this endpoint.
    * 403(Forbidden): The user does not have the admin role.
    * 500(Internal Error): An unexpected error occurred on the server.

### 3.2 Read all Brands
* HTTP Method: GET
* URL: api/brand
* Description: This endpoint returns a list of all brands in the database.
* Access: Public
* Responses Body:  
    * The API will respond with a 200 OK status code and return a JSON object that includes a list of all brands in the database
* Error Responses: 
    * 500(Internal Error): An unexpected error occurred on the server.

### 3.3 Read Brand by ID
* HTTP Method: GET
* URL: api/brand/:brandId
* Description: This endpoint returns  a brand with the specified id in the database.
* Access: Public
* Path Parameter: 
    * brandId(string,required): The ID of the brand to retrieve.
* Responses Body:  
    * The API will respond with a 200 OK status code and return a JSON object representing the brand with the specified ID in the database.
* Error Responses: 
    * 500(Internal Error): An unexpected error occurred on the server.

### 3.4 Update Brand by ID
* HTTP Method: PUT
* URL: api/brand/:brandId
* Description: This endpoint updates a brand with the specified id. Only users with the role of admin can access this endpoint.
* Access: Admin
* Request Header: 
* Authorization(string): The JWT access token obtained after a successful login. Must be set to Bearer <token>.
* Content-type: multipart/form
* Path Parameter: 
    * brandId(string): The ID of the brand to retrieve.
* Request Body:  
    * name(string,optional):  The  name of the brand.
    * isFeatured(boolean,optional):  Indicating whether the brand is featured or not. If not specified, defaults to false.
    * image(file,optional): The user’s profile picture
* Response Body:  
    * If the request is successful, the API will return a 204 code with a JSON object that contains information about the brand that was updated.
* Error Responses: 
    * 400(Bad Request): The request body is missing one or more required fields or contains invalid data.
    * 401(Unauthorized): The user is not authorized/authenticated to access this endpoint.
    * 403(Forbidden): The user does not have the admin role.
    * 404(Not Found): The brand with the specified id  does not exist in the database.
    * 500(Internal Error): An unexpected error occurred on the server.

### 3.5 Delete Brand by ID
* HTTP Method: DELETE
* URL: api/brand/:brandId
* Description: This endpoint deletes a brand with the specified id. Only users with the role of admin can access this endpoint.
* Access: Admin
* Request Header: 
* Authorization(string): The JWT access token obtained after a successful login. Must be set to Bearer <token>.
* Path Parameter: 
    * brandId(string): The ID of the brand to delete.
* Responses Body:  
    * If the request is successful, the API will return a 204 code with a JSON object that contains information about the brand that was deleted.
* Error Responses: 
    * 401(Unauthorized): The user is not authorized/authenticated to access this endpoint.
    * 403(Forbidden): The user does not have the admin role.
    * 404(Not Found): The brand with the specified id  does not exist in the database.
    * 500(Internal Error): An unexpected error occurred on the server.

## 4. Product Endpoints: 
The product endpoints provide functionalities for creating, reading, updating, and deleting products in the database. However, certain operations such as creating, updating, and deleting can only be performed by authenticated users with admin roles.

### 4.1 Create Product
* HTTP Method: POST
* URL: api/product
* Description: This endpoint is used to add a new product to the database. Only authenticated users with the * role of admin can access this endpoint.
* Access: Admin
* Request Header: 
    * Authorization(string): The JWT access token obtained after a successful login. Must be set to Bearer <token>.
    * Content-type: multipart/form
* Request Body:  
    * name(string,required):  The  name of the product.
    * description(string,required):  The description of the product.
    * isFeatured(boolean,optional):  Indicating whether the brand is featured or not. If not specified, defaults to false.
    * price(number, required): The price of the product.
    * category(string,required): the ID of the category that the product belongs to.
    * brand(string,required): the ID of the brand that the product belongs to.
    * images(array of file,optional): The product images.
* Responses Body:  
    * If the request is successful, the API will return a 201 code with a JSON object that contains information about the  newly created product.
* Error Responses: 
    * 400(Bad Request): The request body is missing one or more required fields or contains invalid data.
    * 401(Unauthorized): The user is not authorized/authenticated to access this endpoint.
    * 403(Forbidden): The user does not have the admin role.
    * 500(Internal Error): An unexpected error occurred on the server.

### 4.2 Read all Products
* HTTP Method: GET
* URL: api/product
* Description: This endpoint returns a list of all products in the database with optional filtering options.
* Access: Public
* Query Parameter:  
    * category(string,optional): filter product by category id
    * brand(string,optional): filter product by brand id
    * minPrice(number,optional): Filter products with a price greater than or equal to the specified value
    * maxPrice(number,optional): Filter products  with a price less than or equal to the specified value
    * isFeatured(string,optional): filter products that are featured
* Responses Body:  
    * The API will respond with a 200 OK status code and return a JSON object that includes a list of all products in the database
* Error Responses: 
    * 500(Internal Error): An unexpected error occurred on the server.

### 4.3 Search Product
* HTTP Method: GET
* URL: api/product/search
* Description: This endpoint returns a list of all products in the database that match the search query.
* Access: Public
* Query Parameter:  
    * query(string,required): The search query to match against product name and description.
* Responses Body:  
    * The API will respond with a 200 OK status code and return a JSON object that includes a list of all products matching the search query in the database
* Error Responses: 
    * 500(Internal Error): An unexpected error occurred on the server.
    * 422(Unprocessable Entity): The “q” parameter is missing or empty.

### 4.4 Read Product by ID
* HTTP Method: GET
* URL: api/product/:productId
* Description: This endpoint returns  a product with the specified id in the database.
* Access: Public
* Path Parameter: 
    * productId(string,required): The id of the product to retrieve.
* Responses Body:  
    * The API will respond with a 200 OK status code and return a JSON object  containing  details of the product with the specified ID in the database.
* Error Responses: 
    * 500(Internal Error): An unexpected error occurred on the server.

### 4.5 Update Product by ID
* HTTP Method: PUT
* URL: api/product/:productId
* Description: This endpoint updates a product with the specified id. Only users with the role of admin can access this endpoint.
* Access: Admin
* Request Header: 
    * Authorization(string): The JWT access token obtained after a successful login. Must be set to Bearer <token>.
    * Content-type: multipart/form
* Path Parameter: 
    * productId(string): The id of the brand to retrieve.
* Request Body:  
    * name(string,optional):  The  name of the product.
    * description(string,optional):  The description of the product.
    * isFeatured(boolean,optional):  Indicating whether the brand is featured or not. If not specified, defaults to false.
    * price(number, optional): The price of the product.
    * category(string,optional): the ID of the category that the product belongs to.
    * brand(string,optional): the ID of the brand that the product belongs to.
    * images(array of file,optional): The product images.
* Response Body:  
    * If the request is successful and the user is an admin, the API will return a 204 code with a JSON object that contains information about the product that was updated.
* Error Responses: 
    * 400(Bad Request): The request body is missing one or more required fields or contains invalid data.
    * 401(Unauthorized): The user is not authorized/authenticated to access this endpoint.
    * 403(Forbidden): The user does not have the admin role.
    * 404(Not Found): The product with the specified id  does not exist in the database.
    * 500(Internal Error): An unexpected error occurred on the server.

### 4.6 Delete Product by ID
* HTTP Method: DELETE
* URL: api/product/:productId
* Description: This endpoint deletes a product with the specified id. Only users with the role of admin can access this endpoint.
* Access: Admin
* Request Header: 
    * Authorization(string): The JWT access token obtained after a successful login. Must be set to Bearer <token>.
* Path Parameter: 
    * productId(string): The ID of the product to delete.
* Responses Body:  
    * If the request is successful and the user is an admin, the API will return a 204 code with a JSON object that contains information about the product that was deleted.
* Error Responses: 
    * 401(Unauthorized): The user is not authorized/authenticated to access this endpoint.
    * 403(Forbidden): The user does not have the admin role.
    * 404(Not Found): The brand with the specified id  does not exist in the database.
    * 500(Internal Error): An unexpected error occurred on the server.

## 5. Cart Endpoints: 
The cart endpoints allow users to add, retrieve, update, and remove items in their cart.
## 5.1 Read Cart
* HTTP Method: GET
* URL: api/cart/
* Description: This endpoint allows users to view all products in their cart.
* Access: Public
* Responses Body:  
    * If the request is successful, the API will return a 200 code with a JSON object that contains  all the products in their cart. 
* Error Responses: 
    * 401(Unauthorized): The user is not authorized/authenticated to access this endpoint.
    * 404(Not Found): The product with the specified id  does not exist in the database.
    * 500(Internal Error): An unexpected error occurred on the server.

### 5.2 Add Product to Cart
* HTTP Method: POST
* URL: api/cart/:productId
* Description: This endpoint allows users to add a product to their cart and also allows users to increase the quantity of a specified product in their cart.
* Access: Public
* Path Parameter: 
    * productId(string): The Product ID you want to add to the cart .
* Responses Body:  
    * If the request is successful, the API will return a 201 code with a JSON object that contains information about the  cart.
* Error Responses: 
    * 401(Unauthorized): The user is not authorized/authenticated to access this endpoint.
    * 404(Not Found): The product with the specified id  does not exist in the database.
    * 422(Unprocessable Entity): The “productId” parameter is missing or empty.
    * 500(Internal Error): An unexpected error occurred on the server.

### 5.3 Delete Product from Cart
* HTTP Method: DELETE
* URL: api/cart/:productId
* Description: This endpoint allows users to delete a product from their cart.
* Access: Public
* Path Parameter: 
    * productId(string): The Product ID to be deleted from the cart.
* Responses Body:  
    * If the request is successful, the API will return a 201 code with a JSON object that contains information about the  cart and products inside it .
* Error Responses: 
    * 401(Unauthorized): The user is not authorized/authenticated to access this endpoint.
    * 404(Not Found): The product with the specified id  does not exist in the database.
    * 422(Unprocessable Entity): The “productId” parameter is missing or empty.
    * 500(Internal Error): An unexpected error occurred on the server.

### 5.4 Decrease Product Quantity 
* HTTP Method: PATCH
* URL: api/cart/decrease_quantity/:productId
* Description: This endpoint allows users to reduce the quantity of a specified product in their cart.
* Access: Public
* Path Parameter: 
    * productId(string): The Product ID whose quantity should be reduced.
* Responses Body:  
    * If the request is successful, the API will return a 200 code with a JSON object that contains information about the updated cart.
* Error Responses: 
    * 401(Unauthorized): The user is not authorized/authenticated to access this endpoint.
    * 404(Not Found): The product with the specified id  does not exist in the database.
    * 422(Unprocessable Entity): The “productId” parameter is missing or empty.
    * 500(Internal Error): An unexpected error occurred on the server.



