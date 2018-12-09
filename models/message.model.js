const mongoose = require('mongoose');
const paginator = require('mongoose-paginator');
const Schema = mongoose.Schema;
const deepPopulate = require('mongoose-deep-populate')(mongoose);

//---------------------------------------------------------------------------
// Message Schema
//---------------------------------------------------------------------------
const Message = new Schema({
  type: { type: String, default: 'text' }, //text, image, video, link, plaedate
  timestamp: { type: Number },
  plaeDate: { type: Schema.ObjectId, ref: 'Plaedate', sparse: true },
  channel: { type: String, index: true },
  chat: { type: Schema.ObjectId, ref: 'Chat', index: true },
  sender: { type: Schema.ObjectId, ref: 'User', index: true },
  text: String,
  imageUrl: String,
  videoUrl: String,
  linkUrl: String,
  imageWidth: Number,
  imageHeight: Number,
  uuid: { type: String, unique: true },
  initialPlaeState: { type: Number, default: 0 }, //0 invite, 1 accepted, 2 declined
  state: { type: Number, default: 0 } //unread, read, deleted,
});

//---------------------------------------------------------------------------
// Plugins
//---------------------------------------------------------------------------
Message.plugin(paginator, {
  limit: 5,
  defaultKey: '_id',
  direction: -1
});

Message.plugin(deepPopulate, {
  populate: {
    'plaeDate.sender': {
      select: 'name username imageUrl photos deviceId'
    },
    'plaeDate.receiver': {
      select: 'name username imageUrl photos deviceId'
    }
  }
});

//---------------------------------------------------------------------------
// Export Message
//---------------------------------------------------------------------------
module.exports = mongoose.model('Message', Message);
