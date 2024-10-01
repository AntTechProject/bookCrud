import express from "express";
import mongoose from "mongoose";
import colors from "colors";
import cors from "cors";
import { PORT, mongoURL } from "./conf.js";
import { Book } from "./models/bookMode.js";
import bookRoute from "./routes/booksRoute.js";

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to MERN Stack"); // Changed status code to 200
});

app.use("/books", bookRoute);

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("MongoDB connected successfully".bgMagenta.white);
    app.listen(PORT, () =>
      console.log(`Server started on port ${PORT}`.bgCyan.white)
    );
  })
  .catch((err) => {
    console.log(err);
  });
