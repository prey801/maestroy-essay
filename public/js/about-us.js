
// Handle "Meet Writers" button click with fade-out effect
    document.getElementById('meetWritersBtn').addEventListener('click', function () {
        document.body.classList.add('fade-out');
            setTimeout(function () {
                window.location.href = 'writer.html';
            }, 500); // Match this to the CSS transition time
        });

        // Smooth scroll to #writers-section with offset after DOM is loaded
        document.addEventListener('DOMContentLoaded', function () {
            const hash = window.location.hash;
            if (hash === '#writers-section') {
                const target = document.getElementById('writers-section');
                if (target) {
                    // Allow browser to finish default scroll first
                    setTimeout(() => {
                        const offset = 200; // Adjust offset for fixed headers, etc.
                        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

                        window.scrollTo({
                            top,
                            behavior: 'smooth'
                        });
                    }, 50);
                }
            }
        });