// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function collectionAnimation() {
    const paras = document.querySelectorAll(".animPara");

    paras.forEach((para) => {
        const words = para.textContent.split(" ");
        para.innerHTML = "";

        words.forEach((word) => {
            const wordWrapper = document.createElement("span");
            wordWrapper.classList.add("word");

            const innerSpan = document.createElement("span");
            innerSpan.textContent = word + " ";
            wordWrapper.appendChild(innerSpan);

            para.appendChild(wordWrapper);
        });

        gsap.to(para.querySelectorAll(".word span"), {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.out"
        });
    });

}

// Text animation
let textParts = document.querySelectorAll(".elem-text");
textParts.forEach((val) => {
    let originalText = val.textContent.trim();
    let clutter = "";
    originalText.split("").forEach((char) => {
        clutter += `<span>${char}</span>`;
    });
    val.innerHTML = clutter;
    gsap.to(val.querySelectorAll("span"), {
        color: "#fff",
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
            trigger: "#des",
            start: "top 50%",
            end: "bottom 50%",
            scrub: 1,
        }
    });
});


function featureCardsAnimation() {
    const featureCards = document.querySelectorAll(".feature-card");
    featureCards.forEach((card) => {
        const img = card.querySelector("img");
        card.addEventListener("mouseenter", () => {
            gsap.to(img, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: "power4.out",
            });
        });

        card.addEventListener("mouseleave", () => {
            gsap.to(img, {
                opacity: 0,
                scale: 0,
                duration: 0.3,
                ease: "power4.out",
            });

        });

        card.addEventListener("mousemove", (e) => {
            gsap.to(img, {
                x: gsap.utils.mapRange(0, window.innerWidth, -500, 500, e.clientX),
                ease: "power4.out",
                duration: 0.5,
            });
        });
    });
}

function desContainerAnimation() {
    VanillaTilt.init(document.querySelector(".des-container"), {
        max: 25,
        speed: 400,
        glare: true,
        "max-glare": 0.5
    });
}

gsap.utils.toArray(".label").forEach((label, i) => {
    gsap.to(label, {
        clipPath: "inset(0 0% 0 0)",
        duration: 1,
        ease: "power3.out",
        delay: i * 0.1,
        scrollTrigger: {
            trigger: "#tech",
            scroller: "main",
            start: "top 80%",
            end: "bottom 10%",
            scrub: 2,
            // markers: true
        }
    });
});








function contactAnimation() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".contact",
            scroller: "main",
            markers: true,
            scrub: 3,
            start: "top 80%",
            end: "bottom 50%",
        }
    });

    tl.from(".contact-form", {
        opacity: 0,
        scaleX: 0.7,
        scaleY: 0.2,
        y: "80%",
        borderRadius: "100px",
        duration: 2,
        ease: "power4.out"
    });
    tl.from(".contact-info", {
        y: 100,
        opacity: 0,
        duration: 2,
        ease: "power4.out"
    })
}

collectionAnimation();
featureCardsAnimation();
desContainerAnimation();
// collectionAnimation()