const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.post('/',async (request,response) => {
    const {username,name,password} = request.body
    if(!password.length < 3){
        return response.status(400).json({error:'the password length is less than 3'})
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password,saltRounds)

    const user = new User({
        username:username,
        name:name,
        passwordHash:passwordHash
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

usersRouter.get('/',async (request,response) => {
    const users = await User.find({}).populate('blogs',{title:1,author:1,likes:1})
    response.status(200).json(users)
})

module.exports = usersRouter
