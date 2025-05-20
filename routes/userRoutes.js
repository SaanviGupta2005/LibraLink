const express = require('express');
const db = require('../config/db');
const nodemailer = require('nodemailer');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');
const stripe = require('../config/stripe');
const wishlistController = require('../controllers/wishlistController');
const { isAuthenticated } = require('../middleware/auth');
const { getBookPreview } = require('../controllers/bookController');
const Book = require('../models/Book');

// User routes
router.get('/register', (req, res) => {
    res.render('user/register');
});
router.post('/register', userController.register);

router.get('/userLogin', (req, res) => {
    res.render('user/login');
});
router.post('/userLogin', userController.login);

router.get('/index', authenticateToken, userController.getBooksByPopular);

router.get('/books', authenticateToken, userController.getBookDetails);
router.get('/books/:bookId', authenticateToken, userController.getBookDetailsById);
router.post('/cart', authenticateToken, userController.addToCart);

// Kids section route
router.get('/kids', authenticateToken, userController.getKidsBooks);

// Cart routes
router.get('/cart', authenticateToken, userController.getCart);
router.post('/cart/update/:bookId', authenticateToken, userController.updateCartQuantity);
router.post('/cart/remove/:bookId', authenticateToken, userController.removeFromCart);

router.get('/checkout', authenticateToken, userController.checkout);
// router.post('/pay', authenticateToken, userController.payForm);
router.get('/filterBooks', authenticateToken, userController.getFilteredBooks);

// Add success route
router.get('/success', authenticateToken, (req, res) => {
    res.render('user/success', { user: req.user });
});

// Add orders route
router.get('/orders', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const query = 'SELECT * FROM orders WHERE user_id = ? ORDER BY order_date DESC';

        db.query(query, [userId], (err, orders) => {
            if (err) {
                console.error('Error fetching orders:', err);
                return res.status(500).json({ error: 'Failed to fetch orders' });
            }
            res.render('user/orders', { user: req.user, orders });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Search route
router.get('/search', authenticateToken, userController.searchBooks);

// Add test email route
router.get('/test-email', authenticateToken, async (req, res) => {
    try {
        console.log('Testing email configuration...');
        console.log('Email User:', process.env.EMAIL_USER);
        console.log('Email Pass exists:', !!process.env.EMAIL_PASS);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            debug: true, // Enable debug logging
            logger: true // Enable logger
        });

        // Test email configuration
        console.log('Verifying SMTP connection...');
        await transporter.verify();
        console.log('SMTP connection verified successfully');

        // Send test email
        const testMailOptions = {
            from: `"LibraLink Test" <${process.env.EMAIL_USER}>`,
            to: req.user.email,
            subject: 'Test Email from LibraLink',
            text: 'This is a test email to verify the email configuration.',
            html: '<h1>Test Email</h1><p>This is a test email to verify the email configuration.</p>'
        };

        console.log('Sending test email...');
        const info = await transporter.sendMail(testMailOptions);
        console.log('Test email sent successfully:', info.response);

        res.json({
            success: true,
            message: 'Test email sent successfully',
            info: info.response
        });
    } catch (error) {
        console.error('Test email error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send test email',
            error: {
                message: error.message,
                code: error.code,
                command: error.command,
                stack: error.stack
            }
        });
    }
});

// Add a simple test route
router.get('/test-email-config', (req, res) => {
    console.log('Testing email configuration...');
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS exists:', !!process.env.EMAIL_PASS);

    res.json({
        emailConfigured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS),
        emailUser: process.env.EMAIL_USER
    });
});

