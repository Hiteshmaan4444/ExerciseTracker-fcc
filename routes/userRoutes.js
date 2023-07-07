const express = require('express');
const {createUser,getUsers,createExercise,getlogs} = require('../controller/userController')
const router = express.Router();

router.route("/").post(createUser).get(getUsers);
router.route("/:_id/exercises").post(createExercise);
router.route("/:_id/logs").get(getlogs)

module.exports=router;