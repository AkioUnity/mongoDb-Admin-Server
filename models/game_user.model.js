const mongoose = require('mongoose');
const paginator = require('mongoose-paginator');
const Schema = mongoose.Schema;

//---------------------------------------------------------------------------
// Game Schema
//---------------------------------------------------------------------------
const GameUser = new Schema({
    user: { type: Schema.ObjectId, ref: 'User', index: true, required: true },
    game: { type: String, ref: 'Game', index: true, required: true }
});

GameUser.index({ user: 1, game: 1 }, { unique: true });

//---------------------------------------------------------------------------
// Plugins
//---------------------------------------------------------------------------
GameUser.plugin(paginator, {
    limit: 5,
    defaultKey: '_id',
    direction: -1
});

//---------------------------------------------------------------------------
// Export GameUser
//---------------------------------------------------------------------------
module.exports = mongoose.model('GameUser', GameUser);
