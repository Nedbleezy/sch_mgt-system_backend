import SchoolModel from '../models/SchoolRegModel.js';
import Token from '../models/TokenModel.js';

const VerifyToken = async (req, res) => {
  try {
    const school = await SchoolModel.findOne({ _id: req.params.id });

    if (!school) return res.status(400).json({ message: 'Invalid link' });

    const token = await Token.find({
      School_Id: school._id,
      token: req.params.token,
    });

    if (!token) return res.status(400).json({ message: 'Invalid link_token' });

    const newUpdate = await SchoolModel.findByIdAndUpdate(
      { _id: school._id },
      { verifiedEmail: true },
      { new: true }
    );

    await Token.findOneAndDelete({ School_Id: req.params.id });

    newUpdate.password = undefined;

    res.status(200).json({ message: 'email verified sucessfully, please login' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default VerifyToken;
