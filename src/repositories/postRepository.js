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

function findHashtag(hashtag) {
  return connection.query(`SELECT * FROM hashtags WHERE name = $1`, [
    hashtag[0][0].slice(1),
  ]);
}

function insertHashtag(hashtag) {
  return connection.query(
    `INSERT INTO hashtags (name) VALUES ($1) RETURNING id`,
    [hashtag[0][0].slice(1)]
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
