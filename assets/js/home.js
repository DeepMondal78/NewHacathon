// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function a() {
    document.addEventListener("DOMContentLoaded", () => {

        const text = document.getElementById("image-text");
        const content =
            "• APPLE WATCH • SERIES 6 • 44MM ALUMINUM & CERAMIC CASE • ION-X GLASS • GPS • LTE • WR-50M •";

        const chars = content.split("");
        const angle = 360 / chars.length;

        text.innerHTML = chars
            .map(
                (char, i) =>
                    `<span class="char" style="transform: rotate(${i * angle}deg);">${char}</span>`
            )
            .join("");

        const charEls = document.querySelectorAll(".char");

        let rotation = 0;

        // Wheel event listener for scroll direction
        window.addEventListener("wheel", (val) => {
            if (val.deltaY > 0) {
                console.log("mouse whell");

                rotation += 2;
            } else {
                console.log("mouse revres");

                rotation -= 2;
            }


            charEls.forEach((el, i) => {
                el.style.transform = `rotate(${i * angle + rotation}deg)`;
            });
        });

    });
}



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


// const tl = gsap.timeline();

// // Hero opacity
// tl.from("#hero", {
//     opacity: 0,
//     duration: 1.5,
//     ease: "power2.out"
// })

// // Hero scaling + translate
// tl.from("#hero", {
//     scaleX: 0.7,
//     scaleY: 0.2,
//     y: "80%",
//     borderRadius: "100px",
//     duration: 1.5,
//     ease: "power4.out"
// })

// // Navbar heading
// tl.from("nav h1", {
//     y: -100,
//     opacity: 0,
//     duration: 0.8,
//     ease: "power2.out"
// }, "a")

// // Navbar items
// tl.from("ul li", {
//     y: -100,
//     opacity: 0,
//     stagger: 0.2, 
//     duration: 0.5,
//     ease: "power2.out"
// },"a")

// tl.from(".hero-anime", {
//     x: "-100%",
//     opacity: 0,
//     stagger: 0.2,
//     duration: 1.2,
//     ease: "power4.out"
// },"a")

// tl.from(".images", {
//     x: 100,
//     opacity: 0,
//     duration: 1.2,
//     ease: "power4.out"
// }, "a") 


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
            trigger: val,
            scroller: "main",
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
            // markers: true
        }
    });
});

