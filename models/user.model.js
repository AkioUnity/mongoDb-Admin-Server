const mongoose = require('mongoose');
const paginator = require('mongoose-paginator');
const bcrypt = require('bcrypt-nodejs');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const Schema = mongoose.Schema;
const User = new Schema({
  //basic information
  name: { type: String, index: true, default: '' },
  username: { type: String, index: true, unique: true, sparse: true },
  email: { type: String, index: true, sparse: true },
  password: { type: String, sparse: true },
  imageUrl: { type: String, default: '' },
  photos: { type: [String], default: [] },
  signupType: { type: Number, default: 0 }, //0 Google, 1 Facebook, 2 Twitter, 3 Twitch, 4 Email
  userState: { type: Number, index: true, default: 0 }, //0 New, 1 Completed Profile, 2 Play, 3 Bae, 4 Both
  activeOnBae: { type: Boolean, default: false },
  activeOnPlae: { type: Boolean, default: false },
  gender: { type: String, default: '' },
  ageRange: {
    min: Number,
    max: Number
  },
  dateOfBirth: { type: Date, sparse: true },
  education: { type: String, sparse: true },
  bio: { type: String, sparse: true },
  occupation: { type: String, sparse: true },
  consoles: { type: [{ type: String, ref: 'Console' }], index: true, default: [] },
  games: { type: [{ type: String, ref: 'Game' }], index: true, default: [] },
  age: { type: Number, sparse: true },
  location: { type: String, sparse: true },
  consoleTags: { type: [String], index: true, default: [] },
  gameTags: { type: [String], index: true, default: [] },
  blockedUsers: { type: [String], index: true, default: [] },

  //search results
  showMeGender: { type: Number, default: 0 }, //0 - male / 1 - female / 2 - both
  latLong: { type: [Number], index: '2dsphere' }, //location for distance query
  maxDistance: { type: Number, default: 999 }, //distance in miles for the distance query

  //push notifications
  appearOnline: { type: Boolean, default: true },
  showMeOnBae: { type: Boolean, default: true },
  showMeOnPlae: { type: Boolean, default: true },
  dailyMatchReminder: { type: Boolean, default: true },
  chatNotifications: { type: Boolean, default: true },
  onlineStatus: { type: String, default: 'offline' },
  lastOnline: { type: Date, sparse: true },

  //gamer tags
  psnTag: { type: String, index: true, unique: true, sparse: true },
  xblTag: { type: String, index: true, unique: true, sparse: true },
  steamTag: { type: String, index: true, unique: true, sparse: true },
  nintendoTag: { type: String, index: true, unique: true, sparse: true },
  micPreference: { type: Number, default: 0 },
  gamerType: { type: String, default: "Casual" }, //Hardcore, Competitive, Casual, Beginner
  gamerSchedule: { type: [String] },

  //social media
  facebookId: { type: String, index: true, unique: true, sparse: true },
  twitterId: { type: String, index: true, unique: true, sparse: true },
  googleId: { type: String, index: true, unique: true, sparse: true },
  twitchId: { type: String, index: true, unique: true, sparse: true },
  instagramId: { type: String, index: true, sparse: true },

  //updates
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

  //push notifications
  deviceType: String,
  deviceId:  { type: [String] },
  oneSignalPlayerId: { type: String, sparse: true },
  channels: { type: [String], default: ['global'] },
  badgeCount: { type: Number, default: 0 },

  dailyMatch: { type: Schema.ObjectId, ref: 'User' },
  dailyMatchDate: { type: Date, default: new Date() },

  //indicates the authentication provider for the user
  provider: { type: String, default: '' } //google, facebook, twitter, twitch

});

User.plugin(paginator, {
  limit: 5,
  defaultKey: '_id',
  direction: -1
});

User.plugin(deepPopulate, {
  populate: {
    dailyMatch: {
      select: '-password'
    }
  }
});

//---------------------------------------------------------------------------
// Generate Hash
//---------------------------------------------------------------------------
User.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//---------------------------------------------------------------------------
// Check Valid Password
//---------------------------------------------------------------------------
User.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

//---------------------------------------------------------------------------
// Generate JSON WebToken
//---------------------------------------------------------------------------
User.methods.generateToken = function () {
  const stringUserId = this._id + '';
  const token = jwt.sign({ userId: stringUserId }, process.env.SECRET);

  return token;
};

User.methods.generatePasswordResetToken = function () {
  const codeString = process.env.RESETSECRET;
  const stringUserId = this._id;
  const token = jwt.sign({ userId: stringUserId }, codeString, { expiresIn: '1h' });
  return token;
};

//---------------------------------------------------------------------------
// Public Fields
//---------------------------------------------------------------------------
User.statics.publicFields = function () {
  return 'name username imageUrl photos deviceId';
};

//---------------------------------------------------------------------------
// Export User
//---------------------------------------------------------------------------
module.exports = mongoose.model('User', User);
