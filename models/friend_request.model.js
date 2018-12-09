const mongoose = require('mongoose');
const paginator = require('mongoose-paginator');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const Schema = mongoose.Schema;

//---------------------------------------------------------------------------
// FriendRequest Schema
//---------------------------------------------------------------------------
const FriendRequest = new Schema({
    requestor: { type: Schema.ObjectId, ref: 'User', index: true, required: true },
    requestee: { type: Schema.ObjectId, ref: 'User', index: true, required: true },
    state: { type: Number, default: 0 }, //0 requested, 1 accepted, 2 declined
    createdAt: { type: Date, default: Date.now }
});

FriendRequest.index({ requestor: 1, requestee: 1 }, { unique: true });

//---------------------------------------------------------------------------
// Plugins
//---------------------------------------------------------------------------
FriendRequest.plugin(paginator, {
    limit: 5,
    defaultKey: '_id',
    direction: -1
});

FriendRequest.plugin(deepPopulate, {
    populate: {
        requestee: {
            select: '-password'
        },
        requestor: {
            select: '-password'
        }
    }
});

//---------------------------------------------------------------------------
// Export FriendRequest
//---------------------------------------------------------------------------
module.exports = mongoose.model('FriendRequest', FriendRequest);
