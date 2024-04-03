import express from 'express';
import VerifyToken from '../controllers/VerifyTokenscontroller.js';

const router = express.Router();

// routes to VERIFY EMAIL
router.get('/:id/:token', VerifyToken);

export default router;
