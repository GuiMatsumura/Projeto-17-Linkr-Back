import bcrypt from 'bcrypt';
import connection from '../dbStrategy/postgres.js';

async function getUserByEmail(email) {
  return connection.query(`SELECT * FROM users WHERE email = $1`, [email]);
}

async function createUser(email, username, password, photo) {
  const SALT = 10;
  const passwordHash = bcrypt.hashSync(password, SALT);
  return await connection.query(
    `
    INSERT INTO users (email, username, password, photo) 
    VALUES ($1, $2, $3, $4)`,
    [email, username, passwordHash, photo]
  );
}

async function getUserByUsername(username) {
  const query = 'SELECT email FROM users WHERE username = $1';

  return connection.query(query, [username]);

};

async function getUserProfile(id) {
  const query = `
  SELECT users.id, users.username, users.photo 
  FROM users
  WHERE users.id = $1
  `;

  return connection.query(query, [id]);
}


async function getPostsByUserId(id){
  const query = `
  SELECT posts."userId" AS "postOwner", posts.id AS "postLiked",  COUNT(likes."userId") AS "numberOfLikes",
  posts.url, posts.description
  FROM posts
  JOIN likes
  ON posts.id = likes."postId"
  WHERE posts."userId" = $1
  GROUP BY posts.id
  `

  return connection.query(query, [id])
}



async function getUsers() {
  return connection.query(
    `SELECT id AS "userId", username, email, photo from users`
  );
}

const usersRepository = {
  createUser,
  getUserByEmail,
  getUserByUsername,
  getUserProfile,
  getPostsByUserId,
  getUsers
};

export default usersRepository;
