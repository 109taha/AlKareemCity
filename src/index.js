import cors from "cors";
import express from "express";
import dotEnv from "dotenv";
dotEnv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//cors
app.use(
  cors({
    origin: "*",
  })
);

// connect mongodb
import connectToMongoDB from "./config/connectMongdb.js";
connectToMongoDB();

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).send("Real-Estate Server Is Running");
});
import user from "./routes/UserRoutes.js";

app.use("/user", user);

import investment from "./routes/investmentRoutes.js";

app.use("/", investment);
