import mongoose from 'mongoose';
import bookData from './data/bookData.js';
import Book from './models/book.js';

const importData = async () => {
  try {
    await Book.deleteMany({});
    await Book.insertMany(bookData);
    console.log('data import successful');
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

mongoose
  .connect('mongodb://localhost/bookStoreDB', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('mongoDB connected');
    importData();
  })
  .catch((err) => console.log(err));
