const db = require('../config/db');

class Wishlist {
    static async addToWishlist(userId, bookId) {
        try {
            const query = 'INSERT INTO wishlists (user_id, book_id) VALUES (?, ?)';
            const result = await db.query(query, [userId, bookId]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async removeFromWishlist(userId, bookId) {
        try {
            const query = 'DELETE FROM wishlists WHERE user_id = ? AND book_id = ?';
            const result = await db.query(query, [userId, bookId]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async getUserWishlist(userId) {
        try {
            const query = `
                SELECT b.*, w.created_at as added_to_wishlist
                FROM books b
                INNER JOIN wishlists w ON b.book_id = w.book_id
                WHERE w.user_id = ?
                ORDER BY w.created_at DESC
            `;
            const [wishlist] = await db.query(query, [userId]);
            return wishlist;
        } catch (error) {
            throw error;
        }
    }

    static async isInWishlist(userId, bookId) {
        try {
            const query = 'SELECT * FROM wishlists WHERE user_id = ? AND book_id = ?';
            const [result] = await db.query(query, [userId, bookId]);
            return result.length > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Wishlist; 