import postRepository from "../repositories/postRepository.js";
export async function newPost(req, res) {
  const { verified } = res.locals;
  const body = {
    userId: verified.id,
    ...req.body,
  };
  try {
    await postRepository.createPost(body);
    const searchHashtag = await postRepository.searchHashtag(body);
    const findHashtag = await postRepository.findHashtag(searchHashtag.rows);

    if (findHashtag.rows.length === 0) {
      await postRepository.createPost(body);
      res.status(201).send({ ...body, userPhoto: verified.photo });
      return;
    }
    await postRepository.insertHashtag(findHashtag.rows);
    res.status(201).send({ ...body, userPhoto: verified.photo });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
