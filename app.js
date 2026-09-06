// MOBILE MENU

const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");

if (menuBtn && navbar) {
    menuBtn.addEventListener("click", () => {
        navbar.classList.toggle("active");
    });
}


// ANIMATED COUNTERS

const counters = document.querySelectorAll(".counter");

window.addEventListener("load", () => {
    counters.forEach(counter => {

        const target = parseInt(counter.dataset.target) || 0;
        let count = 0;
        const step = Math.max(1, Math.ceil(target / 100));

        function updateCounter() {

            count += step;

            if (count >= target) {
                counter.textContent = target + "+";
                return;
            }

            counter.textContent = count;

            requestAnimationFrame(updateCounter);
        }

        updateCounter();
    });
});


// SERVICE GALLERY

// SERVICE GALLERY

const modal = document.getElementById("designModal");
const modalGallery = document.getElementById("modalGallery");
const modalTitle = document.getElementById("modalTitle");
const closeModal = document.querySelector(".close-modal");

const designs = {
    "bedroom-designs": {
        title: "Bedroom",
        images: [
            "b4.jfif",
            "b1.jfif",
            "b2.webp",
            "b3.jfif",
            "b5.webp",
            "images/bedroom5.jpg",
            "images/bedroom6.jpg",
            "images/bedroom7.jpg",
            "images/bedroom8.jpg"
        ]
    },

    "kitchen-designs": {
        title: "Kitchen",
        images: [
            "images/kitchen1.jpg",
            "images/kitchen2.jpg",
            "images/kitchen3.jpg",
            "images/kitchen4.jpg",
            "images/kitchen5.jpg",
            "images/kitchen6.jpg",
            "images/kitchen7.jpg",
            "images/kitchen8.jpg"
        ]
    },

    "living-designs": {
        title: "Living Room",
        images: [
            "images/living1.jpg",
            "images/living2.jpg",
            "images/living3.jpg",
            "images/living4.jpg",
            "images/living5.jpg",
            "images/living6.jpg",
            "images/living7.jpg",
            "images/living8.jpg"
        ]
    },

    "tv-designs": {
        title: "TV Unit",
        images: [
            "images/tv1.jpg",
            "images/tv2.jpg",
            "images/tv3.jpg",
            "images/tv4.jpg",
            "images/tv5.jpg",
            "images/tv6.jpg",
            "images/tv7.jpg",
            "images/tv8.jpg"
        ]
    },

    "wardrobe-designs": {
        title: "Wardrobe",
        images: [
            "images/wardrobe1.jpg",
            "images/wardrobe2.jpg",
            "images/wardrobe3.jpg",
            "images/wardrobe4.jpg",
            "images/wardrobe5.jpg",
            "images/wardrobe6.jpg",
            "images/wardrobe7.jpg",
            "images/wardrobe8.jpg"
        ]
    },

    "exterior-designs": {
        title: "Exterior",
        images: [
            "images/exterior1.jpg",
            "images/exterior2.jpg",
            "images/exterior3.jpg",
            "images/exterior4.jpg",
            "images/exterior5.jpg",
            "images/exterior6.jpg",
            "images/exterior7.jpg",
            "images/exterior8.jpg"
        ]
    }
};

document.querySelectorAll(".service-btn").forEach(button => {

    button.addEventListener("click", () => {

        if (!modal) return;

        modalGallery.innerHTML = "";

        const section = designs[button.dataset.target];

        if (!section) return;

        modalTitle.textContent = section.title;

        section.images.forEach((image, index) => {

            modalGallery.innerHTML += `
                <img 
                    src="${image}" 
                    alt="${section.title} ${index + 1}"
                    loading="lazy"
                >
            `;

        });

        modal.style.display = "block";
    });
});

if (closeModal && modal) {

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

}

// STYLE QUIZ

document.querySelectorAll(".quiz-btn").forEach(button => {

    button.addEventListener("click", () => {

        const result = document.getElementById("quizResult");

        if (result) {
            result.textContent =
                "Your style: " + button.dataset.style;
        }
    });
});


// QUOTE CALCULATOR

const calculateBtn = document.getElementById("calculateBtn");

if (calculateBtn) {

    calculateBtn.addEventListener("click", () => {

        const area =
            Number(document.getElementById("area").value);

        const rate =
            Number(document.getElementById("package").value);

        const bedrooms =
            Number(document.getElementById("bedrooms").value) * 50000;

        const kitchens =
            Number(document.getElementById("kitchens").value) * 100000;

        const living =
            Number(document.getElementById("living").value) * 40000;

        const wardrobes =
            Number(document.getElementById("wardrobes").value) * 25000;

        const tvUnits =
            Number(document.getElementById("tvUnits").value) * 30000;

        const total =
            area * rate +
            bedrooms +
            kitchens +
            living +
            wardrobes +
            tvUnits;

        document.getElementById("totalCost").textContent =
            "₹" + total.toLocaleString("en-IN");
    });
}


