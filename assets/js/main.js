/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}
/*==================== Global VIEW COUNTER ====================*/


// Step 1: Config
const firebaseConfig = {
    apiKey: "AIzaSyBLMhX11s_ltjUHyghmF5Rh8Bkv7a0_yhE",
    authDomain: "rabi-portfolio.firebaseapp.com",
    databaseURL: "https://rabi-portfolio-default-rtdb.firebaseio.com",
    projectId: "rabi-portfolio",
    storageBucket: "rabi-portfolio.appspot.com",
    messagingSenderId: "249024862444",
    appId: "1:249024862444:web:3795c8f3eb7335f7ff2dc9",
    measurementId: "G-P50TJC3P2G"
  };
  
  // Step 2: Initialize
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database(); // ✅ make sure this is before the viewCounter logic
  
  const viewCounter = document.getElementById('view-count');

  if (viewCounter) {
    const viewsRef = database.ref('pageViews');
  
    viewsRef.transaction(current => {
      return (current || 0) + 1;
    });
  
    viewsRef.on('value', snapshot => {
      viewCounter.textContent = snapshot.val();
    });
  }
  


/*==================== Fetching Blogs from firebase ====================*/
    // 1. Connect to Firestore
const db = firebase.firestore();

// 2. Setup Swiper first
var swiper = new Swiper(".mySwiperBlog", {
   
    slidesPerView: 'auto',
    spaceBetween: 16,
    centeredSlides: true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  

// 3. Target blog list
const blogList = document.getElementById('blog-list');

// 4. Fetch blogs and inject
db.collection('blogs').orderBy('timestamp', 'desc').get()
  .then((querySnapshot) => {
    let blogCards = '';  // collect all cards first
    querySnapshot.forEach((doc) => {
      const blog = doc.data();
      blogCards += `
        <div class="swiper-slide">
          <div class="blog-card">
            <img src="${blog.image || '/assets/img/default-blog.jpg'}" alt="Blog Image" class="blog-card-img">
            <div class="blog-card-body">
              <h3 class="blog-card-title">${blog.title}</h3>
              <p class="blog-card-description">${blog.description}</p>
            </div>
          </div>
        </div>
      `;
    });
    blogList.innerHTML = blogCards;   // inject at once ✅
    swiper.update();                  // update swiper after DOM ready ✅
  })
  .catch((error) => {
    console.error("Error fetching blogs: ", error);
  });


/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
    skillsHeader = document.querySelectorAll('.skills__header');

function toggleSkills() {
    let itemClass = this.parentNode.className;

    for (let i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = 'skills__content skills__close';
    }
    if (itemClass === 'skills__content skills__close') {
        this.parentNode.className = 'skills__content skills__open';
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills);
});

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services__modal'),
    modalBtns = document.querySelectorAll('.services__button'),
    modalCloses = document.querySelectorAll('.services__modal-close');

let modal = function (modalClick) {
    modalViews[modalClick].classList.add('active-modal');
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modal(i);
    });
});

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal');
        });
    });
});


/*==================== PORTFOLIO SWIPER  ====================*/
document.addEventListener('DOMContentLoaded', function() {
    const portfolioSwiper = document.querySelector('.portfolio__container.swiper-container .swiper-wrapper');
    
    if (portfolioSwiper) {
        new Swiper('.portfolio__container.swiper-container', {
            cssMode: true,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    } else {
        console.warn('Portfolio Swiper not initialized because elements are missing.');
    }
});



/*==================== TESTIMONIAL ====================*/
let swiperTestimonial = new Swiper('.testimonial__container', {
    loop: true,
    grabCursor: true,
    spaceBetween: 48,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    breakpoints: {
        568: {
            slidesPerView: 2,
        }
    }
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        const link = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);
        if (link) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
    const nav = document.getElementById('header');
    if (this.scrollY >= 80) nav.classList.add('scroll-header');
    else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    if (this.scrollY >= 560) scrollUp.classList.add('show-scroll');
    else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';

// Get previously selected theme (if any)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// Function to get current theme and icon
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';

// Apply user's previous theme choice OR default to dark theme
if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme);
} else {
    // Default to dark theme if no preference exists
    document.body.classList.add(darkTheme);
    themeButton.classList.add(iconTheme);
    localStorage.setItem('selected-theme', 'dark');
    localStorage.setItem('selected-icon', 'uil-moon');
}

// Theme toggle button event
themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});
