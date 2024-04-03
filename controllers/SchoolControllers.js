import jwt from 'jsonwebtoken';
import brcrypt from 'bcryptjs';
import crypto from 'crypto';
import SchoolModel from '../models/SchoolRegModel.js';
// import TokenModel from '../models/TokenModel.js';
// import SendEmail from '../utils/SendEmail.js';

//register a new school
export const schoolReg = async (req, res) => {
  try {
    const schoolAlreadyRegistered = await SchoolModel.findOne({
      email: req.body.email,
      schoolName: req.body.schoolName,
    });

    const shoolNameExists = await SchoolModel.findOne({ schoolName: req.body.schoolName });
    const EmailExists = await SchoolModel.findOne({ email: req.body.email });

    if (EmailExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    if (shoolNameExists) {
      return res.status(404).json({
        message: `School is already registered with a different email address `,
      });
    }

    if (schoolAlreadyRegistered) {
      return res.status(400).json({
        message: `${schoolAlreadyRegistered.schoolName} is already Registered in our system`,
      });
    }

    if (!schoolAlreadyRegistered) {
      const school = await SchoolModel.create(req.body);

      return res.status(201).json({
        message: 'Registration successful,please login',
        schoolName: school.schoolName,
        id: school._id,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// export const schoolReg = async (req, res) => {
//   try {
//     const schoolAlreadyRegistered = await SchoolModel.findOne({
//       email: req.body.email,
//       schoolName: req.body.schoolName,
//     });

//     const shoolNameExists = await SchoolModel.findOne({ schoolName: req.body.schoolName });
//     const EmailExists = await SchoolModel.findOne({ email: req.body.email });

//     if (EmailExists) {
//       res.status(401).json({ message: 'Email already exists' });
//     }

//     if (shoolNameExists) {
//       res.status(404).json({
//         message: `School is already registered with email address ${shoolNameExists.email}`,
//       });
//     }

//     if (schoolAlreadyRegistered) {
//       return res.status(400).json({
//         message: `${schoolAlreadyRegistered.schoolName} is already Registered in our system`,
//       });
//     }

//     if (!schoolAlreadyRegistered) {
//       const school = await SchoolModel.create(req.body);

//       let token = await new TokenModel({
//         School_Id: school._id,
//         token: crypto.randomBytes(32).toString('hex'),
//       }).save();

//       const link = `${process.env.BASE_URL}/school/verify/${school._id}/${token.token}`;
//       console.log(link);

//       const emailsent = await SendEmail(school.email, school.schoolName, link);
//       console.log(` emailsent  ${emailsent}`);

//       if (emailsent.message === 'success') {
//         return res
//           .status(200)
//           .json({ message: 'Check your Email inbox or spam for a verification link' });
//       } else {
//         await TokenModel.findOneAndDelete({ School_Id: school._id });
//         await SchoolModel.findOneAndDelete({ email: req.body.email });

//         return res.status(500).json({
//           message: `an error occurred trying to send a  verification link to your email, check your network or email address and try again`,
//         });
//       }
//     }
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

//school admin login
export const schoolAdminLogin = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(501).json({ message: 'email is required' });
    }
    if (!req.body.password) {
      return res.status(501).json({ message: 'password is required' });
    }
    const school = await SchoolModel.findOne({
      email: req.body.email,
      schoolName: req.body.schoolName,
    });

    let IsPasswordCorrect;

    if (!school) return res.status(404).json({ message: ` not found check school name or email` });
    if (school) {
      IsPasswordCorrect = await brcrypt.compare(req.body.password, school?.password);
    }

    if (IsPasswordCorrect) {
      //add expiration to the token later  { expiresIn: '2h' }
      const token = jwt.sign(
        { id: school._id, isAdmin: school.isAdmin, school: school.schoolName },
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        message: `welcome to ${school?.schoolName} admin dashboard`,
        token,
        id: school._id,
        schoolName: school.schoolName,
      });
    }

    if (!IsPasswordCorrect) {
      return res.status(404).json({ message: `Incorrect email or password` });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
