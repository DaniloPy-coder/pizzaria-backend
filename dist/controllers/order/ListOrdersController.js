"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListOrdersController = void 0;
const ListOrderService_1 = require("../../services/order/ListOrderService");
class ListOrdersController {
    async handle(req, res) {
        const listOrdersService = new ListOrderService_1.ListOrdersService();
        const orders = await listOrdersService.execute();
        return res.json(orders);
    }
}
exports.ListOrdersController = ListOrdersController;
