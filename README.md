## Description of the app
homerental is a small app which enables users to manage their flat bookings

## Features
* [x] User can register into the app and see dashboard - Client
* [x] User can register into the app - Server
* [x] User can login into the app and see dashboard - Client
* [x] User can login into the app - Server

* [ ] User can delete a houseProfile - Server
* [ ] User can edite a houseProfile - Server
* [ ] User can edite a houseProfile - Server
* [ ] User can edite a houseProfile - Client

## Tech
- Webpack as module bundler and client dev server
- React as library
- Redux as a state manager
- NodeJs for the server
- MongoDB as DB
- Eslint, prettier and husky as precommit hook

## Requirements

- NodeJS, version 10 is recommended
- NPM, minimum version 5

---

## Installation

1. Clone the repository to your machine: `git clone REPO-URL` where `REPO-URL` is provided by GitHub.
1. To install server dependencies `cd home-rental && npm install`
2. To install client dependencies `cd client && npm install`

---

## Running in developement
__homeRental app:__
- In root folder `npm run dev` in order to make both client and server run concurently
- To test authentication you need to add your MongoDB credentials in config/default.json. If you don't have any create an account.
- NB: Client is using a proxy to server port for asynchronous requests
---

