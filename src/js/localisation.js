(function () {
  const App = {
    // les variables/constantes
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
    successLoc: (pos) => {
      let crd = pos.coords;

      const map = L.map("map").setView(
        [`${crd.latitude}`, `${crd.longitude}`],
        13
      );
      let currentLocation = L.marker([
        `${crd.latitude}`,
        `${crd.longitude}`,
      ]).addTo(map);
      currentLocation.bindPopup("<b>Votre position actuelle !").openPopup();

      const getMarket = async () => {
        try {
          const response = await fetch(
            `https://overpass-api.de/api/interpreter?data=[out:json][timeout:500];%20(%20nwr[shop=supermarket](around:1000,${crd.latitude}%20,${crd.longitude}%20);%20);%20out%20body%20center;%20%3E;%20out%20skel%20center%20qt;`
          );
          const markets = await response.json();
          for (let market of markets.elements) {
            console.log(market);
            let marketLocation = L.marker([
              `${market.lat}`,
              `${market.lon}`,
            ]).addTo(map);
          }
        } catch (error) {
          console.error(error);
        }
      };

      getMarket();

      let popup = L.popup();

      function onMapClick(e) {
        popup
          .setLatLng(e.latlng)
          .setContent("You clicked the map at " + e.latlng.toString())
          .openOn(map);
      }

      map.on("click", onMapClick);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
    },
    errorLoc: (err) => {
      console.warn(`ERREUR (${err.code}): ${err.message}`);
    },
  };
  window.addEventListener("DOMContentLoaded", App.app_init);
})();
