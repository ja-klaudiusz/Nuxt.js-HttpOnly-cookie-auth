const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
app.use(cookieParser());
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  
  app.use(bodyParser.urlencoded({ extended: false })) 
  app.use(bodyParser.json())
  
  app.post('/auth/me', (req, res) => { 
    res.json(req.body)
  }) 

  app.post('/auth/login', (req, res) => {
    if (req.body.login === 'demo' && req.body.password === 'demo') {
      const expirationTime = new Date(Date.now() + 20000)
      const auth = {
        t: 'somejwtauthtoken',
        te: expirationTime,
        u: 'demo'
      }
      res.cookie('utrbx', JSON.stringify(auth), { expires: expirationTime, httpOnly: true }).json(auth);     
    } else {
      res.status(401).json({ message: 'Bad credentials' }) 
    }
  })

  app.post('/auth/logout', (req, res) => {
    res.cookie('utrbx','', { expires: new Date(Date.now()), httpOnly: true }).json({ ok: true });
  }) 

  app.use(nuxt.render)
  
  app.listen(port, host)

  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
