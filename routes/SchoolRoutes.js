import express from 'express';
import { schoolAdminLogin, schoolReg } from '../controllers/SchoolControllers.js';

const router = express.Router();

//registeration routes for school
router.post('/schoolReg', schoolReg);

router.post('/admin/login', schoolAdminLogin);

export default router;
