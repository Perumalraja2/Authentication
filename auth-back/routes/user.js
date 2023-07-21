const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { dbName, dbUrl } = require('../config/dbconfig')
const { UserModel } = require('../schema/userSchema')
const {createToken,validate,adminGuard, hashPassword, comparePassword}=require('../auth')

mongoose.connect(dbUrl)

router.get('/all', validate,adminGuard,async (req, res) => {

    try {

        let user = await UserModel.find({})

        res.status(200).send({
            message: "Data fetched scuccesfully ",
            user
        })


    } catch (error) {
        res.status(500).send({
            message: "internal server error"
        })
    }

})

router.get('/:id', validate,async (req, res) => {

    try {

        let data = await UserModel.findById(req.params.id)

        res.status(200).send({
            message: "Data fetched scuccesfully ",
            data
        })


    } catch (error) {
        res.status(500).send({
            message: "internal server error"
        })
    }

})


router.post('/signup', async (req, res) => {
    try {
        let user = await UserModel.findOne({ email: req.body.email })
        if (!user) {
            req.body.password = await hashPassword(req.body.password)
            let newUser = await UserModel.create(req.body)
            res.status(200).send({
                message: "Data Saved scuccesfully ",
            })
        }
        else {
            res.status(400).send({
                message: "user already exists"


            })

        }
    } catch (error) {
        res.status(500).send({
            message: "internal server error",
            error: error?.message
        })
    }
})

router.post('/signin', async (req, res) => {
    try {
        let user = await UserModel.findOne({ email: req.body.email })
        if (user) {
           if(await comparePassword(req.body.password,user.password)){
            let token = await createToken(user)
            res.status(200).send({
                message: "Login scuccesfully ",
                token
            })
           }else{
            res.status(400).send({
                message: "invalid credentials"


            })

           }
           
        }
        else {
            res.status(400).send({
                message: "user doesnt exists"


            })

        }
    } catch (error) {
        res.status(500).send({
            message: "internal server error",
            error: error?.message
        })
    }
})






module.exports = router