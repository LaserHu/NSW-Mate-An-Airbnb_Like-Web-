# NSW-Mate

Visit NSW, use https://nswmate.online


## BACKEND
### 1. run database
   on MacOS
   
    ``mysql.server start``
    
   on Linux
   
    ``mysql start``
    
### 2. run backend
   #### install dependencies
    mvn install
   #### run spring boot
    mvn spring-boot: run


## FRONTENT
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm install`

Install dependency packages for react project

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## FAQ

### 1. spring boot build fail
    please check your error information and make sure that MySQL must be running at background. File storage at backend need supports from Amazon S3, as a result, these functions related to upload and download file requires internet availability.
