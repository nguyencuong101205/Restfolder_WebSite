/**
 * Middleware to restrict route access by role(s)
 * @param  {...string} roles Allowed roles ('admin', 'kitchen', 'waiter')
 */
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Bạn chưa được xác thực!'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Quyền truy cập bị từ chối! Yêu cầu vai trò: [${roles.join(', ')}], vai trò của bạn là: [${req.user.role}]`
      });
    }

    next();
  };
};
