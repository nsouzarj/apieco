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
    
    // Find the user in the database based on the provided username
    User.findOne({ username }, (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao fazer login' });
        }

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Check if the provided password matches the user's password
        if (user.password !== password) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        return res.status(200).json({ message: 'Login bem-sucedido', user });
    });
};

exports.getUserById = (req, res) => {
    const { id } = req.params;

    // Find the user in the database based on the provided ID
    User.findById(id, (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar usuário' });
        }

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        return res.status(200).json({ message: 'Usuário encontrado', user });
    });
};


