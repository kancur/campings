import httpProxyMiddleware from "next-http-proxy-middleware"

export default (req, res) => httpProxyMiddleware(req, res, {
  // the /api/ url is automatically captured annd forwarded with the api call route
  // no need to add /api to the url manually
  target: (process.env.NODE_ENV === 'development') ? 'http://localhost:3000' : 'https://campings-express.herokuapp.com'
  /* pathRewrite: [{
    patternStr: '^/api/',
    replaceStr: '/'
  }] */
});

export const config = {
    api: {
        bodyParser: false
    }
}