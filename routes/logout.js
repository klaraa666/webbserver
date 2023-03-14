var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('logout', { title: 'Logout' });
  req.session.destroy();
});

module.exports = router;
