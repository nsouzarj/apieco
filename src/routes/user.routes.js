const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Rota para registrar um novo usuário
router.post('/register', userController.register);

// Rota para realizar login
router.post('/login', userController.login);

// Rota para buscar informações de um usuário específico
router.get('/:id', userController.getUserById);

// Rota para atualizar informações de um usuário
router.put('/:id', userController.updateUser);

// Rota para deletar um usuário
router.delete('/:id', userController.deleteUser);

// Rota de teste
router.get('/', (req, res) => {
    console.log("Funcionpou.....")
    res.send('<H1>TESTE<H1>');
});



module.exports = router;