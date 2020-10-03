const multer = require("multer");

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
