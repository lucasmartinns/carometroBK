const Turmas = require("../models/turmas");

// Busca todas as turmas
exports.getAll = async (req, res) => {
  const turmas = await Turmas.findAll();
  res.json(turmas);
  // async & await faz o código esperar até eu chamar ele
  // requisição(req): algo que peço
  // resposta(res): respotas
};

// Busca turma pelo id
exports.getById = async (req, res) => {
  // No router id é o que vem depois da turma
  const idDoParam = req.params.id;
  const turmaEncontrada = await Turmas.findOne({
    where: { idTurmas: idDoParam },
  });
  res.json(turmaEncontrada);
};

// Esta seção está criando uma turma
exports.createTurma = async (req, res) => {
  const turmaCadastrada = await Turmas.findOne({
    where: { codigo: req.body.codigo },
  });
  // Verificação duplicidade de turma cadastrada
  if (turmaCadastrada) {
    return res.send("Já existe uma turma neste Código.");
  }

  // Verificação de POST de turma cadastrada
  const turmaCriada = await Turmas.create(req.body);
  console.log("turmaCriada", turmaCriada);
  return res.send("POST realizado com sucesso.");
  // res.json(usuarios)
};

// Esta está atualizando uma turma
exports.updateTurma = async (req, res) => {
    console.log(req.params.codigo)
  // Cria uma função chamada updateTurma
  const codigoTurma = req.params.codigo; // Cria uma varíavel onde se adquire informações do banco de dados
  console.log(codigoTurma);
  try {
    // "Tente"
    const turmaCadastrada = await Turmas.findOne({
      where: { codigo: codigoTurma },
    }); //

    if (turmaCadastrada) {
      delete req.body.codigo; // Delete como medida de segurança, pois nem toda a informação pode ser atualizada ao mesmo tempo

      const [numRowsUpdated] = await Turmas.update(req.body, {
        // Array que faz uma contagem de nº de linha de atualização
        where: { codigo: codigoTurma },
      });

      if (numRowsUpdated > 0) {
        // Verifica a array
        const turmaAtualizada = await Turmas.findOne({
          where: { codigo: codigoTurma },
        });
        return res.send({
          message: "Turma Atualizada com sucesso",
          turmacomdadosnovos: turmaAtualizada,
        });
      } else {
        return res.send(
          "Turma encontrada, porém sem novos dados para atualizar"
        );
      }
    } else {
      return res
        .status(404)
        .send("Não existe um turma cadastrada com este código.");
    }
  } catch (error) {
    console.error("erro ao atualizar turma:", error);
    return res.status(500).send("ocorreu um erro ao atualizar a turma");
  }

  // catch {

  // }
};
