import express from 'express';
import {
  getBooks,
  login,
  logout,
  register,
} from '../controllers/controller.js';
const router = express.Router();

router.get('/books/:name', getBooks);
router.get('/books/:category', getBooks);
router.get('/books', getBooks);
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
export default router;
