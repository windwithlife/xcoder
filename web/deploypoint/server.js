
const express = require('express')
//const next = require('next')
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const config = require('./utils/server-config');
const releaseServer = require('./ci/libs/release');
const messageClient = require('./store/message-point');
let serverPort = config.APPLICATION.port;
const port = serverPort || parseInt(process.env.PORT, 10) || 8080;
const dev = process.env.NODE_ENV !== 'production'
//const app = next({ dev })
//const handle = app.getRequestHandler()



// app.prepare()
//   .then(() => {
const server = express()
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());


server.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});


server.post('/gitAutoDeployment/', function (req, res) {
  var params = { releaseType: "prod", isUseOwnDockerFile: true, webDomainName: 'release.koudaibook.com', isSubWebSite: false, isUseOwnDeploymentFile: false, targetPath: './', name: "xci", lang: 'xcijs', type: 'web', label: 'latest', cloneUrl: 'https://github.com/windwithlifezyq/xci.git', branch: 'master' };
  if (req.query.name) {
    params.name = req.query.name;
  }
  if (req.query) {
    console.log(req.query);
  }
  if (req.body.repository) {
    params.name = req.body.repository.name;
    params.gitUrl = req.body.repository.git_url;
    params.cloneUrl = req.body.repository.clone_url;
    params.sshUrl = req.body.repository.ssh_url;
    console.log("post body =====>")
    console.log(req.body)
  }
  console.log("release params is =====>", params);

})


server.get('/test/', function (req, res) {
  res.send('Hello,world! just for testing!');
})



server.listen(port, (err) => {
  if (err) throw err
  console.log(`> Ready on http://localhost:${port}`)
})

//messageClient.connect();
messageClient.onConnect(function (message) {
  //messageClient.sendLogs({info:"Finished to create deployment point!"});
  //messageClient.registerPoint({command:"register",params:{name:"pointa",active:"true",status:"running",locationTopic:"ci/simple/point/pointa/",supportType: "k8s", supportActions:["build", "deploy"] }});
});
messageClient.onExecute(function (topic, msg) {
  console.log(topic);
  //console.log(msg);
  deployApplication(msg);
});
messageClient.registerPoint({ command: "register", params: { name: "pointa", active: "true", status: "running", locationTopic: "ci/simple/point/pointa/", supportType: "k8s", supportActions: ["build", "deploy"] } });
messageClient.updateReleaseStatus(0, "starting phase1....");

function deployApplication(msg) {
  let request = msg.params;
  console.log("begin deploy project-------------")
  console.log(request);
  //console.log("release request params is *****************8:", request);
  messageClient.updateReleaseStatus(33, "starting phase2....");
  let params = { releaseType: 'UAT' };
  params.releaseType = request.envType;
  params.version = request.releaseVersion ? request.releaseVersion : 'V1.0';
  params.useOwnDeploymentFile = request.useOwnDeploymentFile;
  params.buildId = request.id;
  params.buildNumber = request.buildNumber;
  params.imageLabel = request.imageLabel;
  if (!params.buildNumber) {
    let timestamp = Date.parse(new Date());
    params.buildNumber = timestamp;
  }

  console.log(params.buildNumber);
  //应用相关信息
  params.name = request.projectInfo.name;
  params.applicationName = request.applicationInfo.applicationName;
  params.serviceName = params.applicationName;
  params.domainName = request.domainName;
  params.path = request.applicationInfo.path;
  params.applicationType = request.applicationTypeInfo;
  params.projectInfo = request.projectInfo;


  //source code info
  if (request.deploymentConfig) {

    params.gitUrl = request.deploymentConfig.repository;
    params.targetPath = request.deploymentConfig.targetPath;
    params.repositoryBranch = request.deploymentConfig.repositoryBranch;


  }

  //group and support mesh and actions
  params.supportMesh = request.supportMesh;

  if (msg.command === "execute") {
    if (releaseServer.autoRelease(params)) {
      messageClient.updateReleaseStatus(request.id, "finish", request.envType);
    } else {
      messageClient.updateReleaseStatus(request.id, "error", request.envType);
    }

  } else if (msg.command === 'buildImage') {
    if (releaseServer.buildImage(params)) {
      messageClient.updateReleaseStatus(request.id, "finish", "IMAGE");
    } else {
      messageClient.updateReleaseStatus(request.id, "error", "IMAGE");
    }
  } else if (msg.command === 'deployToGroups') {
    if (releaseServer.deployImageToGroups(params)) {
      messageClient.updateReleaseStatus(request.id, "finish", request.envType);
    } else {
      messageClient.updateReleaseStatus(request.id, "error", request.envType);
    }
  }



}
console.log("starting release point");
