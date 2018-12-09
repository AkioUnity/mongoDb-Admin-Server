const mongoose = require('mongoose');
const paginator = require('mongoose-paginator');
const Schema = mongoose.Schema;
const deepPopulate = require('mongoose-deep-populate')(mongoose);

//---------------------------------------------------------------------------
// Report Schema
//---------------------------------------------------------------------------
const Report = new Schema({
  userId: { type: Schema.ObjectId, ref: 'User' },
  reason: { type: String, default: ''},
  targetId: { type: Schema.ObjectId, ref: 'User'},
  createdAt: { type: Date, default: Date.now},
  updatedAt: { type: Date, default: Date.now}
});

//---------------------------------------------------------------------------
// Plugins
//---------------------------------------------------------------------------
Report.plugin(paginator, {
    limit: 5,
    defaultKey: '_id',
    direction: -1
});



//---------------------------------------------------------------------------
// Export Chat
//---------------------------------------------------------------------------
module.exports = mongoose.model('Report', Report);
