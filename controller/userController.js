const asyncHandler = require('express-async-handler')
const userModel = require('../model/userModel')
const exerciseModel = require('../model/exerciseModel')
//const logModel = require('../model/logModel')
//@desc POST /api/user
// create user

const createUser= asyncHandler(async(req,res)=>{
    const user = await userModel.findOne({username: req.body.username});
    if(user){
        return res.json({error: "User Already Exist"});
    }

    const newUser = await userModel.create({username: req.body.username})

    // const log = await logModel.create({
    //     user: newUser._id,
    //     count: 0,
    //     log: []
    // })

    const {username, _id} = newUser;
    return res.json({
        username,
        _id
    })
})

const getUsers= asyncHandler(async(req,res)=>{
    const users = await userModel.find({});

    return res.json(users);
})

const createExercise = asyncHandler(async(req,res)=>{
    const user = await userModel.findOne({_id:req.params._id});

    if(!user){
        return res.json({error: "user does not exist" });
    }

    let date;
    if(!req.body.date){
        date = new Date().toDateString();
    }else{
        date = req.body.date
    }

    const exercise = await exerciseModel.create({
        user: req.params._id,
        description: req.body.description,
        duration: req.body.duration,
        date
    })
    
    // const logUpdate = await logModel.findOneAndUpdate({user: req.params._id},{$inc:{count:1},
    //     $push:{log: exercise._id}}
    // )

    const {description,duration} = exercise;
    const {username,_id} = user

    return res.json({
        username,
        description,
        duration,
        date:new Date(date).toDateString(),
        _id,
    })
    
})

const getlogs = asyncHandler(async(req,res)=>{
    let userId = req.params._id;
	let findConditions = { user: userId };

	if (
		(req.query.from !== undefined && req.query.from !== '')
		||
		(req.query.to !== undefined && req.query.to !== '')
	) {
		findConditions.date = {};

		if (req.query.from !== undefined && req.query.from !== '') {
			findConditions.date.$gte = new Date(req.query.from);
		}

		if (findConditions.date.$gte == 'Invalid Date') {
			return res.json({ error: 'from date is invalid' });
		}

		if (req.query.to !== undefined && req.query.to !== '') {
			findConditions.date.$lte = new Date(req.query.to);
		}

		if (findConditions.date.$lte == 'Invalid Date') {
			return res.json({ error: 'to date is invalid' });
		}
	}

	let limit = (req.query.limit !== undefined ? parseInt(req.query.limit) : 0);

	if (isNaN(limit)) {
		return res.json({ error: 'limit is not a number' });
	}

    const foundUser = await userModel.findById(userId); 

    if(!foundUser){
        return res.json({error: "user does not exist" });
    }

    let exercises = await exerciseModel.find(findConditions).sort({date:1}).limit(limit)
    exercises = exercises.map((exercise)=>{
        return {
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date.toDateString(),
        }
    })

    res.json({
       username: foundUser.username,
       count: exercises.length,
       _id: userId,
       log: exercises 
    })
    
})

module.exports = {
    createUser,
    getUsers,
    createExercise,
    getlogs
}