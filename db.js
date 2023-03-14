const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'blanked',
});

connection.connect();

let CREATE_TABLE_LINKS = '';
CREATE_TABLE_LINKS += 'CREATE TABLE IF NOT EXISTS links (';
CREATE_TABLE_LINKS += 'id INT, ';
CREATE_TABLE_LINKS += 'o_id INT, ';
CREATE_TABLE_LINKS += 'link TEXT NOT NULL, ';
CREATE_TABLE_LINKS += 'alias TEXT NOT NULL, ';
CREATE_TABLE_LINKS += 'track BOOLEAN NOT NULL, ';
CREATE_TABLE_LINKS += 'password TEXT, ';
CREATE_TABLE_LINKS += 'views INT, ';
CREATE_TABLE_LINKS += 'enabled BOOLEAN, ';
CREATE_TABLE_LINKS += 'created_on DATE, ';
CREATE_TABLE_LINKS += 'PRIMARY KEY (id), ';
CREATE_TABLE_LINKS += 'FOREIGN KEY (o_id) REFERENCES users(id), ';
CREATE_TABLE_LINKS += 'UNIQUE(alias)';
CREATE_TABLE_LINKS += ');';

let CREATE_TABLE_USERS = '';
CREATE_TABLE_USERS += 'CREATE TABLE IF NOT EXISTS users (';
CREATE_TABLE_USERS += 'id INT, ';
CREATE_TABLE_USERS += 'username TEXT NOT NULL, ';
CREATE_TABLE_USERS += 'email TEXT NOT NULL, ';
CREATE_TABLE_USERS += 'password TEXT NOT NULL, ';
CREATE_TABLE_USERS += 'name TEXT NOT NULL, ';
CREATE_TABLE_USERS += 'avatar TEXT, ';
CREATE_TABLE_USERS += 'active BOOLEAN NOT NULL, ';
CREATE_TABLE_USERS += 'admin BOOLEAN NOT NULL, ';
CREATE_TABLE_USERS += 'created_on TIMESTAMP NOT NULL, ';
CREATE_TABLE_USERS += 'PRIMARY KEY (id), ';
CREATE_TABLE_USERS += 'UNIQUE (username), ';
CREATE_TABLE_USERS += 'UNIQUE (email)';
CREATE_TABLE_USERS += ');';

let CREATE_DEFAULT_USER = '';
CREATE_DEFAULT_USER +=
    'INSERT INTO users (username, email, password, name, avatar, active, admin, created_on) VALUES (';
CREATE_DEFAULT_USER += '"blank", ';
CREATE_DEFAULT_USER += '"blank", ';
CREATE_DEFAULT_USER += '"blank", ';
CREATE_DEFAULT_USER += '"blank", ';
CREATE_DEFAULT_USER += '"blank.jpg", ';
CREATE_DEFAULT_USER += 'false, ';
CREATE_DEFAULT_USER += 'false, ';
CREATE_DEFAULT_USER += `"${new Date().toISOString()}"`;
CREATE_DEFAULT_USER += ');';

connection.query(CREATE_TABLE_USERS, (err) => {
    if (err) {
        return console.error(
            'There was an error creating the default users table.',
            err,
        );
    } else {
        connection.query(CREATE_TABLE_LINKS, (err) => {
            if (err) {
                return console.error(
                    'There was an error creating the default links table.',
                    err,
                );
            } else {
                connection.query(
                    'SELECT COUNT (id) AS user_count FROM users',
                    (err, rows, fields) => {
                        if (err) {
                            return console.error(
                                'There was an error getting the user count.',
                                err,
                            );
                        } else {
                            const count = rows[0].user_count;

                            if (count < 1) {
                                connection.query(CREATE_DEFAULT_USER, (err) => {
                                    if (err) {
                                        return console.error(
                                            'There was an error creating the default user.',
                                            err,
                                        );
                                    }
                                });
                            }
                        }
                    },
                );
            }
        });
    }
});

module.exports = connection;
