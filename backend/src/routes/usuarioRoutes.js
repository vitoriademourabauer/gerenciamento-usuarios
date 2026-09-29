const express = require ('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { autenticar, autorizar } = require('../middlewares/authMiddleware');

router.post('/', usuarioController.criarUsuario);

router.use(autenticar);
router.get('/', usuarioController.buscarUsuarios);
router.get('/:id', usuarioController.buscarUsuarioPorId);
router.put('/:id', usuarioController.atualizarUsuario);
router.delete('/:id', usuarioController.deletarUsuario);

module.exports = router;