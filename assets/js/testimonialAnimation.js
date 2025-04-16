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

testimonialAnimation();