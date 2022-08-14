import connection from '../dbStrategy/postgres.js';

async function getPosts() {
  return connection.query(
    'SELECT posts.id, users.photo AS foto, users.username AS name, posts.description, posts.url FROM posts JOIN users ON users.id = posts."userId" ORDER BY posts."createdAt" DESC LIMIT 20'
  );
}

export default { getPosts };
