let counter = document.querySelector(".counter");
let loadingScreen = document.querySelector(".loading-screen");
let launchWrapper = document.querySelector(".launch-wrapper");
window.onload = () => {
  let count = 0;
  let interval = setInterval(() => {
    count++;
    counter.textContent = `${count}%`;

    if (count >= 100) {
      clearInterval(interval);

      // loader fade
      gsap.to(loadingScreen, {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {

          // wrapper goes up
          gsap.to(launchWrapper, {
            y: "-100%",
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
              launchWrapper.style.display = "none";

              animateHeroSection(); // move your GSAP timeline into a function
              textAnimation();      // call text animation
            }
          });
        }
      });
    }
  }, 30);
};


function animateHeroSection() {
  const tl = gsap.timeline();

  tl.from("#hero", {
    opacity: 0,
    duration: 1.5,
    ease: "power2.out"
  });

  tl.from("#hero", {
    scaleX: 0.7,
    scaleY: 0.2,
    y: "80%",
    borderRadius: "100px",
    duration: 1.5,
    ease: "power4.out"
  });

  tl.from("nav h1", {
    y: -100,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  }, "a");

  tl.from("ul li", {
    y: -100,
    opacity: 0,
    stagger: 0.2,
    duration: 0.5,
    ease: "power2.out"
  }, "a");

  tl.from(".hero-anime", {
    x: "-100%",
    opacity: 0,
    stagger: 0.2,
    duration: 1.2,
    ease: "power4.out"
  }, "a");

  tl.from(".images", {
    x: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power4.out"
  }, "a");
}

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

// ==== NavMenu Mouse Hover Animetion ====
function animateMenuItem(el) {
  let letters = el.textContent.split('').map(letter => {
    return `<span data-letter="${letter}">${letter}</span>`;
  }).join('');
  el.innerHTML = letters;
}
document.querySelectorAll('.menu-item').forEach(item => {
  animateMenuItem(item);
  let chars = item.querySelectorAll('span');

  item.addEventListener('mouseenter', () => {
    gsap.to(chars, {
      y: '-100%',
      stagger: 0.03,
      ease: 'power4.out',
      duration: 0.6
    });
  });

  item.addEventListener('mouseleave', () => {
    gsap.to(chars, {
      y: '0%',
      stagger: 0.03,
      ease: 'power4.out',
      duration: 0.6
    });
  });
});

const menuToggle = document.getElementById("menuToggle");
const navItems = document.querySelector(".nav-items");
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navItems.classList.toggle("nav-show");
});

gsap.from(".nav-show .menu-item", {
  x: -100,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  stagger: 0.2
})