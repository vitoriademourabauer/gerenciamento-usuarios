const usuarioService = require('../services/usuarioService');

const buscarUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioService.obterTodosUsuarios();
        res.status(200).json({data: usuarios});
    }
    catch (err) {
        res.status(500).json({erro: 'Erro interno ao buscar usuarios'});
    }
};

const buscarUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await usuarioService.obterUsuarioPorId(id);
        if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
        res.status(200).json(usuario);
    } catch (err) {
        res.status(500).json({ erro: 'Erro interno ao buscar usuário' });
    }
};

const criarUsuario = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ err: 'Dados inválidos' });
        }

        const novoUsuario = await usuarioService.criarUsuario(nome, email, senha);
        res.status(201).json(novoUsuario);
    } catch (err) {
        res.status(400).json({ erro: 'Erro ao criar usuário', detalhes: err.message });
    }
};

const atualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioAtualizado = await usuarioService.atualizarUsuario(id, req.body);
        res.status(200).json(usuarioAtualizado);
    } catch (err) {
        res.status(400).json({ erro: 'Erro ao atualizar usuário', detalhes: err.message });
    }
};

const deletarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        await usuarioService.deletarUsuario(id);
        res.status(200).json({ mensagem: 'Deletado com sucesso' });
    } catch (err) {
        res.status(400).json({ erro: 'Erro ao deletar usuário', detalhes: err.message });
    }
};

module.exports = { buscarUsuarios, buscarUsuarioPorId, criarUsuario, atualizarUsuario, deletarUsuario };