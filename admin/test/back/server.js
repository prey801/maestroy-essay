const express = require('express');
const Stripe = require('stripe');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const stripe = Stripe('sk_test_51RTRDMCu5thqDS6BM7oXDWclhxp0D0nEY8kZWvVga7mJFVF9clPbB1HwXIvXzzlMu2zTP3CG1NFy0KE6Ob346OO200bzaa00Vq');

app.use(cors());
app.use(bodyParser.json());

app.post('/charge', async (req, res) => {
  const { payment_method_id } = req.body;

  try {
  const paymentIntent = await stripe.paymentIntents.create({
  amount: 1000,
  currency: 'usd',
  payment_method: payment_method_id,
  confirmation_method: 'manual',
  confirm: true,
  automatic_payment_methods: {
    enabled: true,
    allow_redirects: 'never'
  
      }
    });

    if (paymentIntent.status === 'succeeded') {
      res.send({ success: true });
    } else {
      res.send({
        success: false,
        error: 'Payment requires additional action or confirmation.',
        paymentIntent,
      });
    }
  } catch (err) {
    res.status(400).send({ success: false, error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
