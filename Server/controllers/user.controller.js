const jwt = require('jsonwebtoken')
const user = require('../model/userModel')
const mongoose = require('mongoose')

module.exports = {

    logins:function (req,res) {
        // res.send('masak')
        let{nama,email} = req.body
        let token = jwt.sign({nama},'SECRET');

        let userlogin = new user({
            nama,
            email
        })

    userlogin
        .save((err, result) => {
            if (!err) {
                res.status(201).json({
                    message: 'login succes',
                    data: result,
                    token:token
                })
            } else {
                res.status(500).json({
                message: 'something went wrong',
                err
                })
            }
        })
    }

}
