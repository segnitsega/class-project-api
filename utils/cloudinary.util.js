import { v2 as cloudinary } from "cloudinary";
import { PassThrough } from "stream";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadToCloudinary = (buffer, publicId) => {
  return new Promise((resolve, reject) => {
    const passthrough = new PassThrough();
    passthrough.end(buffer);

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "donation_items",
        public_id: publicId,
        resource_type: "image",
      },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );

    passthrough.pipe(uploadStream);
  });
};
