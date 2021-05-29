require("express-async-errors");
const express = require("express");
const cors = require("cors");
const config = require("config");
const error = require("./Midleware/error");
const bodyParser = require("body-parser");
const ownerRouter = require("./Routes/owner");
const positionRouter = require("./Routes/position");
const driverRouter = require("./Routes/driver");
const carTypeRouter = require("./Routes/carType");
const carRouter = require("./Routes/car");
const contractRouter = require("./Routes/contractCar");
const usertRouter = require("./Routes/user");
const projectRouter = require("./Routes/project");
const statePositiontRouter = require("./Routes/statePosition");
const authRouter = require("./Routes/auth");
const { connectDb } = require("./database/conection");
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

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
app.use("/api/contracts", contractRouter);
app.use("/api/users", usertRouter);
app.use("/api/projects", projectRouter);
app.use("/api/state", statePositiontRouter);
app.use("/api/auth", authRouter);

app.use(error);

connectDb();

const port = 5000;
app.listen(port, () => console.log("listen on port " + port));
