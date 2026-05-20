// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import callingRoutes from "./routes/callingRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.json({ success: true, message: "Chamado360 API is running." });
});

app.use("/api/calling", callingRoutes);

app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ success: false, message: "Erro interno do servidor." });
});

app.listen(PORT, () => {
  console.log(`Chamado360 server running on port ${PORT}`);
});
