import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", routes);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

export default app;
