import bcrypt from 'bcrypt';
import connection from "../dbStrategy/postgres.js";

async function getUserByEmail(email) {

  return connection.query(`SELECT * FROM users WHERE email = $1`, [email]);

};

async function createUser(email, username, password, photo) {
  const SALT = 10;
  const passwordHash = bcrypt.hashSync(password, SALT);
  return await connection.query(`
    INSERT INTO users (email, username, password, photo) 
    VALUES ($1, $2, $3, $4)`,
    [email, username, passwordHash, photo]);
};

async function getUserByUsername(username) {

  const query = 'SELECT email FROM users WHERE username = $1';

  return connection.query(query, [username]);

};

async function getUserProfile(id) {
  const query = `
  SELECT users.id, users.username, users.photo, posts.id AS "idPost", posts.url, posts.description
  FROM users
  JOIN posts
  ON posts."userId" = users.id
  WHERE users.id = $1
  `;

  return connection.query(query, [id]);
}

async function getLikes(id){
  const query = `
  SELECT COUNT(likes."userId") AS "numberOfLikes", likes."postId"
  FROM likes
  WHERE likes."userId" = $1
  GROUP BY likes."postId"
  `

  return connection.query(query, [id])
}

const usersRepository = {
  createUser,
  getUserByEmail,
  getUserByUsername,
  getUserProfile,
  getLikes
};

export default usersRepository;