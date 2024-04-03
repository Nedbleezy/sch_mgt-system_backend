import express from 'express';
import { allTeachersInASchoolById, teacherReg } from '../controllers/TeacherController.js';

const router = express.Router();

//register routes for Teachers
router.post('/teacherReg', teacherReg);

// routes to fetch all registered teachers in a given school
router.get('/teachers/:id', allTeachersInASchoolById);

// routes to get specific teacher by ID
router.get('/', (req, res) => {
  res.json({ message: ' get request to fetch a specific registered teacher' });
});

export default router;
