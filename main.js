// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Typed.js effect
if (document.getElementById('typed')) {
  new Typed('#typed', {
    strings: [
      'Web Developer',
      'UI/UX Designer',
      'Computer Science Student'
    ],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 1500,
    loop: true
  });
}

// Particles.js background
if (document.getElementById('particles')) {
  particlesJS('particles', {
    particles: {
      number: { value: 60 },
      size: { value: 3 },
      move: { speed: 1 },
      line_linked: { enable: true },
      color: { value: '#ffffff' }
    },
    interactivity: {
      events: {
        onhover: { enable: true, mode: 'repulse' }
      }
    }
  });
}

// Contact form handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    for (let value of formData.values()) {
      if (!value) {
        alert('Please fill in all fields');
        return;
      }
    }

    const submitBtn = contactForm.querySelector('button');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      alert('Message sent successfully!');
      contactForm.reset();
      submitBtn.innerHTML =
        '<i class="fas fa-paper-plane"></i> Send Message';
      submitBtn.disabled = false;
    }, 2000);
  });
}

// Scroll animations
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  },
  { threshold: 0.1 }
);

document
  .querySelectorAll('.service-card, .portfolio-item, .stat-item')
  .forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = '0.6s ease';
    observer.observe(el);
  });
  // Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  // Close menu when a link is clicked (nice UX on mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });
}
