import { TableModel } from '../models/tableModel.js';

export const TableController = {
  /**
   * GET /api/tables
   * Get all tables
   */
  async getTables(req, res, next) {
    try {
      const tables = await TableModel.getAll();
      return res.status(200).json({
        success: true,
        data: tables
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /api/tables/:tableNumber
   */
  async getTableByNumber(req, res, next) {
    try {
      const table = await TableModel.getByNumber(req.params.tableNumber);
      if (!table) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy bàn này!'
        });
      }

      return res.status(200).json({
        success: true,
        data: table
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /api/tables/:tableNumber/qr
   * Generate QR Code for a specific table
   */
  async getTableQr(req, res, next) {
    try {
      const { tableNumber } = req.params;
      const baseUrl = req.query.baseUrl || `${req.protocol}://${req.get('host')}`;
      // In dev with Vite, frontend is on localhost:5173
      const clientUrl = req.query.clientUrl || 'http://localhost:5173';

      const qrInfo = await TableModel.generateQrCode(tableNumber, clientUrl);

      return res.status(200).json({
        success: true,
        data: qrInfo
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /api/tables/all/with-qr
   * Generate QR Codes for ALL tables in the restaurant (for printing)
   */
  async getAllTablesWithQr(req, res, next) {
    try {
      const tables = await TableModel.getAll();
      const clientUrl = req.query.clientUrl || 'http://localhost:5173';

      const tablesWithQr = await Promise.all(
        tables.map(async (table) => {
          const qrInfo = await TableModel.generateQrCode(table.tableNumber, clientUrl);
          return {
            ...table,
            ...qrInfo
          };
        })
      );

      return res.status(200).json({
        success: true,
        data: tablesWithQr
      });
    } catch (err) {
      next(err);
    }
  }
};
