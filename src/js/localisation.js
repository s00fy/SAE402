(function () {
  const App = {
    // les variables/constantes
    _API_KEY: "dd194d0e2b044323ba253abc56423fc9",
    _options: {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    },
    // initialisations
    app_init: function () {
      App.app_handlers();
    },

    // les gestionnaires d'ev
    app_handlers: function () {
      navigator.geolocation.getCurrentPosition(
        App.successLoc,
        App.errorLoc,
        App._options
      );
    },

    /**
     * Retourne la map si l'utilisateur valide donne accès à la géolocalisation
     * @param {*} pos
     */
    successLoc: (pos) => {
      let crd = pos.coords;

      const map = L.map("map").setView(
        [`${crd.latitude}`, `${crd.longitude}`],
        13
      );

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

      let popup = L.popup({
        className: "custom-popup",
      }).setContent(`<p >Votre position actuelle !</p>`);

      L.marker([`${crd.latitude}`, `${crd.longitude}`], {
        icon: customIconCurrentLoc,
      })
        .addTo(map)
        .bindPopup(popup)
        .openPopup();

      const getMarket = async () => {
        try {
          const response = await fetch(
            `https://api.geoapify.com/v2/places?categories=commercial.supermarket&filter=circle:${crd.longitude},${crd.latitude},5000&apiKey=${App._API_KEY}`
          );
          const markets = await response.json();
          console.log(markets);
          for (let market of markets.features) {
            let popup = L.popup({
              className: "custom-popup",
            }).setContent(`<p >${market.properties.formatted}</p>`);

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

      L.tileLayer(
        `https://maps.geoapify.com/v1/tile/klokantech-basic/{z}/{x}/{y}.png?apiKey=${App._API_KEY}`,
        {
          attribution:
            'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors',
          id: "klokantech-basic",
          maxZoom: 19,
        }
      ).addTo(map);

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
