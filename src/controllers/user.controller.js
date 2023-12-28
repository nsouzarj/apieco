const User = require('../models/user.model');


exports.register = (req, res) => {
    const { username, password, email } = req.body;

    // Create a new user with the information from the request body
    const newUser = new User({
        username,
        password,
        email
    });

    // Save the new user to the database
    newUser.save((err, savedUser) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao registrar usuário' });
        }

        return res.status(200).json({ message: 'Usuário registrado com sucesso', user: savedUser });
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    // Find the user by username
    User.findOne({ username }, (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao autenticar usuário' });
        }

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Check if the password is correct
        if (user.password !== password) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        // Authentication successful
        return res.status(200).json({ message: 'Autenticação bem-sucedida', user });
    });
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