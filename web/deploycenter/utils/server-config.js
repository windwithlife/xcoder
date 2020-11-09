
const isServer = typeof window === 'undefined';
const yaml = require('js-yaml');

  const fs = require('fs');
  let path = require('path');


let getConfig = require('next/config');

const CONFIG_PREFIX  = "application-";
const CONFIG_SUFFIX  =".yaml";

const ENV_DEVELOPMENT = 'DEV';
const ENV_UAT = 'UAT';
const ENV_PRODUCTION = 'PROD';

function detectEnvironment() {
  let env = ENV_DEVELOPMENT;
  
  
    if (process.env.NODE_ENV === 'production') {
      env = ENV_PRODUCTION;
    } else if (process.env.NODE_ENV === 'uat'){
      env = ENV_UAT;
    }
 
  return env;
}
function getConfigOption(){
   const envName = detectEnvironment();
   const configPath = path.join(process.cwd(), "/config/");
   let configOption = {};
  
    const configFile = path.join(configPath, CONFIG_PREFIX + envName.toLowerCase() + CONFIG_SUFFIX);
    configOption = yaml.safeLoad(fs.readFileSync(configFile, 'utf8'));
    console.log(configOption);
     
  

   const current = {
  ENV_NAME: detectEnvironment(),
  SOA_GATE: configOption.servers.soaServer,
  MQTT_HOST: configOption.servers.mqServer,
  RESOURCE_PATH: configOption.application.service.contextPath,
  DOCKER_REPO: configOption.repositories.docker,
  }
  return current;
}
module.exports = getConfigOption();

