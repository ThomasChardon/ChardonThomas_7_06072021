# ChardonThomas_7_06072021
Projet 7 du parcours Développeur Web : Groupomania

<br/>
Prérequis
Mysql. Pour plus d'informations, se rendre sur https://www.mysql.com/fr/

Node et NPM. Pour plus d'informations, se rendre sur https://nodejs.org/

<br/>
Installation :

Cloner ce projet depuis GitHub : git clone https://github.com/ThomasChardon/ChardonThomas_7_06072021.git  

<br/>
BDD : 

Un dump de la base se trouve à la racine du projet : dump-groupomania.sql
Il suffit d'éxecuter les requêtes SQL dans votre client MySQL préféré

<br/>
Front-End :

 * Dans le terminal, ouvrir le dossier my-app et taper "npm install".

 * Taper la commande "npm start" pour lancer le serveur.

 * Il doit être accessible à l'adresse "http://localhost:3001"  

<br/>
Pour le Back-end :  

* Dans le terminal, ouvrir le dossier backend et taper "npm install".

* Pour pouvoir se connecter à la base de données MongoDB, il faut renseigner un fichier .env à la racine du backend :

  * DB_USER="nom d'utilisateur"

  * DB_PASS="mot de passe"

  * DB_HOST="nom du cluster"

  * DB_PORT="Numéro du port de la base de données" (en général 3306)

  * DB_NAME="nom de la base de données"

<br/>
Le serveur se lance ensuite avec la commande "nodemon server"

<br/>
Note : les deux serveurs doivent être maintenus lancés pour que le projet fonctionne.
