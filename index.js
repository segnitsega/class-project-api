import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import { router as userRouter } from "./routes/user.routes.js";
import { swaggerUi, specs } from "./config/swagger.js";
import { router as authRouter } from "./routes/auth.route.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

await connectDB();

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/users", userRouter);
app.use("/refresh-token", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
