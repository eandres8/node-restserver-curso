const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');

const app = express();

app.get('/usuario', (req, res) => {

    let desde = Number(req.query.desde) || 0;
    let hasta = Number(req.query.hasta) || 5;

    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(hasta)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err2, conteo) => {
                if (err2) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    usuarios: usuarios,
                    conteo: conteo
                });
            });

        });
});

app.post('/usuario', (req, res) => {
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

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let campos = ['nombre', 'email', 'img', 'rol', 'estado'];
    let body = _.pick(req.body, campos);

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

app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;
    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioBorrado) {
            return res.status(404).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioBorrado,
            mensaje: 'Usuario se ha borrado correctamente'
        });
    });
});

module.exports = app;