import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config()


const app = express();

// Connect to Database

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

// Routes

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Server Error!");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

