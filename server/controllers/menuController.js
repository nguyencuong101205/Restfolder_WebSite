import { MenuItemModel } from '../models/menuItemModel.js';

export const MenuController = {
  /**
   * GET /api/menu
   * Get all dishes with optional category filter or search query
   */
  async getAllDishes(req, res, next) {
    try {
      const { category, search, spicyOnly, bestSellerOnly } = req.query;
      let dishes = await MenuItemModel.getAll();

      if (category && category !== 'all') {
        dishes = dishes.filter(d => d.category === category);
      }

      if (search) {
        const q = search.toLowerCase();
        dishes = dishes.filter(d =>
          d.name.toLowerCase().includes(q) ||
          (d.hanzi && d.hanzi.includes(q)) ||
          (d.pinyin && d.pinyin.toLowerCase().includes(q)) ||
          (d.description && d.description.toLowerCase().includes(q))
        );
      }

      if (spicyOnly === 'true') {
        dishes = dishes.filter(d => d.isSpicy);
      }

      if (bestSellerOnly === 'true') {
        dishes = dishes.filter(d => d.isBestSeller);
      }

      return res.status(200).json({
        success: true,
        count: dishes.length,
        data: dishes
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /api/menu/:id
   */
  async getDishById(req, res, next) {
    try {
      const dish = await MenuItemModel.getById(req.params.id);
      if (!dish) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy món ăn này!'
        });
      }

      return res.status(200).json({
        success: true,
        data: dish
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * POST /api/menu (Admin only)
   */
  async createDish(req, res, next) {
    try {
      const { name, price, category } = req.body;
      if (!name || !price || !category) {
        return res.status(400).json({
          success: false,
          message: 'Vui lòng cung cấp tên món, giá và danh mục!'
        });
      }

      const created = await MenuItemModel.create(req.body);
      return res.status(201).json({
        success: true,
        message: 'Thêm món mới thành công!',
        data: created
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * PUT /api/menu/:id (Admin / Kitchen)
   */
  async updateDish(req, res, next) {
    try {
      const updated = await MenuItemModel.update(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy món cần cập nhật!'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Cập nhật món ăn thành công!',
        data: updated
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * DELETE /api/menu/:id (Admin only)
   */
  async deleteDish(req, res, next) {
    try {
      const success = await MenuItemModel.delete(req.params.id);
      if (!success) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy món để xóa!'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Đã xóa món ăn khỏi thực đơn!'
      });
    } catch (err) {
      next(err);
    }
  }
};
