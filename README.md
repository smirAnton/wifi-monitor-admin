<a href="https://codemotion.ninja/"><img src="https://api.backendless.com/92328B54-B899-BA32-FF0C-7641B380A300/A31C66CD-3A4F-5A2C-FF6B-EC56487A4800/files/wifi-monitor/wfm_logo.png" alt="Markdownify" width="100"></a>
    <a href="https://codemotion.ninja/"><img src="https://api.backendless.com/92328B54-B899-BA32-FF0C-7641B380A300/A31C66CD-3A4F-5A2C-FF6B-EC56487A4800/files/wifi-monitor/wfm_name.png" alt="Markdownify" width="400"></a>
<br>
<br>

# WiFi Monitor Maintenance Panel Api

Server provides ability to manage all wfm devices.

## Api Documentation

Api documentation is available at: <a href="http://192.241.189.225/api-doc">`api-doc`</a>
* username: `wfm`
* password: `wfm-apidoc`

## Authentication

Administrator credentials to access the production maintenance panel:
* username: `admin`
* password: `adminsifr`

## Running server in Development mode

To launch server in development mode please do following steps:  

1. Clone project: `git clone git@github.com:Sifrsolutions/Maintenance-Panel-API.git maintenance-panel-api`
2. Go to project's root folder: `cd maintenance-panel-api`
3. Install dependencies: `yarn` or `npm install`
4. Run server: `npm start` or `yarn start`

## Running server in Production mode

To launch server in production mode please do following steps:  

1. Clone project: `git clone git@github.com:Sifrsolutions/Maintenance-Panel-API.git maintenance-panel-api`
2. Go to project's root folder: `cd maintenance-panel-api`
3. Install dependencies: `yarn` or `npm install`
4. Run server: `pm2 start runner.js`

## Features

* In order to check code style use: `npm run lint`.  
* If you want to commit without code style checking, use: `git commit -m "Some commit" --no-veriry`  
* In order to generate latest apiDoc use: `npm run doc`  

## Built With

* [Express](https://expressjs.com/) - Node.js framework
* [Mongo](https://www.mongodb.com) - Mongo database
* [Npm](https://www.npmjs.com/) - Dependency Management

## Continuous Integration

* In order to update `development` stage of maintenance panel, please push changes into `dev` branch

## Requirements

* Node version >= 8.2.1  
* NPM version >= 5.3.0

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Authors

* **Anton Smirnov** - *Initial work* - [smiranton](https://github.com/smiranton)
