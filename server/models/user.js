import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	userID: { type: String, require: true },
	password: { type: String, require: true },
	fullName: { type: String, require: true },
	company: { String },
	address1: { type: String, require: true },
	address2: String,
	city: { type: String, require: true },
	region: String,
	country: { type: String, require: true },
	zipCode: { type: String, require: true },
});

// Export schema as model
const users = mongoose.model('users', UserSchema);
export default users;
