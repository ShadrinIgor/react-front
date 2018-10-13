import CacheModule from 'cache-service-cache-module';
import CachePlugin from 'superagent-cache-plugin';

import requestDefaults from 'superagent-defaults';

const defaultRequestHandler = (req) => {
  if (req.url[0] === '/') {
    req.url = `${CONFIG.apiURL}${req.url}`;
  }
  //  TODO: move error handling here
  /**
   req
   .ok((response) => {
      // do stuff here
      console.log('ok', response);
      return null;
    })
   /**.on('end', () => {
    // do stuff here
      console.log('end', req);
    })
   .on('error', () => {
      // do stuff here
      console.log('error', req);
    });
   */
};

const requestDefaultsInstance = requestDefaults()
  .on('request', defaultRequestHandler);

const cacheModule = new CacheModule({
  storage: 'local',
  defaultExpiration: 5 // 60 * 30 // 60 * 60 * 24
});

const cachePlugin = CachePlugin(cacheModule);
const prune = (r) => {
  const {body} = r;
  return (body && (body.status === 200 || body.status === 404) && body.events && body.events.length === 0) ? r : null;
};
const HTTPService = (method, url, {
  pruneHeaders = []
} = {}) => requestDefaultsInstance[method.toLowerCase()](url)
  .use(cachePlugin)
  .pruneHeader(pruneHeaders)
  .prune(prune);

export default HTTPService;