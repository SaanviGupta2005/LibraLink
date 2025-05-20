require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

if (!process.env.STRIPE_SECRET_KEY) {
    console.error('Stripe secret key is not set in environment variables');
    process.exit(1);
}

module.exports = stripe; 