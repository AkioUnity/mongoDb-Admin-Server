const mongoose = require('mongoose');
const paginator = require('mongoose-paginator');
const Schema = mongoose.Schema;

//---------------------------------------------------------------------------
// ConsoleUser Schema
//---------------------------------------------------------------------------
const ConsoleUser = new Schema({
    user: { type: Schema.ObjectId, ref: 'User', index: true, required: true },
    console: { type: String, ref: 'Console', index: true, required: true }
});

ConsoleUser.index({ user: 1, console: 1 }, { unique: true });

//---------------------------------------------------------------------------
// Plugins
//---------------------------------------------------------------------------
ConsoleUser.plugin(paginator, {
    limit: 5,
    defaultKey: '_id',
    direction: -1
});

//---------------------------------------------------------------------------
// Export ConsoleUser
//---------------------------------------------------------------------------
module.exports = mongoose.model('ConsoleUser', ConsoleUser);
