(function () {
  const App = {
    // les variables/constantes
    _API_KEY: "dd194d0e2b044323ba253abc56423fc9",
    _options: {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    },
    _shops: JSON.parse(localStorage.getItem("favShops")),
    _map: document.querySelector("#map"),

    // initialisations
    app_init: function () {
      App.app_handlers();
    },

    // les gestionnaires d'ev
    app_handlers: function () {
      // mise en place de la géolocalisation
      navigator.geolocation.getCurrentPosition(
        App.successLoc,
        App.errorLoc,
        App._options
      );

      // mise en place de la sauvagarde des magasins favoris
      App._map.addEventListener("click", App.saveFavShop);

      // App.showFavShop();
    },

    /**
     * Affiche les magasins favoris
     */
    showFavShop: () => {
      let li = "";
      if (App._shops) {
        App._shops.forEach((shop) => {
          console.log(shop);
          li += `<li class="shop__item">
        <p>${shop.title}</p>
        </li>`;
        });
      }
      document.querySelector(".favoriteShop__list").innerHTML =
        li || `<p style="padding: 1rem">Pas de magasins favoris !</p>`;
    },

    /**
     * Enregistre les magasins favoris
     * @param {*} e
     */
    saveFavShop: (e) => {
      if (e.target.classList.contains("check-box") && e.target.checked) {
        if (!App._shops) {
          App._shops = [];
        }
        let shop = {
          title: e.target.parentElement.parentElement.firstChild.innerText,
        };
        App._shops.push(shop);

        localStorage.setItem(`favShops`, JSON.stringify(App._shops));

        // App.showFavShop();
      }
    },

    /**
     * Retourne la map si l'utilisateur donne accès à sa géolocalisation
     * @param {*} pos
     */
    successLoc: (pos) => {
      // récupération des coordonnées de l'utilisateur
      let crd = pos.coords;

      // mise en place de la map centrée sur les coordonnées récupérées
      const map = L.map("map").setView(
        [`${crd.latitude}`, `${crd.longitude}`],
        13
      );

      // mise en place des marqueurs
      const customIconMarket = L.icon({
        iconUrl: `https://api.geoapify.com/v1/icon/?type=material&color=%234fb477&icon=store&apiKey=${App._API_KEY}`,
        iconSize: [31, 46],
        iconAnchor: [15.5, 42],
        popupAnchor: [0, -45],
      });

      const customIconCurrentLoc = L.icon({
        iconUrl: `https://api.geoapify.com/v1/icon/?type=material&color=%23f25757&icon=person&apiKey=${App._API_KEY}`,
        iconSize: [31, 46],
        iconAnchor: [15.5, 42],
        popupAnchor: [0, -45],
      });

      // ajout du marqueur de la position de l'utilisateur sur la map
      let popup = L.popup({
        className: "custom-popup",
      }).setContent(`<p >Votre position actuelle !</p>`);

      L.marker([`${crd.latitude}`, `${crd.longitude}`], {
        icon: customIconCurrentLoc,
      })
        .addTo(map)
        .bindPopup(popup)
        .openPopup();

      /**
       * Requette vers l'api Geoapify pour récupérer les supermarchés autour de notre position
       */
      const getMarket = async () => {
        try {
          const response = await fetch(
            `https://api.geoapify.com/v2/places?categories=commercial.supermarket&filter=circle:${crd.longitude},${crd.latitude},5000&apiKey=${App._API_KEY}`
          );
          const markets = await response.json();
          for (let market of markets.features) {
            let popup = L.popup({
              className: "custom-popup",
            }).setContent(`<p>${market.properties.formatted}</p></br>
            <div class="fav-wrapper">
              <input type="checkbox" id="fav" name="fav" class="check-box">
              <label for="fav">Magasin favoris ?</label>
            </div>`);

            L.marker(
              [
                `${market.geometry.coordinates[1]}`,
                `${market.geometry.coordinates[0]}`,
              ],
              { icon: customIconMarket }
            )
              .addTo(map)
              .bindPopup(popup)
              .on("click", clickZoom);
          }
        } catch (error) {
          console.error(error);
        }
      };

      getMarket();

      // mise en place du fond de carte
      L.tileLayer(
        `https://maps.geoapify.com/v1/tile/klokantech-basic/{z}/{x}/{y}.png?apiKey=${App._API_KEY}`,
        {
          attribution:
            'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors',
          id: "klokantech-basic",
          maxZoom: 19,
        }
      ).addTo(map);

      /**
       * Centre la map sur un marqueur quand il est cliqué
       * @param {*} e
       */
      const clickZoom = (e) => {
        map.setView(e.target.getLatLng());
      };
    },

    /**
     * Renvoie une erreur si l'utilisateur n'a pas validé la géolocalisationS
     * @param {*} err
     */
    errorLoc: (err) => {
      console.warn(`ERREUR (${err.code}): ${err.message}`);
    },
  };
  window.addEventListener("DOMContentLoaded", App.app_init);
})();
