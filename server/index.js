import express from 'express';
import mongoose from 'mongoose';
import Routes from './routes/routes.js';
import cors from 'cors';
import dotenv from 'dotenv';

// env setting
dotenv.config();

// express settings
const app = express();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: ['http://localhost:3000'],
		credentials: true,
	})
);
app.use('/', Routes);
app.use(express.static('public'));
app.use('/images', express.static('images'));

//mongoose settings
mongoose
	.connect('mongodb://localhost/bookStoreDB', {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => console.log('MongoDB Connected.'))
	.catch((err) => console.log(err));

// open port 5000 for connect
const PORT = 5000;
app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
