const axios = require('axios')

module.exports = {

    viewBook (req , res){
        axios.get('https://www.googleapis.com/books/v1/volumes?q=javascript')
        .then(function (response) {
            res.status(200).json({
                data: response.data
            })
        })
        .catch(function (error) {
            res.status(400).json({
                error
            })
        })
    },

    searchBook (req , res){
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.params.id}`)
        .then(function (response) {
            res.status(200).json({
                data: response.data
            })
        })
        .catch(function (error) {
            res.status(400).json({
                error
            })
        })
    },

    translateDes (req , res){
        const translate = require('yandex-translate-api')('trnsl.1.1.20180503T141519Z.407607057b00c677.78407971a76979f09a5894390fd65a810366d11b');

        translate.translate(`${req.params.description}`, { to: `${req.params.bahasa}` }, function(err, translate) {
            res.status(200).json({
                data: translate.text
            })
        })
    },

    curreny (req , res){
        axios.get('https://forex.1forge.com/1.0.3/convert?from=USD&to=EUR&quantity=100&api_key=eCN4ji2EuOjv783I9CxyvY8MGzV8yoNH')
        .then(function (response) {
            res.status(200).json({
                data: response.data
            })
        })
        .catch(function (error) {
            res.status(400).json({
                error
            })
        })
    }
}