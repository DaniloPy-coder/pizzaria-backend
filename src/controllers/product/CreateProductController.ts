import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";
import { UploadedFile } from "express-fileupload";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { v4 as uuid } from "uuid";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

class CreateProductController {
  async handle(req: Request, res: Response) {
    const { name, price, description, category_id } = req.body;

    if (!req.files || !req.files["file"]) {
      return res.status(400).json({ error: "Arquivo da imagem não enviado." });
    }

    const file = req.files["file"] as UploadedFile;
    const uniqueName = `${uuid()}-${file.name}`;

    try {
      const resultFile = await new Promise<UploadApiResponse>(
        (resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              resource_type: "auto",
              public_id: `products/${uniqueName}`,
            },
            (error, result) => {
              if (error || !result) {
                console.error("Erro ao enviar imagem:", error);
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
        banner: resultFile.secure_url,
        category_id,
      });

      return res.json(menu);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao criar produto." });
    }
  }
}

export { CreateProductController };
