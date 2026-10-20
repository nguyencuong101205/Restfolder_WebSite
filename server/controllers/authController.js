import { UserModel } from '../models/userModel.js';
import { generateToken } from '../utils/jwtHelper.js';

export const AuthController = {
  /**
   * POST /api/auth/login
   * Authenticate user & return JWT token
   */
  async login(req, res, next) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: 'Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!'
        });
      }

      const user = await UserModel.findByUsername(username);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Tài khoản hoặc mật khẩu không chính xác!'
        });
      }

      const isMatch = await UserModel.verifyPassword(user, password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Tài khoản hoặc mật khẩu không chính xác!'
        });
      }

      // Generate JWT
      const tokenPayload = {
        id: user.id,
        username: user.username,
        role: user.role,
        name: user.name
      };

      const token = generateToken(tokenPayload);

      return res.status(200).json({
        success: true,
        message: `Đăng nhập thành công! Chào mừng ${user.name}`,
        data: {
          token,
          user: {
            id: user.id,
            username: user.username,
            name: user.name,
            role: user.role,
            avatar: user.avatar
          }
        }
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * POST /api/auth/register
   * Create new user account
   */
  async register(req, res, next) {
    try {
      const { username, password, name, role } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: 'Vui lòng cung cấp username và password!'
        });
      }

      const newUser = await UserModel.create({
        username,
        password,
        name: name || username,
        role: role || 'waiter'
      });

      const token = generateToken({
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
        name: newUser.name
      });

      return res.status(201).json({
        success: true,
        message: 'Đăng ký tài khoản thành công!',
        data: {
          token,
          user: {
            id: newUser.id,
            username: newUser.username,
            name: newUser.name,
            role: newUser.role
          }
        }
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /api/auth/me
   * Get currently logged-in user info using JWT
   */
  async getProfile(req, res, next) {
    try {
      return res.status(200).json({
        success: true,
        data: {
          user: req.user,
          ...req.user
        }
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /api/auth/demo-accounts
   * Return demo accounts for easy testing
   */
  async getDemoAccounts(req, res, next) {
    try {
      const accounts = [
        { username: 'admin', password: '123', role: 'admin', title: 'Tổng Quản / Chủ Quán' },
        { username: 'bep', password: '123', role: 'kitchen', title: 'Bếp Trưởng' },
        { username: 'phucvu', password: '123', role: 'waiter', title: 'Nhân Viên Phục Vụ' }
      ];

      return res.status(200).json({
        success: true,
        message: 'Tài khoản mẫu để kiểm thử',
        data: accounts,
        accounts
      });
    } catch (err) {
      next(err);
    }
  }
};
