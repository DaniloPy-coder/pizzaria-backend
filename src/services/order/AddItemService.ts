import prismaClient from "../../prisma";

interface ItemRequest {
  order_id: string;
  product_id: string;
  amount: number;
}

class AddItemService {
  async execute({ order_id, product_id, amount }: ItemRequest) {
    // Verifica se o pedido existe
    const orderExists = await prismaClient.order.findUnique({
      where: { id: order_id },
    });

    if (!orderExists) {
      throw new Error("Pedido não encontrado.");
    }

    // Verifica se o produto existe
    const productExists = await prismaClient.product.findUnique({
      where: { id: product_id },
    });

    if (!productExists) {
      throw new Error("Produto não encontrado.");
    }

    const item = await prismaClient.item.create({
      data: {
        order_id,
        product_id,
        amount,
      },
    });

    return item;
  }
}

export { AddItemService };
