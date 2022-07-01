const {
    login,
    signup,
    setAvatar,
    getAllStudents
  } = require("../controllers/studentController");

const router = require("express").Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("setAvatar/:id", setAvatar);
router.get("/allstudents/:id", getAllStudents)

module.exports = router;