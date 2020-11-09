
const isServer = typeof window === 'undefined';
let getConfig = require('next/config').default;
let pageConfig = require('../config/application');
console.log(getConfig);
// environment names
const CONFIG_PREFIX = "application-";
const CONFIG_SUFFIX = ".yaml";

const ENV_DEVELOPMENT = 'DEV';
const ENV_UAT = 'UAT';
const ENV_PRODUCTION = 'PROD';

function detectEnvironment() {
  let env = ENV_DEVELOPMENT;
  if (isServer) {
    if (process.env.NODE_ENV === 'production') {
      env = ENV_PRODUCTION;
    } else if (process.env.NODE_ENV === 'uat') {
      env = ENV_UAT;
    }
  } else {
    const envName = getConfig().publicRuntimeConfig.envName;
    console.log("***********env name is:" + envName);
    if (envName) { env = envName; }
  }
  console.log(env);
  return env;
}
function getConfigOption() {
  const envName = detectEnvironment();
  let configOption = pageConfig[envName];
  console.log(configOption);
  const soaUrl = configOption.servers.soaServer.schema + '://' + configOption.servers.soaServer.host + ':' + configOption.servers.soaServer.port + '/';


  const current = {
    APPLICATION: configOption.application,
    ENV_NAME: envName,
    SOA_GATE: configOption.servers.soaServer,
    SOA_URL: soaUrl,
    MQTT_SERVER: configOption.servers.mqServer,
  }
  return current;
}
module.exports = getConfigOption();

