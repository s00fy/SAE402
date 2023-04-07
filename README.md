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
1. `index.html` page d'accueil affichant vos listes
2. `shop.html` page d'affichage des magasins disponibles près de vous où près de l'endroit recherché
3. `favShop.html` page qui liste les magasins enregistrés en favoris par l'utilisateur
4. `new.html` page pour enregistrer une nouvelle liste
5. `edit.html` page pour modifier les informations d'une liste
6. `parameters.html` page qui gère les autorisations et les préférences de l'utilisateur

Le but est de digitaliser et s'assurer de l'accès libre des listes de courses des utilisateurs, peut importe la connexion disponible. Pour améliorer le confort, la géolocalisation affiche tous les magasins proches.

**Gestion des listes**

Vous pouvez créer des nouvelles listes, modifier et supprimer vos listes déjà existantes. Toutes les données proviennent d'objets JS convertis par la suite en JSON, le projet ayant pour but la prise en main des APIs, un baxk office n'était pas nécessaire.

**Interface facile d'utilisation et d'accès**

En tant que PWA, un des points importants était que l'app soit facilement et accessible et surtout simple d'utilisation, puisque c'est une application destiné à être utilisée régulièrement.

**SCSS**

Le design est très simple et épuré, seul le blanc et le vert sont utilisés. Un [wireframe](https://www.figma.com/file/bK3xDBTziUnyKMyrDUFd5N/CartComm?t=vogCAQ0SBwdCMlzM-1) a été réalisé en amont. L'interface a été réalisée avec scss pour avoir des fichiers modulables et réutilisables.


## Les APIs utilisées

Nous avons utilsé [6 APIs](https://whatwebcando.today) : 

| API           | Utilisation |
| ------------- | ------------- |
| Geolocation  | Afficher les magasins proches de soi |
| Home Screen Installation  | Installer l'appli sur mobile, accès rapide |
| Local Storage, Offline Mode | Permettre le mode hors-ligne |
| Local Notifications | Notifier l'utilisateur à chaque action |
| Permissions | Autoriser la géolocalisation et les notifications |
| Clipboard | Autoriser le presse papier et le copier coller |

### Geolocalisation et Geoapify

La géolocalisation est une fonctionnalité importante de CartComm qui permet de localiser l'utilisateur et de lui fournir des informations sur les magasins à proximité. Pour cela, nous utilisons l'API Geoapify qui fournit des informations détaillées sur la localisation des magasins, les heures d'ouverture, les coordonnées géographiques, les images et les avis des utilisateurs.

Leaflet est utilisé comme base pour afficher les informations sur les magasins récupérées depuis l'API Geoapify sur une carte interactive. Les coordonnées géographiques de chaque magasin sont utilisées pour créer des marqueurs sur la carte, qui affichent des informations supplémentaires sur le magasin lorsqu'ils sont cliqués.

Enfin, pour faciliter la recherche de magasins, nous avons ajouté une barre de recherche avec la fonctionnalité d'autocomplétion proposée par Geoapify. Cette fonctionnalité permet aux utilisateurs de rechercher des adresses ou des noms de lieux et de voir les résultats s'afficher en temps réel.

### Installation sur l'écran d'accueil

Le principe de la PWA est de donner au site un comportement d'application mobile, permettant l'installation sur l'écran d'accueil. Cela rend l'application plus facile d'accès et d'utilisation tout en incitant l'utilisateur a régulièrement consulter l'application.

#### Pour installer la PWA :
> 1. Dans le menu du navigateur, recherchez l'option "Installer" ou "Ajouter à l'écran d'accueil".
> 2. Cliquer pour lancer l'installation de la PWA.
> 3. La PWA s'installera toute seule sur l'écran d'accueil.

### Conserver les listes et hors-ligne

CartComm utilise le LocalStorage pour stocker les données utilisateur telles que les listes d'achats et les magasins préférés. Le Service Worker est utilisé pour permettre une utilisation hors-ligne de l'application et pour mettre en cache les ressources de l'application telles que les fichiers CSS, JavaScript et les images.

De plus, le Service Worker est également utilisé pour mettre en cache les pages de l'application, permettant à l'utilisateur de continuer à naviguer sur les pages précédemment visitées même en mode hors-ligne. Cela garantit une expérience utilisateur cohérente et fluide, même lorsque l'utilisateur n'a pas accès à Internet.

En somme, l'utilisation du LocalStorage et du Service Worker permet à CartComm de stocker les données utilisateur localement, d'offrir une utilisation hors-ligne de l'application, de mettre en cache les ressources et les pages de l'application pour une expérience utilisateur cohérente et fluide, même lorsque l'utilisateur n'a pas accès à Internet.

### Notifications
  
Les notifications sont également utilisées dans CartComm pour informer l'utilisateur de chaque action effectuée sur les listes d'achats, telles que la création, la suppression ou encore le déroulement des requêtes. Ces notifications permettent à l'utilisateur de rester informé en temps réel des activités de l'application, ce qui peut aider à améliorer son expérience utilisateur et à augmenter l'engagement. Les notifications sont une fonctionnalité importante dans CartComm pour aider les utilisateurs à rester informés et engagés dans l'utilisation de l'application.

### Permissions

Dans CartComm, demander la permission à l'utilisateur est important pour collecter certaines informations, comme sa localisation. Cela permet à l'application de fonctionner correctement et de proposer toutes les fonctionnalités nécessaires. En demandant ces permissions, CartComm peut personnaliser l'expérience utilisateur pour répondre aux besoins individuels de chacun. C'est pourquoi la demande de permissions est une étape essentielle pour assurer que l'application fonctionne bien et offre une bonne expérience utilisateur.

### Partager les listes

Pour permettre aux utilisateurs de partager leurs listes avec d'autres personnes, nous avons mis en place une fonctionnalité de "copy to clipboard" dans CartComm. Cette fonctionnalité est très utile car elle permet aux utilisateurs de partager facilement leur liste de courses avec des amis ou des membres de leur famille sans avoir besoin d'un serveur web. Avec cette fonctionnalité, les utilisateurs peuvent simplement copier le contenu de leur liste de courses dans le presse-papiers et le coller dans un message ou un e-mail pour partager leurs achats. Cette fonctionnalité est très pratique et offre une alternative efficace à l'API de partage traditionnelle qui nécessite un serveur web. Avec cette fonctionnalité, les utilisateurs de CartComm peuvent partager facilement leurs listes de courses avec les personnes de leur choix.
