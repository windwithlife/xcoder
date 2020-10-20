
//import _ from 'lodash';

// environment names
const ENV_NAME_DEVELOPMENT = 'DEV';
const ENV_NAME_UAT = 'UAT';
const ENV_NAME_PRODUCTION = 'PROD';

/*eslint-disable */
const SENTRY_PRODUCTION_KEY = 'https://c037c826f1864e28a674dcba23350b4b@sentry.io/106472';
const SENTRY_UAT_KEY = 'https://6d2bfa8c878d4905b2537647032f61c8@sentry.io/106473';
/*eslint-enable */

// apex for the various staffjoy environments
const HTTP_PREFIX = 'http://';
const HTTPS_PREFIX = 'https://';

const DEVELOPMENT_HOST = 'localhost:9999';
const UAT_HOST = 'uat.gateway.koudaibook.com';
const PRODUCTION_HOST = 'soagateway.koudaibook.com';

const DEVELOPMENT_HOST_WEB = 'localhost:8080';
const UAT_HOST_WEB = 'uat.koudaibook.com';
const PRODUCTION_HOST_WEB = 'release.koudaibook.com';

const DEV_UPLOAD_ROOT = '/tmp/my_uploads/';
const PROD_UPLOAD_ROOT = '/tmp/my_uploads/';

function detectEnvironment() {
  let env = ENV_NAME_DEVELOPMENT;
  const isServer = typeof window === 'undefined'
  if (isServer) {
    let dev = (process.env.NODE_ENV !== 'production');
    if (dev) {
      return ENV_NAME_DEVELOPMENT;;
      
    } else {
      return ENV_NAME_PRODUCTION;
    }
  } else {
    const url = window.location.href.toLowerCase();
    const domain = url.split('/')[2];

    if (domain.endsWith(PRODUCTION_HOST_WEB)) {
      env = ENV_NAME_PRODUCTION;
    } else if (domain.endsWith(UAT_HOST_WEB)) {
      env = ENV_NAME_UAT;
    }

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
      return `${HTTP_PREFIX}${PRODUCTION_HOST}`;

    default:
      return devRoute;
  }
}

function routeToWeb() {
  const devRoute = `${HTTP_PREFIX}${DEVELOPMENT_HOST_WEB}`;

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
  const devRoute = `${HTTP_PREFIX}${DEVELOPMENT_HOST_WEB}`;

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

function uploadRoot() {
  const rootPath = `${DEV_UPLOAD_ROOT}`;

  switch (detectEnvironment()) {
    case ENV_NAME_DEVELOPMENT:
      return rootPath;
    case ENV_NAME_PRODUCTION:
      return `${PROD_UPLOAD_ROOT}`;

    default:
      return rootPath;
  }
}


module.exports = {
  current: {
    SOA_GATE: routeToMicroservice(),
    WEB_GATE: routeToWeb(),
    WEB_RELEASE: routeToWebRelease(),
    UPLOAD_PATH: uploadRoot(),
    RESOURCE_PATH: "/xcoder",
    DOCKER_REPO: "registry.cn-hangzhou.aliyuncs.com/windwithlife/",
   }
}

