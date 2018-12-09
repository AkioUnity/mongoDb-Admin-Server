const Friends = require("./../models/friend.model");

exports.getFriends = function (req, res, next) {
    console.log('--------', req)
      let date_start = req.body.date_start;
      let date_end = req.body.date_end;
      Friends.find((err, friends) => {
        if(err){
          return next(err);
        }
        //res.status(200).json({friends: friends})
        if (date_start && date_end){
            // date_start = moment(date_start, "YYYY/MM/DD").format("YYYY, M, D");
            // date_end = moment(date_end, "YYYY/MM/DD").format("YYYY, M, D");
            var p_date_start = date_start.replace('/', '-');
            p_date_start = date_start+ ' 00:00:00 PDT';
      
            var p_date_end = date_end.replace('/', '-');
            p_date_end = date_end+ ' 00:00:00 PDT';
            
            console.log(new Date(date_start));
            // PurchaseDate: { $gte: new Date(date_start), $lt: new Date(date_end) }
            Friends.find({createdAt: { $gte: p_date_start, $lte: p_date_end }}, (err, filteredFriends) => {
                if(err) {
                    return next(err);
                }
                res.status(200).json({friends: filteredFriends});
            })
          } else {           
                res.status(200).json({friends: friends});
          }   
      }) 
    
}

exports.delete = function (req, res, next) {
  const fId = req.params.id;
    Friends.findByIdAndRemove(fId, (err, deletedFriend) => {
        if (err) {
            console.log(err);
        }
        Friends.find().exec(function (err, friends) {
            if (err) {
                console.log(err);
            }
            return res.status(200).json({friends: friends});
        })
    });
}

exports.update = function (req, res, next) {
  Friends.findById(req.body._id, function (err, tData) {
    if (err) {
        res.send(err);
    }
    
    tData.user = req.body.user;
    tData.friend = req.body.friend;    
    tData.createdAt = new Date(); 
    const friendData = new Friends(tData);
  
    friendData.save((err, savedFriend) => {
        if (err) {
            res.send(err);
        }
        Friends.find().exec(function (err, friends) {
            if (err) {
                res.send(err);
            }
            return res.status(200).json({friends: friends});
        });
    });
  });
}

exports.create = function(req, res, next){
  console.log('----', req.body)
  let tData = new Friends();
  tData.user = req.body.user;
  tData.friend = req.body.friend;
  tData.createdAt = new Date();
  console.log('------', tData)
  Friends.find((err, friends) => {
    if(err){
      return next(err);
    }
    tData.save((err, savedFriend) => {
      if (err) {
          res.send(err);
      }
      Friends.find().exec(function (err, friends) {
          if (err) {
              res.send(err);
          }
          return res.status(200).json({friends: friends});
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