const Games = require("./../models/game.model");

exports.getGames = function (req, res, next) {
    let filter = req.body.filter;
    Games.find((err, games) => {
        if(err){
          return next(err);
        }        
        if (filter!==undefined){     
            
            var query = null;
            if(filter&&parseInt(filter)){
                query = {"$or": [{_id:{$regex: filter}}, {contentfulState:{$eq: parseInt(filter)}}, 
                        {title:{$regex: filter}}, {imageUrl:{$regex: filter}}, {priority:{$eq: parseInt(filter)}},{count:{$eq: parseInt(filter)}}]}
            }else{
                query = {"$or": [{_id:{$regex: filter}}, 
                    {title:{$regex: filter}}, {imageUrl:{$regex: filter}}]}
            }
            // PurchaseDate: { $gte: new Date(date_start), $lt: new Date(date_end) }
            Games.find(query, (err, filteredGames) => {
                if(err) {
                    return next(err);
                }
                res.status(200).json({games: filteredGames});
            })
          } else {           
                res.status(200).json({games: games});
          }   
      }) 
}

exports.delete = function (req, res, next) {
  const fId = req.params.id;
    Games.findByIdAndRemove(fId, (err, deletedGame) => {
        if (err) {
            console.log(err);
        }
        Games.find().exec(function (err, games) {
            if (err) {
                console.log(err);
            }
            return res.status(200).json({games: games});
        })
    });
}

exports.update = function (req, res, next) {
  Games.findById(req.body._id, function (err, tData) {
    if (err) {
        res.send(err);
    }
    
    tData.title = req.body.title;
    tData.imageUrl = req.body.imageUrl;
      tData.priority = req.body.priority;
    tData.contentfulState = req.body.contentfulState; 
    tData.count = req.body.count;
    const gameData = new Games(tData);
  
    gameData.save((err, savedGame) => {
        if (err) {
            res.send(err);
        }
        Games.find().exec(function (err, games) {
            if (err) {
                res.send(err);
            }
            return res.status(200).json({games: games});
        });
    });
  });
}

exports.create = function(req, res, next){
  console.log('----', req.body)
  let tData = new Games();
  tData._id = req.body._id; 
  tData.title = req.body.title;
    tData.imageUrl = req.body.imageUrl;
    tData.priority = parseInt(req.body.priority);
    tData.contentfulState = req.body.contentfulState; 
    tData.count = req.body.count;
  console.log('------', tData)
  Games.find((err, games) => {
    if(err){
      return next(err);
    }
    tData.save((err, savedGame) => {
      if (err) {
          res.send(err);
      }
      Games.find().exec(function (err, games) {
          if (err) {
              res.send(err);
          }
          return res.status(200).json({games: games});
      });
    });
  }) 
//   tData.save((err, savedgame) => {
//     if (err) {
//         res.send(err);
//     }
//     Games.find().exec(function (err, Games) {
//         if (err) {
//             res.send(err);
//         }
//         return res.status(200).json({Games: Games});
//     });
// });
}