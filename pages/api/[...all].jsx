import httpProxyMiddleware from "next-http-proxy-middleware"

export default (req, res) => httpProxyMiddleware(req, res, {
  // the /api/ url is automatically captured annd forwarded with the api call route
  // no need to add /api to the url manually
  target:'https://campings-express.herokuapp.com',
  /* pathRewrite: [{
    patternStr: '^/api/',
    replaceStr: '/'
  }] */
});