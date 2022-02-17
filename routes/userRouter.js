const express = require('express');
const userController = require('../controllers/userController.js')
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator();


const bodySchema = Joi.object({
    firstName:Joi.string().required(),
    lastName: Joi.string().required(),
    userName: Joi.string().required().alphanum().max(30),
    password: Joi.string().required().min(6).max(10),
    email: Joi.string().required().email(),
    adress: Joi.string().required(),
    phone: Joi.number().required(),
})
const routes = (User) => {
    const userRouter = express.Router();
    
    const {getUser, postUser, getUserById,getUserByName, putUser, deleteUser, postLogin } = userController(User);

    userRouter 
    .route('/users')
    .get(getUser)
    .post(validator.body(bodySchema), postUser);

    userRouter
    .route('users/:userId')
    .get(getUserById)
    .put(putUser)
    .delete(deleteUser)

    userRouter 
    .route('/users/login')
    .post(postLogin)
    .get(getUserByName)

    return userRouter;
}

module.exports = routes;