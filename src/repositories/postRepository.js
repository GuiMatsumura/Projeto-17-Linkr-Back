import connection from "../dbStrategy/postgres.js";
import dayjs from "dayjs";

async function deletePostById(id) {
  const query = `
  DELETE FROM posts WHERE id = $1
  `;

  return connection.query(query, [id]);
}

function createPost(body) {
  const now = dayjs();
  return connection.query(
    `INSERT INTO posts ("userId", url, description, "createdAt") VALUES ($1, $2, $3, $4)
    RETURNING id`,
    [body.userId, body.url, body.description, now]
  );
}

// function searchHashtag(body) {
//   console.log(body);
//   return connection.query(
//     `SELECT id AS "postId", REGEXP_MATCHES($1, '#([A-Za-z0-9_]+)', 'g') AS hashtag FROM posts WHERE posts.description = $2`,
//     [body.description, body.description]
//   );
// }

function findHashtag(hashtag) {
  return connection.query(`SELECT * FROM hashtags WHERE name = $1`, [hashtag]);
}

function insertHashtag(hashtag) {
  console.log(hashtag);
  return connection.query(
    `INSERT INTO hashtags (name) VALUES ($1) RETURNING id`,
    [hashtag]
  );
}
function postHashtag(hashtagId, postId) {
  return connection.query(
    `INSERT INTO "hashtagsPost" ("hashtagId", "postId") VALUES ($1, $2)`,
    [hashtagId, postId]
  );
}

function updatePost(description, postId) {
  return connection.query(`UPDATE posts SET description = $1 WHERE id = $2`, [
    description,
    postId,
  ]);
}
export default {
  createPost,
  findHashtag,
  insertHashtag,
  postHashtag,
  updatePost,
  deletePostById,
};
