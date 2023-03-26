(function () {
  const App = {
    // les variables/constantes
    _burger: document.querySelector(".header__burger"),
    _close: document.querySelector(".navBar__close"),
    _slideMenu: document.querySelector(".navBar"),
    _headerDate: document.querySelector(".header__date"),
    // initialisations
    app_init: function () {
      App.app_handlers();
    },

    // les gestionnaires d'ev
    app_handlers: function () {
      App._burger.addEventListener("click", App.toggleMenu);
      App._close.addEventListener("click", App.toggleMenu);

      App.showTodayDate();
    },

    /**
     * Affichage du menu
     */
    toggleMenu: () => {
      App._slideMenu.classList.toggle("active");
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
