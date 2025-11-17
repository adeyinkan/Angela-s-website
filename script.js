/*=================== Toggle Icon and Navbar ===================*/
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("fa-xmark");
  navbar.classList.toggle("active");
};

/*=================== Scroll Section Active Link ===================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');
    
    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      let activeLink = document.querySelector('header nav a[href*=' + id + ']');
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });

  /* Sticky Navbar */
  let header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 100);

  /* Remove Navbar when Scroll */
  menuIcon.classList.remove('fa-xmark');
  navbar.classList.remove('active');
};

/*=================== Scroll Reveal Animation ===================*/
ScrollReveal({ 
  distance: '80px',
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

/*=================== Typed.js Effect - WORKING VERSION ===================*/
const typed = new Typed('.multiple-text', {
  strings: ["Frontend Developer", "Web Designer", "Student", "Learner"],
  typeSpeed: 70,
  backSpeed: 70,
  backDelay: 1000,
  loop: true
});

/*=================== Contact Form Functionality ===================*/
const contactForm = document.querySelector('.contact form');
const inputs = document.querySelectorAll('.contact input, .contact textarea');
const submitBtn = document.querySelector('.contact .btn');

// Form validation functions
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^[\+]?[1-9][\d]{0,15}$/;
  return re.test(phone.replace(/\s/g, ''));
}

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  
  // Remove previous error messages
  const existingError = field.parentNode.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  
  // Reset classes
  field.classList.remove('error', 'success');
  
  // Validation based on field name
  if (field.name === 'name') {
    if (value.length < 2) {
      showError(field, 'Name must be at least 2 characters');
      isValid = false;
    }
  } else if (field.type === 'email') {
    if (!validateEmail(value)) {
      showError(field, 'Please enter a valid email');
      isValid = false;
    }
  } else if (field.type === 'tel') {
    if (!validatePhone(value)) {
      showError(field, 'Please enter a valid phone number');
      isValid = false;
    }
  } else if (field.name === 'subject') {
    if (value.length < 3) {
      showError(field, 'Subject must be at least 3 characters');
      isValid = false;
    }
  } else if (field.tagName === 'TEXTAREA') {
    if (value.length < 10) {
      showError(field, 'Message must be at least 10 characters');
      isValid = false;
    }
  }
  
  if (value === '') {
    showError(field, 'This field is required');
    isValid = false;
  }
  
  if (isValid) {
    field.classList.add('success');
  }
  
  return isValid;
}

function showError(field, message) {
  field.classList.add('error');
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  field.parentNode.appendChild(errorDiv);
}

function showSuccess(message) {
  const existingSuccess = document.querySelector('.success-message');
  if (existingSuccess) {
    existingSuccess.remove();
  }
  
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.textContent = message;
  contactForm.appendChild(successDiv);
  
  setTimeout(() => {
    if (successDiv && successDiv.parentNode) {
      successDiv.remove();
    }
  }, 5000);
}

// Real-time validation
if (inputs && inputs.length > 0) {
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateField(input);
    });
    
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input);
      }
    });
  });
}

// Form submission
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    let allValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) {
        allValid = false;
      }
    });
    
    if (!allValid) {
      return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    const originalText = submitBtn.value;
    submitBtn.value = 'Sending...';
    
    // Simulate successful submission
    setTimeout(() => {
      showSuccess('Thank you! Your message has been sent successfully.');
      contactForm.reset();
      inputs.forEach(input => {
        input.classList.remove('success', 'error');
      });
      
      submitBtn.classList.remove('loading');
      submitBtn.value = originalText;
    }, 2000);
  });
}

/*=================== Smooth Scrolling for Navigation ===================*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
