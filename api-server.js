var express = require('express');
var app = express();

app.all('/*', function(req, res, next) {
  console.log('request made for: %s', req.originalUrl);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS,DELETE');
  next();
});

app.post('/order/place', function placeOrder(request, response) {
  response.status(200);
  response.send({
    id: 1,
    status: 'in progress'
  });
});

// app.get('/order/coupon', function getCoupon(request, response) {
//   response.status(200);
//   response.send({
//     text: 'buy 1 pizza get the 2nd free!',
//     couponCode: 'TWOPIZZAS'
//   })
// });

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


var server = app.listen(9999, function() {
  var address = server.address();
  console.log('api server started: http://%s:%s', address.address, address.port);
});
