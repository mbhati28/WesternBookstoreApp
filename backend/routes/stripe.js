// backend/routes/stripe.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51OFgAlBRD5NuqOJb6Cx8EVKq2SHCBbwWiSEcNhiic3bjJz38OfZ7LbLD8rLWAAFwMqzSRUcEW0FEV328OhqMWcpL00X1WdEjrS');
console.log('********',process.env.STRIPE_SECRET_KEY);
router.post('/checkout', async (req, res) => {
console.log("received", {req})
console.log("Received checkout request", req.body);
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: req.body.cartItems.map(item => {
                return {
                    price_data: {
                        currency: 'cad',
                        product_data: {
                            name: item.title,
                        },
                        unit_amount: item.price * 100,
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                    },
                    quantity: item.quantity
                };
            }),
            mode: 'payment',
            success_url: `${req.headers.origin}/payment/success`,
            cancel_url: `${req.headers.origin}/payment/canceled`,

        }
        );
        res.status(200).json({ url: session.url });
    } catch (err) {
          console.error('Error during checkout session creation:', err);
          res.status(err.statusCode || 500).json({ error: err.message });
        }
});

module.exports = router;
