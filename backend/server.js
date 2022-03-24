// Configuration file imported
require("dotenv").config({ path: "backend/.env" });
const app = require("./app");
const database = require("./mongoose_connection/database");
const cloudinary = require("cloudinary");

// Handling Uncaught Exceptions-should be wriiten at very first.
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// Database connected.
database();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`We are listening to the port `);
});

// Unhandled Promise Rejection-like in database connection Promise
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
