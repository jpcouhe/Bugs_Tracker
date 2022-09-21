# Bugs_Tracker
﻿
[![Contributors][contributors-shield]][contributors-url] [![Forks][forks-shield]][forks-url] [![Stargazers][stars-shield]][stars-url] [![Issues][issues-shield]][issues-url]

# BeeTracker

Application Web de gestion de projet et suivi des bugs signalés

## Features

<img src="assets/BeeTracker.png" alt="drawing" width='100%'/>
<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

Le modérateur peut créer des projets, assignés différents tickets aux développeurs qui travaillent sur le Projet. 
Les tickets peuvent être triés selont différentes priorité, type ou status. 
Module de commentaire pour chaque Ticket afin de faciliter les échanges

Le développeur, en se connectant, n'a accés qu'à des propres tickets pour mieux s'organiser


## 🔨 Technologies 

* Frontend 
    - Framework **Angular**
    - **SCSS**

* Backend
    - Serveur **Node.JS** and Framework **Express**
    - Packages: JsonWebTokens, nodemon, dotenv
    - Database **MYSQL**
    - Utilisation d'un ORM : Prisma 


## 🏗️ Installation


- Clone this project from Github
- Make sur you have Node.js and Angular installed.

    ### 🔍 Frontend
    
This project was generated with 

- `cd `
- `npm install`
- Run `ng serve` for a dev server. Navigate to http://localhost:4200/ . The app will automatically reload if you change any of the source files.

    ### 🔍 Backend
    
This project was generated with 


#### 🚧 In dev mode :
        
- `npm install`
- `npm start`
you will access to more packages (...)

#### 🚀 In product mode :
        
- `npm install --only=prod`
- `npm run start:prod #`
With nodemon the app will automatically reload if you change any of the source file.

After npm is done installing, set any environment variables in a .env file (in the folder Backend) , with this key :

```
SERVER_PORT=9000
DATABASE_URL="mysql://login:password@localhost:port/nom-de-la-database"
```

## 🏗️ Usage

## 📬 Contact 

COUHE Jean-philippe - [@linkedin](www.linkedin.com/in/jean-philippe-couhe) - pro@jean-philippecouhe.fr


<a href='www.google.com'><img src='assets/youtube.png' height="50" width='auto'></br>
Project Link: [https://github.com/github_username/github_repo](https://github.com/github_username/github_repo)

## 😊 Acknowledgements

This readme version is inspired by NicolasBrondin

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/jpcouhe/readme-template-.svg?style=flat-square
[contributors-url]: https://github.com/jpcouhe/readme-template-/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/jpcouhe/readme-template-.svg?style=flat-square
[forks-url]: https://github.com/jpcouhe/readme-template-/network/members
[stars-shield]: https://img.shields.io/github/stars/jpcouhe/readme-template-.svg?style=flat-square
[stars-url]: https://github.com/jpcouhe/readme-template-/stargazers
[issues-shield]: https://img.shields.io/github/issues/jpcouhe/readme-template-.svg?style=flat-square
[issues-url]: https://github.com/jpcouhe/readme-template-/issues
[license-shield]: https://img.shields.io/github/license/jpcouhe/readme-template-.svg?style=flat-square
[license-url]: https://github.com/jpcouhe/readme-template-/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: example.jpg
[youtube-screenshot]: youtube.png
