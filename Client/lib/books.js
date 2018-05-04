 // view book
 function viewBook(bookList, author, category, description, picture, price){
    let element = document.getElementById("list-book")
    element.innerHTML += `<section><p>${bookList}</p><p>${author}</p><p>${category}</p><p>${description}</p><p><img src="${picture}"></p><p>Rp. ${price}</p></section>`
}

axios.get('http://localhost:3000/book/view')
.then(function (response) {
    let view = response.data.data.items

    view.forEach(dataBook => {
        viewBook(dataBook.volumeInfo.title, dataBook.volumeInfo.authors, dataBook.volumeInfo.categories[0], dataBook.volumeInfo.description , dataBook.volumeInfo.imageLinks==null ? 'aaa' : dataBook.volumeInfo.imageLinks.thumbnail , dataBook.saleInfo.isEbook==false ? '100000' : dataBook.saleInfo.listPrice.amount)    
    })
})
.catch(function (error) {
    console.log(error)
})

//  search
$( "button" ).click(function() {
    $( "section" ).remove()

    let q = document.getElementById("search").value
    let bahasa = document.getElementById("language").value
    
    axios.get(`http://localhost:3000/book/view/${q}`)
    .then(function (response) {
        let view = response.data.data.items

        view.forEach(dataBook => {
            axios.get(`http://localhost:3000/book/translate/${bahasa}/${dataBook.volumeInfo.description}`)
            .then(function (response) {
                viewBook(dataBook.volumeInfo.title, dataBook.volumeInfo.authors, dataBook.volumeInfo.categories[0] , response.data.data[0]=='undefined' ? '' : response.data.data[0] , dataBook.volumeInfo.imageLinks==null ? 'aaa' : dataBook.volumeInfo.imageLinks.thumbnail , dataBook.saleInfo.isEbook==false ? '100000' : dataBook.saleInfo.listPrice.amount)
            })
            .catch(function(error){
                console.log(error)
            })
                
        })
    })
    .catch(function (error) {
        console.log(error)
    })
})