const fs = require('fs');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register', username:'username' });
});




router.post('/', function(req, res, next) {

    var users = null;

    try {
        var rawData = fs.readFileSync('users.json');
        users = JSON.parse(rawData);
    } catch (err) {
        res.send('Error when retrieving from database');
        return;
    }

    var newUser = {
        username: req.body.username,
        password: req.body.password
    }

    users.push(newUser);
    let dataToSave = JSON.stringify(users);

    fs.writeFileSync('users.json', dataToSave);

    res.render('/', { title: Express});
});

module.exports = router;