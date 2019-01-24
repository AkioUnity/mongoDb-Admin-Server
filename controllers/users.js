const Users = require("./../models/user.model");

exports.getUsers = function (req, res, next) {  
    let id = req.body._id?req.body._id:'';
    let username = req.body.username?req.body.username:'';
    let email = req.body.email?req.body.email:'';
    let name = req.body.name?req.body.name:'';

    console.log(req.body);
    if(id){
        Users.findById(id, (err, user) => {
            //convert string to to array
            let users = [];
            users.push(user);
            if(err){
            return next(err);
            } 
            res.status(200).json({users: users});
        }) 
    }
    else{
        var query = null;
        query = {"$and": [{username:{$regex: username}}, {email:{$regex: email}}, {name:{$regex: name}}]};
        Users.find(query, (err, users) => {
            if(err) {
                return next(err);
            }
            res.status(200).json({users: users});
        })        
    }    
}

exports.delete = function (req, res, next) {
  const fId = req.params.id;
  Users.findByIdAndRemove(fId, (err, deletedUser) => {
        if (err) {
            console.log(err);
        }
        Users.find().exec(function (err, users) {
            if (err) {
                console.log(err);
            }
            return res.status(200).json({users: users});
        })
    });
}

exports.update = function (req, res, next) {
    Users.findById(req.body._id, function (err, tData) {
    if (err) {
        res.send(err);
    }
    
    tData.username = req.body.username;
    tData.name = req.body.name;
    tData.email = req.body.email;    
    tData.dailyMatchDate = req.body.dailyMatchDate;
    tData.deviceId = req.body.deviceId;
    tData.gamerschedule = req.body.gamerschedule;
    tData.gamerType = req.body.gamerType;
    tData.onlineStatus = req.body.onlineStatus;
    tData.chatNotifications = req.body.chatNotifications;    
    tData.blockedUsers = req.body.blockedUsers;
    tData.gameTags = req.body.gameTags;
    tData.consoleTags = req.body.consoleTags;
    tData.games = req.body.games;
    tData.consoles = req.body.consoles;
    tData.photos = req.body.photos;
    tData.imageUrl = req.body.imageUrl;
    tData.dateOfBirth = req.body.dateOfBirth;

    const userData = new Users(tData);
  
    userData.save((err, savedUser) => {
        if (err) {
            res.send(err);
        }
        Users.find().exec(function (err, users) {
            if (err) {
                res.send(err);
            }
            return res.status(200).json({users: users});
        });
    });
  });
}

exports.create = function(req, res, next){  
  let tData = new Users();
  
  tData.username = req.body.username;
  tData.email = req.body.email;    
  tData.dailyMatchDate = req.body.dailyMatchDate;
  tData.deviceId = req.body.deviceId;
  tData.gamerschedule = req.body.gamerschedule;
  tData.gamerType = req.body.gamerType;
  tData.onlineStatus = req.body.onlineStatus;
  tData.chatNotifications = req.body.chatNotifications;    
  tData.blockedUsers = req.body.blockedUsers;
  tData.gameTags = req.body.gameTags;
  tData.consoleTags = req.body.consoleTags;
  tData.games = req.body.games;
  tData.consoles = req.body.consoles;
  tData.photos = req.body.photos;
  tData.imageUrl = req.body.imageUrl;
  tData.dateOfBirth = req.body.dateOfBirth; 
  
  Users.find((err, users) => {
    if(err){
      return next(err);
    }
    tData.save((err, savedUser) => {
      if (err) {
          res.send(err);
      }
      Users.find().exec(function (err, users) {
          if (err) {
              res.send(err);
          }
          return res.status(200).json({users: users});
      });
    });
  }) 
}