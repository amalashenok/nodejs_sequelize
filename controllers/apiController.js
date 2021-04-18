const db = require('../models');
const Session = db.Session;
const Op = db.Sequelize.Op;

class apiController {
  async login(req, res) {
    try {
      res.status(200).json('ok');
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async registration(req, res) {
    try {
      res.status(200).json('ok');
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async test(req, res) {
    const { ssid } = req.cookies;

    if (!ssid) {
      res.status(400).json({ message: 'нет ssid смотри middleware' });
    } else {
      const currentSession = await Session.findOne({
        where: { ssid: ssid },
      });

      res.status(200).json({
        ...currentSession.dataValues,
      });
    }
  }
}

module.exports = new apiController();
