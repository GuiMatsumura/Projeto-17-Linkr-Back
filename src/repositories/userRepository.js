import bcrypt from "bcrypt";
import connection from "../dbStrategy/postgres.js";

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
  const query = "SELECT email FROM users WHERE username = $1";

  return connection.query(query, [username]);
}

async function getUserProfile(id) {
  const query = `
  SELECT users.id, users.username, users.photo 
  FROM users
  WHERE users.id = $1
  `;

  return connection.query(query, [id]);
}

async function getPostsByUserId(id) {
  const query = `
  SELECT 
  users.id as "userId",
  users.username AS name,
  users."photo" as photo, 
  posts.description,
  metadata.title AS "metadataTitle",
  metadata.description AS "metadataDescription", 
  metadata.img AS "metadataImg", 
  COUNT(comments."postId") AS "numberOfComments",
  COUNT(reposts.id) as "repostCount",
  posts.url,
  posts.id as "postId",
  NULL as "repostedByName",
  NULL as "repostedById",
  posts."createdAt"
  FROM posts
  LEFT JOIN users ON users.id=posts."userId"
  JOIN metadata ON posts.id = metadata."postId"
  LEFT JOIN reposts ON reposts."postId"=posts.id
  LEFT JOIN comments on posts.id = comments."postId"
  WHERE posts."userId" = $1
  GROUP BY posts.id, users.id, metadata.title, metadata.description, metadata.img

  UNION
  
  SELECT 
  u1.id as "userId",
  u1.username AS name,
  u1."photo" as photo, 
  posts.description,
  metadata.title AS "metadataTitle",
  metadata.description AS "metadataDescription", 
  metadata.img AS "metadataImg", 
  COUNT(comments."postId") AS "numberOfComments",
  COUNT(reposts.id) as "repostCount",
  posts.url,
  posts.id as "postId",
  "reposterUser".username as "repostedByName",
  "reposterUser".id as "repostedById",
  reposts."createdAt"
  FROM reposts
  LEFT JOIN posts ON reposts."postId"=posts.id
  LEFT JOIN users u1 ON u1.id=posts."userId"
  LEFT JOIN users "reposterUser" ON "reposterUser".id=reposts."userId"
  JOIN metadata ON posts.id = metadata."postId"
  LEFT JOIN comments on posts.id = comments."postId"
  WHERE posts."userId" = $1
  GROUP BY posts.id, u1.id, reposts."createdAt", reposts."userId", "reposterUser".username, "reposterUser".id,metadata.title, metadata.description, metadata.img
  ORDER BY "createdAt" DESC
 LIMIT 20
  `;
  return connection.query(query, [id]);
}

async function getUsers() {
  return connection.query(
    `SELECT id AS "userId", username, email, photo from users`
  );
}

async function followUser(accountFollowed, whoFollowed) {
  const query = `INSERT INTO followers ("accountFollowed", "whoFollowed") VALUES ($1, $2)`;

  return connection.query(query, [accountFollowed, whoFollowed]);
}

async function isUserFollowed(whoFollowed) {
  return connection.query(`SELECT * FROM followers WHERE "whoFollowed" = $1`, [
    whoFollowed,
  ]);
}

const usersRepository = {
  createUser,
  getUserByEmail,
  getUserByUsername,
  getUserProfile,
  getPostsByUserId,
  getUsers,
  followUser,
  isUserFollowed,
};

export default usersRepository;
