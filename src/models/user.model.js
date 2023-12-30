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


    // Buscar usuário pelo ID
    static findById(id) {
        let sql = `SELECT * FROM users WHERE id = $1`;
        return pool.query(sql, [id])
            .then(result => result.rows[0])
            .catch(err => console.error(err));
    }


}
    

module.exports = User;   
  

