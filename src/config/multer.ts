import crypto from "crypto";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

// Configuração do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Configuração do Multer para armazenamento em memória
export default {
  upload() {
    return {
      storage: multer.memoryStorage(), // Armazenamento em memória
    };
  },

  // Função para upload para o Cloudinary
  async uploadToCloudinary(file: Express.Multer.File) {
    const fileHash = crypto.randomBytes(16).toString("hex");
    const fileName = `${fileHash}-${file.originalname}`;

    try {
      // Envolvendo o upload_stream em uma Promise para usar await
      const result = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { public_id: fileName, resource_type: "auto" },
          (error, result) => {
            if (error) {
              return reject(new Error(error.message)); // Rejeita a Promise em caso de erro
            }
            resolve(result); // Resolve a Promise em caso de sucesso
          }
        );

        // Envia o buffer do arquivo para o Cloudinary
        uploadStream.end(file.buffer);
      });

      return result;
    } catch (error) {
      throw new Error(`Erro ao enviar para o Cloudinary: ${error.message}`);
    }
  },
};
