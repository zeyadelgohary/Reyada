const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require('cors');

dotenv.config();

const app = express();

app.use(express.json());
const allowedOrigins = [
  'http://localhost:3000',
  'https://beb93f1cd3f8.ngrok-free.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
// Connect to MongoDB
connectDB();

app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
