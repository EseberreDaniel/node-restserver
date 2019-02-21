const jwt = require('jsonwebtoken');
//
//Verificacion Token
//
let verificaToken = (req, res, next) => {
    let token = req.get('Authorization');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};
let verificaAdministrador = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario.rol === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'No eres administrador'
            }
        });
    }
};

let verificaTokenImg = (req, res, next) => {
    let token = req.query.token;

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }
        req.usuario = decoded.usuario;
        next();
    });


}



module.exports = {
    verificaToken,
    verificaAdministrador,
    verificaTokenImg
}