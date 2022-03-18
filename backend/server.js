// Configuration file imported
require("dotenv").config({ path: "backend/.env" });

// Imported Express app
const app = require("./app");

// Database imported
const database = require("./mongoose_connection/database");

// Handling Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

database();

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`We are listening to the port `);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
