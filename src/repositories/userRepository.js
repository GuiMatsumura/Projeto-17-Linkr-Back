import bcrypt from 'bcrypt';
import connection from "../dbStrategy/postgres.js";

async function getUserByEmail(email) {
  return connection.query(`SELECT * FROM users WHERE email = $1 `, [email]);
};

async function createUser(email, username, password, photo) {
  const SALT = 10;
  const passwordHash = bcrypt.hashSync(password, SALT);
  return db.query(`
    INSERT INTO users (email, username, password, photo) 
    VALUES ($1, $2, $3, $4)`, 
    [email, username, password, photo]);
};

const usersRepository = {
  createUser,
  getUserByEmail
};

export default usersRepository;