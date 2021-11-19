exports.VILLAGE_CAMP_MAX_DISTANCE = 20000; // metres
exports.VILLAGE_CAMP_MAX_RESULTS = 10; // items
//exports.BACKEND_HOST= 'http://localhost:3000'
//exports.BACKEND_HOST= 'http://192.168.0.200:3000'


//const LOCALHOST_URL = 

// flag for testing on smartphone
// true --> enables basic api requests, but fails on CORS
// true --> makes the login/current_user fail on localhost
const DEV_SMARTPHONE_FLAG = true;
const LOCALHOST_URL = DEV_SMARTPHONE_FLAG ? 'http://192.168.0.200:3000' : 'http://localhost:3000'


// nextjs is okay to connect directly to backend
exports.BACKEND_HOST =
  process.env.NODE_ENV == 'development'
    ? LOCALHOST_URL
    : 'https://campings-express.herokuapp.com';

// frontend requests have to be routed through a proxy at /api
exports.FRONTEND_API_ROUTE =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:3001/api`
    : 'https://www.najkempy.sk/api';

exports.STATIC_HOST = 'https://campings-s3.s3.eu-central-1.amazonaws.com';
