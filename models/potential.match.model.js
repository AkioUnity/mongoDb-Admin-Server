const mongoose = require('mongoose');
const paginator = require('mongoose-paginator');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const Schema = mongoose.Schema;

const PotentialMatch = new Schema({
    user_a: { type: Schema.ObjectId, ref: 'User' },
    user_b: { type: Schema.ObjectId, ref: 'User' },
    user_a_user_b_key: { type:String, sparse: true, unique:true },
    user_a_response: { type: Number, default: 0 },
    user_b_response: { type: Number, default: 0 },
    user_a_visible: { type: Boolean, default: true },
    user_b_visible: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

PotentialMatch.index({ user_a: 1, user_b: 1 }, { unique: true });

//---------------------------------------------------------------------------
// Plugins
//---------------------------------------------------------------------------
PotentialMatch.plugin(paginator, {
    limit: 5,
    defaultKey: '_id',
    direction: -1
});

PotentialMatch.plugin(deepPopulate, {
    populate: {
        user_b: {
            select: '-password'
        },
        user_a: {
            select: '-password'
        }
    }
});

const STATES = {
    PASS: 2,
    MATCH: 1,
    NORESPONSE: 0
};

module.exports = mongoose.model('PotentialMatch', PotentialMatch);
//this export needs to be underneath!
module.exports.STATES = STATES;
