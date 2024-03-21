import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.log("Database connection FAILED");
    console.log(err);
  });

const app = express();

app.use(express.json());//allow json as the input of the backend

app.listen(process.env.PORT, () => {
    console.log("Server is running on port ", process.env.PORT);
  });