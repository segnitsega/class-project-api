import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import { router as userRouter } from "./routes/user.routes.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

await connectDB();

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
