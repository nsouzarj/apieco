const User = require('../models/user.model');

exports.register = (req, res) => {
  // Crie um novo usuário com informações do corpo da requisição
  // Lógica para registrar o usuário
};

exports.login = (req, res) => {
  // Lógica para autenticar o usuário
};

exports.getUserById = (req, res) => {
  // Lógica para buscar um usuário pelo ID
  
};

exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;

    User.findByIdAndUpdate(userId, updatedUser, { new: true }, (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao atualizar usuário' });
        }

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        return res.status(200).json({ message: 'Usuário atualizado com sucesso', user });
    });
};

exports.deleteUser = (req, res) => {
    const userId = req.params.id;

    User.findByIdAndDelete(userId, (err, deletedUser) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao deletar usuário' });
        }

        if (!deletedUser) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        return res.status(200).json({ message: 'Usuário deletado com sucesso' });
    });
};