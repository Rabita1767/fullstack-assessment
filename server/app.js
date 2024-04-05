const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
app.use(cors());

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server started at: ${process.env.SERVER_PORT}`);
});
