import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
// import pool from "./config/db.js";
import specialtyRoutes from "./routes/specialty.js";
import { APINotFound } from "./middleware/api-not-found.js";

dotenv.config();

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

// Routes
app.get("/", (req, res) => {
  return res.send("connected successfully");
});
app.use("/api", specialtyRoutes);

// Route not exist message
app.use(APINotFound);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack, "err");
  res.status(500).send("Server Error!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
