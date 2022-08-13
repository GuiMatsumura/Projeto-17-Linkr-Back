import connection from '../dbStrategy/postgres.js';

function createPost(body) {
  return connection.query(
    `INSERT INTO posts ("userId", url, description) VALUES ($1, $2, $3) `,
    [body.userId, body.url, body.description]
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
