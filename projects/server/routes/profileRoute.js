const profileController = require("../controllers/profileController")
const express = require("express")
const { upload } = require("../lib/uploader")
const { body } = require("express-validator")

const router = express.Router()

router.get("/:id", profileController.getUserProfileById)
router.patch(
    "/:id",
    upload({
        acceptedFileTypes: ["jpg", "jpeg", "png"],
        filePrefix: "profile_pic",
        limits: { fileSize: 210 },
    }).single("profile_picture"),
    body("username", "Username has to be min 3 character").isLength({ min: 3 }),
    body("phone_number", "Phone number has to be min 10").isLength({ min: 10 }),
    profileController.editUserProfile
)

router.patch("/password/:id", profileController.editPassword)

module.exports = router
