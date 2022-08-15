import connection from '../dbStrategy/postgres.js';

async function getPosts() {
  return connection.query(
    'SELECT posts.id, users.photo AS foto, users.username AS name, users.id AS "userId", posts.description, posts.url FROM posts JOIN users ON users.id = posts."userId" ORDER BY posts."createdAt" DESC LIMIT 20'
  );
}

async function getTrending() {
  return connection.query('SELECT * FROM hashtags');
}

async function getHashtagPost(hashtag) {
  console.log(hashtag);
  return connection.query(
    'SELECT users.username AS name, users.photo AS foto, posts.description, posts.url, hashtags.name AS "hashtagName" FROM posts JOIN users ON users.id = posts."userId" JOIN "hashtagsPost" ON "hashtagsPost"."postId" = posts.id JOIN hashtags ON "hashtagsPost"."hashtagId"  = hashtags.id WHERE hashtags.name = $1',
    [hashtag]
  );
}

export default { getPosts, getTrending, getHashtagPost };
