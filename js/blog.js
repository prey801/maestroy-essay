        // Show the popup
function showPopup() {
    const popup = document.getElementById('subscribePopup');
    popup.classList.add('active');
}

// Hide the popup
function hidePopup() {
    const popup = document.getElementById('subscribePopup');
    popup.classList.remove('active');
    document.getElementById('subscribeForm').reset(); // Reset form on close
}

// Handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    const email = document.getElementById('emailInput').value;
    
    // Replace this with your actual subscription logic (e.g., API call)
    console.log('Subscribed with email:', email);
    alert('Thank you for subscribing!');

    // Close the popup after submission
    hidePopup();
}

// Optional: Close popup when clicking outside the popup content
document.getElementById('subscribePopup').addEventListener('click', function(event) {
    if (event.target === this) {
        hidePopup();
    }
});
