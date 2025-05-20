function viewBook(bookId) {
    window.location.href = `/user/books/${bookId}`;
}

function showMessage(message, type) {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    // Set icon based on type
    const icon = type === 'success' ? '✓' : '✕';

    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <div class="toast-content">
            <p class="toast-message">${message}</p>
        </div>
        <button class="toast-close">&times;</button>
    `;

    // Add to container
    toastContainer.appendChild(toast);

    // Show toast with animation
    setTimeout(() => toast.classList.add('show'), 100);

    // Add click handler for close button
    const closeButton = toast.querySelector('.toast-close');
    closeButton.addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    });

    // Auto remove after 3 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }
    }, 3000);
}

function addToCart(bookId, bookName) {
    fetch('/user/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bookId: bookId })
    })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                showMessage(`${bookName} added to cart`, 'success');
            }
            updateCartDisplay(data.cart);
        })
        .catch(error => console.error('Error:', error));
}

function updateQuantity(bookId, bookName, action) {
    fetch(`/user/cart/update/${bookId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: action })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showMessage(`Cart updated for ${bookName}`, 'success');
                updateCartDisplay(data.cart);
            }
        })
        .catch(error => console.error('Error:', error));
}

function removeFromCart(bookId) {
    fetch(`/user/cart/remove/${bookId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showMessage('Book removed from cart successfully', 'success');
                updateCartDisplay(data.cart);
            }
        })
        .catch(error => console.error('Error:', error));
}

function updateCartDisplay(cart) {
    const cartElement = document.getElementById('cart');
    if (cartElement) {
        if (!cart || cart.length === 0) {
            cartElement.innerHTML = `
                <div class="text-center py-5">
                    <i class="bi bi-cart4" style="font-size: 3rem; color: #adb5bd;"></i>
                    <h3 class="text-muted mt-3">Your cart is empty</h3>
                    <p class="text-muted">Add some books to your cart to continue shopping</p>
                    <a href="/user/books" class="btn btn-primary mt-3">
                        <i class="bi bi-book me-2"></i>Browse Books
                    </a>
                </div>
            `;
            return;
        }
        let totalAmount = 0;
        let cartHTML = `
            <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                    <thead class="bg-light" style="background: #f5f7fa;">
                        <tr>
                            <th style="width: 120px">Image</th>
                            <th>Book</th>
                            <th>Author</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        cart.forEach(item => {
            let bookPrice = parseFloat(item.bookDetails.book_price);
            if (isNaN(bookPrice)) {
                console.error('Invalid price for item:', item.bookDetails);
                bookPrice = 0;
            }
            let itemTotal = bookPrice * item.bookDetails.quantity;
            totalAmount += itemTotal;
            cartHTML += `
                <tr>
                    <td><img src="/img/${item.bookDetails.book_img}" alt="${item.bookDetails.book_name}" class="img-fluid rounded shadow-sm" style="width: 100px; height: 150px; object-fit: cover;"></td>
                    <td><h5 class="mb-1">${item.bookDetails.book_name}</h5></td>
                    <td>${item.bookDetails.book_author}</td>
                    <td>₹${bookPrice.toFixed(2)}</td>
                    <td>
                        <div class="d-flex align-items-center gap-2 justify-content-center">
                            <button class="btn btn-light border rounded-circle p-0 d-flex align-items-center justify-content-center quantity-btn" style="width: 36px; height: 36px; font-size: 1.2rem;" type="button" onclick="updateQuantity('${item.bookDetails.book_id}', '${item.bookDetails.book_name}', 'decrease')">
                                <i class="bi bi-dash"></i>
                            </button>
                            <input type="text" class="form-control text-center bg-white border-0" value="${item.bookDetails.quantity}" readonly style="width: 40px; font-size: 1.1rem;">
                            <button class="btn btn-light border rounded-circle p-0 d-flex align-items-center justify-content-center quantity-btn" style="width: 36px; height: 36px; font-size: 1.2rem;" type="button" onclick="updateQuantity('${item.bookDetails.book_id}', '${item.bookDetails.book_name}', 'increase')">
                                <i class="bi bi-plus"></i>
                            </button>
                        </div>
                    </td>
                    <td><h5 class="mb-0">₹${itemTotal.toFixed(2)}</h5></td>
                    <td>
                        <button class="btn btn-danger rounded-circle d-flex align-items-center justify-content-center remove-btn" style="width: 36px; height: 36px; font-size: 1.2rem;" type="button" onclick="removeFromCart('${item.bookDetails.book_id}')" title="Remove from cart">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        cartHTML += `
                    </tbody>
                </table>
            </div>
            <div class="card mt-4 border-0 shadow-sm">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-6">
                            <h4 class="mb-0">Total Amount: <span class="text-primary">₹${totalAmount.toFixed(2)}</span></h4>
                        </div>
                        <div class="col-md-6 text-md-end mt-3 mt-md-0">
                            <button class="btn btn-primary btn-lg px-4" onclick="proceedToPay()">
                                <i class="bi bi-credit-card-2-front me-2"></i>Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cartElement.innerHTML = cartHTML;
    }
}

function proceedToPay() {
    window.location.href = '/user/checkout';
}