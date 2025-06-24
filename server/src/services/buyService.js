const { Buy, Product } = require('../../db/models');
const { updateUserService, findUserService } = require('./userService');
const HttpError = require('../exceptions/HttpError');
const ProductService = require('./productService');
const { Op } = require('sequelize');

class BuyService {
  static async findBuyByUserProductId(productId, userId) {
    return await Buy.findOne({
      where: {
        user_id: userId,
        product_id: productId,
      },
      attributes: ['id', 'user_id', 'product_id', 'is_active'],
    });
  }

  static async createNewBuy({ productId, userId }) {
    const product = await ProductService.findProductById(productId);

    if (!product) {
      throw new HttpError(404, 'Product not found');
    }

    const buyer = await findUserService(userId);

    if (buyer.point < product.price) {
      throw new HttpError(400, 'Not enough points for this product');
    }

    await updateUserService(userId, {
      point: buyer.point - product.price,
    });

    const newBuy = await Buy.create({
      user_id: userId,
      product_id: productId,
      is_active: false,
    });

    return BuyService.findBuyByUserProductId(newBuy.product_id, newBuy.user_id);
  }

  // static async updateBuyByIds({ productId, userId, buyStatus }) {
  //   const itemForUpdate = await BuyService.findBuyByUserProductId(
  //     productId,
  //     userId
  //   );

  //   if (!itemForUpdate) {
  //     throw new HttpError(404, 'Product not found');
  //   }

  //   const updatedItem = await itemForUpdate.update({ is_active: buyStatus });

  //   return await BuyService.findBuyByUserProductId(productId, userId);
  // }

  static async activateBuy({ userId, buyId }) {
    const buyToActivate = await Buy.findOne({
      where: {
        id: buyId,
        user_id: userId,
      },
      include: [
        {
          model: Product,
          attributes: ['id', 'name', 'category_id'],
        },
      ],
    });

    if (!buyToActivate) {
      throw new HttpError(404, 'Buy not found');
    }

    const categoryId = buyToActivate.Product.category_id;

    const products = await ProductService.findAllByCategory(categoryId);

    const allProductsId = products.map((item) => item.id);

    const deactivetedItem = await Buy.update(
      { is_active: false },
      {
        where: {
          user_id: userId,
          product_id: {
            [Op.in]: allProductsId,
          },
        },
      }
    );
    const activatedBuy = await Buy.update(
      { is_active: true },
      {
        where: {
          id: buyId,
          user_id: userId,
        },
      }
    );

    if (!activatedBuy[0]) {
      throw new HttpError(404, 'Buy not activated');
    }

    return await Buy.findByPk(buyId, {
      include: [
        {
          model: Product,
          attributes: ['id', 'name', 'price', 'category_id'],
        },
      ],
    });
  }

  static async deactivateBuyById(userId, buyId) {
    const buy = await Buy.findOne({
      where: {
        id: buyId,
        user_id: userId,
      },
    });

    if (!buy) {
      throw new HttpError(404, 'Buy not found');
    }

    await buy.update({ is_active: false });

    return await Buy.findByPk(buyId, {
      include: [
        {
          model: Product,
          attributes: ['id', 'name', 'price', 'category_id'],
        },
      ],
    });
  }

  static async findProductsByUserId(userId) {
    return await Buy.findAll({
      where: { user_id: userId },
      attributes: ['id', 'user_id', 'product_id', 'is_active'],
      include: [
        {
          model: Product,
          attributes: ['id', 'name', 'price', 'category_id'],
        },
      ],
    });
  }
  //тут сноваже жестко аватра категория 3, менять если переделываем сиды
  static async findAvatarsByUserId(userId) {
    return await Buy.findAll({
      where: { user_id: userId },
      attributes: ['id', 'user_id', 'product_id', 'is_active'],
      include: [
        {
          model: Product,
          where: {
            category_id: 3
          },
          attributes: ['id', 'name', 'price', 'category_id'],
        },
      ],
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

  //СОГЛАСОВАТЬ НЕЙМИНГ но тогда на инглише в бд либо сразу id
  //или под каждую категорию свою ручку?
  static async findActiveBuyInCategory(userId, categoryName) {
    const buy = await Buy.findOne({
      where: {
        user_id: userId,
        is_active: true,
      },
      include: [
        {
          model: Product,
          include: [
            {
              model: Category,
              as: 'productCategories',
              where: {
                name: categoryName,
              },
              attributes: ['id', 'name'],
            },
          ],
          attributes: ['id', 'name', 'price', 'category_id'],
        },
      ],
    });

    if (!buy) {
      throw new HttpError(
        404,
        `Product with active status in "${categoryName}" not found`
      );
    }

    return buy;
  }

  //либо под каждую категорию отдельно
  static async findActiveAvatar(userId) {
    const categoryId = 3; //у нас пока 3 в бд у аватарок

    const activeBuy = await Buy.findOne({
      where: {
        user_id: userId,
        is_active: true,
      },
      attributes: ['id', 'product_id', 'user_id', 'is_active'],
      include: [
        {
          model: Product,
          where: { category_id: categoryId },
          attributes: ['id', 'name', 'price', 'category_id'],
        },
      ],
    });

    if (!activeBuy) {
      throw new HttpError(404, 'Active avatar not found');
    }

    return activeBuy.get({ plain: true });
  }
}

module.exports = BuyService;
