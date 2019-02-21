const express = require('express');
const app = express();


const fs = require('fs');
const path = require('path');

const { verificaToken, verificaTokenImg } = require('../middlewares/autenticacion');



app.get('/imagenes/:tipo/:img', verificaTokenImg, (req, res) => {

    let tipo = req.params.tipo;
    let img = req.params.img;


    let pathUrl = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);

    if (fs.existsSync(pathUrl)) {
        res.sendFile(pathUrl);
    } else {
        let imagenNoEncontrada = path.resolve(__dirname, '../assets/no-image.jpg');
        res.sendFile(imagenNoEncontrada);
    }

});




module.exports = app;