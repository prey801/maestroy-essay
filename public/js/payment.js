document.addEventListener('DOMContentLoaded', () => {
  // --- Stripe Setup ---
  const stripe = Stripe("pk_test_51RWBUZPZNlyYsEkQM9rBKqZsxj7OzWm3MU5KG4owXXqb9vRufCzfi0kvyQr7SyIAc7XK1UHDkaCnDMpE3CGjiknc002wBdfsQ5");
  const elements = stripe.elements();
  const card = elements.create("card");
  card.mount("#card-element");

  // --- Card Brand Detection ---
  const cardNumberInput = document.getElementById('card-number');
  const cardIcons = document.querySelectorAll('.card-icons i');

  if (cardNumberInput) {
    cardNumberInput.addEventListener('input', () => {
      let value = cardNumberInput.value.replace(/\s+/g, '');
      let cardType = '';

      if (/^4/.test(value)) {
        cardType = 'visa';
      } else if (/^5[1-5]/.test(value) || (/^2/.test(value) && value.length >= 4 && (parseInt(value.substring(0,4)) >= 2221 && parseInt(value.substring(0,4)) <= 2720))) {
        cardType = 'mastercard';
      } else if (/^3[47]/.test(value)) {
        cardType = 'amex';
      } else if (/^6/.test(value)) {
        cardType = 'discover';
      } else {
        cardType = '';
      }

      cardIcons.forEach(icon => icon.style.opacity = '0.3');

      if (cardType) {
        const icon = document.querySelector(`.fab.fa-cc-${cardType}`);
        if (icon) icon.style.opacity = '1';
      }
    });
  }

  // --- Format card number input ---
  if (cardNumberInput) {
    cardNumberInput.addEventListener('input', function () {
      let value = this.value.replace(/\s+/g, '');
      const matches = value.match(/.{1,4}/g);
      this.value = matches ? matches.join(' ') : value;
    });
  }
  const cardInput = document.getElementById('card-number');

cardInput.addEventListener('input', function (e) {
  // Remove all non-digit characters
  let value = e.target.value.replace(/\D/g, '');

  // Limit to 20 digits max
  value = value.substring(0, 20);

  // Add space every 4 digits
  const formattedValue = value.match(/.{1,4}/g)?.join(' ') || '';

  // Set the formatted value back to the input
  e.target.value = formattedValue;
});

  const cardExpiry = document.getElementById('card-expiry');
  if (cardExpiry) {
    cardExpiry.addEventListener('input', function () {
      let value = this.value.replace(/\D/g, '');
      if (value.length > 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
      }
      this.value = value;
    });
  }

  // --- Payment Tabs Switching ---
  const tabs = document.querySelectorAll('.payment-tab');
  const forms = document.querySelectorAll('.payment-form');

  if (tabs.length && forms.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        forms.forEach(f => f.classList.remove('active'));

        tab.classList.add('active');
        const tabId = tab.getAttribute('data-tab');
        const targetForm = document.getElementById(`${tabId}-form`);
        if (targetForm) targetForm.classList.add('active');
      });
    });
  }

  // --- Saved Card Selection ---
  const savedCards = document.querySelectorAll('.saved-card');
  if (savedCards.length) {
    savedCards.forEach(card => {
      card.addEventListener('click', () => {
        savedCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });
    });
  }

  // --- Payment Method Selection ---
  const paymentMethods = document.querySelectorAll('.payment-method');
  if (paymentMethods.length) {
    paymentMethods.forEach(method => {
      method.addEventListener('click', () => {
        paymentMethods.forEach(m => {
          m.classList.remove('active');
          m.style.borderColor = '#e2e8f0';
          m.style.backgroundColor = 'white';
        });
        method.classList.add('active');

        const primaryColor = getComputedStyle(document.documentElement)
          .getPropertyValue('--primary')
          .trim() || '#4A6BFF';

        method.style.borderColor = primaryColor;
        method.style.backgroundColor = 'rgba(74, 107, 255, 0.05)';
      });
    });
  }

  // --- Stripe Card Element Error Handling ---
  card.on("change", function (event) {
    const displayError = document.getElementById("card-errors");
    if (event.error) {
      displayError.textContent = event.error.message;
    } else {
      displayError.textContent = "";
    }
  });

  // --- Payment Button Click ---
  const paymentButton = document.getElementById("pay-button");
  if (paymentButton) {
    paymentButton.addEventListener("click", async (e) => {
      e.preventDefault();

      // Disable button to prevent multiple clicks
      paymentButton.disabled = true;

      // Create PaymentIntent on your server
      const res = await fetch("/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 8998 }) // Adjust amount accordingly
      });

      const { clientSecret } = await res.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: document.getElementById("card-name").value,
          },
        },
      });

      if (result.error) {
        document.getElementById("card-errors").textContent = result.error.message;
        paymentButton.disabled = false;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          window.location.href = "/payment-success"; // Redirect on success
        }
      }
    });
  }
});
