const mongoose = require('mongoose');
const paginator = require('mongoose-paginator');
const Schema = mongoose.Schema;

//---------------------------------------------------------------------------
// Plaedate Schema
//---------------------------------------------------------------------------
const Plaedate = new Schema({
    scheduledTime: { type: Date },
    sender: { type: Schema.ObjectId, ref: 'User', index: true },
    receiver: { type: Schema.ObjectId, ref: 'User', index: true },
    notes: { type: String, default: '' },
    console: { type: String, default: '' },
    game: { type: String, default: '' },
    gamerTag: { type: String, default: '' },
    state: { type: Number, default: 0 } //0 requested, 1 accepted, 2 declined
});

//---------------------------------------------------------------------------
// Plugins
//---------------------------------------------------------------------------
Plaedate.plugin(paginator, {
    limit: 5,
    defaultKey: '_id',
    direction: -1
});

//---------------------------------------------------------------------------
// Export Message
//---------------------------------------------------------------------------
module.exports = mongoose.model('Plaedate', Plaedate);
