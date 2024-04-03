import express from 'express';
import { classReg } from '../controllers/ClassController.js';

const router = express.Router();

//register routes for classes
router.post('/classReg', classReg);

// routes to fetch all registered classes
router.get('/', (req, res) => {
  res.json({ message: ' get request to fetch all registered classes' });
});

export default router;
