// public/js/signup.js
const togglePasswordVisibility = (passwordInput, toggleButton) => {
  if (!passwordInput || !toggleButton) return;

  toggleButton.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    toggleButton.classList.toggle('fa-eye-slash');
  });
};

const updatePasswordStrength = (passwordInput, strengthBar) => {
  if (!passwordInput || !strengthBar) return;

  const checks = [
    {
      id: 'lengthHint',
      test: (value) => value.length >= 8,
      message: 'At least 8 characters',
    },
    {
      id: 'numberHint',
      test: (value) => /\d/.test(value),
      message: 'At least 1 number',
    },
    {
      id: 'specialHint',
      test: (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
      message: 'At least 1 special character',
    },
    {
      id: null,
      test: (value) => /[A-Z]/.test(value),
      message: null,
    },
  ];

  passwordInput.addEventListener('input', () => {
    const passwordValue = passwordInput.value;
    let strength = 0;

    checks.forEach((check) => {
      const hintElement = check.id ? document.getElementById(check.id) : null;
      if (check.test(passwordValue)) {
        strength += 25;
        if (hintElement) {
          hintElement.classList.add('valid');
          hintElement.innerHTML = `<i class="fas fa-check-circle"></i> ${check.message}`;
        }
      } else if (hintElement) {
        hintElement.classList.remove('valid');
        hintElement.innerHTML = `<i class="far fa-circle"></i> ${check.message}`;
      }
    });

    strengthBar.style.width = `${strength}%`;
    strengthBar.style.background =
      strength < 50 ? 'var(--danger)' : strength < 75 ? 'var(--warning)' : 'var(--success)';
  });
};

const checkPasswordMatch = (passwordInput, confirmPasswordInput, matchElement) => {
  if (!confirmPasswordInput || !matchElement) return;

  confirmPasswordInput.addEventListener('input', () => {
    matchElement.style.display =
      confirmPasswordInput.value && confirmPasswordInput.value !== passwordInput.value
        ? 'block'
        : 'none';
  });
};

const handleSignup = async (form) => {
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      firstName: document.getElementById('first-name')?.value.trim(),
      lastName: document.getElementById('last-name')?.value.trim(),
      email: document.getElementById('email')?.value.trim(),
      password: document.getElementById('password')?.value,
      confirmPassword: document.getElementById('confirm-password')?.value,
      termsChecked: document.getElementById('terms')?.checked,
      marketingOptIn: document.getElementById('marketing')?.checked,
    };

    if (!formData.password || !formData.confirmPassword) {
      alert('Password fields cannot be empty.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!formData.termsChecked) {
      alert('You must agree to the Terms of Service and Privacy Policy');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          marketing: formData.marketingOptIn,
          agreedToTerms: formData.termsChecked,
        }),
      });

      const data = await response.json();

      alert(data.message);
      setTimeout(() => {
        window.location.href = './student_dashboard.html';
      }, 500);
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup. Please try again.');
    }
  });
};

const handleGoogleSignup = (button) => {
  if (!button) return;

  button.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Google signup initiated');
    // Implement Google OAuth flow here (e.g., using Firebase or Passport.js)
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirm-password');
  const togglePassword = document.getElementById('togglePassword');
  const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
  const strengthBar = document.getElementById('passwordStrengthBar');
  const passwordMatch = document.getElementById('passwordMatch');
  const signupForm = document.getElementById('maestro-signup-form');
  const googleButton = document.querySelector('.btn-google');

  togglePasswordVisibility(password, togglePassword);
  togglePasswordVisibility(confirmPassword, toggleConfirmPassword);
  updatePasswordStrength(password, strengthBar);
  checkPasswordMatch(password, confirmPassword, passwordMatch);
  handleSignup(signupForm);
  handleGoogleSignup(googleButton);
});