const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');
const router = express.Router();

// Google OAuth login route
router.get('/google',
    (req, res, next) => {
        console.log('Initiating Google OAuth login...');
        console.log('Client ID:', process.env.GOOGLE_CLIENT_ID);
        next();
    },
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt: 'select_account'
    })
);

// Google OAuth callback route
router.get('/google/callback',
    (req, res, next) => {
        console.log('Received Google OAuth callback...');
        console.log('Query params:', req.query);
        next();
    },
    passport.authenticate('google', {
        failureRedirect: '/user/userLogin',
        failureMessage: true
    }),
    (req, res) => {
        console.log('Google authentication successful, redirecting to home...');
        console.log('User:', req.user);

        // Generate JWT token
        const token = jwt.sign({ id: req.user.id, email: req.user.email }, JWT_SECRET);

        // Set token in cookie
        res.cookie('token', token, { httpOnly: true });

        res.redirect('/user/index');
    }
);

// Logout route
router.get('/logout', (req, res) => {
    console.log('Logging out user...');
    req.logout((err) => {
        if (err) {
            console.error('Error during logout:', err);
            return res.redirect('/user/userLogin');
        }
        // Clear the token cookie
        res.clearCookie('token');
        console.log('Logout successful');
        res.redirect('/user/userLogin');
    });
});

module.exports = router;