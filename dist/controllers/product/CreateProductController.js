"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductController = void 0;
const CreateProductService_1 = require("../../services/product/CreateProductService");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
class CreateProductController {
    async handle(req, res) {
        const { name, price, description, category_id } = req.body;
        if (!req.files || Object.keys(req.files).length === 0) {
            throw new Error("Error upload file image");
        }
        const file = req.files["file"];
        const resultFile = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary_1.v2.uploader.upload_stream((error, result) => {
                if (error || !result) {
                    return reject(error);
                }
                resolve(result);
            });
            uploadStream.end(file.data);
        });
        const createProductService = new CreateProductService_1.CreateProductService();
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
exports.CreateProductController = CreateProductController;
