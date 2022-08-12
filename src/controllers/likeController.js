import likeRepository from "../repositories/likeRepository";

export async function newPost(req, res) {

    try {

        const { postId } = req.body;
        const { verified } = res.locals;

        const body = [verified.id, postId];

        await likeRepository.giveLike(body);

        res.status(201).send("Curtido!");

    } catch (error) {

        console.log(error);
        res.sendStatus(500);

    }
}
