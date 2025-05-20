const axios = require('axios');

// Function to search book in Google Books API
async function searchGoogleBooks(bookName, author) {
    try {
        const query = `${bookName} ${author}`;
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=1`);

        if (!response.data.items || response.data.items.length === 0) {
            return null;
        }

        const bookData = response.data.items[0];
        return {
            id: bookData.id,
            title: bookData.volumeInfo.title,
            authors: bookData.volumeInfo.authors,
            description: bookData.volumeInfo.description,
            previewLink: bookData.volumeInfo.previewLink,
            infoLink: bookData.volumeInfo.infoLink,
            imageLinks: bookData.volumeInfo.imageLinks,
            accessInfo: bookData.accessInfo,
            saleInfo: bookData.saleInfo,
            averageRating: bookData.volumeInfo.averageRating,
            ratingsCount: bookData.volumeInfo.ratingsCount,
            pageCount: bookData.volumeInfo.pageCount,
            publishedDate: bookData.volumeInfo.publishedDate,
            publisher: bookData.volumeInfo.publisher
        };
    } catch (error) {
        console.error('Error searching Google Books:', error);
        return null;
    }
}

// Function to get book preview URL
async function getBookPreview(bookName, author) {
    try {
        const bookData = await searchGoogleBooks(bookName, author);
        if (bookData) {
            const hasPreview = bookData.previewLink || bookData.accessInfo?.webReaderLink;

            return {
                isAvailable: hasPreview,
                previewUrl: bookData.previewLink,
                infoUrl: bookData.infoLink,
                webReaderLink: bookData.accessInfo?.webReaderLink || null,
                thumbnail: bookData.imageLinks?.thumbnail || null,
                description: bookData.description || null,
                previewAvailable: hasPreview,
                averageRating: bookData.averageRating || null,
                ratingsCount: bookData.ratingsCount || null,
                pageCount: bookData.pageCount || null,
                publishedDate: bookData.publishedDate || null,
                publisher: bookData.publisher || null,
                message: !hasPreview ? 'No preview available for this book' : null
            };
        }
        return {
            isAvailable: false,
            previewAvailable: false,
            message: 'Book not found in Google Books'
        };
    } catch (error) {
        console.error('Error getting book preview:', error);
        return {
            isAvailable: false,
            previewAvailable: false,
            message: 'Error fetching book preview'
        };
    }
}

module.exports = {
    getBookPreview,
    searchGoogleBooks
}; 