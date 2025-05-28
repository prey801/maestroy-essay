
        document.addEventListener('DOMContentLoaded', () => {
            // Navigation
            document.getElementById('login-btn').addEventListener('click', () => {
                window.location.href = 'redirect.html';
            });
            document.getElementById('signup-btn').addEventListener('click', () => {
                window.location.href = 'sign-up.html';
            });

            // Add animation trigger when steps are in viewport
            const steps = document.querySelectorAll('.step');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                    }
                });
            }, { threshold: 0.2 });

            steps.forEach(step => observer.observe(step));
        });
    