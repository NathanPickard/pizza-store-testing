// section 4.2.3 install (using npm install --save)
// section 4.2.4 import express
var express = require('express');
var app = express();

// section 4.2.4 allow any origin, also known as CORS, to allow for
// local development testing. CORS is an issue in some browsers so
// this step is necessary.
app.all('/*', function(req, res, next) {
  console.log('request made for: %s', req.originalUrl);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS,DELETE');
  next();
});

// section 4.2.5 implement placeOrder
app.post('/order/place', function placeOrder(request, response) {
  response.status(200);
  response.send({
    id: 1,
    status: 'in progress'
  });
});

// section 4.4
app.get('/order/coupon', function getCoupon(request, response) {
  response.status(200);
  response.send({
    text: 'buy 1 pizza get the 2nd free!',
    couponCode: 'TWOPIZZAS'
  })
});

// section 4.2.10 implement getOrderStatus
var orderStep = 1;
app.get('/order/:id/status', function getOrderStatus(request, response) {
  var orderStatus;
  switch (orderStep) {
    case 1:
      orderStatus = 'not ordered';
      break;
    case 2:
      orderStatus = 'in progress';
      break;
    default:
      orderStatus = 'complete';
  }
  orderStep += 1;

  response.status(200);
  response.send({
    status: orderStatus
  });
});


// section 4.2.4 start app
var server = app.listen(9999, function() {
  var address = server.address();
  console.log('api server started: http://%s:%s', address.address, address.port);
});
