const express = require('express');
const usuarioRoutes = require('./usuarioRoutes');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);
router.use('/usuarios', usuarioRoutes);


module.exports = router;