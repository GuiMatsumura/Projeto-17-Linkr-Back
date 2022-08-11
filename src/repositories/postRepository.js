import connection from "../dbStrategy/postgres.js";

function createPost(body) {
  return connection.query(
    `INSERT INTO posts ("userId", url, description) VALUES ($1, $2, $3) `,
    [body.userId, body.url, body.description]
  );
}

export default { createPost };
