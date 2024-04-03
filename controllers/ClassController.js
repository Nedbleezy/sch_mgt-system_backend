import classModel from '../models/ClassRegModel.js';
import SchoolModel from '../models/SchoolRegModel.js';

export const classReg = async (req, res) => {
  try {
    const isClassRegisteredInThisSchool = await classModel.findOne({
      className: req.body.className,
      school: req.body.school,
    });

    const checkSchool = await SchoolModel.findById(req.body.school);

    if (isClassRegisteredInThisSchool && checkSchool) {
      return res
        .status(400)
        .json({ message: `Class already created in  ${checkSchool.schoolName}` });
    }

    const isClassRegistered = await classModel.findOne({
      className: req.body.className,
    });

    if (!isClassRegisteredInThisSchool) {
      await classModel.create(req.body);

      const registeredClasses = await classModel
        .find({ school: req.body.school })
        .select('-school')
        .sort('className')
        .exec();

      res.status(201).json({
        message: 'class created successfully',
        registeredClasses,
      });
    }

    if (isClassRegistered && !checkSchool) {
      await classModel.create(req.body);

      const registeredClasses = await classModel
        .find({ school: req.body.school })
        .select('-school')
        .sort('className')
        .exec();

      res.status(201).json({
        message: 'class created successfully',
        registeredClasses,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
