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

      let customIconMarket = L.icon({
        iconUrl: `https://api.geoapify.com/v1/icon/?type=material&color=%23f25757&icon=store&apiKey=${App._API_KEY}`,
        shadowUrl: `https://api.geoapify.com/v1/icon/?type=material&color=%23f25757&icon=store&apiKey=${App._API_KEY}`,
      });

      let currentLocation = L.marker([
        `${crd.latitude}`,
        `${crd.longitude}`,
      ]).addTo(map);
      currentLocation.bindPopup("<b>Votre position actuelle !").openPopup();

      const getMarket = async () => {
        try {
          const response = await fetch(
            `https://api.geoapify.com/v2/places?categories=commercial.supermarket&filter=circle:${crd.longitude},${crd.latitude},1000&apiKey=${App._API_KEY}`
          );
          const markets = await response.json();
          console.log(markets);
          for (let market of markets.features) {
            L.marker([
              `${market.geometry.coordinates[1]}`,
              `${market.geometry.coordinates[0]}`,
              { icon: customIconMarket },
            ]).addTo(map);
          }
        } catch (error) {
          console.error(error);
        }
      };

      getMarket();

      let popup = L.popup();

      const onMapClick = (e) => {
        popup
          .setLatLng(e.latlng)
          .setContent("You clicked the map at " + e.latlng.toString())
          .openOn(map);
      };

      map.on("click", onMapClick);

      L.tileLayer(
        `https://maps.geoapify.com/v1/tile/klokantech-basic/{z}/{x}/{y}.png?apiKey=${App._API_KEY}`,
        {
          maxZoom: 19,
        }
      ).addTo(map);
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