// Update the email sending function with more detailed logging
async function sendOrderConfirmationEmail(userEmail, orderDetails) {
    try {
        console.log('Starting email send process...');
        console.log('Recipient:', userEmail);
        console.log('Order Details:', orderDetails);

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            throw new Error('Email configuration is missing. Please check your .env file.');
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            debug: true,
            logger: true
        });

        console.log('Verifying SMTP connection...');
        await transporter.verify();
        console.log('SMTP connection verified successfully');

        const mailOptions = {
            from: `"LibraLink" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: 'Order Confirmation - LibraLink',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #28a745;">Order Confirmation</h2>
                    <p>Thank you for your purchase!</p>
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px;">
                        <h3>Order Details:</h3>
                        <p><strong>Order Items:</strong> ${orderDetails}</p>
                        <p><strong>Order Date:</strong> ${new Date().toLocaleString()}</p>
                    </div>
                    <p style="margin-top: 20px;">If you have any questions, please don't hesitate to contact us.</p>
                    <p>Best regards,<br>LibraLink Team</p>
                </div>
            `
        };

        console.log('Sending order confirmation email...');
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
        return true;
    } catch (error) {
        console.error('Error sending order confirmation email:', error);
        console.error('Error details:', {
            message: error.message,
            code: error.code,
            command: error.command,
            stack: error.stack
        });
        return false;
    }
}

// Update the payment route to handle email sending errors
router.post('/pay', authenticateToken, async (req, res) => {
    try {
        const {
            paymentMethodId,
            userName,
            userEmail,
            userPhone,
            userAddress,
            userCity,
            userState,
            userPostalCode,
            userCountry
        } = req.body;
        const cart = req.session.cart || [];

        if (!cart.length) {
            return res.status(400).json({ success: false, message: 'Cart is empty' });
        }

        // Validate required fields for Indian export transactions
        if (!userName || !userAddress || !userCity || !userState || !userPostalCode || !userCountry) {
            return res.status(400).json({
                success: false,
                message: 'All address fields are required for Indian export transactions'
            });
        }

        const totalAmount = cart.reduce((total, item) => total + (item.bookDetails.book_price * item.bookDetails.quantity), 0);
        const orderDetails = cart.map(item => `${item.bookDetails.book_name} (x${item.bookDetails.quantity})`).join(', ');

        // Create a payment intent with 3D Secure authentication
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(totalAmount * 100), // Convert to paise (Indian currency)
            currency: 'inr',
            payment_method: paymentMethodId,
            confirm: true,
            description: `Order for ${userName}`,
            receipt_email: userEmail,
            shipping: {
                name: userName,
                address: {
                    line1: userAddress,
                    city: userCity,
                    state: userState,
                    postal_code: userPostalCode,
                    country: userCountry
                },
                phone: userPhone
            },
            // Enable 3D Secure authentication
            setup_future_usage: 'off_session',
            payment_method_types: ['card'],
            metadata: {
                order_type: 'test_payment',
                customer_name: userName,
                customer_address: userAddress,
                customer_city: userCity,
                customer_state: userState,
                customer_country: userCountry
            },
            // Add 3D Secure configuration
            confirmation_method: 'automatic',
            capture_method: 'automatic',
            // Add additional verification requirements
            payment_method_options: {
                card: {
                    request_three_d_secure: 'any'
                }
            }
        });

        // Handle different payment intent statuses
        if (paymentIntent.status === 'requires_action' || paymentIntent.status === 'requires_source_action') {
            return res.json({
                requiresAction: true,
                paymentIntentClientSecret: paymentIntent.client_secret
            });
        } else if (paymentIntent.status === 'succeeded') {
            console.log('Payment succeeded, starting order creation...');
            // Payment succeeded, create order in database
            const orderQuery = 'INSERT INTO orders (user_id, order_details, order_quantity, order_price, order_email, order_phone, payment_intent_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
            const userId = req.user.id;
            const totalQuantity = cart.reduce((total, item) => total + item.bookDetails.quantity, 0);

            console.log('Order creation parameters:', {
                userId,
                orderDetails,
                totalQuantity,
                totalAmount,
                userEmail,
                userPhone,
                paymentIntentId: paymentIntent.id
            });

            db.query(orderQuery, [userId, orderDetails, totalQuantity, totalAmount, userEmail, userPhone, paymentIntent.id],
                function (err, result) {
                    if (err) {
                        console.error('Order Insertion Error:', err);
                        return res.status(500).json({ success: false, message: 'Failed to process order' });
                    }

                    console.log('Order created successfully:', result);

                    // Update book quantities
                    let updatePromises = cart.map(item => {
                        return new Promise((resolve, reject) => {
                            const updateQuery = 'UPDATE books SET book_quantity = book_quantity - ? WHERE book_id = ?';
                            db.query(updateQuery, [item.bookDetails.quantity, item.bookDetails.book_id], (updateErr, updateResult) => {
                                if (updateErr) {
                                    console.error('Book Quantity Update Error:', updateErr);
                                    reject(updateErr);
                                } else {
                                    console.log(`Book quantity updated for book_id ${item.bookDetails.book_id}:`, updateResult);
                                    resolve(updateResult);
                                }
                            });
                        });
                    });

                    // Wait for all book quantity updates to complete
                    Promise.all(updatePromises)
                        .then(() => {
                            console.log('All book quantities updated successfully');

                            // Send confirmation email
                            return sendOrderConfirmationEmail(userEmail, orderDetails);
                        })
                        .then(emailSent => {
                            console.log('Email sending result:', emailSent);

                            // Clear cart
                            req.session.cart = [];
                            console.log('Cart cleared');

                            res.json({
                                success: true,
                                message: 'Payment processed successfully',
                                emailSent: emailSent
                            });
                        })
                        .catch(error => {
                            console.error('Error in post-order processing:', error);
                            // Still return success since order was created
                            res.json({
                                success: true,
                                message: 'Payment processed successfully, but some post-processing failed',
                                error: error.message
                            });
                        });
                }
            );
        } else {
            res.status(400).json({
                success: false,
                message: `Payment failed: ${paymentIntent.status}`,
                error: paymentIntent.last_payment_error?.message || 'Unknown error'
            });
        }
    } catch (error) {
        console.error('Payment Error:', error);
        res.status(500).json({
            success: false,
            message: error.message,
            type: error.type
        });
    }
});

