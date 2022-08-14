import connection from "../dbStrategy/postgres.js";
import dayjs from "dayjs";

function createPost(body) {
  const now = dayjs();
  return connection.query(
    `INSERT INTO posts ("userId", url, description, "createdAt") VALUES ($1::int, $2, $3, $4) `,
    [body.userId, body.url, body.description, now]
  );
}

function searchHashtag(body) {
  return connection.query(
    `SELECT id AS "postId", REGEXP_MATCHES('$1', '#([A-Za-z0-9_]+)', 'g') AS hashtag FROM posts WHERE posts.description = $2`,
    [body.description, body.description]
  );
}

function findHashtag(hashtag) {
  return connection.query(`SELECT * FROM hashtags WHERE name = $1`, [
    hashtag[0].hashtag,
  ]);
}

function insertHashtag(hashtag) {
  return connection.query(`INSERT INTO hashtags (name) VALUES ($1)`, [
    hashtag[0].name,
  ]);
}

export default { createPost, searchHashtag, findHashtag, insertHashtag };
