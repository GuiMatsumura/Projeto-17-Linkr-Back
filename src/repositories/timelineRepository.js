import connection from "../dbStrategy/postgres.js";

async function getPosts() {
  return connection.query(
    `SELECT posts.id, users.photo AS photo, users.username AS name, users.id AS "userId", posts.description, posts.url, metadata.title AS "metadataTitle", 
    metadata.description AS "metadataDescription", metadata.img AS "metadataImg", COUNT(comments."postId") AS "numberOfComments"
    FROM posts JOIN users ON users.id = posts."userId" 
    JOIN metadata ON posts.id = metadata."postId"
    LEFT JOIN comments on posts.id = comments."postId"
    GROUP BY posts.id, users.photo, users.username, users.id, metadata.title,  metadata.description, metadata.img
    ORDER BY posts."createdAt" 
    DESC LIMIT 20`
  );
}

async function getTrending() {
  return connection.query("SELECT * FROM hashtags ORDER BY id DESC LIMIT 10 ");
}

async function getHashtagPost(hashtag) {
  return connection.query(
    
    `SELECT posts.id, users.photo AS photo, users.username AS name, users.id AS "userId", posts.description, posts.url, metadata.title AS "metadataTitle", 
    metadata.description AS "metadataDescription", metadata.img AS "metadataImg", COUNT(comments."postId") AS "numberOfComments", hashtags.name AS "hashtagName"
    FROM posts JOIN users ON users.id = posts."userId" 
    JOIN "hashtagsPost" ON "hashtagsPost"."postId" = posts.id 
    JOIN metadata ON posts.id = metadata."postId"
    JOIN hashtags ON "hashtagsPost"."hashtagId" = hashtags.id 
    LEFT JOIN comments on posts.id = comments."postId"
    GROUP BY posts.id, users.photo, users.username, users.id, metadata.title,  metadata.description, metadata.img
    ORDER BY posts."createdAt" 
    WHERE hashtags.name = $1`,
    [hashtag]
  );
}

export default { getPosts, getTrending, getHashtagPost };
