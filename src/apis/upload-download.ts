import express, { Request, Response } from "express";
import { uploadImage } from "../utils";
import fs from "fs";
import path from "path";
const router = express.Router();

router.post("/upload_image", uploadImage.single("image"), async function (req: Request, res: Response) {
  // folder upload
  //const imagePath = path.join(__dirname, '/public/images');
  // call class Resize
  // const fileUpload = new Resize(imagePath);
  // @ts-ignore
  if (!req.file) {
    res.status(401).json({ error: "Please provide an image" });
  }
  // @ts-ignore
  // const filename = await fileUpload.save(req.file.buffer);

  return res.status(200).json({ imageInfo: req.file });
});

router.get("/image/:imageName", async (req: Request, res: Response) => {
  try {
    const imageName = req.params.imageName;
    const imagePath = path.resolve("./storage/images/" + imageName)
    if(!fs.existsSync(imagePath)) return res.end()
    fs.readFile(path.resolve("./storage/images/" + imageName), function (err, data) {
      if (err) throw err; // Fail if the file can't be read.
      res.writeHead(200, { "Content-Type": "image/jpeg" })
      res.end(data);
    });
  } catch (err) {
    res.status(200).json({ code: 1, message: err });
  }
});

export const UpdateAPIs = router;
