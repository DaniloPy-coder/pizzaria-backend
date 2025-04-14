import { Request, Response } from "express";
import { FinishOrderService } from "../../services/order/FinishOrderService";

class FinishOrderController {
  async handle(req: Request, res: Response) {
    const { order_id } = req.body;

    const finishOrderService = new FinishOrderService();

    try {
      const order = await finishOrderService.execute({ order_id });

      console.log(" Pedido finalizado:", order.id);

      return res.json(order);
    } catch (err: any) {
      console.error(" Erro ao finalizar pedido:", err.message);
      return res.status(400).json({ error: err.message });
    }
  }
}

export { FinishOrderController };
