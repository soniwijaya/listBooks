 // view book
 function viewBook(bookList, author, category, description, picture, price){
    let element = document.getElementById("list-book")
    element.innerHTML += `<section class="col-md-6"><div class="card flex-md-row mb-4 box-shadow h-md-250"><div class="card-body d-flex flex-column align-items-start"><strong class="d-inline-block mb-2 text-primary">${category}</strong><h3 class="mb-0">${bookList}</h3><div class="mb-1 text-muted">${author}</div><p class="card-text mb-auto">${description.substring(0, 300)}</p><br><strong class="d-inline-block mb-2 text-primary">Price ${price}</strong></div><img class="card-img-right flex-auto d-none d-lg-block" src="${picture}" alt="Card image cap" height="250"></div></section>`
    
}

axios.get('http://localhost:3000/book/view')
.then(function (response) {
    let view = response.data.data.items

    view.forEach(dataBook => {
        viewBook(dataBook.volumeInfo.title, dataBook.volumeInfo.authors, dataBook.volumeInfo.categories[0], dataBook.volumeInfo.description=='undefined' ? '' : dataBook.volumeInfo.description , dataBook.volumeInfo.imageLinks==null ? 'aaa' : dataBook.volumeInfo.imageLinks.thumbnail , dataBook.saleInfo.isEbook==false ? '390500' : dataBook.saleInfo.listPrice.amount)    
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
    let curreny = document.getElementById("currency").value

    axios.get(`http://localhost:3000/book/view/${q}`)
    .then(function (response) {
        let view = response.data.data.items

        view.forEach(dataBook => {
            axios.get(`http://localhost:3000/book/translate/${bahasa}/${dataBook.volumeInfo.description}`)
            .then(function (response) {

                if(dataBook.saleInfo.isEbook==false && curreny=='IDRUSD'){
                    viewBook(dataBook.volumeInfo.title, dataBook.volumeInfo.authors, dataBook.volumeInfo.categories[0] , response.data.data[0]=='undefined' ? '' : response.data.data[0] , dataBook.volumeInfo.imageLinks==null ? 'aaa' : dataBook.volumeInfo.imageLinks.thumbnail , dataBook.saleInfo.listPrice.amount )
                }
                else if(dataBook.saleInfo.isEbook==false && curreny=='USDIDR'){
                    viewBook(dataBook.volumeInfo.title, dataBook.volumeInfo.authors, dataBook.volumeInfo.categories[0] , response.data.data[0]=='undefined' ? '' : response.data.data[0] , dataBook.volumeInfo.imageLinks==null ? 'aaa' : dataBook.volumeInfo.imageLinks.thumbnail , String(230859/13940).substring(0,4) )
                }
                else{
                    axios.get(`http://localhost:3000/book/curreny/${curreny}/${dataBook.saleInfo.listPrice.amount}`)
                    .then(function (konversi) {
                        viewBook(dataBook.volumeInfo.title, dataBook.volumeInfo.authors, dataBook.volumeInfo.categories[0] , response.data.data[0]=='undefined' ? '' : response.data.data[0] , dataBook.volumeInfo.imageLinks==null ? 'aaa' : dataBook.volumeInfo.imageLinks.thumbnail , String(konversi.data.data).substring(0, 5))
                    })
                    .catch(function(error){
                        console.log(error)
                    })
                }

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