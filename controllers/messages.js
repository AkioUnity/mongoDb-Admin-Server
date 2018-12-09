const Messages = require("./../models/message.model");

exports.getMessages = function (req, res, next) {   
    let filter = req.body.filter;
    Messages.find((err, messages) => {
        if(err){
          return next(err);
        }
        //res.status(200).json({messages: messages})
        if (filter!==undefined){     
            
            var query = null;
            if(filter){
                query = {"$or": [{channel:{$regex: filter}}, {text:{$regex: filter}}, 
                        {type:{$regex: filter}}, {uuid:{$regex: filter}}]}
            }
            // PurchaseDate: { $gte: new Date(date_start), $lt: new Date(date_end) }
            Messages.find(query, (err, filteredMessages) => {
                if(err) {
                    return next(err);
                }
                res.status(200).json({messages: filteredMessages});
            })
          } else {           
                res.status(200).json({messages: messages});
          }   
      }) 
    
}

exports.delete = function (req, res, next) {
  const fId = req.params.id;
  Messages.findByIdAndRemove(fId, (err, deletedMessage) => {
        if (err) {
            console.log(err);
        }
        Messages.find().exec(function (err, messages) {
            if (err) {
                console.log(err);
            }
            return res.status(200).json({messages: messages});
        })
    });
}

exports.update = function (req, res, next) {
    Messages.findById(req.body._id, function (err, tData) {
    if (err) {
        res.send(err);
    }
    
    tData.chat = req.body.chat;
    tData.sender = req.body.sender;    
    tData.timestamp = req.body.timestamp;
    tData.channel = req.body.channel;
    tData.state = req.body.state;
    tData.initialPlaeState = req.body.initialPlaeState;
    tData.type = req.body.type;
    tData.text = req.body.text;
    tData.uuid = req.body.uuid;
    const messageData = new Messages(tData);
  
    messageData.save((err, savedMessage) => {
        if (err) {
            res.send(err);
        }
        Messages.find().exec(function (err, messages) {
            if (err) {
                res.send(err);
            }
            return res.status(200).json({messages: messages});
        });
    });
  });
}

exports.create = function(req, res, next){  
  let tData = new Messages();
  tData.chat = req.body.chat;
  tData.sender = req.body.sender;    
  tData.timestamp = req.body.timestamp;
  tData.channel = req.body.channel;
  tData.state = req.body.state;
  tData.initialPlaeState = req.body.initialPlaeState;
  tData.type = req.body.type;
  tData.text = req.body.text;
  tData.uuid = req.body.uuid;   
    Messages.find((err, messages) => {
    if(err){
      return next(err);
    }
    tData.save((err, savedMessage) => {
      if (err) {
          res.send(err);
      }
      Messages.find().exec(function (err, messages) {
          if (err) {
              res.send(err);
          }
          return res.status(200).json({messages: messages});
      });
    });
  }) 
}