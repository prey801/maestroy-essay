
document.addEventListener("DOMContentLoaded", function () {
    const priceLinks = document.querySelectorAll('a[href="#prices"]');
  
    priceLinks.forEach(link => {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        const target = document.getElementById("prices");
        if (target) {
          const offset = 110; // pixels
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const priceLinks = document.querySelectorAll('a[href="#testimonials"]');
  
    priceLinks.forEach(link => {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        const target = document.getElementById("testimonials");
        if (target) {
          const offset = 100; // pixels
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  });
  