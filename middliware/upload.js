import multer from "multer";
import path from "path";

const destination = path.resolve("temp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, callback) => {
    const uniquePrefix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniquePrefix}-${file.originalname}`;
    callback(null, filename);
  },
});

const upload = multer({ storage });

export default upload;
