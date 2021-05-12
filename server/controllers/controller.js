import Book from '../models/book.js';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import validateRegisterInput from '../validation/register.js';
import validateLoginInput from '../validation/login.js';

export const getBooks = async (req, res) => {
	try {
		if (req.query.name) {
			const books = await Book.find({
				$or: [
					{ bookName: { $regex: req.query.name, $options: 'i' } },
					{ author: { $regex: req.query.name, $options: 'i' } },
				],
			});
			res.status(200).json(books);
		} else if (req.query.category) {
			const books = await Book.find({ category: req.query.category });
			res.status(200).json(books);
		} else {
			const books = await Book.find();
			res.status(200).json(books);
		}
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const register = async (req, res) => {
	console.log(req.body);
	const { errors, isValid } = validateRegisterInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}
	await User.findOne({ userID: req.body.userID }).then((user) => {
		if (user) {
			return res.status(400).json({ userID: 'userID already exists' });
		} else {
			const newUser = new User({
				userID: req.body.userID,
				password: req.body.password,
				// fullname: req.body.fullname,
				// company: req.body.company,
				// address1: req.body.address1,
				// address2: req.body.address2,
				// city: req.body.city,
				// region: req.body.region,
				// country: req.body.country,
				// zipCode: req.body.postcode,
			});

			// Hash password before saving in database
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser.save();

					const payload = {
						id: req.body.userID,
					};
					// Sign token
					const token = jwt.sign(payload, process.env.JWT_SECRET);

					//send cookie!
					res.cookie('token', token).send();
				});
			});
		}
	});
};

export const login = async (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}
	const userID = req.body.userID;
	const password = req.body.password;

	// Find user by userID
	await User.findOne({ userID }).then((user) => {
		// Check if user exists
		if (!user) {
			return res.status(404).json({ userIDnotfound: 'userID not found' });
		}

		// Check password
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (isMatch) {
				// User matched
				// Create JWT Payload
				const payload = {
					id: user.userID,
				};
				// Sign token
				const token = jwt.sign(payload, process.env.JWT_SECRET);

				//send cookie!
				res.cookie('token', token).send();
			} else {
				return res
					.status(400)
					.json({ passwordincorrect: 'Password incorrect' });
			}
		});
	});
};

export const logout = (req, res) => {
	res.cookie('token', '').send();
};
