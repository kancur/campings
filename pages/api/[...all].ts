import httpProxyMiddleware from 'next-http-proxy-middleware';
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) =>
  httpProxyMiddleware(req, res, {
    // the /api/ url is automatically captured and forwarded with the api call route
    // no need to add /api to the url manually
    target:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://campings-express.herokuapp.com',
    /* pathRewrite: [{
    patternStr: '^/api/',
    replaceStr: '/'
  }] */
  });

export const config = {
  api: {
    bodyParser: false,
  },
};
