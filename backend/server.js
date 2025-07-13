import colors from "colors";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { connectDB } from "./config/db.config.js";
dotenv.config();
connectDB();
colors.enable();

import authRoutes from "./routes/auth.routes.js";
import indexRoutes from "./routes/index.routes.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/", indexRoutes);
app.use("/api/auth", authRoutes);

const server = () => {
  try {
    app.listen(PORT, () => {
      console.log(
        `Server is running on ${PORT}. Access at http://localhost:${PORT}`.blue
      );
    });
  } catch (err) {
    console.error(`Server Error`.red, err);
  }
};

server();
