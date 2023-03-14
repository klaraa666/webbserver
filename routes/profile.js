var express = require('express');
var router = express.Router();
const fs = require('fs');
/* GET users listing. */

/* GET home page. */
router.get('/', function(req, res, next) {

 if(req.session.userid)
    {
        res.render('profile', { title: 'Profile', username: req.session.userid });

    }else{
            res.render('login', { title: 'login' });

    }

  var users = null;

  try {
    //console.log("test")
    var rawData = fs.readFileSync('users.json');
    users = JSON.parse(rawData);
  } catch (err) {
    res.send('Error when retrieving from database');
    return;
  }

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

  var actualUser = null

  for (const user of users) {
    //console.log(user)

    if (user.id == "00000000") {
      actualUser = user
    }
  }

  if (actualUser.password != req.body.oldpassword) {
    res.render('profile',
      Object.assign(actualUser, { errorMsg: "Old password is wrong. Please try again!" }));
  } else {
    var updatedUser = {
      password: req.body.newpassword
    }
  
    addUser("00000000", updatedUser, users)
  
    save(users)
  
    res.render('profile',
    Object.assign(updatedUser, { errorMsg: "Profile info update!" }));
  }
});

function addUser(id, userToAdd, usersList) {
  var objIndex = usersList.findIndex((obj => obj.id == id));

  usersList[objIndex] = userToAdd
  usersList[objIndex].id = id;
  
  console.log(usersList)
}

function save(usersList) {
  let dataToSave = JSON.stringify(usersList);
    fs.writeFileSync('users.json', dataToSave);
}


module.exports = router;
