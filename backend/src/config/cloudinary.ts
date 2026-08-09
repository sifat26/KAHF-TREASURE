import { v2 as cloudinary } from 'cloudinary';
import config from './index';

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

export default cloudinary;

export async function uploadToCloudinary(filePath: string, folder: string = 'kahf-treasure'): Promise<string> {
  const result = await cloudinary.uploader.upload(filePath, {
    folder,
    resource_type: 'image',
    transformation: [
      { width: 1200, height: 1200, crop: 'limit', quality: 'auto' },
      { fetch_format: 'auto' },
    ],
  });
  return result.secure_url;
}

export async function uploadBufferToCloudinary(buffer: Buffer, folder: string = 'kahf-treasure'): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [
          { width: 1200, height: 1200, crop: 'limit', quality: 'auto' },
          { fetch_format: 'auto' },
        ],
      },
      (error, result) => {
        if (error) reject(error);
        else if (result) resolve(result.secure_url);
        else reject(new Error('No result from Cloudinary'));
      }
    );
    uploadStream.end(buffer);
  });
}
