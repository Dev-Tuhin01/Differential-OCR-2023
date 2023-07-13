import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";

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

const upload = multer({ storage: storage }).single("image");

//body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//adding cors
const corsOrigin: string = process.env.CORSORIGIN as string;
app.use(
  cors({
    origin: [corsOrigin],
    methods: ["get", "post"],
    allowedHeaders: "*",
    credentials: true,
  })
);

app.all("/", (req: Request, res: Response, next) => {
  res.header("Access-Control-Allow-Origin", corsOrigin);
  res.header("Access-Control-Allow-Headers", "X-Request-With");
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.get("/OCR", (req: Request, res: Response) => {
  res.send("This is OCR");
});

app.post("/OCR", (req: Request, res: Response) => {
  console.log("/OCR is called");
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    if (req?.file !== null) {
      //there shoud be the ocr code
      //there is the parsing function
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
