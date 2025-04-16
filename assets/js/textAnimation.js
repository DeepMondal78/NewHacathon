function textAnimation() {
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
textAnimation();