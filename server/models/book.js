import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Create Schema
const BookSchema = new Schema({
  bookName: String,
  publisher: String,
  category: String,
  lang: String,
  author: String,
  description: String,
  price: Number,
  published: String,
  newArrival: Boolean,
  bookImage: String,
});

// Export Schema as model
const books = mongoose.model('books', BookSchema);
export default books;
