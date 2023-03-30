(function () {
  const App = {
    // les variables/constantes
    _addr: new URL(window.location.href),
    _list: JSON.parse(localStorage.getItem("list")),
    _form: document.querySelector(".edit__form"),
    _editList: document.getElementById("list_name"),
    _wrapperArticle: document.querySelector(".edit__formArticle"),
    // initialisations
    app_init: function () {
      App.app_handlers();
    },

    // les gestionnaires d'ev
    app_handlers: function () {
      App.getList();

      App._form.addEventListener("submit", App.editList);
    },

    /**
     * Récupération des données pour l'édition
     */
    getList: () => {
      const id = App._addr.searchParams.get("id");

      if (App._list[id]) {
        App._editList.value = App._list[id].title;
        App._list[id].articles.forEach((article) =>
          App._wrapperArticle.insertAdjacentHTML(
            "beforeend",
            `<div class="edit__addInput"><input type="text" class="edit__input" name="list_item" value="${article}"></div>`
          )
        );
      }
    },

    editList: (e) => {
      e.preventDefault();

      const id = App._addr.searchParams.get("id");

      // Récupération des données du formulaire
      const datas = new FormData(App._form);

      // Edit de la liste
      let editList = {
        title: datas.getAll("list_name").toString(),
        articles: datas.getAll("list_item"),
      };

      // Modifition de la liste
      App._list[id] = editList;

      // Mise à jour dans le local storage
      localStorage.setItem(`list`, JSON.stringify(App._list));

      // Redirection vers l'index
      window.location.href = `${window.location.protocol}//${window.location.host}`;
    },
  };
  window.addEventListener("DOMContentLoaded", App.app_init);
})();
