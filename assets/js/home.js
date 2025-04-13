
gsap.from("nav h1", {
    y: -100,
    stagger: 0.5,
    opacity: 0,
})

gsap.from("ul li", {
    y: -100,
    stagger: 0.5,
    opacity: 0,
    duration: 1.8,
    ease: "power4.out"
})

gsap.from(".hero-anime", {
    x: "-100%",
    duration: 1.8,
    stagger: 0.5,
    ease: "power4.out"
})


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

function HomeAnimation() {
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

HomeAnimation();

gsap.from(".images", {
    x: 100,
    opacity: 0,
    duration: 1.8,
    ease: "power4.out"
});


let textParts = document.querySelectorAll(".elem-text");

textParts.forEach((val) => {
    let originalText = val.textContent.trim();
    let clutter = "";

    originalText.split("").forEach((char) => {
        clutter += `<span>${char}</span>`;
    });
    val.innerHTML = clutter;
    console.log(val);


    gsap.to(val.querySelectorAll("span"), {
        scrollTrigger: {
            trigger: ".des-container",
            start: "top 30%",
            end: "bottom 90%",
            scrub: 3,
            markers: true,
        },
        stagger: 0.2,
        color: "#fff"
    });
});





function testimonialAnimation() { }
const testimonials = [
    {
        quote: "This smartwatch is a game-changer! The display is crystal clear, and the battery lasts for days. Definitely worth the price.",
        name: "Ravi Sharma",
        designation: "Tech Enthusiast",
        src: "https://randomuser.me/api/portraits/men/75.jpg",
    },
    {
        quote: "I bought the laptop for work, and it performs like a beast. Super smooth, fast, and the build quality feels premium.",
        name: "Alicia Gomez",
        designation: "Freelance Designer",
        src: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        quote: "The smartphone camera quality is stunning. Low-light shots are impressive, and it handles gaming like a pro.",
        name: "Mohammed Rahman",
        designation: "Mobile Reviewer",
        src: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    {
        quote: "I use the earbuds daily during gym. Sound quality is rich with deep bass and the noise cancellation is top-notch!",
        name: "Priya Das",
        designation: "Fitness Lover",
        src: "https://randomuser.me/api/portraits/women/68.jpg",
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


featureCardsAnimation()