const { User, Buy, Product } = require('../../db/models');

class BuyService {
  static async createNewBuy({ productId, userId }) {
    return await Buy.create({
      product_id: productId,
      user_id: userId,
    });
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
