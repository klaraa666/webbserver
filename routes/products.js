const fs = require('fs');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var loggedIn = true;

  var products = null;

  try {
    var rawData = fs.readFileSync('products.json');
    products = JSON.parse(rawData);
  } catch (err) {
    console.log(err)
    res.send('Error when retrieving from database');
    return;
  }

  if(loggedIn){
    res.render('products', { title: req.session.userid, products: products });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;