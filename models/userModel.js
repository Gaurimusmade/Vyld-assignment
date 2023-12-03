const bcrypt = require('bcryptjs');
const db = require('./db');

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports.isUsernameExists = async (username) => {
    try {
        let result = await USERDATA(username);
        if (result == null) return true;
        return false;
    } catch (err) {
        throw new Error(err);
    }
}

module.exports.newUser = async (userData) => {
    try {
        let query = `INSERT INTO users (Name, username, bio, age, password) VALUES (?,?,?,?,?);`;
        let values = [userData.Name, userData.username, userData.bio, userData.age, userData.password];
        await db.query(query, values);
        return true;
    } catch (err) {
        throw new Error(err);
    }
}



module.exports.varifyUser = async (username, password) => {
    try {
        const result = await USERDATA(username);
        if (result.length > 0) {
            let flag = bcrypt.compare(password, result[0].password);
            if (flag) {
                return result[0];
            }
            else {
                return [];
            }
        }
        return [];
    } catch (err) {
        throw new Error(err);
    }

}

module.exports.updateUser = async (userData) => {
    try {
        let { Name, username, bio, age, ID } = userData;
        let query = "UPDATE users SET Name = ?, username = ? , bio = ? , age = ? WHERE ID = ?;"
        let values = [Name, username, bio, age, ID];
        await db.query(query, values);
        return true;
    } catch (err) {
        throw new Error(err);
    }
}

module.exports.deleteUser = async (id) => {
    try {
        let query = `DELETE FROM users WHERE ID = ${id}`;
        await db.query(query);
        return true;
    } catch (err) {
        throw new Error(err);
    }
}

module.exports.deleteToken = async (token) => {
    try {
        let query = `INSERT INTO blacktoken (token) VALUES ('${token}');`;
        await db.query(query);
        return true;
    } catch (err) {
        throw new Error(err);
    }
}


let USERDATA = (username) => {
    return new Promise(async (resolve, reject) => {
        let sqlquery = `SELECT * FROM users WHERE username ='${username}'`;
        db.query(sqlquery, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        })
    });
}