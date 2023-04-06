(function () {
  const App = {
    // les variables/constantes
    _buttonNotif: document.querySelector(".request_notifications"),
    _buttonGeo: document.querySelector(".request_geolocation"),
    _buttonClipboard: document.querySelector(".request_clipboard"),

    // allow to send notifs according to the checkbox state
    _notifStatus: false,

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

      if (App._buttonClipboard) {
        App._buttonClipboard.addEventListener(
          "change",
          App.permissionClipboard
        );
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
      if (e.target.checked) {
        // Si l'utilisateur accepte la géolocalisation
        if ("geolocation" in navigator) {
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
                  navigator.geolocation.getCurrentPosition(function (location) {
                    newLocation(location);
                  });
                }
              } else if (permissionStatus.state === "denied") {
                // L'utilisateur a refusé la géolocalisation
                App._buttonGeo.checked = false;
              } else if (permissionStatus.state === "prompt") {
                // Demande d'autorisation en attente
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
                if (newLocation) {
                  navigator.geolocation.getCurrentPosition(function (location) {
                    newLocation(location);
                  });
                }
              } else if (result === "denied") {
                App._buttonGeo.checked = false;
              }
            })
            .catch((error) => {
              console.error(error);
              App._buttonGeo.checked = false;
            });
        } else {
          console.log(
            "La géolocalisation n'est pas supportée par ce navigateur."
          );
          App._buttonGeo.checked = false;
        }
      } else {
        // Si l'utilisateur désactive la géolocalisation
        console.log("L'utilisateur a désactivé la géolocalisation.");
        App._buttonGeo.checked = false;
      }

      function newLocation(location) {
        let userLocation = [];
        userLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        console.log(userLocation);
      }
    },

    permissionClipboard: (e) => {
      if (e.target.checked) {
        if (navigator.clipboard) {
          navigator.permissions
            .query({ name: "clipboard-write" })
            .then((permissionStatus) => {
              if (permissionStatus.state === "granted") {
                navigator.clipboard
                  .writeText("Hello World!")
                  .then(() => {
                    console.log("Le texte a été copié dans le presse-papier");
                  })
                  .catch((error) => {
                    console.error("Impossible de copier le texte :", error);
                  });
              } else if (permissionStatus.state === "prompt") {
                console.warn("La demande de permission est en attente");
              } else if (permissionStatus.state === "denied") {
                console.error("La permission a été refusée");
              }
              permissionStatus.onchange = () => {
                console.log(
                  `Le statut de la permission a changé en ${permissionStatus.state}`
                );
              };
            });
        } else {
          console.error(
            "L'API Clipboard n'est pas disponible sur ce navigateur"
          );
        }
      }
    },
  };
  window.addEventListener("DOMContentLoaded", App.app_init);
})();
