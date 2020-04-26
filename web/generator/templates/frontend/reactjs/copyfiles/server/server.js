const express = require('express')
const next = require('next')
const generator = require('./generator')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
var bodyParser=require('body-parser');


app.prepare()
  .then(() => {
    const server = express()
    server.use(bodyParser.urlencoded({extended:true}));
    server.get('/a', (req, res) => {
      return app.render(req, res, '/b', req.query)
    })

    server.get('/generateCode', (req, res) => {
        console.log(req.query);
        generator.init(true);
        generator.generate(req.query.lan,req.query.platform,req.query.withFramework);
        res.sendStatus(200)
        //return app.render(req, res, '/a', req.query)
    })

    server.post('/generateCodeByDefine', (req, res) => {
        console.log(req.body);
        generator.init(false,req.body);
        generator.generate(req.query.lan,req.query.platform,req.query.withFramework);
        res.sendStatus(200)
    });

    server.post('/gitPushHook', (req, res) => {
        console.log(req.body);
        res.sendStatus(200)
    });
;

    server.get('/posts/:id', (req, res) => {
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
