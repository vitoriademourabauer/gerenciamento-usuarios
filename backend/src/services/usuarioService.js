const Usuario = require('../models/Usuario');

const obterTodosUsuarios = async () => {
    return await Usuario.findAll ();
};

const obterUsuarioPorId = async (id) => {
    return await Usuario.findByPk(id);
};

const criarUsuario = async (dados) => {
    return await Usuario.create(dados);
};

const atualizarUsuario = async (id, dados) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error('Usuário não encontrado');
    return await usuario.update(dados);
};

const deletarUsuario = async (id) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error('Usuário não encontrado');
    await usuario.destroy();
    return { mensagem: 'Usuário deletado com sucesso' };
};



module.exports = {obterTodosUsuarios, obterUsuarioPorId, criarUsuario, atualizarUsuario, deletarUsuario};