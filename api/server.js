require('dotenv-safe').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const passport = require('passport')
const app = express()
const i18n = require('i18n')
const initMongo = require('./config/mongo')
const path = require('path')
var multer  =   require('multer');
app.set('port', process.env.PORT || 3000)

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
global.__basedir = __dirname;
global.__upload_path = process.env.UPLOAD_PATH;

if (process.env.USE_REDIS === 'true') {
  const getExpeditiousCache = require('express-expeditious')
  const cache = getExpeditiousCache({
    namespace: 'expresscache',
    defaultTtl: '1 minute',
    engine: require('expeditious-engine-redis')({
      redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
      }
    })
  })
  app.use(cache)
}

app.use(
  bodyParser.json({
    limit: '2000mb'
  })
)

app.use(
  bodyParser.urlencoded({
    limit: '2000mb',
    extended: true
  })
)

i18n.configure({
  locales: ['en', 'es'],
  directory: `${__dirname}/locales`,
  defaultLocale: 'en',
  objectNotation: true
})

app.use(i18n.init)
app.use(cors())
app.use(passport.initialize())
app.use(compression())
app.use(helmet())
app.use(express.static('public'))
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use(require('./app/routes'))
app.listen(app.get('port'))

initMongo()

module.exports = app
