(function () {
  const App = {
    // les variables/constantes
    _API_KEY: "dd194d0e2b044323ba253abc56423fc9",
    _options: {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    },
    _shops: JSON.parse(localStorage.getItem("favShops")) || {},

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

      // App.showFavShop();
    },

    saveFavShop: (market) => {
      const idShop = market.properties.place_id;
      const shop = {
        title: `${market.properties.address_line1}, ${market.properties.address_line2}`,
      };

      App._shops[idShop] = shop;

      localStorage.setItem(`favShops`, JSON.stringify(App._shops));
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
            const marker = L.marker(
              [
                `${market.geometry.coordinates[1]}`,
                `${market.geometry.coordinates[0]}`,
              ],
              { icon: customIconMarket }
            ).addTo(map);
            marker.on("click", (e) => clickZoom(e, market, marker));
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
       *
       * @param {*} e
       * @param {*} market
       * @param {*} marker
       */
      const clickZoom = (e, market, marker) => {
        map.setView(e.target.getLatLng());
        console.log(market, marker);

        let checked = "";
        // si dans l'objet app._shop la clé du market est présente alors ajouter check à l'input
        if (market.properties.place_id in App._shops) {
          checked = "checked";
        }
        let popup = L.popup({
          className: "custom-popup",
        })
          .setContent(`<p style="font-weight:bold">${market.properties.address_line1} </br> ${market.properties.address_line2}</p></br>
        <div class="fav-wrapper">
          <input type="checkbox" ${checked} id="fav" name="fav">
          <label for="fav">Magasin favoris ?</label>
        </div>`);

        marker.unbindPopup();
        marker.bindPopup(popup);
        marker.openPopup();

        document
          .getElementById("fav")
          .addEventListener("change", () => App.saveFavShop(market));
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
