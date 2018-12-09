const mongoose = require('mongoose');
const paginator = require('mongoose-paginator');
const Schema = mongoose.Schema;
const deepPopulate = require('mongoose-deep-populate')(mongoose);

//---------------------------------------------------------------------------
// Chat Schema
//---------------------------------------------------------------------------
const Chat = new Schema({
  title: { type: String, index: true, default: '' },
  imageUrl: { type: String, default: '' },
  channel: { type: String, unique: true },
  members: { type: [{ type: Schema.ObjectId, ref: 'User' }], index: true },
  membersInChat: { type: [{ type: Schema.ObjectId, ref: 'User' }], default: [] },
  type: { type: String, default: 'single' }, //single, group
  state: { type: String, default: 'text' }, //text, open
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastMessage: { type: Schema.ObjectId, ref: 'Message' },
  approvals: { type: [{ type: Schema.ObjectId, ref: 'User' }], index: true },
  isBae: { type: Boolean, default: false },
  isConnection: { type: Boolean, default: false },
  isApproved: { type: Boolean, default: false },
  blocked: { type: Boolean, default: false },
  deletedFor: { type: [{ type: Schema.ObjectId, ref: 'User' }], index: true },
    adminId:  { type: Schema.ObjectId, ref: 'User' }
});

//---------------------------------------------------------------------------
// Plugins
//---------------------------------------------------------------------------
Chat.plugin(paginator, {
  limit: 5,
  defaultKey: '_id',
  direction: -1
});

Chat.plugin(deepPopulate, {
  populate: {
    'lastMessage.sender': {
      select: 'name username imageUrl photos deviceId'
    },
    'lastMessage.plaeDate.sender': {
      select: 'name username imageUrl photos deviceId'
    },
    'lastMessage.plaeDate.receiver': {
      select: 'name username imageUrl photos deviceId'
    },
    members: {
      select: '-password'
    }
  }
});

//---------------------------------------------------------------------------
// Export Chat
//---------------------------------------------------------------------------
module.exports = mongoose.model('Chat', Chat);
