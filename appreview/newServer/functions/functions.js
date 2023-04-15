const translate = require('translate-google')

function square(num){
   const numero  = parseFloat(num)
    return(num*num)
}

function traduzir(tranObj){
   return translate(tranObj, {to: 'pt'}).then(res => {
        console.log(res)
    }).catch(err => {
        console.error(err)
    })
}

module.exports = {square,traduzir}