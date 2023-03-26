document.addEventListener("DOMContentLoaded", function () {
    const nbItem = document.querySelector(".shoppingList__items");
    const arrow = document.querySelector(".shoppingList__arrow");
    const showMore = document.querySelector(".shoppingList__more");
    const content = document.querySelector(".shoppingList__content");
    const button = document.querySelector(".shoppingList__button");

    arrow.addEventListener("click", function (e) {
        //show items of the list
        showMore.classList.toggle("show");
        //rotate the arrow
        arrow.classList.toggle("rotate");
        //add the white line to separate sections
        content.classList.toggle("list-open");
        //add the padding bottom of the green area
        button.classList.toggle("button-open");
    });
});
