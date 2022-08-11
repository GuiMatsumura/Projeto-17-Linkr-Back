import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';
import userRoute from './routes/userRoute.js'

dotenv.config();
const app = express();
app.use(cors(), express.json());

app.use(userRoute);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(
    chalk.hex('#00ffff').bold(`Server is running on: http://localhost:${PORT}`)
  )
});