# Reyada CRM

A Node.js and Express REST API for managing CRM contacts, deals, leads, tasks, expenses, and analytics, integrated with Bitrix24 and MongoDB. Designed to support a website frontend built with React.

## Project Structure

```
├── app.js                 # Application entry point
├── config/
│   └── db.js             # Database configuration
├── controllers/
│   ├── authController.js      # Authentication logic
│   ├── contactController.js   # Contact management logic
│   ├── dealsController.js     # Deals management logic
│   ├── analyticsController.js # Analytics and reporting logic
│   ├── tasksController.js     # Task performance dashboard logic
│   └── expenseController.js   # Expense management logic
│   └── summaryController.js   # Main summary dashboard logic
├── models/
│   ├── Contact.js        # Contact model schema
│   ├── Deal.js           # Deal model schema
│   ├── Lead.js           # Lead model schema
│   ├── Task.js           # Task model schema
│   ├── Expense.js        # Expense model schema
│   └── User.js           # User model schema
├── routes/
│   ├── auth.js           # Authentication routes
│   ├── contacts.js       # Contact management routes
│   ├── deals.js          # Deals management routes
│   ├── analytics.js      # Analytics routes
│   ├── tasks.js          # Task dashboard routes
│   ├── expenses.js       # Expense management routes
│   └── summary.js        # Main summary dashboard routes
└── package.json          # Project dependencies
```

## System Architecture

The application follows a typical MVC (Model-View-Controller) architecture:

1. **Models**: Define data schemas using Mongoose
   - User, Contact, Deal, Lead, Task, Expense
2. **Controllers**: Handle business logic for each module
3. **Routes**: Define API endpoints for each module

## Features

- **User Authentication**
  - Register and login endpoints
  - Secure password storage

- **Contact Management**
  - Fetch contacts from Bitrix24
  - List and add contacts

- **Deal Management**
  - Fetch deals from Bitrix24
  - List deals

- **Lead Management**
  - Fetch leads from Bitrix24
  - List leads

- **Analytics Dashboard**
  - Fetch and analyze leads and deals
  - Calculate total leads, deals, won deal value, conversion rate
  - Monthly breakdowns and chart data (pie, line, bar)

- **Task Performance Dashboard**
  - Fetch tasks from Bitrix24
  - Count total, completed, overdue, pending tasks per user
  - Calculate completion and overdue percentages
  - Chart data and summary table per user

- **Expense Management Module**
  - Add, edit, delete expense records (one name and amount per record)
  - View history by date
  - View all expenses, filter by period
  - Calculate totals by day, month, year, and grand total

- **Main Summary Dashboard**
  - Combined view: total income (deals), total expenses, net profit
  - Monthly breakdowns: income, expenses, net profit
  - Chart data for bar and line charts
  - Filters: view by month/year, compare months

## API Endpoints

### POST /api/auth/register
Registers a new user.

**Request Body Example:**
```json
{
  "email": "john@example.com",
  "userName": "John Doe",
  "password": "password123"
}
```
**Responses:**
- 201 Created: User registered successfully, returns user details and token
- 400 Bad Request: Validation error or email already registered

---

### POST /api/auth/login
Authenticates a user and returns a token.

**Request Body Example:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
**Responses:**
- 200 OK: Returns user details and token
- 400 Bad Request: Invalid email or password

---

### GET /api/contacts/fetch-bitrix
Fetches contacts from Bitrix24 and saves to MongoDB.

**Request Body:** None
**Responses:**
- 201 Created: Contacts fetched and saved successfully
- 503 Service Unavailable: Failed to fetch and save contacts

---

### GET /api/contacts
Retrieves all contacts.

**Request Body:** None
**Responses:**
- 200 OK: Returns array of contacts
- 500 Internal Server Error: Failed to retrieve contacts

---

### POST /api/contacts/add
Adds a new contact.

**Request Body Example:**
```json
{
  "NAME": "John",
  "SECOND_NAME": "Michael",
  "LAST_NAME": "Smith"
}
```
**Responses:**
- 201 Created: Contact added successfully
- 500 Internal Server Error: Failed to add contact

---

### GET /api/deals/fetch-bitrix
Fetches deals from Bitrix24 and saves to MongoDB.

**Request Body:** None
**Responses:**
- 201 Created: Deals fetched and saved successfully
- 503 Service Unavailable: Failed to fetch and save deals

---

### GET /api/deals
Retrieves all deals.

**Request Body:** None
**Responses:**
- 200 OK: Returns array of deals
- 500 Internal Server Error: Failed to retrieve deals

---

### GET /api/analytics/fetch-analyze
Fetches and analyzes leads and deals for dashboard.

**Request Body:** None
**Responses:**
- 200 OK: Returns analytics data (totals, breakdowns, chart data)
- 503 Service Unavailable: Failed to fetch and analyze data

---

### GET /api/tasks/fetch-analyze
Fetches and analyzes tasks for performance dashboard.

**Request Body:** None
**Responses:**
- 200 OK: Returns task metrics and chart data
- 503 Service Unavailable: Failed to fetch and analyze tasks

---

### POST /api/expenses/add
Adds a new expense record.

**Request Body Example:**
```json
{
  "date": "2025-07-31",
  "period": "monthly",
  "name": "Rent",
  "amount": 1200
}
```
**Responses:**
- 201 Created: Expense added successfully
- 400 Bad Request: Failed to add expense

---

### PUT /api/expenses/edit/:id
Edits an expense record by ID.

**Request Body Example:**
```json
{
  "date": "2025-07-31",
  "period": "monthly",
  "name": "Utilities",
  "amount": 350
}
```
**Responses:**
- 200 OK: Expense updated successfully
- 404 Not Found: Expense not found
- 400 Bad Request: Failed to update expense

---

### DELETE /api/expenses/delete/:id
Deletes an expense record by ID.

**Request Body:** None
**Responses:**
- 200 OK: Expense deleted successfully
- 404 Not Found: Expense not found
- 400 Bad Request: Failed to delete expense

---

### GET /api/expenses/by-date?date=YYYY-MM-DD
Retrieves expenses for a specific date.

**Request Body:** None
**Responses:**
- 200 OK: Returns array of expenses for the date
- 400 Bad Request: Failed to fetch expenses

---

### GET /api/expenses
Retrieves all expenses (optionally filter by period).

**Request Body:** None
**Responses:**
- 200 OK: Returns array of expenses
- 400 Bad Request: Failed to fetch expenses

---

### GET /api/expenses/totals
Calculates expense totals by day, month, year, and grand total.

**Request Body:** None
**Responses:**
- 200 OK: Returns totals
- 400 Bad Request: Failed to calculate totals

---

### GET /api/summary/dashboard?month=YYYY-MM&year=YYYY
Returns main summary dashboard data.

**Request Body:** None
**Responses:**
- 200 OK: Returns total income, expenses, net profit, monthly breakdowns, chart data
- 503 Service Unavailable: Failed to fetch summary dashboard

---

## Technologies & Libraries Used

- express
- dotenv
- mongoose
- cors
- axios
- bcrypt
- bcryptjs
- express-async-handler
- express-session
- joi
- joi-password-complexity
- nodemon

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up `.env` file with MongoDB URI and other variables
4. Start the server: `npm start`

## Environment Variables

```
PORT=5000
MODE_ENV=development
MONGO_URI=mongodb://localhost:27017/Reyada
```

## Error Handling & Security

- All endpoints have error handling and validation
- Passwords are hashed
- CORS is restricted to allowed origins

## License

This project is proprietary and confidential.