import express from "express";
import dotenv from "dotenv";
import connectDB from "./Config/ConcectDB.js";
import authRouter from "./Routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./Routes/user.route.js";
import assistantRouter from "./Routes/assistant.route.js";
import billingRouter from "./Routes/billing.route.js";

dotenv.config();
const app = express();

const privateCors = 
cors({
  origin:["https://neuraai-7tzi.onrender.com"],

  credentials:true
});

const publicCors = cors({
  origin : "*",

});


app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", privateCors ,authRouter);
app.use("/api/user", privateCors ,  userRouter);
app.use("/api/billing", privateCors ,  billingRouter);


app.use("/api/assistant", publicCors ,  assistantRouter )

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
