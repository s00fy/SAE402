(function () {
  const App = {
    // les variables/constantes
    _count: 1,
    _form: document.querySelector(".edit__form"),
    _addArticle: document.querySelector(".edit__btn--add"),
    _wrapperArticle: document.querySelector(".edit__formArticle"),
    _list: JSON.parse(localStorage.getItem("list")),

    // initialisations
    app_init: function () {
      App.app_handlers();
    },

    // les gestionnaires d'ev
    app_handlers: function () {
      App._addArticle.addEventListener("click", App.newArticle);
      App._wrapperArticle.addEventListener("click", App.removeArticle);
      App._form.addEventListener("submit", App.saveList);
    },

    /**
     * Ajout d'un input d'ajout d'article
     */
    newArticle: () => {
      // Limitation à 10 articles
      let max_fields = 10;

      if (App._count < max_fields) {
        App._count++;
        App._wrapperArticle.insertAdjacentHTML(
          "beforeend",
          `<div class="edit__addInput"><input type="text" class="edit__input" name="list_item" placeholder="Article"><a href="#"><svg class="remove_field" width="19" height="21" viewBox="0 0 19 21" fill="black" xmlns="http://www.w3.org/2000/svg"><path d="M3.8935 20.2398C3.27821 20.2398 2.75167 20.028 2.31388 19.6043C1.87534 19.1799 1.65607 18.67 1.65607 18.0745V4.00038H0.537359V1.83513H6.13093V0.752502H12.8432V1.83513H18.4368V4.00038H17.3181V18.0745C17.3181 18.67 17.0992 19.1799 16.6614 19.6043C16.2229 20.028 15.6959 20.2398 15.0806 20.2398H3.8935ZM6.13093 15.9093H8.36836V6.16564H6.13093V15.9093ZM10.6058 15.9093H12.8432V6.16564H10.6058V15.9093Z" fill="black"/></svg></a></div>`
        );
      }
    },

    /**
     * Suppression d'un input d'ajout d'article
     * @param {*} e
     */
    removeArticle: (e) => {
      e.preventDefault();
      if (e.target.classList.contains("remove_field")) {
        e.target.parentElement.parentElement.remove();
        App._count--;
      }
    },

    saveList: (e) => {
      e.preventDefault();
      // Récupération des données du formulaire
      const datas = new FormData(App._form);

      // Si la list n'existe pas dans le local storage, un tableau est créé
      if (!App._list) {
        App._list = [];
      }
      // Création de la nouvelle liste
      let newList = {
        title: datas.getAll("list_name").toString(),
        articles: datas.getAll("list_item"),
      };
      // Ajout dans le tableau
      App._list.push(newList);

      App.clearInput();

      // Mise à jour dans le local storage
      localStorage.setItem(`list`, JSON.stringify(App._list));
    },

    /**
     * Remise des champs de saisie à vide
     */
    clearInput: () => {
      document.querySelectorAll(".edit__input").forEach((el) => {
        el.value = "";
      });
    },
  };
  window.addEventListener("DOMContentLoaded", App.app_init);
})();
