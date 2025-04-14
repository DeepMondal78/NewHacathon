function textAnimation() {
    const paras = document.querySelectorAll(".animPara");
    let allInnerSpans = [];

    paras.forEach((para) => {
        const words = para.textContent.split(" ");
        // console.log(words);

        para.innerHTML = "";

        words.forEach((word) => {
            // console.log(word);

            const wordWrapper = document.createElement("span");
            // console.log(wordWrapper);

            wordWrapper.classList.add("word");

            const innerSpan = document.createElement("span");
            // console.log("innerspan", innerSpan);

            innerSpan.textContent = word + " ";
            wordWrapper.appendChild(innerSpan);

            para.appendChild(wordWrapper);
            // console.log(wordWrapper);
            allInnerSpans.push(innerSpan); // collect here


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
// Laptop section animation
function laptopSectionnAnimtion() {
    const laptopTl = gsap.timeline({
        defaults: { ease: "power2.out", duration: 1 },
        scrollTrigger: {
            trigger: ".laptop-section",
            scroller: "main",
            start: "top top",
            end: "+=2500",
            scrub: 1.5,
            pin: true,
            // markers: true,
        }
    });

    laptopTl
        .to("#card-one", { top: "60%" }, "start")
        .to("#card-two", { top: "60%" }, "start+=0.3")
        .to("#card-three", { top: "60%" }, "start+=0.6")
        .to("#card-four", { top: "60%" }, "start+=0.9")
        .to("#card-five", { top: "60%" }, "start+=1.2");
}

function earbudsAnimaion() {
    VanillaTilt.init(document.querySelectorAll(".earbuds-card"), {
        max: 25,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
        scale: 1.05,
        easing: "cubic-bezier(.03,.98,.52,.99)",
        perspective: 1000
    });

    VanillaTilt.init(document.querySelectorAll(".card"), {
        max: 25,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
        scale: 1.05,
        easing: "cubic-bezier(.03,.98,.52,.99)",
        perspective: 1000
    });
}

function imgEffectShowCase() {
    const imgArry = [
        { url: "https://picsum.photos/id/1060/200/200" },
        { url: "https://picsum.photos/id/1060/200/200" },
        { url: "https://picsum.photos/id/1060/200/200" },
        { url: "https://picsum.photos/id/1060/200/200" },
        { url: "https://picsum.photos/id/1060/200/200" },
        { url: "https://picsum.photos/id/1060/200/200" },
        { url: "https://picsum.photos/id/1060/200/200" },
        { url: "https://picsum.photos/id/1060/200/200" },
        { url: "https://picsum.photos/id/1060/200/200" },
        { url: "https://picsum.photos/id/1070/200/200" },
    ];


    const throttleFunction = (func, delay) => {
        let prev = 0;
        return (...args) => {
            let now = new Date().getTime();
            if (now - prev > delay) {
                prev = now;
                func(...args);
            }
        };
    };

    let container = document.querySelector(".main-heading");

    container.addEventListener("mousemove", throttleFunction((e) => {
        // Create wrapper div
        let creatediv = document.createElement("div");
        creatediv.classList.add("imgdiv");
        creatediv.style.position = "absolute";
        creatediv.style.left = `${e.clientX - 100}px`;
        creatediv.style.top = `${e.clientY - 100}px`;

        // Get random image
        const randomIndex = Math.floor(Math.random() * imgArry.length);
        const randomImage = imgArry[randomIndex];

        // Create image element
        let createimg = document.createElement("img");
        createimg.setAttribute("src", randomImage.url);
        createimg.style.width = "100%";
        createimg.style.height = "100%";
        createimg.style.objectFit = "cover";
        creatediv.appendChild(createimg);
        console.log(creatediv);
        container.appendChild(creatediv);
        gsap.to(createimg, {
            y: "0%",
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
        });
        gsap.to(createimg, {
            y: "-100%",
            opacity: 0,
            delay: 1.5,
            duration: 0.8,
            ease: "power2.in",
            onComplete: () => creatediv.remove()
        });

    }, 300));
}

textAnimation();
laptopSectionnAnimtion();
earbudsAnimaion();
imgEffectShowCase();