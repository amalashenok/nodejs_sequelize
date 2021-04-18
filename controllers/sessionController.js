const db = require('../models');
const Session = db.Session;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  let { name, phone, city, email } = req.body;

  let ssid = '';

  if (!req.cookies.ssid) {
    ssid = req.sessionID;
    req.session.key = ssid;
    res.cookie('ssid', ssid, { maxAge: 3600 * 240 });
  } else {
    ssid = req.cookies.ssid;
  }

  // Validate request
  if (!ssid) {
    return res.status(400).json({
      error: { ssid: ssid || 'Пусто' },
      message: `Запрос не может быть пустым`,
    });
  }
  // Create session
  const sessionObj = {
    name: name,
    ssid: ssid,
    phone: phone,
    city: city,
    email: email,
  };

  // Save session
  Session.create(sessionObj)
    .then(data => {
      res.status(201).json({
        data: data,
        message: 'Создание сессии успешно',
      });
    })
    .catch(error => {
      res.status(400).json({
        message: 'Произошла ошибка при создании Сессии',
        error: error.message,
      });
    });
};

exports.findAll = (req, res) => {
  const sessionId = req.query.id;
  const condition = sessionId
    ? {
      id: {
        [Op.iLike]: `%${sessionId}%`,
      },
    }
    : null;

  Session.findAll({
    where: condition,
    paranoid: true,
  })
    .then(data => {
      res.status(200).json({
        data: data,
        message: 'Операция выполнена успешно',
      });
    })
    .catch(error => {
      res.status(400).send({
        error: error.message,
        message: `Ошибка при выполнении операции "найти все сессии" `,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).json({
      error: { id: id || 'Пусто' },
      message: `Пустой запрос`,
    });
  }

  Session.findByPk(id)
    .then(data => {
      res.status(200).json({
        data: data,
        message: 'Операция выполнена успешно',
      });
    })
    .catch(error => {
      res.status(400).json({
        message: `Произошла ошибка при выполнении операции "поиск сессии по id" ${id}`,
        error: error.message,
      });
    });
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (!data || !id) {
    res.status(400).json({
      error: {
        id: id || 'Пусто',
        data: data || 'Пусто',
      },
      message: `Запрос не может быть пустым`,
    });
  }

  Session.update(data, {
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.status(201).json({
          message: 'Сессия обновлена успешно.',
        });
      } else {
        res.status(400).json({
          message: `Сессия с id: ${id} не может быть обновлена. Возможно сессии не существует!`,
        });
      }
    })
    .catch(error => {
      res.status(400).json({
        message: `Произошла ошибка при выполнении операции "обновление сессии по id" ${id}`,
        error: error.message,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).json({
      error: { id: id || 'Пусто' },
      message: `Запрос не может быть пустым`,
    });
  }

  Session.destroy({
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.status(201).json({
          message: `Сессия с id: ${id} удалена!`,
        });
      } else {
        res.status(400).json({
          message: `Ошибка при удалении сессии с id: ${id}. Возможно сессии не существует!`,
        });
      }
    })
    .catch(error => {
      res.status(400).json({
        message: `Произошла ошибка при выполнении операции "удаление сессии по id" ${id}`,
        error: error.message,
      });
    });
};

exports.deleteAll = (req, res) => {
  Session.destroy({
    where: {},
    truncate: false,
  })
    .then(nums => {
      res.status(201).json({ message: `${nums} Сессии удалены!` });
    })
    .catch(error => {
      res.status(400).json({
        message: 'Произошла ошибка при выполнении операции "удаление сессий".',
        error: error.message,
      });
    });
};
