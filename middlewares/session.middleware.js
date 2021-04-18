const db = require('../models');
const Session = db.Session;
const Op = db.Sequelize.Op;

module.exports = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    let ssid;

    if (!req.cookies.ssid) {
      ssid = req.sessionID;
      req.session.key = ssid;
      res.cookie('ssid', ssid, { maxAge: 3600 * 240 });
    } else {
      ssid = req.cookies.ssid;
    }

    const currentSession = await Session.findOne({
      where: { ssid: ssid },
    });

    if (!currentSession) {
      try {
        const newSeesion = await Session.create({
          ssid: ssid,
          isActive: true,
        });
        res.cookie('ssid', newSeesion.dataValues.ssid, {
          maxAge: 3600 * 240,
        });
        req.cookies.ssid = ssid;
      } catch (error) {
        res.status(400).json({
          message: `Ошибка при создании сессии`,
          error: error,
        });
      }
    }

    next();
  } catch (error) {
    return res.status(403).json({ message: 'Ошибка при отработки middleware', error: error });
  }
};
