import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRouter from "./routes/auth";

const app = express();
dotenv.config();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", AuthRouter);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server started at: ${process.env.SERVER_PORT}`);
});
