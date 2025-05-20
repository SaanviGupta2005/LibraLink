# BookStore Web Application

A full-featured online bookstore web application that allows users to browse, purchase, and manage their book collections. Built with Node.js, Express, and MySQL.

## Features

### User Features
- 📚 Book Catalog with Categories and Search
- 👤 User Authentication (Email & Google OAuth)
- 🛒 Shopping Cart System
- 💳 Secure Payment Processing with Stripe
- ❤️ Wishlist Management
- 📧 Order Confirmation Emails
- 📱 Responsive Design
- 🔍 Advanced Book Filtering
- 👥 User Profile Management
- 📦 Order History Tracking
- 📖 Google Books Integration
  - Online Book Reading
  - Book Previews
  - Download Options
  - Book Details & Reviews

### Admin Features
- 👨‍💼 Admin Dashboard
- 📊 Book Inventory Management
- 📈 Sales Analytics
- 👥 User Management
- 📦 Order Management
- 📝 Book CRUD Operations

## Tech Stack

- **Frontend:**
  - HTML5, CSS3, JavaScript
  - Bootstrap 5
  - EJS Templating
  - Stripe.js for Payments

- **Backend:**
  - Node.js
  - Express.js
  - MySQL Database
  - Passport.js for Authentication

- **APIs & Services:**
  - Google OAuth 2.0
  - Stripe Payment Gateway
  - Nodemailer for Email

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn
- Google Cloud Platform account (for OAuth)
- Stripe account (for payments)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/SaanviGupta2005/bookstore.git
cd bookstore
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=bookstore

# JWT Configuration
JWT_SECRET=your_jwt_secret_key

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Stripe Configuration
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# Email Configuration (for Nodemailer)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_app_password

# Session Configuration
SESSION_SECRET=your_session_secret
```

4. Set up the database:
   - Create a MySQL database named `bookstore`
   - Import the `bookstore.sql` file:
   ```bash
   mysql -u your_username -p bookstore < bookstore.sql
   ```

5. Configure Google OAuth:
   - Go to Google Cloud Console
   - Create a new project
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs:
     - `http://localhost:5001/auth/google/callback`
     - `http://your-domain.com/auth/google/callback`

6. Configure Stripe:
   - Create a Stripe account
   - Get your API keys from the Stripe Dashboard
   - Add them to your `.env` file

7. Start the application:
```bash
npm start
```

The application will be available at `http://localhost:5001`

## Default Credentials

### Admin
- Username: admin
- Password: admin

### Test User
- Email: yash@gmail.com
- Password: yash

## API Endpoints

### Authentication
- `POST /user/register` - User registration
- `POST /user/userLogin` - User login
- `GET /auth/google` - Google OAuth login
- `GET /auth/google/callback` - Google OAuth callback
- `GET /auth/logout` - User logout

### Books
- `GET /user/books` - Get all books
- `GET /user/books/:id` - Get book details
- `GET /user/books/category/:category` - Get books by category
- `GET /user/books/search` - Search books

### Cart
- `POST /user/cart/add` - Add to cart
- `PUT /user/cart/update` - Update cart
- `DELETE /user/cart/remove` - Remove from cart
- `GET /user/cart` - View cart

### Orders
- `POST /user/pay` - Process payment
- `GET /user/orders` - View orders
- `GET /user/success` - Payment success

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Security Features

- JWT Authentication
- Password Hashing with bcrypt
- Secure Session Management
- HTTPS Support
- Input Validation
- XSS Protection
- CSRF Protection
- Rate Limiting

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email your.email@example.com or create an issue in the repository. 