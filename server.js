const express = require("express");
const { connectDb } = require("./database/conection");
const app = express();
const ownerRouter = require("./Routes/owner");
const bodyParser = require("body-parser");
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use("/api/owners", ownerRouter);

connectDb();

const port = 5000;
app.listen(port, () => console.log("listen on port " + port));
