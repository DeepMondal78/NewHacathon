document.addEventListener("DOMContentLoaded", () => {

    const text = document.getElementById("image-text");
    const content = "• APPLE WATCH • SERIES 6 • 44MM ALUMINUM & CERAMIC CASE • ION-X GLASS • GPS • LTE • WR-50M •";

    const chars = content.split("");
    const angle = 360 / chars.length; // Auto spacing

    text.innerHTML = chars
        .map(
            (char, i) =>
                `<span class="char" style="transform: rotate(${i * angle}deg);">${char}</span>`
        )
        .join("");



});