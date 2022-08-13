import likeRepository from "../repositories/likeRepository.js";

export async function updateLike(req, res) {

    try {

        const { postId, like } = req.body;
        const { verified } = res.locals;

        const body = [verified.id, postId];

        if(!like) {

            await likeRepository.giveLike(body);
            return res.status(201).send("Curtido!");

        }
             
        await likeRepository.removeLike(body);
        res.status(201).send("Descurtido!");

    } catch (error) {

        console.log(error);
        res.sendStatus(500);

    }
}