function testimonialAnimation() {

    const testimonials = [
        {
            quote: "This smartwatch is a game-changer! The display is crystal clear, and the battery lasts for days. Definitely worth the price.",
            name: "Ravi Sharma",
            designation: "Tech Enthusiast",
            src: "./assets/images/review-1.webp",
        },
        {
            quote: "I bought the laptop for work, and it performs like a beast. Super smooth, fast, and the build quality feels premium.",
            name: "Alicia Gomez",
            designation: "Freelance Designer",
            src: "./assets/images/review-2.webp",
        },
        {
            quote: "The smartphone camera quality is stunning. Low-light shots are impressive, and it handles gaming like a pro.",
            name: "Mohammed Rahman",
            designation: "Mobile Reviewer",
            src: "./assets/images/review-3.webp",
        },
        {
            quote: "I use the earbuds daily during gym. Sound quality is rich with deep bass and the noise cancellation is top-notch!",
            name: "Priya Das",
            designation: "Fitness Lover",
            src: "./assets/images/review-4.webp",
        },
    ];

    let activeIndex = 0;
    const imageContainer = document.getElementById('image-container');
    const nameElement = document.getElementById('name');
    const designationElement = document.getElementById('designation');
    const quoteElement = document.getElementById('quote');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    function calculateGap(width) {
        const minWidth = 1024;
        const maxWidth = 1456;
        const minGap = 60;
        const maxGap = 86;

        if (width <= minWidth) return minGap;
        if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));

        return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
    }

    function updateTestimonial(direction) {
        const oldIndex = activeIndex;
        activeIndex = (activeIndex + direction + testimonials.length) % testimonials.length;

        const containerWidth = imageContainer.offsetWidth;
        const gap = calculateGap(containerWidth);
        const maxStickUp = gap * 0.8; // 80% of the calculated gap

        testimonials.forEach((testimonial, index) => {
            let img = imageContainer.querySelector(`[data-index="${index}"]`);
            if (!img) {
                img = document.createElement('img');
                img.src = testimonial.src;
                img.alt = testimonial.name;
                img.classList.add('testimonial-image');
                img.dataset.index = index;
                imageContainer.appendChild(img);
            }

            const offset = (index - activeIndex + testimonials.length) % testimonials.length;
            const zIndex = testimonials.length - Math.abs(offset);
            const opacity = index === activeIndex ? 1 : 1;
            const scale = index === activeIndex ? 1 : 0.85;

            let translateX, translateY, rotateY;
            if (offset === 0) {
                translateX = '0%';
                translateY = '0%';
                rotateY = 0;
            } else if (offset === 1 || offset === -2) {
                translateX = '20%';
                translateY = `-${maxStickUp / img.offsetHeight * 50}%`;
                rotateY = -15;
            } else {
                translateX = '-20%';
                translateY = `-${maxStickUp / img.offsetHeight * 100}%`;
                rotateY = 15;
            }

            gsap.to(img, {
                zIndex: zIndex,
                opacity: opacity,
                scale: scale,
                x: translateX,
                y: translateY,
                rotateY: rotateY,
                duration: 0.8,
                ease: "power3.out"
            });
        });

        gsap.to([nameElement, designationElement], {
            opacity: 0,
            y: -20,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                nameElement.textContent = testimonials[activeIndex].name;
                designationElement.textContent = testimonials[activeIndex].designation;
                gsap.to([nameElement, designationElement], {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });

        gsap.to(quoteElement, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                quoteElement.innerHTML = testimonials[activeIndex].quote.split(' ').map(word => `<span class="word">${word}</span>`).join(' ');
                gsap.to(quoteElement, {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
                animateWords();
            }
        });
    }

    function animateWords() {
        gsap.from('.word', {
            opacity: 0,
            y: 10,
            stagger: 0.02,
            duration: 0.2,
            ease: "power2.out"
        });
    }

    function handleNext() {
        updateTestimonial(1);
    }

    function handlePrev() {
        updateTestimonial(-1);
    }

    prevButton.addEventListener('click', handlePrev);
    nextButton.addEventListener('click', handleNext);

    // Initial setup
    updateTestimonial(0);

    // Autoplay functionality
    const autoplayInterval = setInterval(handleNext, 5000);

    // Stop autoplay on user interaction
    [prevButton, nextButton].forEach(button => {
        button.addEventListener('click', () => {
            clearInterval(autoplayInterval);
        });
    });

    // Handle window resize
    window.addEventListener('resize', () => updateTestimonial(0));

}

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

// gsap.utils.toArray(".label").forEach((label, i) => {
//     gsap.to(label, {
//         clipPath: "inset(0 0% 0 0)",
//         duration: 1,
//         ease: "power3.out",
//         delay: i * 0.1,
//         scrollTrigger: {
//             trigger: "#tech",
//             scroller: "main",
//             start: "top 80%",
//             end: "bottom 10%",
//             scrub: 2,
//             markers: true
//         }
//     });
// });

// Features section animation
gsap.from("#features .watch-img", {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: "#features",
        scroller: "main",
        start: "top 80%",
        end: "top 20%",
        scrub: 1,
        // markers: true
    }
});





gsap.from("#features .title h1", {
    scrollTrigger: {
        trigger: "#features",
        scroller: "main",
        markers: true,
        scrub: 3,
        start: "top 80%",
        end: "bottom 50%",
    },
    opacity: 0,
    y: 100,
    duration: 1,
    ease: "power2.out"
});

gsap.from("#features .title p", {
    scrollTrigger: {
        trigger: "#features",
        scroller: "main",
        markers: true,
        scrub: 3,
        start: "top 75%",
        end: "bottom 50%",
    },
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.3,
    ease: "power2.out"
});


collectionAnimation();
testimonialAnimation();
featureCardsAnimation();
desContainerAnimation();