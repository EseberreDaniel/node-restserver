const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const Usuario = require('../models/usuario');
const { verificaToken, verificaAdministrador } = require('../middlewares/autenticacion');


const _ = require('underscore');

app.get('/usuario', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);




    Usuario.find({ estado: true }, 'nombre email rol estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    numero: conteo
                });
            });
        });
});

app.post('/usuario', [verificaToken, verificaAdministrador], (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});

app.put('/usuario/:id', [verificaToken, verificaAdministrador], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);



    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.delete('/usuario/:id', [verificaToken, verificaAdministrador], (req, res) => {

    let id = req.params.id;

    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
    /* Usuario.findByIdAndRemove(id, (err, usuarioborrado) => {
         if (err) {
             return res.status(400).json({
                 ok: false,
                 err
             });
         };
         if (!usuarioborrado) {
             return res.status(400).json({
                 ok: false,
                 err: {
                     message: 'Usuario no encontrado'
                 }
             });
         }
         res.json({
             ok: true,
             usuario: usuarioborrado
         });
     });*/
});

module.exports = app;