import dotenv from "dotenv";
dotenv.config();

import express from "express";
import authRoutes from "./routes/auth.routes.js";
import { connectDB } from "./database/db.js";

const app = express();
const port = process.env.PORT || 4000;

connectDB(process.env.MONGO_URL);

app.get('/', (req, res) => {
    res.send('Hello From Authentication');
})
app.use(express.json());

app.use("/api/v1/auth", authRoutes);

app.listen(port, () => {
  console.log(`🛠️ Auth app listening on port ${port}`);
})
