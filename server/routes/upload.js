const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const Usuario = require('../models/usuario');
const Producto = require('../models/producto');

const fs = require('fs');
const path = require('path');

// default options
app.use(fileUpload({ useTempFiles: true }));

app.put('/upload/:tipo/:id', (req, res) => {
    let tipo = req.params.tipo;
    let id = req.params.id;
    if (Object.keys(req.files).length == 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se ha seleccionado ningun archivo'
            }
        });
    }
    let tiposValidos = ['productos', 'usuarios'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se permite este tipo de actualizacion',
                tipo
            }
        });
    }


    let sampleFile = req.files.archivo;
    let nombrearchivo = sampleFile.name.split('.');
    let extension = nombrearchivo[nombrearchivo.length - 1];
    //Validar extensiones
    let extensiones = ['png', 'jpg', 'gif', 'jpeg'];
    if (extensiones.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se permite este tipo de archivo',
                extension
            }
        });
    }

    let archivonombre = `${id}-${new Date().getMilliseconds()}.${extension}`;

    sampleFile.mv(`uploads/${tipo}/${archivonombre}`, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (tipo === 'usuarios') {
            imagenUsuario(id, res, archivonombre);
        } else {
            imagenProducto(id, res, archivonombre);
        }
    });
});

function imagenUsuario(id, res, archivonombre) {
    Usuario.findById(id, (err, usuarioDB) => {
        if (err) {
            borraArchivo(archivonombre, 'usuarios');
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            borraArchivo(archivonombre, 'usuarios');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no existe'
                }
            });
        }

        borraArchivo(usuarioDB.img, 'usuarios');

        usuarioDB.img = archivonombre;
        usuarioDB.save((err, usuarioGuardado) => {
            res.json({
                ok: true,
                usuario: usuarioGuardado,
                imagen: archivonombre
            });
        });
    });
}

function imagenProducto(id, res, archivonombre) {
    Producto.findById(id, (err, productoDB) => {
        if (err) {
            borraArchivo(archivonombre, 'productos');
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            borraArchivo(archivonombre, 'productos');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no existe'
                }
            });
        }

        borraArchivo(productoDB.img, 'productos');

        productoDB.img = archivonombre;
        productoDB.save((err, productoGuardado) => {
            res.json({
                ok: true,
                producto: productoGuardado,
                imagen: archivonombre
            });
        });
    });
}

function borraArchivo(nombreImagen, tipo) {
    let pathUrl = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);
    if (fs.existsSync(pathUrl)) {
        fs.unlinkSync(pathUrl);
    }
}

module.exports = app;