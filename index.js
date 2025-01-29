// Ensure the DOM is fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', () => {
  // Navbar Toggle Functionality
  const toggleButton = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (toggleButton && navLinks) {
    toggleButton.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Scroll to Top Button Functionality
  const scrollBtn = document.getElementById('scrollBtn');

  if (scrollBtn) {
    // Show or hide the button based on scroll position
    const toggleScrollBtnVisibility = () => {
      if (window.scrollY > 20) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', toggleScrollBtnVisibility);

    // Scroll smoothly to the top when the button is clicked
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  // Carousel Functionality
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach((carousel) => {
    const items = carousel.querySelectorAll('.carousel-item');
    const nextButton = carousel.querySelector('.next');
    const prevButton = carousel.querySelector('.prev');
    let currentIndex = 0;
    let carouselInterval;

    if (items.length === 0) return; // Exit if no carousel items

    const updateCarousel = () => {
      items.forEach((item, index) => {
        item.classList.toggle('active', index === currentIndex);
      });
    };

    const showNextItem = () => {
      currentIndex = (currentIndex + 1) % items.length;
      updateCarousel();
    };

    const showPrevItem = () => {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      updateCarousel();
    };

    // Event listeners for next and previous buttons
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        showNextItem();
        resetCarouselInterval();
      });
    }

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        showPrevItem();
        resetCarouselInterval();
      });
    }

    // Automatic carousel sliding
    const startCarouselInterval = () => {
      carouselInterval = setInterval(showNextItem, 5000); // Change slide every 5 seconds
    };

    const resetCarouselInterval = () => {
      clearInterval(carouselInterval);
      startCarouselInterval();
    };

    updateCarousel();
    startCarouselInterval();
  });

  // Image Hover Effect for Carousel Items
  const carouselImages = document.querySelectorAll('.carousel-item img');

  carouselImages.forEach((img) => {
    img.addEventListener('mouseenter', () => {
      img.style.filter = 'brightness(1.2)';
      img.style.transition = 'filter 0.3s ease';
    });

    img.addEventListener('mouseleave', () => {
      img.style.filter = 'brightness(1)';
      img.style.transition = 'filter 0.3s ease';
    });
  });

  // Rotating Banner Images
  const bannerImages = ['wq1.jpeg', 'wq2.jpeg', 'wq4.jpeg', 'WOOL.jpeg'];
  let bannerCurrentIndex = 0;
  const bannerImageElement = document.getElementById('x-banner-img');

  if (bannerImageElement) {
    const changeBannerImage = () => {
      bannerCurrentIndex = (bannerCurrentIndex + 1) % bannerImages.length;
      bannerImageElement.src = bannerImages[bannerCurrentIndex];
    };

    // Change the banner image every 1.5 seconds
    const bannerInterval = setInterval(changeBannerImage, 1500);

    // Optional: Pause banner rotation on hover
    bannerImageElement.addEventListener('mouseenter', () => {
      clearInterval(bannerInterval);
    });

    bannerImageElement.addEventListener('mouseleave', () => {
      setInterval(changeBannerImage, 1500);
    });
  }
});


var timl = gsap.timeline()
timl.from(".logo", {
  y: -0.5,
  opacity: 0,
  delay: 1,
  duration: 1,
  stagger: 0.5
})
timl.from(".auth-buttons", {
  y: -20,
  opacity: 0,
  duration: 1,
})
timl.from(".nav-links li",{
  y:-30,
  opacity:0,
  duration:1,
  stagger:0.5
})
timl.from(".banner-content",{
  scale:0.2,
  opacity:0,
  duration:1
})