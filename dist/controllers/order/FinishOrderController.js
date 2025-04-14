"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinishOrderController = void 0;
const FinishOrderService_1 = require("../../services/order/FinishOrderService");
class FinishOrderController {
    async handle(req, res) {
        const { order_id } = req.body;
        const finishOrderService = new FinishOrderService_1.FinishOrderService();
        try {
            const order = await finishOrderService.execute({ order_id });
            console.log(" Pedido finalizado:", order.id);
            return res.json(order);
        }
        catch (err) {
            console.error(" Erro ao finalizar pedido:", err.message);
            return res.status(400).json({ error: err.message });
        }
    }
}
exports.FinishOrderController = FinishOrderController;
