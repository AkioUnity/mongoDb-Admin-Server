const mongoose = require('mongoose');
const paginator = require('mongoose-paginator');
const Schema = mongoose.Schema;

//---------------------------------------------------------------------------
// Console Schema
//---------------------------------------------------------------------------
const Console = new Schema({
  _id: { type: String, required: true },
  title: { type: String, index: true },
  imageUrl: { type: String },
  tag: { type: String },
  tagTitle: { type: String },
  contentfulState: { type: Number, index: true, default: 1 },
  count: { type: Number, default: 0 },
  priority: { type: Number, default: 0 }
});

//---------------------------------------------------------------------------
// Plugins
//---------------------------------------------------------------------------
Console.plugin(paginator, {
  limit: 5,
  defaultKey: '_id',
  direction: -1
});

//---------------------------------------------------------------------------
// Export Game
//---------------------------------------------------------------------------
module.exports = mongoose.model('Console', Console);
