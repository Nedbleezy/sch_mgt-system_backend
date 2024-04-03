import { response } from 'express';
import SchoolModel from '../models/SchoolRegModel.js';
import teacherModel from '../models/TeacherRegModel.js';

export const teacherReg = async (req, res) => {
  try {
    //check if the req.body.schools passed in is valid i.e if it is a registered school
    const isValidSchool = await SchoolModel.findById(req.body.school_ID);
    if (!isValidSchool) {
      return res
        .status(404)
        .json({ message: `couldn't find your school registered in our system` });
    }
    if (!req.body.school_ID) {
      return res.send('school_ID is required');
    }

    const emailAndSchoolName = await teacherModel.findOne({
      school_ID: req.body.school_ID,
      email: req.body.email,
    });

    //when email address and school name doesn't exist
    if (!emailAndSchoolName) {
      const newTeacher = new teacherModel(req.body);

      await newTeacher.save();
      newTeacher.password = undefined;

      return res.status(201).json({
        message: 'Teacher created successfully',
        teacher: newTeacher,
        schoolName: isValidSchool.schoolName,
      });
    }

    if (emailAndSchoolName) {
      return res.status(401).json({
        message: `Teacher is already registered in your school `,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// find all teachers in a given school

export const allTeachersInASchoolById = async (req, res) => {};
