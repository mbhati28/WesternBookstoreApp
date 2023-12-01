const router = require('express').Router();
const Cart = require('../models/Cart');
const Order = require('../models/Order');

// Add a book to the user's cart
router.post('/cart/:userId', async (req, res) => {
    const { userId } = req.params;
    const { bookId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            // Create a new cart if not exist
            cart = new Cart({ userId, books: [{ bookId, quantity }] });
        } else {
            // Add new book to existing cart
            cart.books.push({ bookId, quantity });
        }
        const updatedCart = await cart.save();
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: "Error adding to cart", error });
    }
});

router.delete('/cart/:userId/:bookId', async (req, res) => {
    const { userId, bookId } = req.params;

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Filter out the book to be removed
        cart.books = cart.books.filter(book => book.bookId !== bookId);

        const updatedCart = await cart.save();
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: "Error removing book from cart", error });
    }
});

// Get the user's cart
router.get('/cart/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error fetching cart", error });
    }
});

// Create an order for the user
router.post('/order/:userId', async (req, res) => {
    const { userId } = req.params;
    const { products, amount, address } = req.body;

    try {
        const order = new Order({ userId, products, amount, address });
        const savedOrder = await order.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error });
    }
});

// Get all orders for a user
router.get('/orders/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
});

module.exports = router;
