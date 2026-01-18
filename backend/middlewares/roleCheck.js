
const checkRole = (role) => {
    return (req, res, next) => {
      const userRole = req.user.role;
  
      if (userRole !== role) {
        return res.status(403).json({
          message: "Access denied: Insufficient permissions",
          requiredRole: role,
          userRole: userRole,
          details: `This action requires ${role} privileges, but you are a ${userRole}`,
        });
      }
  
      next();
    };
  };
  
  module.exports = checkRole;
  