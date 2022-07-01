const { addPost, getAllPosts } = require("../controllers/postController");
const router = require("express").Router();

router.post("/addpost/", addPost);
router.get("/getpost/:id", getAllPosts);

module.exports = router;