// Add clear-cart route
router.post('/clear-cart', authenticateToken, (req, res) => {
    try {
        req.session.cart = [];
        res.json({ success: true, message: 'Cart cleared successfully' });
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({ success: false, message: 'Failed to clear cart' });
    }
});

// Mock database
const users = [];
const otps = {};

router.post('/send-otp', (req, res) => {

    const { phoneNumber, email } = req.body;
    console.log(phoneNumber, email);
    const otp = Math.floor(100000 + Math.random() * 900000);
    otps[phoneNumber] = otp;

    // For demo purposes, we'll just log the OTP
    console.log(`OTP for ${phoneNumber}: ${otp}`);
    res.json({ success: true });

    // In a real application, you would send the OTP via SMS or email
    // Here is an example of sending via email:

    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: process.env.EMAIL_USER,
    //         pass: process.env.EMAIL_PASS
    //     },
    //     port: 587,
    //     secure: false
    // });

    // const mailOptions = {
    //     from: process.env.EMAIL_USER,
    //     to: email,
    //     subject: 'Your OTP Code',
    //     text: `Your OTP code is ${otp}`
    // };

    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         console.log(error);
    //         res.json({ success: false });
    //     } else {
    //         console.log('Email sent: ' + info.response);
    //         res.json({ success: true });
    //     }
    // });

});

// Wishlist routes
router.get('/wishlist', isAuthenticated, wishlistController.getWishlist);
router.post('/wishlist/add/:bookId', isAuthenticated, wishlistController.addToWishlist);
router.delete('/wishlist/remove/:bookId', isAuthenticated, wishlistController.removeFromWishlist);

// Update the book preview route
router.get('/book-preview/:id', authenticateToken, async (req, res) => {
    try {
        const bookId = req.params.id;
        const query = 'SELECT * FROM books WHERE book_id = ?';

        db.query(query, [bookId], async (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error' });
            }

            if (!results || results.length === 0) {
                return res.status(404).json({ error: 'Book not found' });
            }

            const book = results[0];
            const previewInfo = await getBookPreview(book.book_name, book.book_author);
            res.json(previewInfo);
        });
    } catch (error) {
        console.error('Error getting book preview:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
