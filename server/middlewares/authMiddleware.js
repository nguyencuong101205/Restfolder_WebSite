import { verifyToken } from '../utils/jwtHelper.js';
import { UserModel } from '../models/userModel.js';

/**
 * Middleware to authenticate requests using JWT Bearer token
 */
export const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Không tìm thấy Token xác thực (Bearer Token)! Vui lòng đăng nhập.'
    });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: 'Token không hợp lệ hoặc đã hết hạn! Vui lòng đăng nhập lại.'
    });
  }

  // Attach user to request object
  const user = await UserModel.findById(decoded.id);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Người dùng sở hữu Token không tồn tại trong hệ thống!'
    });
  }

  // Hide password hash before attaching
  const safeUser = { ...user };
  delete safeUser.passwordHash;
  delete safeUser.plainBackup;

  req.user = safeUser;
  next();
};
