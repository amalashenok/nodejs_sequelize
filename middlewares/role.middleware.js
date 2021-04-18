const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next();
    }
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(403).json({ message: 'Пользователь не авторизован' });
      }
      const { Role } = jwt.verify(token, SECRET);
      let hasRole = false;
      if (roles.includes(Role.name)) {
        hasRole = true;
      }

      if (!hasRole) {
        return res.status(403).json({ message: 'Доступ запрещен' });
      }

      next();
    } catch (error) {
      console.log(error);
      return res.status(403).json({ message: 'Пользователь не авторизован' });
    }
  };
};
