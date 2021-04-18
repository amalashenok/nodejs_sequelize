const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    //добавил проверку т.к. split ругался
    if (!req.headers.authorization) {
      throw 'Нет заголовка авторизации';
    }

    const [type, token] = req.headers.authorization.split(' ');

    if (!token) {
      return res.status(403).send({ message: 'Пользователь не авторизован' });
    } else {
      const decodedData = jwt.verify(token, SECRET);
      req.user = decodedData;
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).send({ message: 'Пользователь не авторизован', error: error });
  }
};
