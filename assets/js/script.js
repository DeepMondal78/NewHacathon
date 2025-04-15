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


// Features Page Animetion

gsap.registerPlugin(ScrollTrigger);

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
    gsap.to(chars, { y: '-100%', stagger: 0.03, ease: "power4.easeOut" });
  });
  item.addEventListener('mouseleave', () => {
    gsap.to(chars, { y: '0%', stagger: 0.03, ease: "power4.easeOut" });
  });
});

function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("main").style.transform ? "transform" : "fixed"
  });


  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}