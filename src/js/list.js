(function () {
  const App = {
    // les variables/constantes
    _arrows: document.querySelectorAll(".shoppingList__arrow"),
    _button: document.querySelector(".shoppingList__button"),
    _lists: JSON.parse(localStorage.getItem("list")),
    _wrapperList: document.querySelector(".shoppingList__wrapper"),

    // initialisations
    app_init: function () {
      App.app_handlers();
    },

    // les gestionnaires d'ev
    app_handlers: function () {
      // mise en place du système ouverture des listes
      App._wrapperList.addEventListener("click", App.openDetailsArticle);

      // affichage des listes
      App.showList();

      // suppression d'une liste
      App._wrapperList.addEventListener("click", App.deleteList);
    },

    /**
     * Affichage des listes et de leurs articles
     */
    showList: () => {
      let addList = "";

      if (App._lists) {
        App._lists.forEach((list, id) => {
          let addArticle = "";

          list.articles.forEach((article) => {
            addArticle += `<li class="shoppingList__details">${article}</li>`;
          });
          addList += `<div class="shoppingList__button">
                <div class="shoppingList__content">
                  <div>
                    <p>${list.title}</p>
                    <span class="shoppingList__items">${list.articles.length} article(s) dans votre liste</span>
                  </div>
                  <div class="shoppingList__arrow">
                  <svg
                      class="arrow"
                      width="11"
                      height="16"
                      viewBox="0 0 11 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                  <path   class="arrow"
                          d="M1.32501 15.5083C1.06529 15.2486 0.935425 14.9181 0.935425 14.5167C0.935425 14.1153 1.06529 13.7847 1.32501 13.525L6.85001 8L1.32501 2.475C1.06529 2.21528 0.935425 1.88472 0.935425 1.48333C0.935425 1.08194 1.06529 0.751386 1.32501 0.491664C1.58473 0.231942 1.91528 0.102081 2.31667 0.102081C2.71806 0.102081 3.04862 0.231942 3.30834 0.491664L9.82501 7.00833C9.96667 7.15 10.0673 7.30347 10.1268 7.46875C10.1853 7.63403 10.2146 7.81111 10.2146 8C10.2146 8.18889 10.1853 8.36597 10.1268 8.53125C10.0673 8.69653 9.96667 8.85 9.82501 8.99166L3.30834 15.5083C3.04862 15.7681 2.71806 15.8979 2.31667 15.8979C1.91528 15.8979 1.58473 15.7681 1.32501 15.5083Z"
                          fill="#FAFAFA"
                          /></svg>
                  </div>
                </div>
                <div class="shoppingList__more">
                  <div class="shoppingList__alterate">
                    <a href="#">
                    <svg
                          class="shoppingList__delete delete"
                          id="${id}"
                          width="19"
                          height="21"
                          viewBox="0 0 19 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                      <path
                              d="M3.8935 20.2398C3.27821 20.2398 2.75167 20.028 2.31388 19.6043C1.87534 19.1799 1.65607 18.67 1.65607 18.0745V4.00038H0.537359V1.83513H6.13093V0.752502H12.8432V1.83513H18.4368V4.00038H17.3181V18.0745C17.3181 18.67 17.0992 19.1799 16.6614 19.6043C16.2229 20.028 15.6959 20.2398 15.0806 20.2398H3.8935ZM6.13093 15.9093H8.36836V6.16564H6.13093V15.9093ZM10.6058 15.9093H12.8432V6.16564H10.6058V15.9093Z"
                              fill="#FAFAFA"
                          /></svg>
                    </a>
                    <a href="/edit.html">
                    <svg
                          class="shoppingList__edit"
                          width="20"
                          height="21"
                          viewBox="0 0 20 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                      <path
                      d="M17.8492 7.1671L13.248 2.62006L14.7637 1.10438C15.1787 0.689376 15.6886 0.481873 16.2934 0.481873C16.8975 0.481873 17.4071 0.689376 17.8221 1.10438L19.3378 2.62006C19.7528 3.03507 19.9693 3.53596 19.9873 4.12275C20.0054 4.70881 19.8069 5.20934 19.3919 5.62435L17.8492 7.1671ZM16.2793 8.76397L4.8035 20.2398H0.202331V15.6387L11.6782 4.16281L16.2793 8.76397Z"
                              fill="#FAFAFA"
                              /></svg
                  ></a>
                  </div>
                  <ul class="shoppingList__detailsWrapper">
                    ${addArticle}
                  </ul>
                </div>
              </div>`;
        });
      }
      document.querySelector(".shoppingList__wrapper").innerHTML =
        addList ||
        `<p class="favoriteShop__error">Vous n'avez pas de listes enregistrées !<p>`;
    },

    /**
     * Supression d'une liste en fonction de son id
     * @param {*} e
     */
    deleteList: (e) => {
      if (e.target.classList.contains("delete")) {
        App._lists.splice(e.target.id, 1);
        localStorage.setItem("list", JSON.stringify(App._lists));

        App.showList();
      }
    },

    /**
     * Toggle des articles contenus dans une liste
     * @param {*} e
     */
    openDetailsArticle: (e) => {
      if (e.target.classList.contains("arrow")) {
        e.target.closest(".shoppingList__button").classList.toggle("active");
      }
    },
  };
  window.addEventListener("DOMContentLoaded", App.app_init);
})();
