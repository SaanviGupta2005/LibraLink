const Wishlist = require('../models/Wishlist');

const wishlistController = {
    // Add a book to wishlist
    async addToWishlist(req, res) {
        try {
            const { bookId } = req.params;
            const userId = req.session.user.id;

            if (!userId) {
                return res.status(401).json({ message: 'Please login to add books to wishlist' });
            }

            // Check if book is already in wishlist
            const isInWishlist = await Wishlist.isInWishlist(userId, bookId);
            if (isInWishlist) {
                return res.status(400).json({ message: 'Book is already in your wishlist' });
            }

            await Wishlist.addToWishlist(userId, bookId);
            res.status(200).json({ message: 'Book added to wishlist successfully' });
        } catch (error) {
            console.error('Error adding to wishlist:', error);
            res.status(500).json({ message: 'Error adding book to wishlist' });
        }
    },

    // Remove a book from wishlist
    async removeFromWishlist(req, res) {
        try {
            const { bookId } = req.params;
            const userId = req.session.user.id;

            if (!userId) {
                return res.status(401).json({ message: 'Please login to manage your wishlist' });
            }

            await Wishlist.removeFromWishlist(userId, bookId);
            res.status(200).json({ message: 'Book removed from wishlist successfully' });
        } catch (error) {
            console.error('Error removing from wishlist:', error);
            res.status(500).json({ message: 'Error removing book from wishlist' });
        }
    },

    // Get user's wishlist
    async getWishlist(req, res) {
        try {
            const userId = req.session.user.id;

            if (!userId) {
                return res.redirect('/user/userLogin');
            }

            const wishlist = await Wishlist.getUserWishlist(userId);
            res.render('user/wishlist', {
                user: req.session.user,
                wishlist: wishlist || []
            });
        } catch (error) {
            console.error('Error fetching wishlist:', error);
            res.status(500).render('error', {
                message: 'Error fetching wishlist',
                error: error
            });
        }
    }
};

module.exports = wishlistController; 