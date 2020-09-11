const express = require('express')
const next = require('next')
const generator = require('./generator')
const port = parseInt(process.env.PORT, 10) || 8080
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
var bodyParser = require('body-parser');
var config = require('./config/config');
var fileupload = require('./utils/fileupload').fileupload;

const rewrite = require('express-urlrewrite');
var releaseServer = require('./ci/libs/release');
var uploadRootPath = config['current'].UPLOAD_PATH;
console.log("current upload root path"  + uploadRootPath);

var messageClient = require('./ci/libs/message_client');

const axios = require('axios');
  
console.log('test axios**********************');
axios.get('http://soagateway.koudaibook.com/xcoder/buildrecord/updateReleaseStatus?releaseId=55&status=start')
 .then(response => {
  console.log(response.data);
 })
 .catch(error => {
  console.log(error);
 });

app.prepare()
  .then(() => {
    const server = express()
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());
    server.use('/images',express.static(uploadRootPath));
    // server.use(rewrite(/^\/coder\/?(.*)/, '/$1'));
    // server.get('/a', (req, res) => {
    //   return app.render(req, res, '/b', req.query)
    // })
    server.all('*', function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE");
      res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
      next();
    });


    server.get('/generateCode', (req, res) => {
      console.log(req.query);
      generator.init(true);
      generator.generate(req.query.lan, req.query.type, req.query.subtype, req.query.withFramework);
      res.sendStatus(200)
      //return app.render(req, res, '/a', req.query)
    })

    server.get('/generateCodeByProjectId/', (req, res) => {
      //console.log('generator message!!!!');
      console.log(req.query);
      generator.init(false, req.query);
      generator.generate(req.query);
      res.sendStatus(200)
    })
    server.post('/generateCodeByProjectId/', (req, res) => {
      console.log('generator params------------');
      console.log(req.body);
      //generator.initByQuery(req.body);
      //generator.generate(req.body);
      generator.generateByQuery(req.body);
      res.sendStatus(200)
    })
    server.post('/generateCodeByDefine', (req, res) => {
      console.log(req);
      generator.init(false, req.body);
      generator.generate(req.query.lan, req.query.type, req.query.subtype, req.query.withFramework);

      res.sendStatus(200);
    });

    server.post('/gitPushHook', (req, res) => {
      console.log(req.body);
      res.sendStatus(200)
    });



    server.post('/gitPushEventXCI/', function (req, res) {
      var params = { releaseType: "prod",isUseOwnDockerFile: true, webDomainName: 'release.koudaibook.com', isSubWebSite: false, isUseOwnDeploymentFile: false, targetPath: './', name: "xci", lang: 'xcijs', type: 'web', label: 'latest', cloneUrl: 'https://github.com/windwithlifezyq/xci.git', branch: 'master' };
      if (req.query.name) {
        params.name = req.query.name;
      }
      if (req.query.webDN) {
        params.webDomainName = req.query.webDN;
      }
      if (req.body.repository) {
        params.name = req.body.repository.name;
        params.gitUrl = req.body.repository.git_url;
        params.cloneUrl = req.body.repository.clone_url;
        params.sshUrl = req.body.repository.ssh_url;

      }
      console.log("release params is :", params);
      if (releaseServer.autoRelease(params)) {
        
        res.send('successful to auto release!')
      } else {
        res.send('failed to auto release!')
      }

    })
    server.post('/releaseByParams/', function (req, res) {
      console.log("begin deploy project-------------")
      console.log('current directory is:' + process.cwd());
      console.log(req.body.defines);

      var params = { releaseType: "prod",isUseOwnDockerFile: false, isSubWebSite: true, useOwnDeploymentFile: false, targetPath: './MedialLive/server/live-svc/', gitUrl: 'https://github.com/windwithlife/projects.git', branch: 'master' };
      let request = req.body.defines;
      let buildRecord = req.body.buildRecord;
      if (req.body.repository) {
        params.name = params.codeName = req.body.repository.name;
        params.gitUrl = req.body.repository.git_url;
        params.cloneUrl = req.body.repository.clone_url;
        params.sshUrl = req.body.repository.ssh_url;
        console.log(req.body.repository);

      }
      if(request.repository){
        params.gitUrl = request.repository;
      }
      if(request.releaseType){
        params.releaseType = request.releaseType;
      }
      console.log("Current repo url:" + params.gitUrl);

      params.name = request.name;
      params.isLib = request.isLib;
      params.useOwnDeploymentFile = request.useOwnDeploymentFile;
      params.useOwnDockerFile = request.useOwnDeploymentFile;
      params.applicationName = request.applicationName;
      params.path = request.path;
      params.version = request.releaseVersion ? request.releaseVersion : "1.0.8";
      //params.codeName = request.name;
      params.targetPath = request.targetPath ? request.targetPath : params.targetPath;
      params.sideType = request.sideType;
      params.language = request.language;
      params.framework = request.framework;
      params.platform = request.platform;
      params.serviceName = request.name;
      params.webDomainName = request.webDN;
      params.domainName = request.domainName;
      params.targetPath = request.targetPath ? request.targetPath : params.targetPath;
      params.label = params.version;
      params.buildId = buildRecord.id;


      console.log("release request params is *****************8:", params);
      //res.send('begin to fetch source code.....')
      
      if (releaseServer.autoRelease(params)) {
        messageClient.updateReleaseStatus(buildRecord.id, "success");
        res.send('successful to auto release!')    
      } else {
        messageClient.updateReleaseStatus(buildRecord.id, "failure");
        res.send('failed to auto release!')
      }
    })


    server.post('/profile', fileupload.single('avatar'), function (req, res, next) {
      // req.file is the `avatar` file
      // req.body will hold the text fields, if there were any
      console.log('[upload filename:' + JSON.stringify(req.file) + "]");
      res.json({
        code: true,
        filename: req.file.filename,
        path: "/images/" + req.file.filename,//req.file.path,
        msg: '上传成功'
      });
    });

    server.post('/imageupload', fileupload.single('imagefile'), function (req, res, next) {
      // req.file is the `avatar` file
      // req.body will hold the text fields, if there were any
      console.log('[upload filename:' + JSON.stringify(req.file) + "]");
      res.json({
        code: true,
        filename: req.file.filename,
        path: "/images/" + req.file.filename,//req.file.path,
        msg: '上传成功'
      });
    });
    server.get('/download', function (req, res) {
      let filename = req.query.filename;
      if (!filename){
        filename =  req.body.files;
      }
      let fileFullName = "/tmp/my-uploads/" +filename;
      res.download(fileFullName, err=>{
        if(err){
          res.send("failed to download");
        }else{
          //res.send("success to download");
        }
      })
     
      //res.send('Hello,world! simple version 0.2.3')
    })

    // server.get('/', function (req, res) {
    //   res.send('Hello,world! simple version 1.0.0')
    // })

    server.get('/test/', function (req, res) {
      res.send('Hello,world! just for testing!');
    })
    // server.get('/initK8s', function (req, res) {
    //   let script = "/bin/sh ./initK8s-master.sh";
    //   shellTools.execScript(script);
    //   res.send('Hello,K8s!')
    // })



    // server.get('/test', function (req, res) {
    //   //dockerTools.releasdockerTools.release2K8sCloud(params.name,params.label,params.type);
    //   dockerTools.release2K8sCloud("coder", "latest", "soa");

    //   res.send('Hello,world! test!');
    // })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })


  console.log("starting to register mysefl");
