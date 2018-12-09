const FriendRequests = require("../models/friend_request.model");

exports.getFriendRequests = function (req, res, next) {
    console.log('--------', req)
      let date_start = req.body.date_start;
      let date_end = req.body.date_end;
      FriendRequests.find((err, friendrequests) => {
        if(err){
          return next(err);
        }
        //res.status(200).json({friendrequests: friendrequests})
        if (date_start && date_end){
            // date_start = moment(date_start, "YYYY/MM/DD").format("YYYY, M, D");
            // date_end = moment(date_end, "YYYY/MM/DD").format("YYYY, M, D");
            var p_date_start = date_start.replace('/', '-');
            p_date_start = date_start+ ' 00:00:00 PDT';
      
            var p_date_end = date_end.replace('/', '-');
            p_date_end = date_end+ ' 00:00:00 PDT';
            
            console.log(new Date(date_start));
            // PurchaseDate: { $gte: new Date(date_start), $lt: new Date(date_end) }
            FriendRequests.find({createdAt: { $gte: p_date_start, $lte: p_date_end }}, (err, filteredFriendsRequests) => {
                if(err) {
                    return next(err);
                }
                res.status(200).json({friendrequests: filteredFriendsRequests});
            })
          } else {           
                res.status(200).json({friendrequests: friendrequests});
          }  
      
      }) 
    
}

exports.delete = function (req, res, next) {
  const fId = req.params.id;
  FriendRequests.findByIdAndRemove(fId, (err, deletedFriendRequest) => {
        if (err) {
            console.log(err);
        }
        FriendRequests.find().exec(function (err, friendrequests) {
            if (err) {
                console.log(err);
            }
            return res.status(200).json({friendrequests: friendrequests});
        })
    });
}

exports.update = function (req, res, next) {
    FriendRequests.findById(req.body._id, function (err, tData) {
    if (err) {
        res.send(err);
    }
    
    tData.requestee = req.body.requestee;
    tData.requestor = req.body.requestor;
    tData.state = req.body.state;     
    tData.createdAt = new Date(); 
    const friendrequestData = new FriendRequests(tData);
  
    friendrequestData.save((err, savedFriendRequest) => {
        if (err) {
            res.send(err);
        }
        FriendRequests.find().exec(function (err, friendrequests) {
            if (err) {
                res.send(err);
            }
            return res.status(200).json({friendrequests: friendrequests});
        });
    });
  });
}

exports.create = function(req, res, next){
  
    let tData = new FriendRequests();
    
    tData.requestee = req.body.requestee;
    tData.requestor = req.body.requestor;
    tData.state = req.body.state;     
    tData.createdAt = new Date(); 

    FriendRequests.find((err, friendrequests) => {
    if(err){
      return next(err);
    }
    tData.save((err, savedFriendRequest) => {
      if (err) {
          res.send(err);
      }
      FriendRequests.find().exec(function (err, friendrequests) {
          if (err) {
              res.send(err);
          }
          return res.status(200).json({friendrequests: friendrequests});
      });
    });
  }) 
//   tData.save((err, savedFriend) => {
//     if (err) {
//         res.send(err);
//     }
//     Friends.find().exec(function (err, friends) {
//         if (err) {
//             res.send(err);
//         }
//         return res.status(200).json({friends: friends});
//     });
// });
}