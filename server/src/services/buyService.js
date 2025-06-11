const { Buy, Product } = require('../../db/models');

class BuyService {
  static async findBuyByUserProductId(productId, userId) {
    return await Buy.findOne({
      where: {
        user_id: userId,
        product_id: productId,
      },
      attributes: ['id', 'user_id', 'product_id'],
    });
  }

  static async createNewBuy({ productId, userId }) {
    const newBuy = await Buy.create({
      product_id: productId,
      user_id: userId,
    });

    return BuyService.findBuyByUserProductId(newBuy.product_id, newBuy.user_id);
  }

  static async deleteBuyById({ productId, userId }) {
    return await Buy.destroy({
      where: {
        product_id: productId,
        user_id: userId,
      },
    });
  }

  static async findProductsByUserId(userId) {
    return await Buy.findAll({
      where: { user_id: userId },
      attributes: ['id', 'user_id', 'product_id'],
      include: [
        {
          model: Product,
          attributes: ['id', 'name', 'price'],
        },
      ],
    });
  }
}

module.exports = BuyService;
