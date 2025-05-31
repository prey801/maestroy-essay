
        document.addEventListener('DOMContentLoaded', function () {
            // Payment tabs switching
            const tabs = document.querySelectorAll('.payment-tab');
            const forms = document.querySelectorAll('.payment-form');
        
            if (tabs.length && forms.length) {
                tabs.forEach(tab => {
                    tab.addEventListener('click', function () {
                        tabs.forEach(t => t.classList.remove('active'));
                        forms.forEach(f => f.classList.remove('active'));
        
                        this.classList.add('active');
                        const tabId = this.getAttribute('data-tab');
                        const targetForm = document.getElementById(`${tabId}-form`);
                        if (targetForm) targetForm.classList.add('active');
                    });
                });
            }
        
            // Saved card selection
            const savedCards = document.querySelectorAll('.saved-card');
            if (savedCards.length) {
                savedCards.forEach(card => {
                    card.addEventListener('click', function () {
                        savedCards.forEach(c => c.classList.remove('active'));
                        this.classList.add('active');
                    });
                });
            }
        
            // Payment method selection
            const paymentMethods = document.querySelectorAll('.payment-method');
            if (paymentMethods.length) {
                paymentMethods.forEach(method => {
                    method.addEventListener('click', function () {
                        paymentMethods.forEach(m => {
                            m.classList.remove('active');
                            m.style.borderColor = '#e2e8f0';
                            m.style.backgroundColor = 'white';
                        });
                        this.classList.add('active');
        
                        const primaryColor = getComputedStyle(document.documentElement)
                            .getPropertyValue('--primary')
                            .trim() || '#4A6BFF';
        
                        this.style.borderColor = primaryColor;
                        this.style.backgroundColor = 'rgba(74, 107, 255, 0.05)';
                    });
                });
            }
        
            // Payment button click
            const paymentButton = document.querySelector('.payment-button');
            if (paymentButton) {
                paymentButton.addEventListener('click', function () {
                    alert('Payment processed! Redirecting to order confirmation...');
                    window.location.href = '\order-confirmation.html';
                });
            }
        
            // Format card number input
            const cardNumber = document.getElementById('card-number');
            if (cardNumber) {
                cardNumber.addEventListener('input', function () {
                    let value = this.value.replace(/\s+/g, '');
                    const matches = value.match(/.{1,4}/g);
                    this.value = matches ? matches.join(' ') : value;
                });
            }
        
            // Format expiry date input
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
        });
        