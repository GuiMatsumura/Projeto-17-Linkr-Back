import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET = process.env.JWT_SECRET;

const verifyToken = (data) => {
  try {
    const dataToken = jwt.verify(data, SECRET);
    return dataToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export default { verifyToken };
