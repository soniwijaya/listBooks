const axios = require('axios')

module.exports = {

    viewBook (req , res){
        // axios.get('https://www.googleapis.com/books/v1/volumes?q=novel')
        axios.get('https://www.googleapis.com/books/v1/volumes?q=holmes&key=AIzaSyCvLH0iWkjNY1XKLAj9PQxh_g_h0lWwb-Q')
        .then(function (response) {
          // console.log(response.data);
          let rupiah = response.data.items[0].saleInfo.listPrice.amount
          // console.log('rupiah', response.data.items[0].saleInfo.listPrice.amount);
          // console.log(rupiah);
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

        translate.translate('You can burn my house, steal my car, drink my liquor from an old fruitjar.', { to: 'id' }, function(err, translate) {
            res.status(200).json({
                data: translate.text
            })
        })
    },

    curreny (req , res){
        axios.get('http://free.currencyconverterapi.com/api/v5/convert?q=IDR_USD&compact=y')
        // http://data.fixer.io/api/latest?access_key=9b6e3a675478ef41f7ca3bb91767291d&symbols=USD,AUD,CAD,PLN,MXN&format=1
        .then(function (response) {
          console.log(response.data.IDR_USD.val);
            res.status(200).json({
                data : response.data
            })
        })
        .catch(function (error) {
            res.status(400).json({
                error
            })
        })
    }
}
