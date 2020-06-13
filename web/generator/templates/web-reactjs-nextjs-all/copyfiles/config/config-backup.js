
import _ from 'lodash';

// environment names
export const ENV_NAME_DEVELOPMENT = 'DEV';
export const ENV_NAME_UAT = 'UAT';
export const ENV_NAME_PRODUCTION = 'PROD';

/*eslint-disable */
export const SENTRY_PRODUCTION_KEY = 'https://c037c826f1864e28a674dcba23350b4b@sentry.io/106472';
export const SENTRY_UAT_KEY = 'https://6d2bfa8c878d4905b2537647032f61c8@sentry.io/106473';
/*eslint-enable */

// apex for the various staffjoy environments
export const HTTP_PREFIX = 'http://';
export const HTTPS_PREFIX = 'https://';

export const DEVELOPMENT_HOST = 'localhost:8888';
export const UAT_HOST = 'uat.gateway.koudaibook.com';
export const PRODUCTION_HOST = 'gateway.koudaibook.com';

export const DEVELOPMENT_HOST_WEB = 'localhost:8080';
export const UAT_HOST_WEB = 'uat.koudaibook.com';
export const PRODUCTION_HOST_WEB = 'www.koudaibook.com';

function detectEnvironment() {
   const isServer = typeof window === 'undefined'
   if(isServer){return ENV_NAME_PRODUCTION;}
   let env = ENV_NAME_DEVELOPMENT;
   const url = window.location.href.toLowerCase();
   const domain = url.split('/')[2];
 
   if (domain.endsWith(PRODUCTION_HOST_WEB)) {
     env = ENV_NAME_PRODUCTION;
   } else if (domain.endsWith(UAT_HOST_WEB)) {
     env = ENV_NAME_UAT;
   }
 
   return env;
 }

function routeToMicroservice() {
   const devRoute = `${HTTP_PREFIX}${DEVELOPMENT_HOST}`;
 
   switch (detectEnvironment()) {
     case ENV_NAME_DEVELOPMENT:
       return devRoute;
 
     case ENV_NAME_UAT: // use http for demo
       return `${HTTP_PREFIX}${UAT_HOST}`;
 
     case ENV_NAME_PRODUCTION:
       return `${HTTPS_PREFIX}${PRODUCTION_HOST}`;
 
     default:
       return devRoute;
   }
 }

 function routeToWeb() {
   const devRoute = `${HTTP_PREFIX}${DEVELOPMENT_HOST}`;
 
   switch (detectEnvironment()) {
     case ENV_NAME_DEVELOPMENT:
       return devRoute;
 
     case ENV_NAME_UAT: // use http for demo
       return `${HTTP_PREFIX}${UAT_HOST_WEB}`;
 
     case ENV_NAME_PRODUCTION:
       return `${HTTPS_PREFIX}${PRODUCTION_HOST_WEB}`;
 
     default:
       return devRoute;
   }
 }
 function routeToWebRelease() {
   const devRoute = `${HTTP_PREFIX}${DEVELOPMENT_HOST}`;
 
   switch (detectEnvironment()) {
     case ENV_NAME_DEVELOPMENT:
       return devRoute;
 
     case ENV_NAME_UAT: // use http for demo
       return `${HTTP_PREFIX}${UAT_HOST_WEB}`;
 
     case ENV_NAME_PRODUCTION:
       return `${HTTPS_PREFIX}${PRODUCTION_HOST_WEB}:8080`;
 
     default:
       return devRoute;
   }
 }

module.exports = {
   current: {
      SOA_GATE:routeToMicroservice(),
      WEB_GATE:routeToWeb(),
      WEB_RELEASE:routeToWebRelease(),
   }
}




