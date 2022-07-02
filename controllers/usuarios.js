const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

// PETICIONS HTTP
const usuariosGet = async (req = request, res = response) => {

    /* const { nombre, apellido, edad, NombreUsuario = 'por defecto' } = req.query; */
    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true }

    /*  const usuarios = await Usuario.find(query)
         .skip(Number(desde))
         .limit(Number(limite))
 
     const total = await Usuario.countDocuments(query); */

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
        //resp
    });

}

const usuariosPut = async (req, res = response) => {

    const id = req.params.id;
    const { _id, password, google, ...resto } = req.body;

    // TODO Validar contra Base de datos
    if (password) {
        // Encriptar la contraseña    
        const salt = bcrypt.genSaltSync(); //el salt es el numero de vueltas que le queremos dar a la contraseña para hacer mas complicado la encriptacion
        resto.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.status(500).json(usuario);
}

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body; // lo que viene del body en postman
    const usuario = new Usuario({ nombre, correo, password, rol }); //Instancia del modelo usuario

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync(); //el salt es el numero de vueltas que le queremos dar a la contraseña para hacer mas complicado la encriptacion
    usuario.password = bcrypt.hashSync(password, salt);

    // Guardar en BD
    await usuario.save();

    res.status(201).json({
        usuario
    });
}

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params

    // Borrarlo fiscamente de la BD
    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        usuario
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API - Controlador',
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}