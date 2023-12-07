const express = require('express');
const router = express.Router();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
console.log('********',process.env.STRIPE_SECRET_KEY);
router.post('/checkout', async (req, res) => {
console.log("received", {req})
console.log("Received checkout request", req.body);
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: req.body.cartItems.map(item => {

                const roundedPrice = (item.saleInfo.listPrice.amount * 100).toFixed(0);
                return {
                    price_data: {
                        currency: 'cad',
                        product_data: {
                            name: item.volumeInfo.title,
                        },
                        unit_amount: Number(roundedPrice),
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                    },
                    quantity: item.quantity
                };
            }),

            mode: 'payment',
            success_url: `http://localhost:5173/payment/success`,
            cancel_url: `http://localhost:5173/payment/canceled`,

        }
        );
        res.status(200).json({ url: session.url });
    } catch (err) {
          console.error('Error during checkout session creation:', err);
          res.status(err.statusCode || 500).json({ error: err.message });
        }
});

module.exports = router;
