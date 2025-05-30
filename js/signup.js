
        document.addEventListener('DOMContentLoaded', function() {
            // Password toggle functionality
            const togglePassword = document.getElementById('togglePassword');
            const password = document.getElementById('password');
            const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
            const confirmPassword = document.getElementById('confirm-password');
    
            if (togglePassword && password) {
                togglePassword.addEventListener('click', function() {
                    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
                    password.setAttribute('type', type);
                    this.classList.toggle('fa-eye-slash');
                });
            }
    
            if (toggleConfirmPassword && confirmPassword) {
                toggleConfirmPassword.addEventListener('click', function() {
                    const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
                    confirmPassword.setAttribute('type', type);
                    this.classList.toggle('fa-eye-slash');
                });
            }
    
            // Password strength checker
            if (password) {
                password.addEventListener('input', function() {
                    const strengthBar = document.getElementById('passwordStrengthBar');
                    const passwordValue = this.value;
                    let strength = 0;
    
                    // Length check
                    const lengthHint = document.getElementById('lengthHint');
                    if (lengthHint) {
                        if (passwordValue.length >= 8) {
                            strength += 25;
                            lengthHint.classList.add('valid');
                            lengthHint.innerHTML = '<i class="fas fa-check-circle"></i> At least 8 characters';
                        } else {
                            lengthHint.classList.remove('valid');
                            lengthHint.innerHTML = '<i class="far fa-circle"></i> At least 8 characters';
                        }
                    }
    
                    // Number check
                    const numberHint = document.getElementById('numberHint');
                    if (numberHint) {
                        if (/\d/.test(passwordValue)) {
                            strength += 25;
                            numberHint.classList.add('valid');
                            numberHint.innerHTML = '<i class="fas fa-check-circle"></i> At least 1 number';
                        } else {
                            numberHint.classList.remove('valid');
                            numberHint.innerHTML = '<i class="far fa-circle"></i> At least 1 number';
                        }
                    }
    
                    // Special character check
                    const specialHint = document.getElementById('specialHint');
                    if (specialHint) {
                        if (/[!@#$%^&*(),.?":{}|<>]/.test(passwordValue)) {
                            strength += 25;
                            specialHint.classList.add('valid');
                            specialHint.innerHTML = '<i class="fas fa-check-circle"></i> At least 1 special character';
                        } else {
                            specialHint.classList.remove('valid');
                            specialHint.innerHTML = '<i class="far fa-circle"></i> At least 1 special character';
                        }
                    }
    
                    // Uppercase letter check
                    if (/[A-Z]/.test(passwordValue)) {
                        strength += 25;
                    }
    
                    // Update strength bar
                    if (strengthBar) {
                        strengthBar.style.width = strength + '%';
    
                        if (strength < 50) {
                            strengthBar.style.background = 'var(--danger)';
                        } else if (strength < 75) {
                            strengthBar.style.background = 'var(--warning)';
                        } else {
                            strengthBar.style.background = 'var(--success)';
                        }
                    }
                });
            }
    
            // Password match checker
            if (confirmPassword) {
                confirmPassword.addEventListener('input', function() {
                    const passwordMatch = document.getElementById('passwordMatch');
                    if (passwordMatch) {
                        if (this.value !== password.value && this.value.length > 0) {
                            passwordMatch.style.display = 'block';
                        } else {
                            passwordMatch.style.display = 'none';
                        }
                    }
                });
            }
    
            // Form submission
            const signupForm = document.getElementById('maestro-signup-form');
            if (signupForm) {
                signupForm.addEventListener('submit', function(e) {
                    e.preventDefault();
    
                    const firstName = document.getElementById('first-name')?.value.trim();
                    const lastName = document.getElementById('last-name')?.value.trim();
                    const email = document.getElementById('email')?.value.trim();
                    const passwordVal = password?.value;
                    const confirmPasswordVal = confirmPassword?.value;
                    const termsChecked = document.getElementById('terms')?.checked;
    
                    if (!passwordVal || !confirmPasswordVal) {
                        alert('Password fields cannot be empty.');
                        return;
                    }
    
                    if (passwordVal !== confirmPasswordVal) {
                        alert('Passwords do not match!');
                        return;
                    }
    
                    if (!termsChecked) {
                        alert('You must agree to the Terms of Service and Privacy Policy');
                        return;
                    }
    
                    console.log('Signup form submitted:', {
                        firstName,
                        lastName,
                        email,
                        password: passwordVal,
                        termsAccepted: termsChecked,
                        marketingOptIn: document.getElementById('marketing')?.checked
                    });
    
                    alert('Account created successfully! Redirecting to dashboard...');
                    // window.location.href = '/dashboard';
                });
            }
    
            // Google signup button
            const googleButton = document.querySelector('.btn-google');
            if (googleButton) {
                googleButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('Google signup initiated');
                    // Trigger Google OAuth flow here
                });
            }
        });
    