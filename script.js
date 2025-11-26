
// Typewriter Effect
const typewriterTexts = [
  "Full Stack Developer",
  "Game Designer",
  "IoT Enthusiast",
  "Problem Solver",
  "Creative Thinker"
];
let currentTextIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterTimeout;

function typeWriterEffect() {
  const typewriterElement = document.getElementById('typewriter');
  if (!typewriterElement) return;

  const currentText = typewriterTexts[currentTextIndex];
  
  if (isDeleting) {
    typewriterElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    typewriterTimeout = setTimeout(typeWriterEffect, 1500);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    currentTextIndex = (currentTextIndex + 1) % typewriterTexts.length;
    typewriterTimeout = setTimeout(typeWriterEffect, 500);
  } else {
    const speed = isDeleting ? 75 : 150;
    typewriterTimeout = setTimeout(typeWriterEffect, speed);
  }
}

// Initialize Typewriter Effect
document.addEventListener('DOMContentLoaded', () => {
  typeWriterEffect();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update URL without jumping
            if (history.pushState) {
                history.pushState(null, null, targetId);
            } else {
                location.hash = targetId;
            }
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
});
// Mobile menu toggle with animation
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      const navLinks = document.querySelector('.nav-links');
      const isOpen = navLinks.style.display === 'flex';
      
      if (isOpen) {
        navLinks.style.animation = 'slideOut 0.3s forwards';
        setTimeout(() => {
          navLinks.style.display = 'none';
        }, 300);
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.animation = 'slideIn 0.3s forwards';
      }
    });
  }
});

// Add animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);

// Card tilt effect
const cards = document.querySelectorAll('.card-hover');
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const angleX = (y - centerY) / 20;
    const angleY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });
});
