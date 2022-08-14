import postRepository from "../repositories/postRepository.js";
export async function newPost(req, res) {
  const { verified } = res.locals;
  const body = {
    userId: verified.id,
    ...req.body,
  };
  try {
    await postRepository.createPost(body);
    const { rows: searchHashtag } = await postRepository.searchHashtag(body);
    const { rows: findHashtag } = await postRepository.findHashtag(
      searchHashtag
    );
    if (searchHashtag.length === 0) {
      await postRepository.createPost(body);
      return res.status(201).send({ ...body, userPhoto: verified.photo });
    }

    if (findHashtag.length === 0) {
      const { rows: hashtagId } = await postRepository.insertHashtag(
        searchHashtag[0].hashtag
      );
      const { rows: idPost } = await postRepository.createPost(body);
      await postRepository.postHashtag(hashtagId[0].id, idPost[0].id);
      return res.status(201).send({ ...body, userPhoto: verified.photo });
    }

    const { rows: idPost } = await postRepository.createPost(body);
    await postRepository.postHashtag(findHashtag[0].id, idPost[0].id);
    return res.status(201).send({ ...body, userPhoto: verified.photo });

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
