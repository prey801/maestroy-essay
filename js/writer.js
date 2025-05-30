
        // Sample writer data (in a real application, this would come from a backend)
        const writers = [
            {
                name: "Jane Doe",
                specialty: "Literature Expert",
                rating: 4.8,
                reviews: 120,
                status: "available",
                orders: 250,
                satisfaction: 98,
                experience: 5,
                bio: "Jane is a seasoned writer with a passion for literature and academic writing. She specializes in crafting compelling essays and research papers.",
                skills: ["Essay Writing", "Literary Analysis", "Research", "Proofreading"],
                price: 25,
                subject: "literature"
            },
            {
                name: "John Smith",
                specialty: "History Specialist",
                rating: 5.0,
                reviews: 85,
                status: "busy",
                orders: 180,
                satisfaction: 95,
                experience: 3,
                bio: "John excels in historical research and writing, delivering insightful essays with meticulous attention to detail.",
                skills: ["Historical Analysis", "Research Papers", "Editing"],
                price: 30,
                subject: "history"
            }
            // Add more writers as needed
        ];

        // Function to render writers
        function renderWriters(filteredWriters) {
            const writersGrid = document.getElementById('writersGrid');
            writersGrid.innerHTML = '';
            filteredWriters.forEach(writer => {
                const writerCard = `
                    <div class="writer-card">
                        <div class="writer-header">
                            <div class="writer-avatar">
                                <img src="https://via.placeholder.com/100" alt="Writer Avatar">
                            </div>
                            <div class="writer-info">
                                <h3 class="writer-name">${writer.name}</h3>
                                <span class="writer-specialty">${writer.specialty}</span>
                                <div class="writer-rating">
                                    <div class="writer-rating-stars">
                                        ${Array(Math.floor(writer.rating)).fill('<i class="fas fa-star"></i>').join('')}
                                        ${writer.rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                                    </div>
                                    <span class="writer-rating-text">${writer.rating} (${writer.reviews} reviews)</span>
                                </div>
                                <span class="writer-status ${writer.status}">${writer.status.charAt(0).toUpperCase() + writer.status.slice(1)}</span>
                            </div>
                        </div>
                        <div class="writer-body">
                            <div class="writer-stats">
                                <div class="stat-item">
                                    <div class="stat-value">${writer.orders}+</div>
                                    <div class="stat-label">Orders Completed</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-value">${writer.satisfaction}%</div>
                                    <div class="stat-label">Satisfaction Rate</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-value">${writer.experience} yrs</div>
                                    <div class="stat-label">Experience</div>
                                </div>
                            </div>
                            <p class="writer-bio">${writer.bio}</p>
                            <div class="writer-skills">
                                ${writer.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                            </div>
                            <div class="writer-footer">
                                <span class="writer-price">$${writer.price}/hr</span>
                                <a href="#" class="writer-hire">Hire Now</a>
                            </div>
                        </div>
                    </div>
                `;
                writersGrid.innerHTML += writerCard;
            });
        }

        // Filter function
        function filterWriters() {
            const searchInput = document.getElementById('searchInput').value.toLowerCase();
            const subjectFilter = document.getElementById('subject').value;
            const ratingFilter = document.getElementById('rating').value;
            const availabilityFilter = document.getElementById('availability').value;
            const priceFilter = document.getElementById('price').value;

            const filteredWriters = writers.filter(writer => {
                const matchesSearch = writer.name.toLowerCase().includes(searchInput) || writer.specialty.toLowerCase().includes(searchInput);
                const matchesSubject = !subjectFilter || writer.subject === subjectFilter;
                const matchesRating = !ratingFilter || writer.rating >= parseFloat(ratingFilter);
                const matchesAvailability = !availabilityFilter || writer.status === availabilityFilter;
                const matchesPrice = !priceFilter || (
                    priceFilter === "10-20" && writer.price >= 10 && writer.price <= 20 ||
                    priceFilter === "20-30" && writer.price > 20 && writer.price <= 30 ||
                    priceFilter === "30+" && writer.price > 30
                );
                //almost done
                //usikuwe mchinja laliza this part
                return matchesSearch && matchesSubject && matchesRating && matchesAvailability && matchesPrice;
            });

            renderWriters(filteredWriters);
        }

        // Event listeners for filters
        document.getElementById('searchInput').addEventListener('input', filterWriters);
        document.getElementById('subject').addEventListener('change', filterWriters);
        document.getElementById('rating').addEventListener('change', filterWriters);
        document.getElementById('availability').addEventListener('change', filterWriters);
        document.getElementById('price').addEventListener('change', filterWriters);

        // Initial render
        renderWriters(writers);
        // js/scroll-offset.js
document.addEventListener("DOMContentLoaded", function () {
    const hash = window.location.hash;
    if (hash === "#writers-section") {
      const target = document.getElementById("writers-section");
      if (target) {
        // Use setTimeout to allow the browser to finish the default scroll first
        setTimeout(() => {
          const offset = 85; // adjust offset for fixed headers etc.
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
  
          window.scrollTo({
            top,
            behavior: "smooth"
          });
        }, 300);
      }
    }
});

    