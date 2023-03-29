const buttonNotif = document.querySelector('.request_notifications');
const buttonGeo = document.querySelector('.request_geolocation');

//allow to send notifs according to the checkbox state
let notifStatus = true;

buttonNotif.addEventListener('change', function(){
    //if Notification not supported, alert user
    if (!("Notification" in window)) {
        alert("Notification API not supported.");
        return;
    }
    // If checked, send a notif and allows notifs
    if(this.checked){
        notifStatus =true;
        if (Notification.permission === 'granted') {
            const notification = new Notification('Notifications allowed');
        }
        else if (Notification.permission !== 'granted' || Notification.permission === 'default') {
            Notification.requestPermission((result) => {
                if (result === 'granted') {
                    const notif = new Notification('Vous avez autorisé les notifications !');
                }else{
                    this.checked = false;
                }
            });
        };
    }else{
        notifStatus = false;
    };
});

//geolocalisation
buttonGeo.addEventListener('change', function(e){
    console.log(notifStatus);
    function newLocation(location) {
        let userLocation = [];
        userLocation = {
            latitude : location.coords.latitude,
            longitude : location.coords.longitude,
        };
        console.log(userLocation);
    }

    if(this.checked){
        // If the user accepts send a notification
        if ("geolocation" in navigator) {
          if (navigator.permissions) {
            navigator.permissions.query({ name: 'geolocation' })
            .then(permissionStatus => {
                  console.log(permissionStatus);
                if (permissionStatus.state === 'granted') {
                    // Accès à la géolocalisation déjà autorisé
                    if(notifStatus === true){
                        const notif = new Notification('Vous avez autorisé la géolocalisation !');
                    }
                } else if (permissionStatus.state === 'denied') {
                    buttonGeo.checked = false;
                } else if (permissionStatus.state === 'prompt') {
                    console.log('en attente...');

                    navigator.geolocation.getCurrentPosition(function(location){newLocation(location)});
                    return new Promise(resolve => { permissionStatus.onchange = () => { resolve(permissionStatus.state)}});
                }
              })
              .then(result => {
                if (result === 'granted') {
                    buttonGeo.checked = true;
                } else if (result === 'denied') {
                  buttonGeo.checked = false;
                }
              });
          }
        }else {
            console.log('Geolocation is not supported');
          }
    }
});
 