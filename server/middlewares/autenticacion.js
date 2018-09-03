const jwt = require('jsonwebtoken');

// ======================================
// Verificar token
// ======================================
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

// ======================================
// Verificar admin Role
// ======================================
let verificaAdminRole = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            error: {
                message: 'No tiene autorización para crear un usuario'
            }
        });
    }

};

module.exports = {
    verificaToken,
    verificaAdminRole
}