const { connection } = require('../configs/dbConfig.js');

class User 
{
    constructor(fullname, phone, email, password, personalIdCode) {
        this.fullname = fullname;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.personalIdCode = personalIdCode;
    }

    static async create(newUser) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO users VALUES(null, ?, ?, ?, ?, ?, NOW(), NOW())', 
                [newUser.fullname, newUser.phone, newUser.email, newUser.password, newUser.personalIdCode], 
                (err, res) => {
                    if (err) {
                        console.log(err.message);
                        return reject(err);
                    }
                    return resolve( 
                        {
                            id: res.insertId,
                        }
                    );
                }
            );    
        })
    }

    static async findByEmail(email) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE email = ?', 
            [email], 
            (err, res) => {
                if (err) {
                    console.log(err.message);
                    return reject(err);
                }
                return resolve(res.length 
                    ? {
                        id: res[0].id,
                        fullname: res[0].fullname,
                        phone: res[0].phone,
                        email: res[0].email,
                        password: res[0].password,
                        personalIdCode: res[0].personal_id_code,
                        updatedAt: res[0].updated_at,
                        createdAt: res[0].created_at,
                    } 
                    : null
                );
            })
        });
    }

    static async findByPhone(phone) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE phone = ?', 
            [phone], 
            (err, res) => {
                if (err) {
                    console.log(err.message);
                    return reject(err);
                }
                return resolve(res.length 
                    ? {
                        id: res[0].id,
                        fullname: res[0].fullname,
                        phone: res[0].phone,
                        email: res[0].email,
                        password: res[0].password,
                        personalIdCode: res[0].personal_id_code,
                        updatedAt: res[0].updated_at,
                        createdAt: res[0].created_at,
                    } 
                    : null
                );
            })
        });
    }

    static async findById(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE id = ?', 
            [id], 
            (err, res) => {
                if (err) {
                    console.log(err.message);
                    return reject(err);
                }
                return resolve(res.length 
                    ? {
                        id: res[0].id,
                        fullname: res[0].fullname,
                        phone: res[0].phone,
                        email: res[0].email,
                        password: res[0].password,
                        personalIdCode: res[0].personal_id_code,
                        updatedAt: res[0].updated_at,
                        createdAt: res[0].created_at,
                    } 
                    : null
                );
            })
        });
    }

    static async editById(id, properties) {
        const columns = ['fullname', 'phone', 'email', 'password', 'personal_id_code'];
        if (properties.containsKey('personalIdCode')) {
            properties.personal_id_code = properties.personalIdCode;
        }
        let endColumns = [];
        let sql = 'UPDATE users SET ';
        for (const column of columns) {
            if (properties.containsKey(column)) {
                sql += column + '=?, ';
                endColumns.push(properties[column] ? properties[column] : null);
            }
        }

        sql += 'updated_at = NOW() WHERE id = ?';
        endColumns.push(id);
        
        return new Promise((resolve, reject) => {
            connection.query(sql, endColumns, 
            (err, res) => {
                if (err) {
                    console.log(err.message);
                    return reject(err);
                }
                return resolve(res.length 
                    ? {
                        id: id,
                    } 
                    : null
                );
            })
        });
    }

    static async removeById(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM users WHERE id = ?', 
            [id], 
            (err, res) => {
                if (err) {
                    console.log(err.message);
                    return reject(err);
                }
                return resolve(res.length 
                    ? {
                        id: id
                    } 
                    : null
                );
            })
        })
    }
}

module.exports = User;
