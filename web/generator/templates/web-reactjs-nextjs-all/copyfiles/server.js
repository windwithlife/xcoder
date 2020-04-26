const express = require('express')
const next = require('next')
///const generator = require('./generator')
const port = parseInt(process.env.PORT, 10) || 8088
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
var bodyParser=require('body-parser');
const rewrite = require('express-urlrewrite');


app.prepare()
  .then(() => {
    const server = express()
    server.use(bodyParser.urlencoded({extended:true}));
    server.use(bodyParser.json());
    
    //server.use(rewrite(/^\/coder\/?(.*)/,'/$1'));
    // server.get('/a', (req, res) => {
    //   return app.render(req, res, '/b', req.query)
    // })

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
