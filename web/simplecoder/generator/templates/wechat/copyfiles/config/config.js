
let config={
  DEV:{
    host:"http://localhost:8888",
  },
  PROD:{
    host:"https://gateway.koudaibook.com",
  },
}
let currentEnv = "DEV";
module.exports = config[currentEnv];
