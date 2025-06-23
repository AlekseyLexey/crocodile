const BuyService = require('../services/buyService');
const { formatResponse } = require('../utils/formatResponse');

class BuyController {
  static async createBuy(req, res, next) {
    try {
      const userId = res.locals.user.id;
      const { productId } = req.body;

      const newBuy = await BuyService.createNewBuy({ productId, userId });

      return res.status(201).json(formatResponse(201, 'Success', newBuy));
    } catch (err) {
      next(err);
    }
  }

  // static async updateBuy(req, res, next) {
  //   try {
  //     const userId = res.locals.user.id;
  //     const { buyStatus } = req.body;
  //     const productId = req.validateId;

  //     const updatedBuy = await BuyService.updateBuyByIds({
  //       productId,
  //       userId,
  //       buyStatus,
  //     });

  //     return res.status(200).json(formatResponse(200, 'Success', updatedBuy));
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  static async activateBuy(req, res, next) {
    try {
      const userId = res.locals.user.id;
      const buyId = req.validateId;

      const result = await BuyService.activateBuy({ userId, buyId });

      return res.status(200).json(formatResponse(200, 'Success', result));
    } catch (err) {
      next(err);
    }
  }

  static async deactivateBuy(req, res, next) {
    try {
      const userId = res.locals.user.id;
      const buyId = req.validateId;

      const result = await BuyService.deactivateBuyById(userId, buyId);

      return res.status(200).json(formatResponse(200, 'Success', result));
    } catch (err) {
      next(err);
    }
  }

  static async deleteBuy(req, res, next) {
    try {
      const userId = res.locals.user.id;
      const productId = req.validateId;

      const deletedCount = await BuyService.deleteBuyById({
        productId,
        userId,
      });

      if (deletedCount === 0) {
        return res.status(404).json(formatResponse(404, 'Buy not found', null));
      }

      return res.status(200).json(formatResponse(200, 'Success', deletedCount));
    } catch (err) {
      next(err);
    }
  }

  static async getProductsByUserId(req, res, next) {
    try {
      const userId = res.locals.user.id;

      const buys = await BuyService.findProductsByUserId(userId);

      return res.status(200).json(formatResponse(200, 'Success', buys));
    } catch (err) {
      next(err);
    }
  }

  static async getActiveBuyInCategory(req, res, next) {
    try {
      const userId = res.locals.user.id;
      const { categoryName } = req.params;

      const buy = await BuyService.findActiveBuyInCategory(
        userId,
        categoryName
      );

      return res.status(200).json(formatResponse(200, 'Success', buy));
    } catch (err) {
      next(err);
    }
  }

  static async getActiveAvatar(req, res, next) {
    try {
      const userId = res.locals.user.id;
      const activeAvatar = await BuyService.findActiveAvatar(userId);

      return res.status(200).json(formatResponse(200, 'Success', activeAvatar));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BuyController;
