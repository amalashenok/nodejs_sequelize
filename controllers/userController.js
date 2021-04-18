const db = require('../models');
const User = db.User;
const Role = db.Role;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  let { firstName, lastName, email, password, status = 1, RoleId } = req.body;

  // Validate request
  if (!firstName || !email || !password) {
    return res.status(400).json({
      message: 'Запрос не может быть пустым!',
      error: {
        firstName: firstName || 'Пусто',
        email: email || 'Пусто',
        password: password || 'Пусто',
      },
    });
  }

  // Create User
  const userObj = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    status: status,
  };

  // Save User
  User.create(userObj)
    .then(user => {
      //if roleName was sent
      if (RoleId) {
        Role.findOne({ where: { id: RoleId } }).then(role => {
          user
            .setRole(role)
            .then(() => {
              res.status(201).json({
                message: `Пользователь ${user.firstName} ${user.lastName} успешно создан !`,
                data: { id: user.id, name: user.firstName, email: user.email },
              });
            })
            .catch(error => {
              res.status(500).json({
                error: error.message,
                message: `Произошла ошибка при выполнении опрерации "создать нового пользователя"`,
              });
            });
        });
      } else {
        //default role = 1
        user
          .setRole(1)
          .then(() => {
            res.status(200).json({
              message: `Пользователь ${user.firstName} ${user.lastName} успешно создан !`,

              data: { id: user.id, name: user.firstName, email: user.email },
            });
          })
          .catch(error => {
            res.status(500).json({
              error: error.message,
              message: `Произошла ошибка при выполнении опрерации "создать нового пользователя"`,
            });
          });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении опрерации "создать нового пользователя"`,
      });
    });
};

exports.findAll = (req, res) => {
  const firstName = req.query.firstName;
  const condition = firstName
    ? {
      firstName: {
        [Op.iLike]: `%${firstName}%`,
      },
    }
    : null;
  const paranoid = req.headers['app-type'] === 'adminPanel' ? false : true;

  User.findAll({ where: condition, include: Role })
    .then(data => {
      res.status(200).json({
        data: data,
        message: `Опрерация "получить всех пользователей" успешно выполнена!`,
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "получить всех пользователей"!`,
      });
    });
};

exports.findOne = async (req, res, next) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      error: { id: id || 'Пусто' },
      message: 'Запрос не может быть пустым',
    });
  }

  const paranoid = req.headers['app-type'] === 'adminPanel' ? false : true;

  User.findByPk(id, { include: Role, paranoid: paranoid })
    .then(data => {
      res.status(200).json({
        data: data,
        message: `Запрос "получить пользователя по id" успешно выполнен`,
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "получить пользователя по id" ${id}`,
      });
    });
};

exports.update = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      error: { id: id || 'Пусто' },
      message: 'Запрос не может быть пустым',
    });
  }

  User.update(req.body, {
    where: { id: parseInt(id) },
  })
    .then(num => {
      if (num == 1) {
        res.status(200).json({
          message: `Пользователь с id: ${id} успешно обновлен!`,
        });
      } else {
        res.status(500).json({
          message: `Ошибка при обновлении пользователя с id: ${id}. Возможно пользователь не существует`,
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Обновить пользователя по id" ${id}`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      error: { id: id || 'Пусто' },
      message: 'Запрос не может быть пустым',
    });
  }

  User.destroy({
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.status(200).json({
          message: `Пользователь с id: ${id} успешно удален!`,
        });
      } else {
        res.status(500).json({
          message: `Не возможно удалить пользователя с id: ${id}. Возможно пользователя не существует`,
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Удалить пользователя по id" c id: ${id}`,
      });
    });
};

exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then(nums => {
      res.status(201).json({ message: `${nums} Пользователи удалены успешно!` });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Удалить всех пользователей"`,
      });
    });
};

// find all active user
exports.findAllActive = (req, res) => {
  User.findAll({ where: { status: true }, include: Role })
    .then(data => {
      res.status(200).json({
        data: data,
        message: `Операция "Найти всех активных пользователей " выполнена успешно`,
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Найти всех пользователей"`,
      });
    });
};
