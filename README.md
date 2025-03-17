# CuteCat

# Welcome to CuteCat!

Hello! My name is Jakub, and I am a fullstack developer located in Wrocław, Poland. I have created this project. If you
want to learn about this project and how to run, and use it, please continue reading.

# Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Build](#build)
- [Deployment](#deployment)
- [Credits](#credits)

# Project structure

```

CuteCat/
├── src/
│  ├── app/
│  │  ├── core/
│  │  │  ├── components/
│  │  │  │  ├── authentication/
│  │  │  │  ├── nav-bar/
│  │  │  ├── guards/
│  │  │  ├── models/
│  │  │  ├── pages/
│  │  │  │  ├── cats-page/
│  │  │  │  ├── credits-page/
│  │  │  │  ├── goal-page/
│  │  │  ├── pipes/
│  │  │  ├── services/
│  ├── assets/
│  ├── shared/
│  │  ├── components/
│  │  │  ├── cat-card/
│  │  │  ├── scroll-to-top-button/
│  │  │  ├── text-card/
│  │  ├── models/
│  │  ├── services/
│  ├── styles/
└── README.md       <--- HERE YOU ARE!
```

# Features

- Provides a user-friendly interface.
- Allows the user to log in.
- Allows the user to log out.
- Fetches and combines data from different sources.
- Provides infinite scrolling experience.
- Includes a page outlining the application goals.
- Includes a credits page.

# Installation

1. Download and install Node.js from [Node.js official website](https://nodejs.org).
2. Open command line run `npm install -g npm`
3. Go to `/CuteCat/`
4. Open a terminal in the `/CuteCat/` directory.
5. Run `npm install`
6. Start the development server by running `npm run ng serve`
7. You should see server running with the following information:

```
** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **


√ Compiled successfully.
```

# Usage

1. Open command line, go to `/CuteCat/` location, run `npm run ng serve`.
2. Open browser, navigate to http://localhost:4200/.
3. Log in to application using any credentials that match validation rules, press login button.
4. After a successful login, you will be redirected to the '/cats' page.
5. Enjoy exploring the experience!

# Build

To build the project, run `npm run ng build`. The build artifacts will be stored in the `dist/` directory.

# Tests

The application has been tested with unit tests.

- unit tests (jasmine):
    - 50 unique tests
    - Can be found across the whole folder structure.
    - Can be run using `npm run ng test` command

# Deployment

Comprehensive deployment instructions can be
found [here](https://v17.angular.io/guide/deployment#basic-deployment-to-a-remote-server).

**In short:**

1. Start with the production build: `npm run ng build`
2. Copy everything within the output folder (`dist/CuteCat/`) to a folder on the server.
3. Configure the server to redirect requests for missing files to index.html. For details on configuring redirects,
   click [here](https://v17.angular.io/guide/deployment#fallback).
   <br>OR
4. If it is a main domain skip step 3 and put content of `dist/CuteCat/browser` folder and put it
   inside `public_html/`
   folder on server

# Technologies Used

- Angular 19.2.1
- TypeScript 5.7.3
- HTML5
- SCSS

# Credits

- **Task Specification:** Thanks to [Szkoła w Chmurze Sp. z o.o.](https://szkolawchmurze.org/) for providing the task.
- **API Providers:**
    - [MeowFacts API](https://meowfacts.herokuapp.com/) – Random cat facts.
    - [The Cat API](https://api.thecatapi.com/v1/images/search) – Random cat images.
    - [Esteve Castells API](https://tools.estevecastells.com/api/cats/v1) – Random cat names.
- **Graphics Providers:**
    - [Freepik](https://www.freepik.com/) – Monstera leaf illustration.
    - [SVG Repo](https://www.svgrepo.com/svg/307465/cat-kitty-kitten-feline) – Cat SVG icon.
- *Missed attributions? Feel free to suggest changes to the repository.*
