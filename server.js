var express = require('express')
var config = require('./config/index')

var port =process.env.PORT || config.build.port

var app = express()

var router = express.Router()

router.get('/',function (req,res,next) {
  req.url = '/index.html';
  next()
})

app.use(router)

var apiDada = require('./data.json');
var apiRouter = express.Router();
var seller =apiDada.seller;
var goods = apiDada.goods;
var ratings = apiDada.ratings;

apiRouter.get('/seller',function (req,res) {
  res.json({
    erron:0,
    data:seller
  })
} )

apiRouter.get('/goods',function (req,res) {
  res.json({
    erron:0,
    data:goods
  })
} )

apiRouter.get('/ratings',function (req,res) {
  res.json({
    erron:0,
    data:ratings
  })
} )


var app = express()

app.use('/api',apiRouter);
app.use(express.static('./dist'))
module.exports = app.listen(port,function () {
  console.log('success')
})
