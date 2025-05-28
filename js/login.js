
        document.addEventListener('DOMContentLoaded', function() {
            // Password toggle functionality
            const togglePassword = document.getElementById('togglePassword');
            const password = document.getElementById('password');
            
            togglePassword.addEventListener('click', function() {
                const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
                password.setAttribute('type', type);
                this.classList.toggle('fa-eye-slash');
            });
            
            // Form submission
            const loginForm = document.getElementById('maestro-login-form');
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // In a real implementation, this would validate and submit the form
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const remember = document.getElementById('remember').checked;
                
                console.log('Login attempt with:', { email, password, remember });
                
                // Simulate successful login
                alert('Login successful! Redirecting to dashboard...');
                // window.location.href = '/dashboard';
            });
            
            // Google login button
            const googleButton = document.querySelector('.btn-google');
            googleButton.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Google login initiated');
                // In a real implementation, this would trigger Google OAuth flow
            });
        });
    