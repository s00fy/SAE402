(function () {
  const App = {
    // les variables/constantes
    _count: 1,
    _form: document.querySelector(".form"),
    _addArticle: document.querySelector(".form__btn--add"),
    _wrapperArticle: document.querySelector(".form__article"),
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
      // Limitation à 10 listes de couses
      let max_fields = 10;

      if (App._count < max_fields) {
        App._count++;
        App._wrapperArticle.insertAdjacentHTML(
          "beforeend",
          `<div><input type="text" class="form__input" name="name_article" placeholder="Article"><a href="#" class="remove_field">Supprimer</a></div>`
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
        e.target.parentElement.remove();
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
        title: datas.getAll("name_list").toString(),
        articles: datas.getAll("name_article"),
      };
      // Ajout dans le tableau
      App._list.push(newList);

      App.clearInput;

      // Mise à jour dans le local storage
      localStorage.setItem(`list`, JSON.stringify(App._list));
    },

    /**
     * Remise des champs de saisie à vide
     */
    clearInput: () => {
      document.querySelector('input[type="text"]').value = "";
    },
  };
  window.addEventListener("DOMContentLoaded", App.app_init);
})();
