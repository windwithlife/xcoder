const express = require('express')
const next = require('next')
const generator = require('./generator')
const port = parseInt(process.env.PORT, 10) || 8080
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
var bodyParser = require('body-parser');
const rewrite = require('express-urlrewrite');

//var gitTools = require('./ci/libs/git-tool');
//var dockerTools = require('./ci/libs/docker-tool');
//var shellTools = require('./ci/libs/shell-tool');
var releaseServer = require('./ci/libs/release');



app.prepare()
  .then(() => {
    const server = express()
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());

    //server.use(rewrite(/^\/coder\/?(.*)/,'/$1'));
    // server.get('/a', (req, res) => {
    //   return app.render(req, res, '/b', req.query)
    // })
    server.all('*', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE");
      res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
      res.header("X-Powered-By",' 3.2.1')
      
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
      var params = { isUseOwnDockerFile: true, webDomainName: 'release.koudaibook.com', isSubWebSite: false, isUseOwnDeploymentFile: false, targetPath: './', name: "xci", lang: 'xcijs', type: 'web', label: 'latest', cloneUrl: 'https://github.com/windwithlifezyq/xci.git', branch: 'master' };
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
      console.log('input params:' + req.body.defines);

      var params = { isUseOwnDockerFile: false, isSubWebSite: true, isUseOwnDeploymentFile: false, targetPath: './MedialLive/server/liveserver-service/', gitUrl: 'https://github.com/windwithlife/projects.git', branch: 'master' };
      let request = req.body.defines;     
      if (req.body.repository) {
        params.name = params.codeName = req.body.repository.name;
        params.gitUrl = req.body.repository.git_url;
        params.cloneUrl = req.body.repository.clone_url;
        params.sshUrl = req.body.repository.ssh_url;
        console.log(req.body.repository);
     
      }

      params.name = request.name;
      params.path = request.path;
      params.version = request.releaseVersion?request.releaseVersion:"1.0.8";
      //params.codeName = request.name;
      params.targetPath = request.targetPath? request.targetPath:params.targetPath;
      params.sideType = request.sideType;
      params.language = request.language;
      params.framework = request.framework;
      params.platform = request.platform;
      params.serviceName = request.name;
      params.webDomainName = request.webDN;
      params.targetPath = request.targetPath?request.targetPath:params.targetPath;
      params.label = request.version;
     
      
      console.log("release request params is *****************8:", params);
      //res.send('begin to fetch source code.....')
      if (releaseServer.autoRelease(params)) {
        res.send('successful to auto release!')
      } else {
        res.send('failed to auto release!')
      }
    })

    server.get('/', function (req, res) {
      res.send('Hello,world! simple version 0.2.3')
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
