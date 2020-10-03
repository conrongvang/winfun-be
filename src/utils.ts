const multer = require("multer");
const sharp = require("sharp");
import { v4 as uuidv4 } from "uuid";
const path = require("path");

const storage = multer.diskStorage({
  destination: (_req: any, _file: any, cb: any) => {
    cb(null, "./storage/images/"); //hỉnh ảnh sẽ chưa trong folder uploads
  },
  filename: (_req: any, file: any, cb: any) => {
    cb(null, file.originalname); // mặc định sẽ save name của hình ảnh
    // là name gốc, chúng ta có thể rename nó.
  },
});

export const uploadImage = multer({
  storage,
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
});

export class Resize {
  folder = null;
  constructor(folder: any) {
    this.folder = folder;
  }

  async save(buffer: any) {
    const filename = Resize.filename();
    const filepath = this.filepath(filename);

    await sharp(buffer)
      .resize(300, 300, {
        // size image 300x300
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toFile(filepath);

    return filename;
  }

  static filename() {
    // random file name
    return `${uuidv4()}.png`;
  }

  filepath(filename: any) {
    return path.resolve(`${this.folder}/${filename}`);
  }
}
