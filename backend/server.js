import express from 'express';
import database from "./db.js";
import bodyParser from "body-parser";
import cors from 'cors';
import internRouter from './routes/intern.js';
import userRouter from './routes/user.js';
import adminRouter from './routes/admin.js';
import  {config} from 'dotenv';
import cookieParser  from 'cookie-parser';


config({
    path:"./data/config.env"
});

const app = express();
const port = process.env.PORT || 8082;

database();


app.use(cors());    
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());


app.use('/api/v2/intern', internRouter);
app.use('/api/v2/user', userRouter);
app.use('/api/v2/admin', adminRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});