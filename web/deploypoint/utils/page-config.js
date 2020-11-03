
const isServer = typeof window === 'undefined';
let getConfig = require('next/config').default;
let pageConfig = require('../config/application');
console.log(getConfig);
// environment names
const CONFIG_PREFIX  = "application-";
const CONFIG_SUFFIX  =".yaml";

const ENV_DEVELOPMENT = 'DEV';
const ENV_UAT = 'UAT';
const ENV_PRODUCTION = 'PROD';

function detectEnvironment() {
  let env = ENV_DEVELOPMENT;
  if(isServer){
    if (process.env.NODE_ENV === 'production') {
      env = ENV_PRODUCTION;
    } else if (process.env.NODE_ENV === 'uat'){
      env = ENV_UAT;
    }
  }else{
    const envName = getConfig().publicRuntimeConfig.envName;
    console.log("***********env name is:" + envName);
    if(envName){env = envName;}
  }
  console.log(env);
  return env;
}
function getConfigOption(){
   const envName = detectEnvironment();
   //console.log(envName);
   //console.log(pageConfig);
   let configOption  =  pageConfig[envName];
   console.log(configOption);
   const current = {
  ENV_NAME: envName, // detectEnvironment(),
  SOA_GATE: configOption.servers.soaServer,
  //WEB_GATE: configOption.servers.releaseServer,
  //WEB_RELEASE: configOption.servers.releaseServer,
  MQTT_SERVER: configOption.servers.mqServer,
  }
  return current;
}
module.exports = getConfigOption();

// export const current = {
//   ENV_NAME: detectEnvironment(),
//   SOA_GATE: getConfigOption().servers.soaServer,
//   WEB_GATE: getConfigOption().servers.releaseServer,
//   WEB_RELEASE: getConfigOption().servers.releaseServer,
//   MQTT_HOST: getConfigOption().servers.mqServer,
//   RESOURCE_PATH: getConfigOption().application.service.contextPath,
//   DOCKER_REPO: getConfigOption().repositories.docker,
// };
// module.exports = {
//   current: {
//   ENV_NAME: detectEnvironment(),
//   SOA_GATE: getConfigOption().servers.soaServer,
//   WEB_GATE: getConfigOption().servers.releaseServer,
//   WEB_RELEASE: getConfigOption().servers.releaseServer,
//   MQTT_HOST: getConfigOption().servers.mqServer,
//   RESOURCE_PATH: getConfigOption().application.service.contextPath,
//   DOCKER_REPO: getConfigOption().repositories.docker,
//   }
// }
