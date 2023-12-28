const bcrypt = require('bcryptjs');
const saltRounds = 10;
const pool = require('../config/db.config');
const { deleteUser } = require('../controllers/user.controller');

class User {
    constructor(user) {
        this.username = user.username;
        this.email = user.email;
        this.password = user.password; // A senha deve ser criptografada
    }

    // Salvar um novo usuário no banco de dados
    save() {
        return bcrypt.hash(this.password, saltRounds)
            .then(hash => {
                this.password = hash;
                let sql = `INSERT INTO users(username, email, password)
                                     VALUES($1, $2, $3)
                                     RETURNING *`;
                return pool.query(sql, [this.username, this.email, this.password]);
            })
            .catch(err => console.error(err));
    }

    // Encontrar um usuário pelo email
    static findByEmail(email) {
        let sql = `SELECT * FROM users WHERE email = $1`;
        return pool.query(sql, [email]);
    }

    // Encontrar um usuário pelo ID
    static findById(id) {
        let sql = `SELECT * FROM users WHERE id = $1`;
        return pool.query(sql, [id]);
    }

    // Deletar um usuário pelo ID
    static deleteById(id) {
        let sql = `DELETE FROM users WHERE id = $1`;
        return pool.query(sql, [id]);
    }

    // Atualizar um usuário pelo ID
    static update(id, updatedUser) {
        let sql = `UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4`;
        return pool.query(sql, [updatedUser.username, updatedUser.email, updatedUser.password, id]);
    }

    
    // Buscar um usuário pelo nome de usuário
    static findByUsername(username) {
        let sql = `SELECT * FROM users WHERE username = $1`;
        return pool.query(sql, [username]);
    }

}
    

module.exports = User;   
  

