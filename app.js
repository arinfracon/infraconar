/* MOBILE MENU */

const menu = document.querySelector(".menu-btn");

const navbar =
    document.querySelector(".navbar");

menu.addEventListener("click", () => {

    navbar.classList.toggle("active");

});

/* COUNTER */

const counters =
    document.querySelectorAll(".counter");

counters.forEach(counter => {

    const target =
        +counter.dataset.target;

    let count = 0;

    const update = () => {

        const increment =
            target / 100;

        if (count < target) {

            count += increment;

            counter.innerText =
                Math.ceil(count);

            setTimeout(
                update,
                20
            );

        } else {

            counter.innerText =
                target + "+";
        }
    };

    update();

});

const designs = {

    "bedroom-designs": "Bedroom",

    "kitchen-designs": "Kitchen",

    "living-designs": "Living Room",

    "tv-designs": "TV Unit",

    "wardrobe-designs": "Wardrobe",

    "exterior-designs": "Exterior"
};

const modal =
    document.getElementById(
        "designModal"
    );

const gallery =
    document.getElementById(
        "modalGallery"
    );

const title =
    document.getElementById(
        "modalTitle"
    );

document.querySelectorAll(
    ".service-btn"
).forEach(button => {

    button.addEventListener(
        "click",
        () => {

            title.textContent =
                designs[
                button.dataset.target
                ];

            gallery.innerHTML = "";

            for (let i = 1; i <= 4; i++) {

                gallery.innerHTML +=
                    `<img src="https://placehold.co/500x350?text=${designs[button.dataset.target]}+${i}">`;
            }

            modal.style.display =
                "block";
        });
});

document.querySelector(
    ".close-modal"
).onclick = () => {

    modal.style.display =
        "none";
};

document.querySelectorAll(
    ".quiz-btn"
).forEach(button => {

    button.addEventListener(
        "click",
        () => {

            document.getElementById(
                "quizResult"
            ).textContent =
                "Your preferred style is: " +
                button.dataset.style;
        });
});
// QUOTE CALCULATOR

document
    .getElementById("calculateBtn")
    .addEventListener("click", () => {

        const area =
            Number(
                document.getElementById("area").value
            );

        const rate =
            Number(
                document.getElementById("package").value
            );

        const bedrooms =
            Number(
                document.getElementById("bedrooms").value
            ) * 50000;

        const kitchens =
            Number(
                document.getElementById("kitchens").value
            ) * 100000;

        const living =
            Number(
                document.getElementById("living").value
            ) * 40000;

        const wardrobes =
            Number(
                document.getElementById("wardrobes").value
            ) * 25000;

        const tvUnits =
            Number(
                document.getElementById("tvUnits").value
            ) * 30000;

        const total =
            area * rate +
            bedrooms +
            kitchens +
            living +
            wardrobes +
            tvUnits;

        document.getElementById(
            "totalCost"
        ).innerText =
            "₹" +
            total.toLocaleString(
                "en-IN"
            );

    });

// MEETING

document
    .getElementById("meetingBtn")
    .addEventListener("click", () => {

        alert(
            "Meeting request submitted."
        );

    });
    const contactForm =
    document.querySelector(
        ".contact-form"
    );

contactForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        alert(
            "Thank you for contacting AR Infracon."
        );

        contactForm.reset();
    }
);
/* LOADER */

window.addEventListener(
    "load",
    () => {

        document
            .querySelector(".loader")
            .classList
            .add("hide");

    }
);

/* DARK MODE */

document
    .querySelector(".dark-mode-btn")
    .addEventListener(
        "click",
        () => {

            document.body
                .classList
                .toggle("dark");

        }
    );

/* SCROLL TO TOP */

const scrollButton =
    document.querySelector(
        ".scroll-top"
    );

window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 300
        ) {

            scrollButton
                .classList
                .add("show");

        } else {

            scrollButton
                .classList
                .remove("show");
        }

    }
);

scrollButton.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);