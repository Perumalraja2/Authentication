const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { dbName, dbUrl } = require('../config/dbconfig')
const { UserModel } = require('../schema/userSchema')

mongoose.connect(dbUrl)




router.post('/', async (req, res) => {
    try {
        let user = await UserModel.findOne({ email: req.body.email })
        if (!user) {
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

module.exports=router