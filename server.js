const express = require("express");
const bodyParser = require("body-parser");
const ownerRouter = require("./Routes/owner");
const positionRouter = require("./Routes/position");
const driverRouter = require("./Routes/driver");
const carTypeRouter = require("./Routes/carType");
const carRouter = require("./Routes/car");
const { connectDb } = require("./database/conection");
const cors = require('cors');
const app = express();

//midelwares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ extended: true }));

//Routes API
app.use("/api/owners", ownerRouter);
app.use("/api/positions", positionRouter);
app.use("/api/drivers", driverRouter);
app.use("/api/cartypes", carTypeRouter);
app.use("/api/cars", carRouter);

connectDb();

const port = 5000;
app.listen(port, () => console.log("listen on port " + port));
