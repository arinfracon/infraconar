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
           Created from the existing .hero element.
           This means index.html links do NOT need changing.
        ----------------------------------------------------- */
        const oldHero = document.querySelector(".hero");

        if (oldHero && !oldHero.classList.contains("hero-slider")) {

            const images = [
                "https://static.vecteezy.com/system/resources/thumbnails/043/500/990/small/modern-living-room-design-with-gallery-wall-fresh-clean-light-contemporary-room-interior-photo.jpg",
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85",
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85",
                "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85",
                "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=85"
            ];

            oldHero.classList.add("hero-slider");

            const existingOverlay = oldHero.querySelector(".hero-overlay");

            /*
             * The existing hero content is kept.
             * We move it into the first slide so the existing
             * buttons and links continue to work.
             */
            const content =
                oldHero.querySelector(".hero-content");

            oldHero.innerHTML = "";

            const slides = [];
            const dots = [];

            images.forEach(function (image, index) {

                const slide =
                    document.createElement("div");

                slide.className =
                    "hero-slide" +
                    (index === 0 ? " active" : "");

                const img =
                    document.createElement("img");

                img.src = image;
                img.alt =
                    "AR Infracon Interior Design " +
                    (index + 1);

                slide.appendChild(img);

                if (index === 0 && content) {
                    slide.appendChild(content);
                }

                const overlay =
                    document.createElement("div");

                overlay.className =
                    "hero-overlay";

                slide.appendChild(overlay);

                /*
                 * Put content above the overlay.
                 */
                if (index === 0 && content) {
                    slide.appendChild(content);
                }

                oldHero.appendChild(slide);
                slides.push(slide);
            });

            /*
             * Fix the first slide so the original content appears
             * only once and above the overlay.
             */
            if (content) {
                const firstSlide = slides[0];
                firstSlide.appendChild(content);
            }

            const dotsWrap =
                document.createElement("div");

            dotsWrap.className =
                "hero-dots";

            images.forEach(function (_, index) {

                const dot =
                    document.createElement("button");

                dot.type = "button";
                dot.className =
                    "hero-dot" +
                    (index === 0 ? " active" : "");

                dot.setAttribute(
                    "aria-label",
                    "Show interior image " + (index + 1)
                );

                dotsWrap.appendChild(dot);
                dots.push(dot);
            });

            oldHero.appendChild(dotsWrap);

            let current = 0;
            let timer = null;

            function showSlide(index) {

                if (!slides.length) return;

                current =
                    (index + slides.length) %
                    slides.length;

                slides.forEach(function (slide, i) {
                    slide.classList.toggle(
                        "active",
                        i === current
                    );
                });

                dots.forEach(function (dot, i) {
                    dot.classList.toggle(
                        "active",
                        i === current
                    );
                });
            }

            function startSlider() {

                clearInterval(timer);

                timer = setInterval(function () {
                    showSlide(current + 1);
                }, 5000);
            }

            dots.forEach(function (dot, index) {

                dot.addEventListener("click", function () {
                    showSlide(index);
                    startSlider();
                });

            });

            oldHero.addEventListener("mouseenter", function () {
                clearInterval(timer);
            });

            oldHero.addEventListener("mouseleave", function () {
                startSlider();
            });

            showSlide(0);
            startSlider();
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
           Created automatically - NO HTML CHANGE REQUIRED.
           It appears once per browser and can be closed.
        ----------------------------------------------------- */
        if (
            !document.getElementById("contactPopup") &&
            document.body
        ) {

            const popup =
                document.createElement("div");

            popup.id = "contactPopup";
            popup.className = "contact-popup";

            popup.innerHTML = `
                <div class="popup-box">

                    <button
                        type="button"
                        class="popup-close"
                        id="closePopup"
                        aria-label="Close"
                    >
                        <i class="fa-solid fa-xmark"></i>
                    </button>

                    <div class="popup-image">
                        <img
                            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85"
                            alt="Modern Interior"
                        >
                    </div>

                    <div class="popup-content">

                        <span>AR INFRACON</span>

                        <h2>
                            Let's Design Your Dream Home
                        </h2>

                        <p>
                            Get a free consultation with
                            our interior design team.
                        </p>

                        <form id="popupContactForm">

                            <input
                                id="popupName"
                                type="text"
                                placeholder="Your Name"
                                required
                            >

                            <input
                                id="popupPhone"
                                type="tel"
                                placeholder="Phone Number"
                                required
                            >

                            <select
                                id="popupService"
                                required
                            >
                                <option value="">
                                    Select Service
                                </option>
                                <option>Bedroom</option>
                                <option>Modular Kitchen</option>
                                <option>Living Room</option>
                                <option>Wardrobe</option>
                                <option>TV Unit</option>
                                <option>Complete Home Interior</option>
                                <option>Exterior Design</option>
                            </select>

                            <button type="submit">
                                Get Free Consultation
                            </button>

                        </form>

                        <a
                            class="popup-whatsapp"
                            href="https://wa.me/919119650333"
                            target="_blank"
                            rel="noopener"
                        >
                            <i class="fa-brands fa-whatsapp"></i>
                            Chat on WhatsApp
                        </a>

                    </div>

                </div>
            `;

            document.body.appendChild(popup);


            const closePopup =
                document.getElementById("closePopup");

            function closeContactPopup() {

                popup.classList.remove("show");

                localStorage.setItem(
                    "arInfraconPopupClosed",
                    "true"
                );

                document.body.style.overflow = "";
            }


            if (closePopup) {
                closePopup.addEventListener(
                    "click",
                    closeContactPopup
                );
            }


            popup.addEventListener(
                "click",
                function (event) {

                    if (event.target === popup) {
                        closeContactPopup();
                    }
                }
            );


            setTimeout(function () {

                const closed =
                    localStorage.getItem(
                        "arInfraconPopupClosed"
                    );

                if (!closed) {

                    popup.classList.add("show");
                    document.body.style.overflow =
                        "hidden";
                }

            }, 1200);


            const popupForm =
                document.getElementById(
                    "popupContactForm"
                );

            if (popupForm) {

                popupForm.addEventListener(
                    "submit",
                    function (event) {

                        event.preventDefault();

                        const name =
                            document.getElementById(
                                "popupName"
                            ).value.trim();

                        const phone =
                            document.getElementById(
                                "popupPhone"
                            ).value.trim();

                        const service =
                            document.getElementById(
                                "popupService"
                            ).value;

                        const message =
                            "Hello AR Infracon,\n\n" +
                            "Name: " + name + "\n" +
                            "Phone: " + phone + "\n" +
                            "Service: " + service +
                            "\n\n" +
                            "I would like a free consultation.";

                        const url =
                            "https://wa.me/919119650333?text=" +
                            encodeURIComponent(message);

                        window.open(
                            url,
                            "_blank",
                            "noopener"
                        );

                        closeContactPopup();
                    }
                );
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
                    popup.classList.remove("show");
                    document.body.style.overflow = "";
                }

                if (modal) {
                    closeDesignModal();
                }
            }
        );

    });

})();
