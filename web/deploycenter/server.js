
const express = require('express')
const next = require('next')
let https = require('https');
//let fs = require('fs');
const port = parseInt(process.env.PORT, 10) || 8080
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
var bodyParser = require('body-parser');
//var config = require('./utils/config');
var messageClient = require('./store/message-client');



app.prepare()
  .then(() => {
    const server = express()
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());
    

    server.all('*', function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE");
      res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
      next();
    });

    
    server.post('/gitPushHook', (req, res) => {
      console.log(req.body);
      res.sendStatus(200)
    });



    // server.post('/gitPushEventXCI/', function (req, res) {
    //   var params = { releaseType: "prod",isUseOwnDockerFile: true, webDomainName: 'release.koudaibook.com', isSubWebSite: false, isUseOwnDeploymentFile: false, targetPath: './', name: "xci", lang: 'xcijs', type: 'web', label: 'latest', cloneUrl: 'https://github.com/windwithlifezyq/xci.git', branch: 'master' };
    //   if (req.query.name) {
    //     params.name = req.query.name;
    //   }
    //   if (req.query.webDN) {
    //     params.webDomainName = req.query.webDN;
    //   }
    //   if (req.body.repository) {
    //     params.name = req.body.repository.name;
    //     params.gitUrl = req.body.repository.git_url;
    //     params.cloneUrl = req.body.repository.clone_url;
    //     params.sshUrl = req.body.repository.ssh_url;

    //   }
    //   console.log("release params is :", params);
    //   if (releaseServer.autoRelease(params)) {
        
    //     res.send('successful to auto release!')
    //   } else {
    //     res.send('failed to auto release!')
    //   }

    // })
    

    server.get('/test/', function (req, res) {
      res.send('Hello,world! just for testing!');
    })
    


    server.get('*', (req, res) => {
      return handle(req, res)
    })



    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })

  });


  messageClient.onCreate(function(message){
    console.log("oncreate:" + message);
    //messageClient.sendLogs({status:"started!!!"});
    //messageClient.sendMsg('ci/simple/point/pointa/'"Ready to excute the CI command!!")
  });
  messageClient.setCallback("ci/simple/center/server/#", function(request)
  {
      console.log("release request params is *****************:"+ JSON.stringify(request));
  });
  console.log("starting to register myself");
