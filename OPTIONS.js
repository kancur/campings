exports.VILLAGE_CAMP_MAX_DISTANCE = 20000 // metres
exports.VILLAGE_CAMP_MAX_RESULTS = 10 // items
//exports.BACKEND_HOST= 'http://localhost:3000'
//exports.BACKEND_HOST= 'http://192.168.0.200:3000'
exports.BACKEND_HOST = 'https://campings-express.herokuapp.com'
exports.FRONTEND_API_ROUTE = (process.env.NODE_ENV == 'development') ? 'http://localhost:3000' : 'https://www.najkempy.sk/api'