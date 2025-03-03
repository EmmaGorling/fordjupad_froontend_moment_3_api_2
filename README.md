# Fördjupad Frontend Moment 3 API

## Technologies & tools
- Hapi.js
- MongoDB / Mongoose
- JWT
- Bcrypt.js
- dotenv
- Joi validation

## API Endpoints
### User routes
| Method      | Endpoint | Description | Auth |
| ----------- | ----------- | ---------| ---- |
| **GET**      | /users       | Get all users | False |
| **GET**   | /users/{id}        | Get a user by id | False |
| **POST** | /users |  Create a new user | False |
| **PUT** | /users/{id} | Update a user by id | True |
| **DELETE** | /users/{id} | Delete a user by id | True |
| **POST** | /users/login | Log in and get a JWT | False |
| **GET** | /users/logout | Logout and destroy cookie | True |
| **GET** | /users/validate | Validate JWT | False |

### Blog routes
| Method      | Endpoint | Description | Atuh |
| ----------- | ----------- | ---------| ----- |
| **GET**      | /posts       | Get all posts, most recent first | False |
| **GET**   | /posts/{id}        | Get a post by id | False |
| **GET**   | /posts/recent        | Get latest 6 posts, most recent first | False |
| **POST** | /posts |  Create a new post | True |
| **PUT** | /posts/{id} | Update a post by id | True |
| **DELETE** | /posts/{id} | Delete a post by id | True |

## Models
### User Model
- **firstName** : Required string
- **lastName** : Required string
- **email** : Required string
- **password** : Required string

### Blog Model (Posts)
- **title** : Required string
- **content** : Required string
- **createdAt** : Date, default date now
- **updatedAt** : Date, sets when posts gets updated as date now
