const { Schema, model } = require('mongoose');

const Zone = { type: Schema.Types.ObjectId, ref: 'Zone' };

const UserSchema = new Schema({
  uid: { type: String, required: true },
  msgid : [{ type: String, unique: true }],
  type: { type: String, required: true, default: 'user', enum: ['user', 'admin'] },
  zones: [Zone],
});
UserSchema.path('uid').index({ unique: true });
UserSchema.path('msgid').index({ unique: true });
module.exports = model('User', UserSchema);