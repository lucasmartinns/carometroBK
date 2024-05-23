const Usuario = require('../models/usuario');
const UsuariosTurmas = require('../models/usuariosTurmas')

exports.getAll = async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios)
};

exports.getById = async (req, res) => {
    // No router id é o que vem depois do usuario
    const idDoParam = req.params.id;
    const usuarioEncontrado = await Usuario.findOne({ where:{ idUsuarios:idDoParam }});
    res.json(usuarioEncontrado)
};

exports.createUsuario = async (req, res) => {
    const usuarioCadastrado = await Usuario.findOne({ where: {cpf: req.body.cpf }});
    // Verificação duplicidade de usuario cadastrado
    if (usuarioCadastrado) {
        return res.send('Já existe um usuario cadastrado neste CPF.')
    }

    const usuarioCriado = await Usuario.create(req.body)

    if (usuarioCriado.idUsuarios && req.body.Turmas_idTurmas) {

        await UsuariosTurmas.create ({

            Turmas_idTurmas: req.body.Turmas_idTurmas, // idTurma vem do front como informação de seleção de turma
            Usuarios_idUsuarios: usuarioCriado.idUsuarios,
        })
    }
    

    console.log("usuarioCriado", usuarioCriado)
    return res.send("POST realizado com sucesso.")
    // res.json(usuarios)
};


//deletar um usuario especifico

exports.deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByPy(id);
        if (!usuario) {
            return res.status(404).send('Usuário não encontrado');
        }

        const desvincular = await UsuariosTurmas.findOne({where: {
        Usuarios_idUsuarios: usuario.idUsuarios } });
        if (desvincular) {
            await desvincular.destroy();
        }
        await usuario.destroy();

        return res.send('Usuario deletado com sucesso');

    } catch (error) {
        console.error('Erro ao deletar usuario:' , error);
        return res.status(500).send('Erro ao deletar usuario:');
    }
};
