const User = require("../models/user");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");
const db = require("../config/db");

const userController = {
  // register
  register: function (req, res) {
    const { name, email, password, city, phone, gender } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const salt = genSaltSync(10);
    const newPassword = hashSync(password, salt);

    User.createUser(name, email, newPassword, city, phone, gender, (err, userId) => {
      if (err) {
        console.error("Registration Error:", err);  // Log the error
        return res.status(500).json({ error: "Failed to register" });
      }
      res.redirect("/user/userLogin");
    });
  },
  login: async function (req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findByEmail(email);
      if (!user) return res.status(404).json({ error: "User not found" });

      // Correct password verification
      if (compareSync(password, user.password)) {
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
        res.cookie("token", token, { httpOnly: true });
        return res.redirect("/user/index");
      } else {
        return res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },


  getBookDetails: function (req, res) {
    User.viewBooks((err, books) => {
      if (err) {
        return res.status(500).json({ error: "Failed to fetch Books" });
      }
      const cart = req.session.cart || [];
      return res.render("user/books", { books, cart, user: req.user });
    });
  },

  getBooksByPopular: function (req, res) {
    User.viewPopularBooks((err, books) => {
      if (err) {
        return res.status(500).json({ error: "Failed to fetch Books" });
      }
      return res.render("user/index", { user: req.user, books });
    });
  },

  getBookDetailsById: function (req, res) {
    const bookId = req.params.bookId;
    User.getBookDetailsById(bookId, (err, book) => {
      if (err) {
        return res.status(500).json({ error: "Failed to fetch book details" });
      }
      const { bookDetails, booksInSameCategory } = book;
      return res.render("user/book_details", { book: { bookDetails }, booksInSameCategory, user: req.user });
    });
  },

  addToCart: function (req, res) {
    const bookId = req.body.bookId;
    User.getBookDetailsById(bookId, (err, book) => {
      if (err) {
        return res.status(500).json({ error: "Failed to fetch book details" });
      }
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
      if (!req.session.cart) {
        req.session.cart = [];
      }
      const existingBookIndex = req.session.cart.findIndex(item => item.bookDetails.book_id === book.bookDetails.book_id);
      if (existingBookIndex >= 0) {
        req.session.cart[existingBookIndex].bookDetails.quantity += 1;
      } else {
        book.bookDetails.quantity = 1;
        req.session.cart.push(book);
      }
      res.json({ message: "Book added to cart successfully", cart: req.session.cart });
    });
  },

  getCart: function (req, res) {
    const cart = req.session.cart || [];
    res.render("user/cart", { cart, user: req.user });
  },

  updateCartQuantity: function (req, res) {
    const { bookId } = req.params;
    const { action } = req.body;
    const cart = req.session.cart;
    const item = cart.find(item => item.bookDetails.book_id == bookId);
    if (item) {
      if (action === "increase") {
        item.bookDetails.quantity += 1;
      } else if (action === "decrease" && item.bookDetails.quantity > 1) {
        item.bookDetails.quantity -= 1;
      }
      res.json({ success: true, cart });
    } else {
      res.json({ success: false });
    }
  },

  removeFromCart: function (req, res) {
    const { bookId } = req.params;
    const cart = req.session.cart;
    const itemIndex = cart.findIndex(item => item.bookDetails.book_id == bookId);
    if (itemIndex > -1) {
      cart.splice(itemIndex, 1);
      res.json({ success: true, cart });
    } else {
      res.json({ success: false });
    }
  },

  checkout: function (req, res) {
    const user = req.user;
    const cart = req.session.cart || [];
    res.render("user/checkout", {
      user,
      cart,
      stripePublicKey: process.env.STRIPE_PUBLIC_KEY
    });
  },

  payForm: function (req, res) {
    const { userName, userEmail, userAddress, userCity, userPostalCode } = req.body;
    req.session.cart = [];
    res.redirect('/user/success');
  },

  getFilteredBooks: function (req, res) {
    const { priceRange, category, author } = req.query;
    User.getFilteredBooks(priceRange, category, author, (err, books) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch Books' });
      }
      return res.json(books);
    });
  },

  // Get kids books
  getKidsBooks: (req, res) => {
    const query = 'SELECT * FROM books WHERE book_category = "Kids"';
    db.query(query, (err, books) => {
      if (err) {
        console.error('Error fetching kids books:', err);
        return res.status(500).send('Error fetching kids books');
      }
      res.render('user/kids', { books, user: req.user });
    });
  },

  // Search books
  searchBooks: (req, res) => {
    const searchQuery = req.query.q;
    if (!searchQuery) {
      return res.redirect('/user/books');
    }

    const query = `
      SELECT * FROM books 
      WHERE book_name LIKE ? 
      OR book_author LIKE ? 
      OR book_category LIKE ? 
      OR book_desc LIKE ?
    `;
    const searchPattern = `%${searchQuery}%`;

    db.query(query, [searchPattern, searchPattern, searchPattern, searchPattern], (err, books) => {
      if (err) {
        console.error('Error searching books:', err);
        return res.status(500).send('Error searching books');
      }
      res.render('user/books', { books, user: req.user, searchQuery });
    });
  }
};

module.exports = userController;
