// C:\Users\Valdemir Goncalves\Desktop\Meus Projetos\Chamado360\server\index.js

import express from "express";
import cors from "cors";
import "dotenv/config";
import callingRoutes from "./routes/callingRoutes.js";

const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: [
      CLIENT_URL,
      "http://localhost:5173",
      "https://chamado360.netlify.app"
    ],
    methods: ["GET", "POST"],
    credentials: true
  })
);

app.use(express.json({ limit: "2mb" }));

app.get("/", (req, res) => {
  res.send("Chamado360 API is running");
});

app.use("/api/calling", callingRoutes);

app.listen(PORT, () => {
  console.log(`Chamado360 server running on port ${PORT}`);
});