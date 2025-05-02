import express, { Request, Response } from "express";

const app = express();
const port = 3001;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, backend!");
});

app.listen(port, () => {
  console.log(`Backend API is running on http://localhost:${port}`);
});
