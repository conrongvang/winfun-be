const multer = require("multer");
import fs from 'fs'
import path from 'path'

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

/**
 * Format data before add into sql query
 * @param data: data with passed into the query
 */
export function preparedData(data: any){
  if(!data){
    return null
  }

  if(typeof data == 'string'){
    return `'${data}'`
  }

  return data
}

export function writeIntoJSONFile(filePath: string, jsObject: object){
  try{
    const emailConfigPath = path.resolve("./src/emailConfig.json")
    const oldContent = JSON.parse(fs.readFileSync(emailConfigPath, 'utf8'));
    const mergedContent = {...oldContent, ...jsObject}
    const JSONString = JSON.stringify(mergedContent, null, 2)
    fs.writeFileSync(filePath, JSONString)
    
    return JSONString
  }
  catch(err){
    throw err
  }
}