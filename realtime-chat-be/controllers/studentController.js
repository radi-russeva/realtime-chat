const Student = require("../models/studentModel");
const bcrypt = require("bcrypt");

module.exports.signup = async (req, resp, next) => {
    try {
        const { userName, email, password, firstName, lastName } = req.body;
        const userNameCheck = await Student.findOne({ userName });
        if (userNameCheck)
            return resp.json({ msg: "Username already used", status: false });
        const emailCheck = await Student.findOne({ email });
        if (emailCheck)
            return resp.json({ msg: "Email already used", status: false });

        const hashedPassword = await bcrypt.hash(password, 10);
        const student = await Student.create({
            userName,
            email,
            password: hashedPassword,
            firstName,
            lastName
        })

        delete student.password;
        return resp.json({ status: true, student })
    }
    catch(e) {
        next(e);
    }
};

module.exports.login = async (req, resp, next) => {
    try {
      const { username, password } = req.body;
      const student = await Student.findOne({ username });
      if (!student)
        return resp.json({ msg: "Incorrect Username or Password", status: false });
      const isPasswordValid = await bcrypt.compare(password, student.password);
      if (!isPasswordValid)
        return resp.json({ msg: "Incorrect Username or Password", status: false });
      delete student.password;
      return resp.json({ status: true, student });
    } catch (e) {
      next(e);
    }
  };
  
  module.exports.setAvatar = async (req, res, next) => {
    try {
      const studentId = req.params.id;
      const avatarImage = req.body.image;
      const studentData = await Student.findByIdAndUpdate(
        studentId,
        {
          isAvatarImageSet: true,
          avatarImage,
        },
        { new: true }
      );
      return res.json({
        isSet: studentData.isAvatarImageSet,
        image: studentData.avatarImage,
      });
    } catch (e) {
      next(e);
    }
  };

  module.exports.getAllStudents = async (req, res, next) => {
    try {
        const students = await Student.find({_id:{$ne:req.params.id}})
        .select(["email", "userName", "_id"]);
        return res.json(students);
    } catch(e) {
        next(e)
    }
  };