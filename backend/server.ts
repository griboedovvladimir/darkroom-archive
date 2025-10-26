import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import itemsRouter from "./routes/items.ts";

const app = express();
app.use(express.json());
app.use(cors());

// Подключение к MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/photo_archive", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Используем вынесенные роуты для /items
app.use("/items", itemsRouter);

// Простая проверка здоровья сервера
app.get("/health", (_req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT ? Number(process.env.PORT) : 3003;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
