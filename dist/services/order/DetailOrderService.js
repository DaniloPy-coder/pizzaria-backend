"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailOrderService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DetailOrderService {
    async execute({ order_id }) {
        const order = await prisma_1.default.order.findFirst({
            where: {
                id: order_id,
            },
            include: {
                item: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        return order;
    }
}
exports.DetailOrderService = DetailOrderService;
