const router = require('express').Router();
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const User = require('../models/User');


// Add a book to the user's cart
router.post('/cart/:userId', async (req, res) => {
    const { userId } = req.params;
    const { id, volumeInfo, saleInfo, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // Create a new cart if not found
            cart = new Cart({
                userId,
                items: [{ id, volumeInfo, saleInfo, quantity }]
            });
        } else {
            // Check if the book already exists in the cart
            const existingItemIndex = cart.items.findIndex(item => item.id === id.toString());

            if (existingItemIndex > -1) {
                // If the book exists, update its quantity
                cart.items[existingItemIndex].quantity += quantity;
            } else {
                // If the book doesn't exist, add it to the cart
                cart.items.push({ id, volumeInfo, saleInfo, quantity });
            }
        }

        const updatedCart = await cart.save();
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: "Error updating cart", error });
    }
});

router.delete('/cart/:userId/:itemId', async (req, res) => {
    const { userId, itemId } = req.params;

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Filter out the item to be removed
        cart.items = cart.items.filter(item => item.id.toString() !== itemId);

        const updatedCart = await cart.save();
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: "Error removing item from cart", error });
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

//delete the user's cart
router.delete('/cart/:userId', async (req, res) => {
    try {
      // Clear the user's cart
      await Cart.findOneAndUpdate({ userId: req.params.userId }, { $set: { items: [] }});
      res.status(200).json({ message: 'Cart cleared' });
    } catch (error) {
      res.status(500).json({ message: 'Error clearing cart', error });
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

// Get all users
router.get('/', async (req, res) => {
    try {
      const users = await User.find({}); // Fetch all users
      res.json(users);
    } catch (error) {
      res.status(500).send('Server Error');
    }
  });

  router.put('/update-active/:userId', async (req, res) => {
    const { userId } = req.params;
    const { isActive } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: { isActive: isActive } },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Error updating user's active status", error });
    }
  });

  router.put('/update-admin/:userId', async (req, res) => {
    const { userId } = req.params;
    const { isAdmin } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: { isAdmin: isAdmin } },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Error updating user's admin status", error });
    }
  });

module.exports = router;
