import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

//initializing app
const app: Application = express();
const port = process.env.PORT;

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");

//body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.post("/upload", (req: Request, res: Response) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

try {
  app.listen(port, (): void => {
    console.log(`App is running on port ${port}`);
  });
} catch (error) {
  console.error(`error occured: ${error.message}`);
}
