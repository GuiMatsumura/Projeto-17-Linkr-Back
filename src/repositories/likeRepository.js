import connection from '../dbStrategy/postgres.js';

function giveLike(body) {
  const query = `INSERT INTO likes ("userId", "postId") VALUES ($1, $2)`;

  return connection.query(query, body);
}

function getLike(body) {
  const query = 'SELECT * FROM likes WHERE "userId" = $1 AND "postId" = $2';

  return connection.query(query, body);
}

function getLikePost(body) {

  const query = `
    SELECT users.username FROM users 
    JOIN likes ON likes."userId" = users.id 
    WHERE likes."postId" = $1`;

  return connection.query(query, body);

}

function removeLike(body) {
  const query = 'DELETE FROM likes WHERE "userId" = $1 AND "postId" = $2';

  return connection.query(query, body);
}

export default { giveLike, getLike, removeLike, getLikePost };
