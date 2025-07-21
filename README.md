# Reyada CRM

A Node.js and Express REST API for managing CRM contacts, integrated with Bitrix24 and MongoDB. Designed to support a website frontend built with React.

## Project Structure

```
├── app.js                 # Application entry point
├── config/
│   └── db.js             # Database configuration
├── controllers/
│   ├── authController.js  # Authentication logic
│   ├── contactController.js # Contact management logic
│   └── dealsController.js   # Deals management logic
├── models/
│   ├── Contact.js        # Contact model schema
│   ├── Deal.js           # Deal model schema
│   └── User.js           # User model schema
├── routes/
│   ├── auth.js           # Authentication routes
│   ├── contacts.js       # Contact management routes
│   └── deals.js          # Deals management routes
└── package.json          # Project dependencies
```

## System Architecture

The application follows a typical MVC (Model-View-Controller) architecture:

1. **Models**: Define data schemas using Mongoose
   - User model for authentication
   - Contact model for CRM data
   - Deal model for managing deals

2. **Controllers**: Handle business logic
   - Authentication (register, login)
   - Contact management (fetch, list, add)
   - Deals management (fetch from Bitrix24, list)

3. **Routes**: Define API endpoints
   - Authentication routes
   - Contact management routes
   - Deals management routes

## Core Components

### 1. Server Configuration (app.js)
- Express server setup with CORS support
- MongoDB connection
- Route registration
- Environment variable configuration

### 2. Database Connection (config/db.js)
- MongoDB connection using Mongoose
- Connection error handling
- Environment-based configuration

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

- **Fetch and Save Deals from Bitrix24**
  - Integrates with the Bitrix24 REST API to fetch CRM deal data
  - Filters deals by specific stage ID and selected fields
  - Stores fetched deals in MongoDB for persistent access

- **Get All Deals**
  - Provides an API endpoint to retrieve all deals stored in the database
  - Returns deal data in JSON format with essential fields like ID, title, stage, and opportunity

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

### GET /api/deals/fetch-bitrix

Fetches deal data from Bitrix24 and saves it to MongoDB.

- **Response:**
  - Status: 201 Created
  - Body:
    ```json
    {
      "message": "Deals fetched and saved successfully.",
      "total": 42
    }
    ```
  - Error Status: 503 Service Unavailable (if Bitrix24 service is unreachable)

---

### GET /api/deals

Retrieves all deals stored in MongoDB.

- **Response:**
  - Status: 200 OK
  - Body: Array of deal objects with the following structure:
    ```json
    [{
      "ID": "string",
      "TITLE": "string",
      "TYPE_ID": "string",
      "CATEGORY_ID": "string",
      "STAGE_ID": "string",
      "OPPORTUNITY": "string",
      "IS_MANUAL_OPPORTUNITY": "Y" | "N",
      "ASSIGNED_BY_ID": "string",
      "DATE_CREATE": "date"
    }]
    ```
  - Error Status: 500 Internal Server Error

---

## Technologies Used

### Core Technologies
- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling

### Security & Authentication
- **bcryptjs**: Password hashing
- **JSON Web Token (JWT)**: Authentication tokens

### Utilities & Middleware
- **Axios**: HTTP client for API requests
- **dotenv**: Environment variable management
- **cors**: Cross-Origin Resource Sharing
- **express-async-handler**: Async error handling
- **joi**: Data validation
- **joi-password-complexity**: Password validation

### Development Tools
- **nodemon**: Development server with auto-reload

## Environment Variables

The application uses the following environment variables:
```env
PORT=5000               # Application port
MODE_ENV=development    # Environment mode
MONGO_URI=mongodb://localhost:27017/Reyada  # MongoDB connection string
```

## Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/Reyada.git
cd Reyada
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
- Create a `.env` file in the root directory
- Add the required environment variables

4. **Start the development server**
```bash
npm start
```

## Error Handling

The application implements comprehensive error handling:
- Request validation errors (400)
- Authentication errors (401)
- Server errors (500)
- Database connection errors

## Security Measures

1. **Password Security**
   - Passwords are hashed using bcrypt
   - Password complexity requirements enforced

2. **CORS Configuration**
   - Restricted to specific origins:
     - localhost:3000
     - ngrok tunnel for development

3. **Input Validation**
   - All requests validated using Joi
   - Sanitized MongoDB queries

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is proprietary and confidential.

---