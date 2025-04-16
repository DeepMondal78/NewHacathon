function textAnimation() {
    const paras = document.querySelectorAll(".animPara");
    let allInnerSpans = [];
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
            allInnerSpans.push(innerSpan); 
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
        { url: "https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { url: "https://images.unsplash.com/photo-1582150264904-e0bea5ef0ad1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { url: "https://images.unsplash.com/photo-1614703418052-d5b893d495bc?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { url: "https://images.unsplash.com/photo-1619946928632-abefa12506e2?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { url: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { url: "https://images.unsplash.com/photo-1611243705491-71487c2ed137?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { url: "https://images.unsplash.com/photo-1689287428096-7e1dcc705a5c?q=80&w=1922&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { url: "https://images.unsplash.com/photo-1595923533867-ff8a01335ff9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { url: "https://images.unsplash.com/photo-1577993944451-f8618a835822?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { url: "https://images.unsplash.com/photo-1557531365-e8b22d93dbd0?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
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
        createimg.style.width = "200px";
        createimg.style.objectFit = "cover";
        creatediv.appendChild(createimg);
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