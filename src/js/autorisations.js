(function () {
  const App = {
    // les variables/constantes
    _buttonNotif: document.querySelector(".request_notifications"),
    _buttonGeo: document.querySelector(".request_geolocation"),

    // allow to send notifs according to the checkbox state
    _notifStatus: true,

    // initialisations
    app_init: function () {
      App.app_handlers();
    },

    // les gestionnaires d'ev
    app_handlers: function () {
      if (App._buttonNotif) {
        App._buttonNotif.addEventListener("change", App.permissionNotif);
      }
      if (App._buttonGeo) {
        App._buttonGeo.addEventListener("change", App.permissionGeo);
      }
    },

    /**
     * Demande la permission pour afficher les notifications
     */
    permissionNotif: (e) => {
      //if Notification not supported, alert user
      if (!("Notification" in window)) {
        alert("Notification API not supported.");
        return;
      }
      // If checked, send a notif and allows notifs
      if (e.target.checked) {
        App._notifStatus = true;
        if (Notification.permission === "granted") {
          const notification = new Notification("Notifications autorisées");
        } else if (
          Notification.permission !== "granted" ||
          Notification.permission === "default"
        ) {
          Notification.requestPermission((result) => {
            if (result === "granted") {
              const notif = new Notification(
                "Vous avez autorisé les notifications !"
              );
            } else {
              e.target.checked = false;
            }
          });
        }
      } else {
        App._notifStatus = false;
      }
    },

    /**
     * Demande la permission pour activer la géolocalisation
     */
    permissionGeo: (e) => {
      console.log(App._notifStatus);
      function newLocation(location) {
        let userLocation = [];
        userLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        console.log(userLocation);
      }

      if (e.target.checked) {
        // If the user accepts send a notification
        if ("geolocation" in navigator) {
          if (navigator.permissions) {
            navigator.permissions
              .query({ name: "geolocation" })
              .then((permissionStatus) => {
                console.log(permissionStatus);
                if (permissionStatus.state === "granted") {
                  // Accès à la géolocalisation déjà autorisé
                  if (App._notifStatus === true) {
                    const notif = new Notification(
                      "Vous avez autorisé la géolocalisation !"
                    );
                  }
                } else if (permissionStatus.state === "denied") {
                  App._buttonGeo.checked = false;
                } else if (permissionStatus.state === "prompt") {
                  console.log("en attente...");

                  navigator.geolocation.getCurrentPosition(function (location) {
                    newLocation(location);
                  });
                  return new Promise((resolve) => {
                    permissionStatus.onchange = () => {
                      resolve(permissionStatus.state);
                    };
                  });
                }
              })
              .then((result) => {
                if (result === "granted") {
                  App._buttonGeo.checked = true;
                } else if (result === "denied") {
                  App._buttonGeo.checked = false;
                }
              });
          }
        } else {
          console.log("Geolocation is not supported");
        }
      }
    },
  };
  window.addEventListener("DOMContentLoaded", App.app_init);
})();
