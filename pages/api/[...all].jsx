import httpProxyMiddleware from "next-http-proxy-middleware"

export default (req, res) => httpProxyMiddleware(req, res, {
  target:'https://campings-express.herokuapp.com/api',
  /* pathRewrite: [{
    patternStr: '^/api/',
    replaceStr: '/'
  }] */
});