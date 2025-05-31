
        // Search functionality
        const searchInput = document.querySelector('.search-bar input');
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const sampleCards = document.querySelectorAll('.sample-card');
            
            sampleCards.forEach(card => {
                const title = card.querySelector('.sample-title').textContent.toLowerCase();
                const description = card.querySelector('.sample-description').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });

        // Filter functionality
        const filters = document.querySelectorAll('.filter-group select');
        filters.forEach(filter => {
            filter.addEventListener('change', applyFilters);
        });

        function applyFilters() {
            const paperType = document.getElementById('paper-type').value;
            const subject = document.getElementById('subject').value;
            const academicLevel = document.getElementById('academic-level').value;
            const sortBy = document.getElementById('sort-by').value;

            const sampleCards = Array.from(document.querySelectorAll('.sample-card'));

            // Filter
            let filteredCards = sampleCards.filter(card => {
                const cardType = card.querySelector('.sample-meta span:first-child').textContent.toLowerCase();
                const cardLevel = card.querySelector('.sample-meta span:last-child').textContent.toLowerCase();
                const cardSubject = card.querySelector('.sample-category').textContent.toLowerCase();

                return (
                    (!paperType || cardType.includes(paperType)) &&
                    (!subject || cardSubject.includes(subject)) &&
                    (!academicLevel || cardLevel.includes(academicLevel))
                );
            });

            // Sort
            if (sortBy === 'newest') {
                filteredCards.sort((a, b) => b.dataset.date - a.dataset.date);
            } else if (sortBy === 'popular') {
                filteredCards.sort((a, b) => b.dataset.popularity - a.dataset.popularity);
            } else if (sortBy === 'rating') {
                filteredCards.sort((a, b) => b.dataset.rating - a.dataset.rating);
            }

            // Update grid
            const samplesGrid = document.querySelector('.samples-grid');
            samplesGrid.innerHTML = '';
            filteredCards.forEach(card => samplesGrid.appendChild(card));
        }

        // Pagination
        const paginationButtons = document.querySelectorAll('.pagination-button');
        paginationButtons.forEach(button => {
            button.addEventListener('click', function() {
                paginationButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                // Add logic to load new samples based on page number
            });
        });

        // Add sample data attributes for sorting (example)
        document.querySelectorAll('.sample-card').forEach((card, index) => {
            card.dataset.date = Date.now() - index * 86400000; // Simulate dates
            card.dataset.popularity = 100 - index * 10; // Simulate popularity
            card.dataset.rating = 5 - index * 0.5; // Simulate rating
        });
    