const express = require('express')
const next = require('next')
///const generator = require('./generator')
const port = parseInt(process.env.PORT, 10) || 8080
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
var bodyParser = require('body-parser');
const rewrite = require('express-urlrewrite');
var config = require('./config/config');
var uploadRootPath = config['current'].UPLOAD_PATH;
console.log("current upload root path"  + uploadRootPath);
var fileupload = require('./utils/fileupload').fileupload;


app.prepare()
  .then(() => {
    const server = express()
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());
    server.use('/images',express.static(uploadRootPath));
    //server.use(rewrite(/^\/coder\/?(.*)/,'/$1'));
    // server.get('/a', (req, res) => {
    //   return app.render(req, res, '/b', req.query)
    // })
    server.use(function (req, res, next) {
      req.url = req.originalUrl.replace('MedicalLive/_next', '_next');
      next(); // be sure to let the next middleware handle the modified request. 
    });

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

    server.get('/test', (req, res) => {
      console.log(req.body);
      res.sendStatus(200)
    });
    ;

    server.get('/posts/:id', (req, res) => {
      console.log('poes');
      return app.render(req, res, '/posts', { id: req.params.id })
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
