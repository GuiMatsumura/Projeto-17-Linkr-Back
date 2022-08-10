import jwt from "jsonwebtoken";

export async function userSignin(req, res) {

    try {

        //const token = jwt.sign(req.body.email, process.env.JWT_SECRET);

        res.sendStatus(200);

    } catch (error) {

        res.sendStatus(500);
        console.error(error);

    }
};
