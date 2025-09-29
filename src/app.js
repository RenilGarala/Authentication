import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello From Authentication')
})

app.listen(port, () => {
  console.log(`🛠️ Auth app listening on port ${port}`)
})
