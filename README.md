# REST API with Google OAuth Login
This is a testing project to demonstrate REST API with Google OAuth2

## Process flow 
```
HTTP Endpoint <-> Middleware <-> Controller <-> Services <-> Database
```
## Project Structure
```
.
├───backend
│   ├───config
│   └───src
│       ├───controller  
│       ├───middleware
│       ├───models
│       ├───schema
│       ├───service
│       ├───utils
│       └───__tests__
├───frontend
|   ├───pages
|   ├───public
|   ├───styles
|   └───utils
└─── package.json 
```
## Step By Step - Instructions 
### Please go to the config folder inside the backend folder `(./backend/config)` and update the `default.ts` & `test.ts` with the `dbUri` of `MongoDB (main database)` & the `cacheUri` of `Redis (Cache)`. Again update `publicKey, privateKey, googleClientId & googleClientSecret` with your one in both files.

### Installation
Install the dependencies from the root directory of the project.
```bash
npm run install-dep
```
### Run
To run the project from the root directory of the project.
```bash
npm run dev
```
It will start the backend as well as a basic front for the Google OAuth2. Please open your browser, paste the endpoints and hit enter. 

#### Frontend Endpoint
This is for Google OAuth2 API
```bash
http://localhost:3000/
```
#### Backend Endpoint
For address API, please place your address instead of ***YOUR_ADDRESS***
```bash
http://localhost:1337/api/address/{YOUR_ADDRESS}
```
For weather API, please place your address instead of ***YOUR_ADDRESS***
```bash
http://localhost:1337/api/weather/{YOUR_ADDRESS}
```
### Test
Run to some very basic tests
```bash
npm run test
```

## Thank you!
