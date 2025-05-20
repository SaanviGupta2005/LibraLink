const express = require('express');
const db = require('../config/db');
const router = express.Router();
const Book = require('../models/book');
const User = require('../models/user'); // Import User model
const AdminController = require('../controllers/adminController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const requireLogin = (req, res, next) => {
    if (req.session && req.session.username) {
        next();
    } else {
        res.redirect('/admin/adminLogin');
    }
};

router.get('/adminLogin', (req, res) => {
    res.render('admin/login');
});

router.post('/adminLogin', (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        db.query('SELECT * FROM admin WHERE username = ? AND password = ?', [username, password], function (err, results) {
            if (err) {
                console.log(err);
                res.send('Error querying the database.');
                return;
            }
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('dashboard');
            } else {
                res.send('Incorrect username and/or password!');
            }
        });
    } else {
        res.send('Please enter username and password!');
    }
});

router.get('/dashboard', requireLogin, AdminController.allUsers);

router.get('/addBook', requireLogin, (req, res) => {
    Book.viewBooks((err, books) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch books' });
        }
        res.render('admin/addBook', { books });
    });
});

router.post('/addBook', upload.single('image'), AdminController.addBook);
router.post('/updateBook/:bookId', upload.single('image'), AdminController.updateBook);

router.get('/getBookDetails/:bookId', AdminController.getBookDetails);

router.delete('/deleteBook/:bookId', AdminController.deleteBook);

router.get('/admin/logout', (req, res) => {
    console.log('Logging out:', req.session.username);
    req.session.destroy();
    console.log('Session destroyed');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.redirect('/admin/adminLogin');
});

router.get('/userOrders/:userId', requireLogin, AdminController.getUserOrders);

// Search books and render on the same addBook page
router.get('/search', requireLogin, (req, res) => {
    const searchQuery = req.query.query;
    if (!searchQuery) {
        // If no query, show all books
        Book.viewBooks((err, books) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to fetch books' });
            }
            res.render('admin/addBook', { books });
        });
    } else {
        // Search books by name, author, category, or description
        const db = require('../config/db');
        const sql = `SELECT * FROM books WHERE book_name LIKE ? OR book_author LIKE ? OR book_category LIKE ? OR book_desc LIKE ?`;
        const pattern = `%${searchQuery}%`;
        db.query(sql, [pattern, pattern, pattern, pattern], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to search books' });
            }
            res.render('admin/addBook', { books: results });
        });
    }
});

// Live search API for books
router.get('/api/searchBooks', requireLogin, (req, res) => {
    const searchQuery = req.query.query || '';
    const db = require('../config/db');
    const sql = `
        SELECT * FROM books
        WHERE book_name LIKE ? OR book_author LIKE ? OR book_category LIKE ? OR book_desc LIKE ?
    `;
    const pattern = `%${searchQuery}%`;
    db.query(sql, [pattern, pattern, pattern, pattern], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to search books' });
        }
        res.json(results);
    });
});

module.exports = router;