// MEETING

const meetingBtn = document.getElementById("meetingBtn");

if (meetingBtn) {

    meetingBtn.addEventListener("click", () => {

        alert("Meeting request submitted.");
    });
}


// CONTACT FORM

const scriptURL =
    "https://script.google.com/macros/s/AKfycbxZOcFMR-E0szRcRDxwRb0yVDthwnqeEbiQIYAnx9FgAalNGCBy0HyJnkjl5SU-SMpW/exec";

const contactForm =
    document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const submitBtn =
            contactForm.querySelector(
                "button[type='submit']"
            );

        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        const formData =
            new FormData(contactForm);

        fetch(scriptURL, {
            method: "POST",
            body: formData,
            mode: "no-cors"
        })

        .then(() => {

            alert("Message sent successfully!");

            contactForm.reset();

            submitBtn.disabled = false;
            submitBtn.textContent = "Submit";
        })

        .catch(() => {

            alert("Submission failed.");

            submitBtn.disabled = false;
            submitBtn.textContent = "Submit";
        });
    });
}


// DARK MODE

const darkModeBtn =
    document.querySelector(".dark-mode-btn");

if (darkModeBtn) {

    darkModeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");
    });
}


// SCROLL TO TOP

const scrollButton =
    document.querySelector(".scroll-top");

if (scrollButton) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            scrollButton.classList.add("show");

        } else {

            scrollButton.classList.remove("show");
        }
    });

    scrollButton.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}
/* =========================================
HERO IMAGE SLIDER
========================================= */

const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dot");

let currentHeroSlide = 0;

function showHeroSlide(index) {

```
heroSlides.forEach((slide) => {
    slide.classList.remove("active");
});

heroDots.forEach((dot) => {
    dot.classList.remove("active");
});

heroSlides[index].classList.add("active");

if (heroDots[index]) {
    heroDots[index].classList.add("active");
}
```

}

function nextHeroSlide() {

```
currentHeroSlide++;

if (currentHeroSlide >= heroSlides.length) {
    currentHeroSlide = 0;
}

showHeroSlide(currentHeroSlide);
```

}

/* Automatic slider every 5 seconds */

if (heroSlides.length > 0) {

```
setInterval(nextHeroSlide, 5000);
```

}

/* Manual dots */

heroDots.forEach((dot, index) => {

```
dot.addEventListener("click", () => {

    currentHeroSlide = index;

    showHeroSlide(currentHeroSlide);

});
```

});

/* =========================================
CONTACT POPUP
========================================= */

const contactPopup = document.getElementById("contactPopup");
const closePopup = document.getElementById("closePopup");

/*
Popup appears when visitor opens website.

After visitor closes it, localStorage remembers
the choice so it doesn't keep appearing again.
*/

window.addEventListener("load", () => {

```
const popupClosed = localStorage.getItem("arInfraconPopupClosed");

if (!popupClosed) {

    setTimeout(() => {

        contactPopup.classList.add("show");

    }, 1200);

}
```

});

/* Close popup */

if (closePopup) {

```
closePopup.addEventListener("click", () => {

    contactPopup.classList.remove("show");

    localStorage.setItem(
        "arInfraconPopupClosed",
        "true"
    );

});
```

}

/* Close by clicking outside popup */

if (contactPopup) {

```
contactPopup.addEventListener("click", (event) => {

    if (event.target === contactPopup) {

        contactPopup.classList.remove("show");

        localStorage.setItem(
            "arInfraconPopupClosed",
            "true"
        );

    }

});
```

}

/* =========================================
POPUP CONTACT FORM
========================================= */

const popupForm = document.getElementById("popupContactForm");

if (popupForm) {

```
popupForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name =
        document.getElementById("popupName").value;

    const phone =
        document.getElementById("popupPhone").value;

    const service =
        document.getElementById("popupService").value;


    const message =
        `Hello AR Infracon,%0A%0A` +
        `Name: ${name}%0A` +
        `Phone: ${phone}%0A` +
        `Service: ${service}%0A%0A` +
        `I would like a free consultation.`;


    window.open(
        `https://wa.me/91119650333?text=${message}`,
        "_blank"
    );

});
```

}

/* =========================================
SCROLL TOP
========================================= */

const scrollTopButton =
document.querySelector(".scroll-top");

if (scrollTopButton) {

```
window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        scrollTopButton.classList.add("show");

    } else {

        scrollTopButton.classList.remove("show");

    }

});


scrollTopButton.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
```

}

/* =========================================
DARK MODE
========================================= */

const darkModeButton =
document.querySelector(".dark-mode-btn");

if (darkModeButton) {

```
darkModeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

});
```

}

