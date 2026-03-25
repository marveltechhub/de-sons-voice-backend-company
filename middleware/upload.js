import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "posts";

    if (file.mimetype.startsWith("image")) folder = "posts/images";
    if (file.mimetype.startsWith("audio")) folder = "posts/music";

    return {
      folder,
      resource_type: file.mimetype.startsWith("audio") ? "video" : "image",
    };
  },
});

export const upload = multer({ storage });
export default upload;