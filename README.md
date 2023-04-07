# SAE402 - Cartcomm
<picture>
  <source srcset="https://github.com/s00fy/SAE402/blob/dev/public/logo-white-pwa.svg">
  <img alt="Logo of CartComm = a smiling cart insert into the word "cartcomm"." src="https://github.com/s00fy/SAE402/blob/dev/public/logo-white-pwa.svg">
</picture>

Réalisé par [@AkekoChan](https://github.com/AkekoChan) et moi, Cartcomm est une PWA permettant d'enregistrer ses listes de courses, optimisée grâce aux appels d'API.
Vous vous trouvez sur un prototype de l'application [Cartcomm](https://cartcomm.netlify.app).


## PWA de liste de courses en ligne

Les PWA sont des sites web qui agissent comme des applications natives, offrant de nouveaux contextes d'utilisation, notamment d'être référencés sur le web et d'être téléchargeable sur mobile.

![img](https://github.com/s00fy/SAE402/blob/main/src/img/CARTCOMM.jpg)

Cartcomm est une PWA pour mobile qui mermet d'afficher et enregistrer ses listes de courses autorisant jusqu'à 10 articles par liste. Accessible à tout moment, l'application est gratuite et accessible à tout le monde depuis le web. L'application donne accès à :
1. `index.html` page d'acceuil affichant vos listes
2. `shop.html` page d'affichage des magasins disponibles près de vous où près de l'endroit recherché
3. `favShop.html` page qui liste les magasins enregistrés en favoris par l'utilisateur
4. `new.html` page pour enregistrer une nouvelle liste
5. `edit.html` page pour modifier les informations d'une liste
6. `parameters.html` page qui gère les autorisations et les préférences de l'utilisateur

Le but est de digitaliser et s'assurer de l'accès libre des listes de courses des utilisateurs, peut importe la connexion disponible. Pour améliorer le confort, la géolocalisation affiche tous les magasins proches. 

## Les APIs utilisées

Nous avons utilsé [6 APIs](https://whatwebcando.today) : 

| API           | Utilisation |
| ------------- | ------------- |
| Geolocation  | Afficher les magasins proche de soi |
| Home Screen Installation  | Installer l'appli sur mobile, accès rapide |
| Local Storage, Offline Mode | Permettre le mode hors-ligne |
| Local Notifications | Notifier l'utilisateur à chaque action |
| Permissions | Autoriser la géolocalisation et les notifications |
| Clipboard | Autoriser le presse papier et le copier coller |

### Geolocalisation et Geoapify

La geolocalisation est nécessaire pour renvoyer : 
- la position de l'appareil
- la position des magasins alentours, géré par Geoapify

Afin de compléter cette fonctionnalité et de donner la possibilité à l'utilisateur de changer de lieu de référence, vous trouverez une barre de recherche avec l'autocomplétion des données proposé par Geoapify.

### Installation sur l'écran d'acceuil

Le principe de la PWA est de donner au site un comportement d'application mobile, permettant l'installation sur l'écran d'acceuil. Cela rend l'application plus facile d'accès et d'utilisation tout en incitant l'utilisateur a régulièrement consulter l'application.

### Conserver les listes et hors-ligne

L'utilisation de localStorage permet d'enregistrer dans le cache les informations nécessaires au bon fonctionnement de l'application. La conservation des données permet au mode hors-ligne d'être opérationnel.

### Notifications
  
Les notifications informent l'utilisateur à chaque action de base sur les listes, à savoir la création, la suppression ou encore le déroulement des requêtes.

### Permissions

La demande des permissions est nécessaire pour récolter les données de l'utilisateur comme sa localisation. 


### Partager les listes

Pour aboutir encore plus le projet, nous avons mis en place un copy to clipboard permettant aux utilisateurs de 'partager' leurs listes.
