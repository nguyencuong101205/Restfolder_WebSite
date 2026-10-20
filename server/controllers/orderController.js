import { OrderModel } from '../models/orderModel.js';
import { TableModel } from '../models/tableModel.js';
import { MenuItemModel } from '../models/menuItemModel.js';

export const OrderController = {
  /**
   * POST /api/orders
   * Customer places an order for a specific table
   */
  async createOrder(req, res, next) {
    try {
      const { tableNumber, items, note, customerName, voucher, discount, paymentMethod } = req.body;

      if (!tableNumber) {
        return res.status(400).json({
          success: false,
          message: 'Vui lòng cung cấp số bàn hoặc quét mã QR trên bàn ăn!'
        });
      }

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Giỏ hàng đang trống! Vui lòng chọn ít nhất 1 món ăn.'
        });
      }

      // Fetch canonical menu items to guarantee correct Vietnamese names & accurate pricing
      const allMenuItems = await MenuItemModel.getAll();
      const menuMap = new Map(allMenuItems.map(m => [m.id, m]));

      // Enrich and normalize item data
      const normalizedItems = items.map(item => {
        const canonical = menuMap.get(item.id);
        const name = canonical ? canonical.name : (item.name || 'Món ăn');
        const price = canonical ? canonical.price : (Number(item.price) || 0);

        return {
          id: item.id,
          name: name,
          price: price,
          quantity: Number(item.quantity) || 1,
          spiceLevel: item.spiceLevel || 'Không cay',
          selectedToppings: Array.isArray(item.selectedToppings) ? item.selectedToppings : [],
          toppings: Array.isArray(item.toppings) ? item.toppings : (Array.isArray(item.selectedToppings) ? item.selectedToppings.map(t => t.name) : []),
          note: item.note || ''
        };
      });

      // Calculate totals
      let subTotal = 0;
      normalizedItems.forEach(item => {
        let itemTotal = item.price;
        if (item.selectedToppings && Array.isArray(item.selectedToppings)) {
          itemTotal += item.selectedToppings.reduce((sum, top) => sum + (top.price || 0), 0);
        }
        subTotal += itemTotal * item.quantity;
      });

      const vat = Math.round(subTotal * 0.08); // 8% VAT
      const discountVal = Number(discount) || 0;
      const totalPrice = Math.max(0, subTotal + vat - discountVal);

      const newOrder = await OrderModel.create({
        tableNumber: String(tableNumber).trim(),
        customerName: customerName || `Khách Bàn ${tableNumber}`,
        items: normalizedItems,
        subTotal,
        discount: discountVal,
        voucher: voucher || null,
        paymentMethod: paymentMethod || 'cash',
        vat,
        totalPrice,
        note: note ? String(note).trim() : ''
      });

      // Update table status to occupied
      await TableModel.updateStatus(tableNumber, 'occupied', newOrder.id);

      return res.status(201).json({
        success: true,
        message: `Đặt món thành công cho Bàn ${tableNumber}! Đơn đã được chuyển thẳng tới Nhà Bếp.`,
        data: newOrder
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /api/orders
   * Staff/Kitchen/Admin get all orders
   */
  async getAllOrders(req, res, next) {
    try {
      const { status, tableNumber } = req.query;
      let orders = await OrderModel.getAll();

      if (status && status !== 'all') {
        orders = orders.filter(o => o.status === status);
      }

      if (tableNumber) {
        orders = orders.filter(o => String(o.tableNumber) === String(tableNumber));
      }

      return res.status(200).json({
        success: true,
        count: orders.length,
        data: orders
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /api/orders/table/:tableNumber/active
   * Get current active order for a table (for customer live status tracking)
   */
  async getActiveTableOrder(req, res, next) {
    try {
      const { tableNumber } = req.params;
      const order = await OrderModel.getActiveOrderForTable(tableNumber);

      return res.status(200).json({
        success: true,
        data: order
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * PATCH /api/orders/:id/status
   * Kitchen or Staff updates order status
   */
  async updateOrderStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const validStatuses = ['pending', 'preparing', 'served', 'completed', 'cancelled'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Trạng thái không hợp lệ! Chỉ chấp nhận: ${validStatuses.join(', ')}`
        });
      }

      const updated = await OrderModel.updateStatus(id, status);
      if (!updated) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy đơn hàng!'
        });
      }

      // If completed, release the table
      if (status === 'completed' || status === 'cancelled') {
        await TableModel.updateStatus(updated.tableNumber, 'available', null);
      }

      return res.status(200).json({
        success: true,
        message: `Đã cập nhật trạng thái đơn thành: ${status}`,
        data: updated
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * POST /api/orders/:id/call-staff
   * Customer calls staff
   */
  async callStaff(req, res, next) {
    try {
      const { id } = req.params;
      const { requestType, note } = req.body;

      const updated = await OrderModel.addCallStaffRequest(id, requestType || 'other', note || '');
      if (!updated) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy đơn hàng của bàn này!'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Đã gửi thông báo đến nhân viên phục vụ! Nhân viên sẽ đến ngay.',
        data: updated
      });
    } catch (err) {
      next(err);
    }
  }
};
