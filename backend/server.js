import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("connected successfully!!");
    app.listen(process.env.PORT || 8000, (err) => {
      if (err) console.log(err);

      console.log("running successfully at", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("error", error);
  });

app.use("/", userRouter);
