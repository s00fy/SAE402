(function () {
  const App = {
    // les variables/constantes
    _burger: document.querySelector(".header__burger"),
    _hiddenField: document.querySelector(".header__burgerHidden"),
    _headerDate: document.querySelector(".header__date"),

    // initialisations
    app_init: function () {
      App.app_handlers();
    },

    // les gestionnaires d'ev
    app_handlers: function () {
      App._burger.addEventListener("click", App.toggleMenu);

      App.showTodayDate();
    },

    /**
     * Affichage du menu
     */
    toggleMenu: () => {
      App._burger.classList.toggle("burgerAnimate");
      App._hiddenField.classList.toggle("header__burgerHidden-click");
    },

    /**
     * Donne la date du jour
     */
    showTodayDate: () => {
      const date = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      App._headerDate.innerText = date.toLocaleDateString("fr-FR", options);
    },
  };
  window.addEventListener("DOMContentLoaded", App.app_init);
})();
