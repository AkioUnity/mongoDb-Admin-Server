const mongoose = require('mongoose');
const paginator = require('mongoose-paginator');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const Schema = mongoose.Schema;

//---------------------------------------------------------------------------
// Friend Schema
//---------------------------------------------------------------------------
const Friend = new Schema({
    user: { type: Schema.ObjectId, ref: 'User', index: true, required: true },
    friend: { type: Schema.ObjectId, ref: 'User', index: true, required: true },
    createdAt: { type: Date, default: Date.now }
});

Friend.index({ user: 1, friend: 1 }, { unique: true });

//---------------------------------------------------------------------------
// Plugins
//---------------------------------------------------------------------------
Friend.plugin(paginator, {
    limit: 5,
    defaultKey: '_id',
    direction: -1
});

Friend.plugin(deepPopulate, {
    populate: {
        friend: {
            select: '-password'
        }
    }
});

//---------------------------------------------------------------------------
// Export Friend
//---------------------------------------------------------------------------
module.exports = mongoose.model('Friend', Friend);
