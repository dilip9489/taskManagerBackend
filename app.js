const express = require("express");
const connectDb = require("./db/db");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
dotenv.config();
const corsOptions = {
  origin: ["https://task-manager-bice-six.vercel.app/"],
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
const taskRoutes = require("./routes/tasks.route");
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use("/tasks", taskRoutes);

const start = async () => {
  try {
    await connectDb(process.env.MONGO_DB);
    console.log("connected to db...");
    app.listen(PORT, () => {
      console.log(`server is listening on ${PORT}...`);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
