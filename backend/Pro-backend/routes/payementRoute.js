const express = require("express");

const { isVerifiedUser } = require("../middleware/tokenVerification");
const router = express.Router();
const {createOrder, verifyPayement,webHookVerification} =require("../controllers/payementController")

router.route("/create-order").post(isVerifiedUser, createOrder);
router.route("/verify-payment").post(isVerifiedUser, verifyPayement);
router.route("/webhook-verification").post(webHookVerification);


module.exports = router;