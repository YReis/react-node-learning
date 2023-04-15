const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const translate = require('translate-google')
const app = express()


const tradutor = async (mensagem, callback) => {
    translate(mensagem, { to: 'pt' }).then(res => {
        return callback(res)
    }).catch(err => {
        callback(err)
    })
}

app.post("/mensagem", (req, res) => {
    let mensage = req.query.mensagem
    tradutor(mensage, (mensagemTraduzida) => {
        return res.send(mensagemTraduzida)
    })
})



app.listen('3000', (res) => {
    console.log("server running on 3000")
})


