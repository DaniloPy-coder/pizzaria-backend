"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddItemService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class AddItemService {
    async execute({ order_id, product_id, amount }) {
        // Verifica se o pedido existe
        const orderExists = await prisma_1.default.order.findUnique({
            where: { id: order_id },
        });
        if (!orderExists) {
            throw new Error("Pedido não encontrado.");
        }
        // Verifica se o produto existe
        const productExists = await prisma_1.default.product.findUnique({
            where: { id: product_id },
        });
        if (!productExists) {
            throw new Error("Produto não encontrado.");
        }
        const item = await prisma_1.default.item.create({
            data: {
                order_id,
                product_id,
                amount,
            },
        });
        return item;
    }
}
exports.AddItemService = AddItemService;
