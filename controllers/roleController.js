const db = require('../models');
const Role = db.Role;
const User = db.User;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const name = req.body.name;
  // Validate request
  if (!name) {
    return res.status(400).json({
      error: { name: name || 'Пусто' },
      message: `Запрос не может быть пустым`,
    });
  }

  // Create Role
  const role = {
    name: name,
    isActive: true,
  };

  // Save Role
  Role.create(role)
    .then(data => {
      res.status(201).json({
        data: data,
        message: `Роль ${name} успешно создана`,
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Создание роли"`,
      });
    });
};

exports.findAll = (req, res) => {
  const { name } = req.query;
  let condition = name
    ? {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    }
    : null;

  Role.findAll({ where: condition, order: [['id', 'ASC']] })
    .then(data => {
      res.status(200).json({
        data: data,
        message: 'Операция выпонена успешно!',
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Поиск всех ролей"`,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      error: { id: id || 'Пусто' },
      message: `Запрос не может быть пустым`,
    });
  }

  Role.findByPk(id, { include: { model: User, as: 'users' } })
    .then(data => {
      res.status(200).json({
        data: data,
        message: 'Операция выполнена успешно',
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Поиск роли по id"`,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      error: { id: id || 'Пусто' },
      message: `Запрос не может быть пустым`,
    });
  }

  Role.update(req.body, {
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.status(201).json({
          message: 'Роль обновлена успешно.',
        });
      } else {
        res.status(500).json({
          message: `Ошибка при обновлении роли с id: ${id}. Возможно роли не существует!`,
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Обновить роль по id"`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      error: { id: id || 'Пусто' },
      message: `Запрос не может быть пустым`,
    });
  }

  Role.destroy({
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.status(201).json({
          message: 'Роль успешно удалена!',
        });
      } else {
        res.status(500).json({
          message: `Ошибка при удалении роли с id: ${id}. Возможно роли не существует!`,
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Удалить роль по id"`,
      });
    });
};

exports.deleteAll = (req, res) => {
  Role.destroy({
    where: {},
    truncate: false,
  })
    .then(nums => {
      res.status(201).json({ message: `${nums} Роли успешно удалены!` });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Удалить все роли"`,
      });
    });
};

// find all active roles
exports.findAllActive = (req, res) => {
  Role.findAll({ where: { isActive: true }, order: [['id', 'ASC']] })
    .then(data => {
      res.status(200).json({
        data: data,
        message: 'Операция выполнена успешно',
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Поиск активных ролей"`,
      });
    });
};
