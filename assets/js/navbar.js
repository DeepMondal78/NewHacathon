function navbarAnimation() {
    let navbar = document.querySelector(".navbar");
    let lastScroll = 0;

    window.addEventListener("wheel", (dets) => {
        if (dets.deltaY > 0) {
            gsap.to(navbar, {
                duration: 0.5,
                y: -100,
                ease: "power4.out"
            });
        } else {

            gsap.to(navbar, {
                duration: 0.5,
                y: 0,
                ease: "power2.out"
            });
        }

    });
}
navbarAnimation();