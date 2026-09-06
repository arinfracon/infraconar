/* =========================================================
   AR INFRACON - FINAL app.js
   IMPORTANT:
   - Do NOT change your HTML page names or links.
   - This file works with the existing pages.
   - Homepage enhancements are created automatically by JS.
   ========================================================= */

(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {

        /* -----------------------------------------------------
           MOBILE MENU
        ----------------------------------------------------- */
        const menuBtn = document.querySelector(".menu-btn");
        const navbar = document.querySelector(".navbar");

        if (menuBtn && navbar) {
            menuBtn.addEventListener("click", function () {
                navbar.classList.toggle("active");

                const icon = menuBtn.querySelector("i");
                if (icon) {
                    icon.classList.toggle("fa-bars");
                    icon.classList.toggle("fa-xmark");
                }
            });

            navbar.querySelectorAll("a").forEach(function (link) {
                link.addEventListener("click", function () {
                    navbar.classList.remove("active");

                    const icon = menuBtn.querySelector("i");
                    if (icon) {
                        icon.classList.remove("fa-xmark");
                        icon.classList.add("fa-bars");
                    }
                });
            });
        }


        /* -----------------------------------------------------
           HOMEPAGE HERO SLIDER
           Uses the existing .hero-slider HTML.
           Existing image URLs, buttons and page links are preserved.
        ----------------------------------------------------- */
        const heroSlider = document.querySelector(".hero-slider");

        if (heroSlider) {
            const slides = Array.from(heroSlider.querySelectorAll(".hero-slide"));
            const dots = Array.from(heroSlider.querySelectorAll(".hero-dot"));

            if (slides.length) {
                let currentSlide = Math.max(
                    0,
                    slides.findIndex(function (slide) {
                        return slide.classList.contains("active");
                    })
                );

                let sliderTimer = null;
                let touchStartX = 0;
                let touchEndX = 0;

                /* Create navigation arrows only if they do not already exist. */
                let prevButton = heroSlider.querySelector(".hero-prev");
                let nextButton = heroSlider.querySelector(".hero-next");

                if (!prevButton) {
                    prevButton = document.createElement("button");
                    prevButton.type = "button";
                    prevButton.className = "hero-arrow hero-prev";
                    prevButton.setAttribute("aria-label", "Previous slide");
                    prevButton.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
                    heroSlider.appendChild(prevButton);
                }

                if (!nextButton) {
                    nextButton = document.createElement("button");
                    nextButton.type = "button";
                    nextButton.className = "hero-arrow hero-next";
                    nextButton.setAttribute("aria-label", "Next slide");
                    nextButton.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
                    heroSlider.appendChild(nextButton);
                }

                function showSlide(index) {
                    if (!slides.length) return;

                    currentSlide = (index + slides.length) % slides.length;

                    slides.forEach(function (slide, i) {
                        slide.classList.toggle("active", i === currentSlide);
                        slide.setAttribute("aria-hidden", i === currentSlide ? "false" : "true");
                    });

                    dots.forEach(function (dot, i) {
                        dot.classList.toggle("active", i === currentSlide);
                        dot.setAttribute("aria-current", i === currentSlide ? "true" : "false");
                    });
                }

                function stopSlider() {
                    if (sliderTimer) {
                        clearInterval(sliderTimer);
                        sliderTimer = null;
                    }
                }

                function startSlider() {
                    stopSlider();

                    if (slides.length > 1) {
                        sliderTimer = setInterval(function () {
                            showSlide(currentSlide + 1);
                        }, 5000);
                    }
                }

                function restartSlider() {
                    startSlider();
                }

                if (prevButton) {
                    prevButton.addEventListener("click", function () {
                        showSlide(currentSlide - 1);
                        restartSlider();
                    });
                }

                if (nextButton) {
                    nextButton.addEventListener("click", function () {
                        showSlide(currentSlide + 1);
                        restartSlider();
                    });
                }

                dots.forEach(function (dot, index) {
                    dot.type = "button";
                    dot.setAttribute("role", "button");
                    dot.setAttribute("tabindex", "0");
                    dot.addEventListener("click", function () {
                        showSlide(index);
                        restartSlider();
                    });

                    dot.addEventListener("keydown", function (event) {
                        if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            showSlide(index);
                            restartSlider();
                        }
                    });
                });

                heroSlider.addEventListener("mouseenter", stopSlider);
                heroSlider.addEventListener("mouseleave", startSlider);
                heroSlider.addEventListener("focusin", stopSlider);
                heroSlider.addEventListener("focusout", function () {
                    if (!heroSlider.contains(document.activeElement)) {
                        startSlider();
                    }
                });

                heroSlider.addEventListener(
                    "touchstart",
                    function (event) {
                        touchStartX = event.changedTouches[0].screenX;
                    },
                    { passive: true }
                );

                heroSlider.addEventListener(
                    "touchend",
                    function (event) {
                        touchEndX = event.changedTouches[0].screenX;
                        const distance = touchEndX - touchStartX;

                        if (Math.abs(distance) > 50) {
                            if (distance < 0) {
                                showSlide(currentSlide + 1);
                            } else {
                                showSlide(currentSlide - 1);
                            }
                            restartSlider();
                        }
                    },
                    { passive: true }
                );

                showSlide(currentSlide);
                startSlider();
            }
        }

        /* -----------------------------------------------------
           MOVING BENEFIT CARDS
           Created automatically below hero.
        ----------------------------------------------------- */
        const hero =
            document.querySelector(".hero-slider") ||
            document.querySelector(".hero");

        if (
            hero &&
            !document.querySelector(".benefits-section")
        ) {

            const benefits = [
                ["fa-tag", "NO HIDDEN COST", "Transparent pricing"],
                ["fa-credit-card", "ZERO EMI", "Easy payment options"],
                ["fa-city", "10+ CITIES", "Expanding across India"],
                ["fa-award", "25+ YEARS", "Design experience"],
                ["fa-circle-check", "100% QUALITY", "Premium workmanship"],
                ["fa-heart", "100% HAPPY CLIENTS", "Client-first service"],
                ["fa-house-circle-check", "250+ PROJECTS", "Successfully delivered"]
            ];

            const section =
                document.createElement("section");

            section.className =
                "benefits-section";

            const track =
                document.createElement("div");

            track.className =
                "benefits-track";

            /*
             * Duplicate cards for seamless movement.
             */
            const allBenefits =
                benefits.concat(benefits);

            allBenefits.forEach(function (item) {

                const card =
                    document.createElement("div");

                card.className =
                    "benefit-card";

                card.innerHTML =
                    '<i class="fa-solid ' + item[0] + '"></i>' +
                    '<div>' +
                    '<strong>' + item[1] + '</strong>' +
                    '<span>' + item[2] + '</span>' +
                    '</div>';

                track.appendChild(card);
            });

            section.appendChild(track);

            hero.insertAdjacentElement(
                "afterend",
                section
            );
        }


        /* -----------------------------------------------------
           ANIMATED COUNTERS
        ----------------------------------------------------- */
        const counters =
            document.querySelectorAll(".counter");

        function animateCounter(element) {

            if (element.dataset.done === "1") {
                return;
            }

            element.dataset.done = "1";

            const target =
                parseInt(element.dataset.target || "0", 10);

            const original =
                element.textContent.trim();

            const suffix =
                original.includes("%")
                    ? "%"
                    : original.includes("+")
                        ? "+"
                        : "";

            const duration = 1400;
            const start = performance.now();

            function frame(now) {

                const progress =
                    Math.min(
                        (now - start) / duration,
                        1
                    );

                const eased =
                    1 - Math.pow(1 - progress, 3);

                const value =
                    Math.floor(target * eased);

                element.textContent =
                    value.toLocaleString("en-IN") +
                    suffix;

                if (progress < 1) {
                    requestAnimationFrame(frame);
                } else {
                    element.textContent =
                        target.toLocaleString("en-IN") +
                        suffix;
                }
            }

            requestAnimationFrame(frame);
        }

        if (counters.length) {

            if ("IntersectionObserver" in window) {

                const observer =
                    new IntersectionObserver(
                        function (entries, obs) {

                            entries.forEach(function (entry) {

                                if (entry.isIntersecting) {
                                    animateCounter(entry.target);
                                    obs.unobserve(entry.target);
                                }

                            });

                        },
                        { threshold: 0.25 }
                    );

                counters.forEach(function (counter) {
                    observer.observe(counter);
                });

            } else {
                counters.forEach(animateCounter);
            }
        }


        /* -----------------------------------------------------
           SERVICE GALLERY MODAL
        ----------------------------------------------------- */
        const modal =
            document.getElementById("designModal");

        const modalGallery =
            document.getElementById("modalGallery");

        const modalTitle =
            document.getElementById("modalTitle");

        const closeModal =
            document.querySelector(".close-modal");

        const designs = {

            "bedroom-designs": {
                title: "Bedroom",
                images: [
                    "b4.jfif",
                    "b1.jfif",
                    "b2.webp",
                    "b3.jfif",
                    "b5.webp",
                    "01.jpg",
                    "02.jpg",
                    "03.jpg",
                    "04.jpg",
                    "05.jpg",
                    "06.jpg",
                    "07.jpg",
                    "08.jpg",
                    "09.jpg",
                    "010.jpg",
                    "011.jpg",
                    "012.jpg",
                    "013.jpg",
                    "014.jpg",
                    "015.jpg",
                    "016.jpg",
                    "017.jpg",
                    "018.jpg",
                    "019.jpg",
                    "020.jpg",
                    "021.jpg",
                    "022.jpg",
                    "023.jpg",
                    "024.jpg",
                    "025.jpg",
                    "026.jpg",
                    "027.jpg",
                    "028.jpg",
                    "029.jpg",
                    "030.jpg",
                    "031.jpg",
                    "032.jpg",
                    "033.jpg",
                    "images/bedroom8.jpg"
                ]
            },

            "kitchen-designs": {
                title: "Kitchen",
                images: [
                   "images/kitchen1.jpg",
                   "1.jpg",
                   "2.jpg",
                   "3.jpg",
                   "4.jpg",
                   "5.jpg",
                   "6.jpg",
                   "7.jpg",
                   "8.jpg",
                   "9.jpg",
                   "10.jpg",
                   "11.jpg",
                   "12.jpg",
                   "13.jpg",
                   "14.jpg",
                   "15.jpg",
                   "16.jpg",
                   "17.jpg",
                   "18.jpg",
                   "19.jpg",
                   "20.jpg",
                   "21.jpg",
                   "22.jpg",
                   "23.jpg",
                   "24.jpg",
                   "25.jpg",
                   "26.jpg",
                   "27.jpg",
                   "28.jpg",
                   "29.jpg",
                   "30.jpg",
                   "31.jpg",
                   "32.jpg",
                    "33.jpg",
                    "34.jpg",
                    "35.jpg",
                    "36.jpg",
                    "37.jpg",
                    "38.jpg",
                    "images/kitchen8.jpg"
                ]
            },

            "living-designs": {
                title: "Living Room",
                images: [
                    "l1.jpg",
                    "l22.jpg",
                    "l23.jpg",
                    "l24.jpg",
                    "l5.jpg",
                    "l6.jpg",
                    "l7.jpg",
                   "l8.jpg",
                   "l9.jpg",
                   "l10.jpg",
                   "l11.jpg",
                   "l12.jpg",
                   "l13.jpg",
                   "l14.jpg",
                   "l15.jpg",
                   "l16.jpg",
                   "l17.jpg",
                   "l18.jpg",
                   "l19.jpg",
                   "l20.jpg",
                   "l21.jpg",
                   "l2.jpg",
                   "l3.jpg",
                   "l4.jpg",
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

        document.querySelectorAll(".service-btn")
            .forEach(function (button) {

                button.addEventListener("click", function () {

                    if (!modal || !modalGallery) return;

                    const data =
                        designs[button.dataset.target];

                    if (!data) return;

                    modalGallery.innerHTML = "";

                    if (modalTitle) {
                        modalTitle.textContent =
                            data.title;
                    }

                    data.images.forEach(function (src, index) {

                        const img =
                            document.createElement("img");

                        img.src = src;
                        img.alt =
                            data.title +
                            " design " +
                            (index + 1);

                        img.loading = "lazy";

                        modalGallery.appendChild(img);
                    });

                    modal.style.display = "block";
                    document.body.style.overflow = "hidden";
                });
            });

        function closeDesignModal() {

            if (!modal) return;

            modal.style.display = "none";
            document.body.style.overflow = "";
        }

        if (closeModal) {
            closeModal.addEventListener(
                "click",
                closeDesignModal
            );
        }

        if (modal) {

            modal.addEventListener(
                "click",
                function (event) {

                    if (event.target === modal) {
                        closeDesignModal();
                    }

                }
            );
        }


        /* -----------------------------------------------------
           STYLE QUIZ
        ----------------------------------------------------- */
        document.querySelectorAll(".quiz-btn")
            .forEach(function (button) {

                button.addEventListener("click", function () {

                    const result =
                        document.getElementById("quizResult");

                    if (result) {
                        result.textContent =
                            "Your style: " +
                            (button.dataset.style || "Modern");
                    }
                });
            });


        /* -----------------------------------------------------
           QUOTE CALCULATOR
        ----------------------------------------------------- */
        const calculateBtn =
            document.getElementById("calculateBtn");

        if (calculateBtn) {

            calculateBtn.addEventListener(
                "click",
                function () {

                    const getNumber = function (id) {

                        const element =
                            document.getElementById(id);

                        return element
                            ? Number(element.value) || 0
                            : 0;
                    };

                    const area =
                        getNumber("area");

                    const rate =
                        getNumber("package");

                    const bedrooms =
                        getNumber("bedrooms") * 50000;

                    const kitchens =
                        getNumber("kitchens") * 100000;

                    const living =
                        getNumber("living") * 40000;

                    const wardrobes =
                        getNumber("wardrobes") * 25000;

                    const tvUnits =
                        getNumber("tvUnits") * 30000;

                    const total =
                        area * rate +
                        bedrooms +
                        kitchens +
                        living +
                        wardrobes +
                        tvUnits;

                    const totalCost =
                        document.getElementById("totalCost");

                    if (totalCost) {
                        totalCost.textContent =
                            "₹" +
                            total.toLocaleString("en-IN");
                    }
                }
            );
        }


        /* -----------------------------------------------------
           MEETING
        ----------------------------------------------------- */
        const meetingBtn =
            document.getElementById("meetingBtn");

        if (meetingBtn) {

            meetingBtn.addEventListener(
                "click",
                function () {
                    alert(
                        "Meeting request submitted."
                    );
                }
            );
        }


        /* -----------------------------------------------------
           EXISTING CONTACT FORM
           ----------------------------------------------------- */
        const scriptURL =
            "https://script.google.com/macros/s/AKfycbxZOcFMR-E0szRcRDxwRb0yVDthwnqeEbiQIYAnx9FgAalNGCBy0HyJnkjl5SU-SMpW/exec";

        const contactForm =
            document.getElementById("contactForm");

        if (contactForm) {

            contactForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();

                    const submitBtn =
                        contactForm.querySelector(
                            "button[type='submit']"
                        );

                    if (submitBtn) {
                        submitBtn.disabled = true;
                        submitBtn.textContent =
                            "Sending...";
                    }

                    fetch(
                        scriptURL,
                        {
                            method: "POST",
                            body: new FormData(contactForm),
                            mode: "no-cors"
                        }
                    )
                    .then(function () {

                        alert(
                            "Message sent successfully!"
                        );

                        contactForm.reset();

                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.textContent =
                                "Submit";
                        }
                    })
                    .catch(function () {

                        alert(
                            "Submission failed. Please try again."
                        );

                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.textContent =
                                "Submit";
                        }
                    });
                }
            );
        }


        /* -----------------------------------------------------
           DARK MODE
        ----------------------------------------------------- */
        const darkModeBtn =
            document.querySelector(".dark-mode-btn");

        if (darkModeBtn) {

            const saved =
                localStorage.getItem(
                    "arInfraconDarkMode"
                );

            if (saved === "true") {
                document.body.classList.add("dark");
            }

            darkModeBtn.addEventListener(
                "click",
                function () {

                    const active =
                        document.body.classList.toggle(
                            "dark"
                        );

                    localStorage.setItem(
                        "arInfraconDarkMode",
                        active ? "true" : "false"
                    );
                }
            );
        }


        /* -----------------------------------------------------
           SCROLL TOP
        ----------------------------------------------------- */
        const scrollButton =
            document.querySelector(".scroll-top");

        if (scrollButton) {

            function updateScrollTop() {

                if (window.scrollY > 350) {
                    scrollButton.classList.add("show");
                } else {
                    scrollButton.classList.remove("show");
                }
            }

            window.addEventListener(
                "scroll",
                updateScrollTop,
                { passive: true }
            );

            updateScrollTop();

            scrollButton.addEventListener(
                "click",
                function () {

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
                }
            );
        }


        /* -----------------------------------------------------
           CONTACT POPUP
           Shows every time the website/page is opened.
           No 24-hour localStorage cooldown is used.
        ----------------------------------------------------- */
        const contactPopup = document.getElementById("contactPopup");

        function closeContactPopup() {
            if (!contactPopup) return;

            contactPopup.classList.remove("show");
            document.body.style.overflow = "";
        }

        function showContactPopup() {
            if (!contactPopup) return;

            contactPopup.classList.add("show");
            document.body.style.overflow = "hidden";
        }

        if (contactPopup) {
            const closePopup = document.getElementById("closePopup");

            if (closePopup) {
                closePopup.addEventListener("click", closeContactPopup);
            }

            contactPopup.addEventListener("click", function (event) {
                if (event.target === contactPopup) {
                    closeContactPopup();
                }
            });

            /* Always show the popup whenever this page is opened/refreshed. */
            setTimeout(showContactPopup, 1200);

            const popupForm = document.getElementById("popupContactForm");

            if (popupForm) {
                popupForm.addEventListener("submit", function (event) {
                    event.preventDefault();

                    const nameElement = document.getElementById("popupName");
                    const phoneElement = document.getElementById("popupPhone");
                    const serviceElement = document.getElementById("popupService");

                    const name = nameElement ? nameElement.value.trim() : "";
                    const phone = phoneElement ? phoneElement.value.trim() : "";
                    const service = serviceElement ? serviceElement.value : "";

                    const message =
                        "Hello AR Infracon,\n\n" +
                        "Name: " + name + "\n" +
                        "Phone: " + phone + "\n" +
                        "Service: " + service + "\n\n" +
                        "I would like a free consultation.";

                    const url =
                        "https://wa.me/919119650333?text=" +
                        encodeURIComponent(message);

                    closeContactPopup();
                    window.open(url, "_blank", "noopener,noreferrer");
                });
            }
        }

        /* -----------------------------------------------------
           ESC KEY
        ----------------------------------------------------- */
        document.addEventListener(
            "keydown",
            function (event) {

                if (event.key !== "Escape") {
                    return;
                }

                const popup =
                    document.getElementById(
                        "contactPopup"
                    );

                if (
                    popup &&
                    popup.classList.contains("show")
                ) {
                    closeContactPopup();
                }

                if (modal) {
                    closeDesignModal();
                }
            }
        );

    });

})();
