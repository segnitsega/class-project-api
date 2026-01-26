# Class Project API

A Node.js REST API for user management and donations, built with Express, MongoDB, and JWT authentication.

## Features

- **User Authentication**: Signup and login with JWT-based authentication
- **JWT Tokens**: Access tokens (1h expiry) and refresh tokens (7d expiry)
- **Password Security**: Bcrypt hashing for password encryption
- **API Documentation**: Swagger/OpenAPI documentation
- **Validation**: Input validation using Zod schema validation
- **File Upload**: Cloudinary integration for image uploads
- **CORS**: Cross-Origin Resource Sharing enabled
- **Admin Routes**: Admin panel for management
- **Donation Requests**: Support for donation request management

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5.2.1
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Security**: Bcrypt for password hashing
- **Validation**: Zod for schema validation
- **Documentation**: Swagger/OpenAPI with swagger-jsdoc
- **File Storage**: Cloudinary
- **File Upload**: Multer
- **Development**: Nodemon for hot-reload

## Project Structure
```bash
├── index.js # Application entry point
├── package.json # Project dependencies
├── config/
│ ├── db.js # MongoDB connection
│ └── swagger.js # Swagger configuration
├── controller/
│ └── user.controller.js # User request handlers
├── middleware/
│ ├── user.validation.js # Zod validation schemas
│ └── auth.middleware.js # JWT verification
├── model/
│ └── user.model.js # User schema
├── routes/
│ ├── user.routes.js # User endpoints
│ ├── auth.route.js # Auth endpoints
│ └── admin.route.js # Admin endpoints
└── utils/
└── cloudinary.util.js # Cloudinary integration


## Installation

1. Clone the repository:
```bash
git clone https://github.com/segnitsega/class-project-api.git
cd class-project-api


2. npm install

3. Create a .env file in the root directory with the following variables:
```bash 
PORT=3000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

Running the Application
Development mode (with hot-reload):
```bash 
npm run dev


API Documentation
Visit http://localhost:3000/docs to access the interactive Swagger UI documentation.