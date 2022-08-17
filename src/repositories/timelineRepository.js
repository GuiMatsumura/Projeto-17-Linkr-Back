import connection from "../dbStrategy/postgres.js";

async function getPosts() {
  return connection.query(
    `SELECT posts.id, users.photo AS foto, users.username AS name, users.id AS "userId", posts.description, posts.url, metadata.title AS "metadataTitle", 
      metadata.description AS "metadataDescription", metadata.img AS "metadataImg"
      FROM posts JOIN users ON users.id = posts."userId" 
      JOIN metadata ON posts.id = metadata."postId"
      ORDER BY posts."createdAt" DESC LIMIT 20`
  );
}

async function getTrending() {
  return connection.query("SELECT * FROM hashtags ORDER BY id DESC LIMIT 10 ");
}

async function getHashtagPost(hashtag) {
  return connection.query(
    `SELECT users.username AS name, users.photo AS foto, posts.description, posts.url, posts.id, hashtags.name AS "hashtagName", metadata.title AS "metadataTitle", 
    metadata.description AS "metadataDescription", metadata.img AS "metadataImg"
    FROM posts JOIN users ON users.id = posts."userId" 
    JOIN "hashtagsPost" ON "hashtagsPost"."postId" = posts.id 
    JOIN metadata ON posts.id = metadata."postId"
    JOIN hashtags ON "hashtagsPost"."hashtagId"  = hashtags.id WHERE hashtags.name = $1`,
    [hashtag]
  );
}

export default { getPosts, getTrending, getHashtagPost };
