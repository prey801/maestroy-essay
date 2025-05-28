
        // Simple calculator functionality
        document.addEventListener('DOMContentLoaded', function() {
            const paperType = document.getElementById('paper-type');
            const academicLevel = document.getElementById('academic-level');
            const pages = document.getElementById('pages');
            const urgency = document.getElementById('urgency');
            const priceElement = document.querySelector('.price');
            
            // Base prices
            const basePrices = {
                'high-school': 10,
                'college': 12,
                'undergrad': 15,
                'masters': 20,
                'phd': 25
            };
            
            // Urgency multipliers
            const urgencyMultipliers = {
                '14': 1,
                '7': 1.2,
                '3': 1.5,
                '1': 2,
                '0.5': 2.5
            };
            
            // Calculate price
            function calculatePrice() {
                const level = academicLevel.value;
                const pageCount = parseInt(pages.value);
                const urgencyValue = urgency.value;
                
                let basePrice = basePrices[level];
                let multiplier = urgencyMultipliers[urgencyValue];
                
                // Adjust for paper type (simplified)
                if (paperType.value === 'research') basePrice += 2;
                if (paperType.value === 'thesis') basePrice += 5;
                if (paperType.value === 'dissertation') basePrice += 8;
                
                const total = (basePrice * pageCount * multiplier).toFixed(2);
                priceElement.textContent = `$${total}`;
                
                // Update deadline text
                document.querySelector('.deadline strong').textContent = 
                    urgencyValue === '0.5' ? '12 hours' : 
                    urgencyValue === '1' ? '24 hours' : 
                    `${urgencyValue} days`;
            }
            
            // Add event listeners
            paperType.addEventListener('change', calculatePrice);
            academicLevel.addEventListener('change', calculatePrice);
            pages.addEventListener('change', calculatePrice);
            urgency.addEventListener('change', calculatePrice);
            
            // Initial calculation
            calculatePrice();
            
            // Simple step animation for calculator
            const steps = document.querySelectorAll('.step');
            document.querySelector('.calculator-form').addEventListener('submit', function(e) {
                e.preventDefault();
                
                // In a real implementation, this would submit the form
                // For demo, we'll just animate the steps
                steps.forEach(step => {
                    if (step.classList.contains('active')) {
                        step.classList.remove('active');
                        step.classList.add('completed');
                        const next = step.nextElementSibling;
                        if (next) next.classList.add('active');
                    }
                });
                
                // Reset after step 3 for demo purposes
                if (steps[2].classList.contains('completed')) {
                    setTimeout(() => {
                        steps.forEach(step => {
                            step.classList.remove('completed', 'active');
                        });
                        steps[0].classList.add('active');
                    }, 2000);
                }
            });
        });
 
  function scrollToPrices(event) {
    event.preventDefault();
    const element = document.getElementById("prices");
    const offset = 110;
    const topPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: topPosition, behavior: 'smooth' });
  }
  const testimonials = document.querySelectorAll('.testimonial');
  const dotsContainer = document.getElementById('testimonial-dots');
  let currentIndex = 0;
  let intervalId;

  // Create dots
  testimonials.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => showTestimonial(i));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  function showTestimonial(index) {
    testimonials[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    currentIndex = index;
    resetInterval();
  }

  function nextTestimonial() {
    let nextIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(nextIndex);
  }

  function resetInterval() {
    clearInterval(intervalId);
    intervalId = setInterval(nextTestimonial, 3000);
  }

  intervalId = setInterval(nextTestimonial, 3000); // start automatic cycling
  
