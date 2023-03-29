(function () {
  const App = {
    // les variables/constantes
    _shops: JSON.parse(localStorage.getItem("favShops")),
    _list: document.querySelector(".favoriteShop__list"),

    // initialisations
    app_init: function () {
      App.app_handlers();
    },

    // les gestionnaires d'ev
    app_handlers: function () {
      // mise en place de l'affichage
      App.showFavShop();

      // suppression d'un magasin quand on clique sur la poubelle
      App._list.addEventListener("click", App.deleteFavShop);
    },

    /**
     * Affiche les magasins favoris
     */
    showFavShop: () => {
      let li = "";
      if (App._shops) {
        App._shops.forEach((shop, id) => {
          li += `<li class="favoriteShop__content">
          <p class="favoriteShop__name">${shop.title}</p>
          <span class="favoriteShop__delete">
          <svg 
          id="${id}"
          class="delete"
          width="19"
          height="21"
          viewBox="0 0 19 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
              class="delete"
              d="M3.8935 20.2398C3.27821 20.2398 2.75167 20.028 2.31388 19.6043C1.87534 19.1799 1.65607 18.67 1.65607 18.0745V4.00038H0.537359V1.83513H6.13093V0.752502H12.8432V1.83513H18.4368V4.00038H17.3181V18.0745C17.3181 18.67 17.0992 19.1799 16.6614 19.6043C16.2229 20.028 15.6959 20.2398 15.0806 20.2398H3.8935ZM6.13093 15.9093H8.36836V6.16564H6.13093V15.9093ZM10.6058 15.9093H12.8432V6.16564H10.6058V15.9093Z"
              fill="#FFF"
          />
        </svg>
        </span>
          </li>`;
        });
      }
      document.querySelector(".favoriteShop__list").innerHTML =
        li || `<p class="favoriteShop__error">Pas de magasins favoris !<p>`;
    },

    /**
     * Supression d'un magasin
     * @param {*} e
     */
    deleteFavShop: (e) => {
      if (e.target.classList.contains("delete")) {
        App._shops.splice(e.target.id, 1);
        localStorage.setItem("favShops", JSON.stringify(App._shops));
        App.showFavShop();
      }
    },
  };
  window.addEventListener("DOMContentLoaded", App.app_init);
})();
