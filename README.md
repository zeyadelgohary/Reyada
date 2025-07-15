# Reyada CRM

A Node.js and Express REST API for managing CRM contacts, integrated with Bitrix24 and MongoDB. Designed to support a website frontend built with React.


## Features

- **User Authentication**
  - Implements user registration and login functionality.
  - Validates user credentials and handles secure password storage using bcrypt.

- **Fetch and Save Contacts from Bitrix24**
  - Integrates with the Bitrix24 REST API to fetch CRM contact data.
  - Stores fetched contacts in MongoDB for persistent access.

- **Get All Contacts**
  - Provides an API endpoint to retrieve all contacts stored in the database.
  - Returns data in JSON format suitable for frontend consumption.

- **Add New Contact**
  - Allows adding new contact records directly into the MongoDB database via a POST API endpoint.

## API Endpoints

### POST /api/auth/register

Registers a new user.

- **Request Body Example:**

    ```json
    {
      "email": "john@example.com",
      "userName": "John Doe",
      "password": "password123"
    }
    ```

- **Response:**
  - 201 OK - User Created
  - 400 Bad Request – User Already Registered
  - Body: Confirmation message and user details

---

### POST /api/auth/login

Authenticates an existing user and returns a JWT token.

- **Request Body Example:**

    ```json
    {
      "email": "john@example.com",
      "password": "password123"
    }
    ```

- **Response:**
  - 200 OK - Returns { id, name, userName, isAdmin, token }
  - 400 Bad Request – invalid email or password
  - Body: JWT token and user details

---

### GET /api/contacts/fetch-bitrix

Fetches contact data from Bitrix24 and saves it to MongoDB.

- **Response:**
  - Status: 200 OK
  - Body: JSON array of fetched contacts

---

### GET /api/contacts

Retrieves all contacts stored in MongoDB.

- **Response:**
  - Status: 200 OK
  - Body: JSON array of contacts

---

### POST api/contacts/add

Adds a new contact directly into the MongoDB database.

- **Request Body Example:**

    ```json
    {
      "NAME": "John",
      "SECOND_NAME": "Michael",
      "LAST_NAME": "Smith"
    }
    ```

- **Response:**
  - Status: 201 Created
  - Body:

    ```json
    {
      "message": "Contact added successfully."
    }
    ```

---

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Axios
- dotenv
- cors
- bcryptjs
- JSON Web Token (JWT)

---