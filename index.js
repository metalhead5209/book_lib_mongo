if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const handlebars = require("express-handlebars");
const methodOverride = require("method-override");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const Book = require("./server/model/book");

const app = express();
const PORT = process.env.PORT;

const dbURL = process.env.DB_URL;

// DB CONNECTION
mongoose.connect(
  dbURL,
  () => {
    console.log("Connected to DB");
  },
  (e) => console.error("NO CONNECTION", e)
);

// TEMPLATE ENGINE
app.engine("hbs", handlebars.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(bodyParser.json());

//            *** ROUTES ***

// Book Library (index)
app.get("/", async (req, res) => {
  const book = await Book.find({}).lean();
  res.render("index", { book });
});

// New Book Modal
app.get("/new", (req, res) => {
  res.render("new");
});

// Add Book Route
app.post("/", async (req, res) => {
    const book = new Book(req.body);
    await book.save();
    res.redirect('/');
});


// Edit Book Modal
app.get('/edit/:id', async (req, res) => {;
  const book = await Book.findById(req.params.id)
  res.render('edit', { book })
})


// Edit Book Route
app.put("/edit/:id", async (req, res) => {
  const { id } = req.params
  const book = await Book.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
  await book.save();
  res.redirect('/'); 
})


// Delete Book Route
app.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    res.redirect('/');
});



// PORT
app.listen(PORT, () => {
  console.log(`On port ${PORT}`);
});
