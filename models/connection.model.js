const mongoose = require('mongoose');
const paginator = require('mongoose-paginator');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const Schema = mongoose.Schema;

//---------------------------------------------------------------------------
// Connection Schema
//---------------------------------------------------------------------------
const Connection = new Schema({
    user_a: { type: Schema.ObjectId, ref: 'User', index: true, required: true },
    user_b: { type: Schema.ObjectId, ref: 'User', index: true, required: true },
    isBae: {type: Boolean, default: false},
    createdAt: { type: Date, default: Date.now }
});

Connection.index({ user_a: 1, user_b: 1 }, { unique: true });

//---------------------------------------------------------------------------
// Plugins
//---------------------------------------------------------------------------
Connection.plugin(paginator, {
    limit: 5,
    defaultKey: '_id',
    direction: -1
});

Connection.plugin(deepPopulate, {
    populate: {
        user_b: {
            select: '-password'
        }
    }
});

//---------------------------------------------------------------------------
// Export Friend
//---------------------------------------------------------------------------
module.exports = mongoose.model('Connection', Connection);
