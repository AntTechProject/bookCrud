import express from "express";
import { Book } from "../models/bookMode.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({ message: "All fields are required" });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).send({ message: "Book created successfully", book });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({ count: books.length, data: books });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("//:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.put("//:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .send({ message: "Make sure to add all the fields" });
    }
    const result = await Book.findByIdAndUpdate(req.params.id, req.body);
    if (!result) {
      res.status(404).send({ message: "Book not found" });
    }
    return res
      .status(200)
      .send({ message: "Book updated Succesfully ", result });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Failed to update book" });
  }
});

router.delete("//:id", async (req, res) => {
  try {
    const result = await Book.findByIdAndDelete(req.params.id);
    return res.status(200).send({ message: "Book deleted", result });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Error deleting the Book" });
  }
});

export default router;
