exports.VILLAGE_CAMP_MAX_DISTANCE = 20000; // metres
exports.VILLAGE_CAMP_MAX_RESULTS = 10; // items
//exports.BACKEND_HOST= 'http://localhost:3000'
//exports.BACKEND_HOST= 'http://192.168.0.200:3000'
exports.BACKEND_HOST =
  process.env.NODE_ENV == 'development'
    ? 'http://localhost:3000/api'
    : 'https://campings-express.herokuapp.com';

exports.STATIC_HOST ='https://campings-s3.s3.eu-central-1.amazonaws.com';
exports.FRONTEND_API_ROUTE =
  process.env.NODE_ENV == 'development'
    ? 'http://localhost:3000/api'
    : 'https://www.najkempy.sk/api';
