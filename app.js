import express from "express";
import astronautsRouter from "./routes/astronauts.js";

const app = express();

app.use(express.json());
app.use("/astronauts", astronautsRouter);

export default app;
