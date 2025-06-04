const stripe = Stripe('pk_test_51RTRDMCu5thqDS6BzN4ClyL7X4oX16TL33h100DOmnxGIaS7UGJIeU67k3SWHVq3s1tTO3vjkFqApVzUe9lXmNmD00SABMjhgp');

const elements = stripe.elements();

const card = elements.create('card');
card.mount('#card-element');

const errorDiv = document.getElementById('card-errors');
card.on('change', (event) => {
  if (event.error) {
    errorDiv.textContent = event.error.message;
  } else {
    errorDiv.textContent = '';
  }
});

const form = document.getElementById('payment-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const {token, error} = await stripe.createToken(card);

  if (error) {
    errorDiv.textContent = error.message;
  } else {
    errorDiv.textContent = '';

    alert('Token created! Token ID: ' + token.id);

  }
});
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const {token, error} = await stripe.createToken(card);

  if (error) {
    errorDiv.textContent = error.message;
  } else {
    errorDiv.textContent = '';

    const response = await fetch('http://localhost:5000/charge', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ token: token.id })
    });

    const result = await response.json();

    if (result.success) {
      alert('Payment successful!');
    } else {
      alert('Payment failed: ' + result.error);
    }
  }
});
