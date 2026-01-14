import express from "express";
import cors from "cors";
import employeeRouter from "./routes/employee.route.js";

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES

app.get("/", (_, res) => {
  res.json({ message: "server is Live ❇️!" });
});

app.use("/api", employeeRouter);

export { app };
