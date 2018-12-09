const Chats = require("./../models/chat.model");

exports.getChats = function (req, res, next) {   
    let date_start = req.body.date_start;
    let date_end = req.body.date_end;
    Chats.find((err, chats) => {
        if(err){
          return next(err);
        }
        //res.status(200).json({chats: chats})
        if (date_start && date_end){
            // date_start = moment(date_start, "YYYY/MM/DD").format("YYYY, M, D");
            // date_end = moment(date_end, "YYYY/MM/DD").format("YYYY, M, D");
            var p_date_start = date_start.replace('/', '-');
            p_date_start = date_start+ ' 00:00:00 PDT';
      
            var p_date_end = date_end.replace('/', '-');
            p_date_end = date_end+ ' 00:00:00 PDT';
            
            console.log(new Date(date_start));
            // PurchaseDate: { $gte: new Date(date_start), $lt: new Date(date_end) }
            Chats.find({createdAt: { $gte: p_date_start, $lte: p_date_end }}, (err, filteredChats) => {
                if(err) {
                    return next(err);
                }
                res.status(200).json({chats: filteredChats});
            })
          } else {           
                res.status(200).json({chats: chats});
          }     
       
    }) 
    
}

exports.delete = function (req, res, next) {
  const fId = req.params.id;
  Chats.findByIdAndRemove(fId, (err, deletedChat) => {
        if (err) {
            console.log(err);
        }
        Chats.find().exec(function (err, chats) {
            if (err) {
                console.log(err);
            }
            return res.status(200).json({chats: chats});
        })
    });
}

exports.update = function (req, res, next) {
    Chats.findById(req.body._id, function (err, tData) {
    if (err) {
        res.send(err);
    }
    
    tData.title = req.body.title;
    tData.imageUrl = req.body.imageUrl;    
    tData.channel = req.body.channel;
    tData.members = req.body.members;
    tData.membersInChat = req.body.membersInChat;
    tData.type = req.body.type;
    tData.state = req.body.state;
    tData.createdAt = req.body.createdAt;    
    tData.updatedAt = new Date();
    tData.lastMessage = req.body.lastMessage;
    tData.approvals = req.body.approvals;
    tData.isBae = req.body.isBae;
    tData.isConnection = req.body.isConnection;
    tData.isApproved = req.body.isApproved;
    tData.blocked = req.body.blocked;
    tData.deletedFor = req.body.deletedFor;
    tData.adminId = req.body.adminId;

    const chatData = new Chats(tData);
  
    chatData.save((err, savedChat) => {
        if (err) {
            res.send(err);
        }
        Chats.find().exec(function (err, chats) {
            if (err) {
                res.send(err);
            }
            return res.status(200).json({chats: chats});
        });
    });
  });
}

exports.create = function(req, res, next){  
  let tData = new Chats();
  
  tData.title = req.body.title;
  tData.imageUrl = req.body.imageUrl;    
  tData.channel = req.body.channel;
  tData.members = req.body.members;
  tData.membersInChat = req.body.membersInChat;
  tData.type = req.body.type;
  tData.state = req.body.state;
  tData.createdAt = req.body.createdAt;    
  tData.updatedAt = new Date();
  tData.lastMessage = req.body.lastMessage;
  tData.approvals = req.body.approvals;
  tData.isBae = req.body.isBae;
  tData.isConnection = req.body.isConnection;
  tData.isApproved = req.body.isApproved;
  tData.blocked = req.body.blocked;
  tData.deletedFor = req.body.deletedFor;
  tData.adminId = req.body.adminId;   
  
  Chats.find((err, chats) => {
    if(err){
      return next(err);
    }
    tData.save((err, savedChat) => {
      if (err) {
          res.send(err);
      }
      Chats.find().exec(function (err, chats) {
          if (err) {
              res.send(err);
          }
          return res.status(200).json({chats: chats});
      });
    });
  }) 
}