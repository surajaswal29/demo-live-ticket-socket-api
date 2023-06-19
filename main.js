import express from "express";
import { createServer } from "http";
import dotenv from "dotenv";
import cors from "cors";
import Database from "./config/database.js";
import { SocketConfig } from "./config/socketConfig.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT || 5001;

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpServer = createServer(app);

// calling database
Database();

// setting socket config
SocketConfig(httpServer);

// const activeUsers = getActiveUsers();
// console.log(activeUsers);
app.use("/api/v1", notificationRoutes);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
