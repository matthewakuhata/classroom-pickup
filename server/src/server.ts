import http from "http";
import express, { Express } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import api from "./routes/api";
import * as dotenv from "dotenv";

dotenv.config();
const server: Express = express();

server.use(morgan("dev"));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With,Content-Type,Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
    return res.status(200).json({});
  }
  next();
});

/**
 * API Version 1
 */
server.use("/api/v1/", api);

// server.use(express.static(path.join(__dirname, "../../client/build")));

// server.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "build", "index.html"));
// });

const httpServer = http.createServer(server);
console.log(process.env.MONGO_API_CONNECT);

mongoose
  .connect(
    "mongodb+srv://admin:admin@mern-app.mliam.mongodb.net/student-pickup?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");

    const PORT: any = process.env.PORT || 3001;
    httpServer.listen(PORT, () =>
      console.log(`The server is running on port ${PORT}`)
    );
  })
  .catch((error) => {
    console.log(error);
  });
