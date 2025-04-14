import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";
import { UploadedFile } from "express-fileupload";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

class CreateProductController {
  async handle(req: Request, res: Response) {
    const { name, price, description, category_id } = req.body;

    if (!req.files || Object.keys(req.files).length === 0) {
      throw new Error("Error upload file image");
    }

    const file = req.files["file"] as UploadedFile;

    const resultFile = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (error || !result) {
              return reject(error);
            }
            resolve(result);
          }
        );

        uploadStream.end(file.data);
      }
    );

    const createProductService = new CreateProductService();

    const menu = await createProductService.execute({
      name,
      price,
      description,
      banner: resultFile.url,
      category_id,
    });

    return res.json(menu);
  }
}

export { CreateProductController };
