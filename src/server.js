const cors = require("cors");
const express = require("express");
require("dotenv").config();

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
const connectToMongoDB = require("./config/connectMongdb.js");
connectToMongoDB();

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).send("Real-Estate Server Is Running");
});
const user = require("./routes/UserRoutes.js");

app.use("/user", user);

const investment = require("./routes/investmentRoutes.js");

app.use("/", investment);

const form = require("./routes/form.js");

app.use("/", form);

const email = require("./routes/emailRoutes.js");

app.use("/", email);
