const Turmas = require('../models/turmas');

exports.getAll = async (req, res) => {
    const turmas = await Turmas.findAll();
    res.json(turmas)
}

exports.getById = async (req, res) => {
    // No router id é o que vem depois do usuario
    const idDoParam = req.params.id;
    const turmaEncontrada = await Turmas.findOne({ where:{ idTurmas: idDoParam }});
    res.json(turmaEncontrada)
};

exports.createTurma = async (req, res) => {
    const turmaCadastrada = await Turmas.findOne({ where: { codigo: req.body.codigo }});
    // Verificação duplicidade de usuario cadastrado
    if (turmaCadastrada) {
        return res.send('Já existe uma turma neste Código.')
    }

    const turmaCriada = await Turmas.create(req.body)
    console.log("turmaCriada", turmaCriada)
    return res.send("POST realizado com sucesso.")
    // res.json(usuarios)
};