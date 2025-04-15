// document.addEventListener("DOMContentLoaded", () => {


var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.querySelector(".navbar").style.top = "0";
  } else {
    document.querySelector(".navbar").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}




// });

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
