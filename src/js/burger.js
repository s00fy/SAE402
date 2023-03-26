const burger = document.querySelector(".header__burger");
const firstSpan = document.querySelector(".header__burger span:first-child");
const secondSpan = document.querySelector(".header__burger span:last-child");
const hiddenField = document.querySelector(".header__burgerHidden");
const date = document.querySelector(".header__date");
//I'm getting trouble, the script only applies
//to index.html and not others html

/* animate burger */
function burgerAnimation(target) {
    //console.log(target);
    firstSpan.classList.toggle("cross-first");
    secondSpan.classList.toggle("cross-second");
    burger.classList.toggle("burgerAnimate");
    hiddenField.classList.toggle("header__burgerHidden-click");
}

burger.addEventListener("click", function (e) {
    burgerAnimation(e.target);
});

/* Put today's date on header */
let d = new Date();
d = d.toLocaleDateString();
date.innerHTML = d;
