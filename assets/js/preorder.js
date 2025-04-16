function preorderAnimation() {
    const tl = gsap.timeline();

    tl.from(".pre-order", {
        opacity: 0,
        duration: 1.5,
        ease: "power2.out"
    });

    tl.from(".pre-order", {
        scaleX: 0.7,
        scaleY: 0.2,
        y: "80%",
        borderRadius: "100px",
        duration: 1.5,
        ease: "power4.out"
    });
}

preorderAnimation()