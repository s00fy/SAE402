const nbItem = document.querySelector('.shoppingList__items');
const arrow = document.querySelector('.shoppingList__arrow');
const showMore = document.querySelector('.shoppingList__more');

arrow.addEventListener("click", function() {
    nbItem.classList.toggle('hide');
    showMore.classList.toggle('show');
})