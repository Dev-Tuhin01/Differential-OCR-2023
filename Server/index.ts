import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

//initializing app
const app: Application = express();
const port = process.env.PORT;

//body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

try {
  app.listen(port, (): void => {
    console.log(`App is running on port ${port}`);
  });
} catch (error) {
  console.error(`error occured: ${error.message}`);
}
