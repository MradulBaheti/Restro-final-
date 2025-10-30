const express = require("express");
const {
  addTable,
  getTables,
  updateTable,
} = require("../controllers/tableController");
const { isVerifiedUser } = require("../middleware/tokenVerification");
const router = express.Router();

router.route("/").post(isVerifiedUser, addTable);
router.route("/").get(isVerifiedUser, getTables);
// This '/:id' route allows 'req.params.id' to work in your controller
router.route("/:id").put(isVerifiedUser, updateTable);

module.exports = router;