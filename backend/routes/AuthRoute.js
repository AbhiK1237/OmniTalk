const { Signup,Login, getUserHistory, addToHistory, } = require("../controllers/AuthController");
const {userVerification} = require("../middlewares/AuthMiddleware")
const router = require("express").Router();

router.post("/signup", Signup)
router.post('/login', Login)
router.post('/',userVerification)
router.post("/add_to_activity",addToHistory);
router.get("/get_all_activity",getUserHistory);                     

module.exports = router;