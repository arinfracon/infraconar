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

const modal = document.getElementById("designModal");
const modalGallery = document.getElementById("modalGallery");
const modalTitle = document.getElementById("modalTitle");
const closeModal = document.querySelector(".close-modal");

const designs = {
    "bedroom-designs": "Bedroom",
    "kitchen-designs": "Kitchen",
    "living-designs": "Living Room",
    "tv-designs": "TV Unit",
    "wardrobe-designs": "Wardrobe",
    "exterior-designs": "Exterior"
};

document.querySelectorAll(".service-btn").forEach(button => {

    button.addEventListener("click", () => {

        if (!modal) return;

        modalGallery.innerHTML = "";

        const section = designs[button.dataset.target];

        modalTitle.textContent = section;

        for (let i = 1; i <= 8; i++) {

            modalGallery.innerHTML +=
                `<img src="https://placehold.co/500x350?text=${section}+${i}">`;
        }

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
