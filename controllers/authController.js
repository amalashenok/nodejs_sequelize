const db = require('../models');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = db.User;
const Role = db.Role;
const Op = db.Sequelize.Op;

const SECRET = process.env.SECRET;
const generateAccessToken = (id, email, RoleId, firstName, lastName, Role) => {
  const payload = {
    id,
    email,
    RoleId,
    Role,
    firstName,
    lastName,
  };
  return jwt.sign(payload, SECRET, { expiresIn: '240h' });
};

exports.registration = (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: `Ошибка при регистрации`, errors });
    }
    //repassword не нужен?
    const { firstName, lastName, email, status, password, RoleId } = req.body;

    const userObj = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      status: status,
      password: password,
    };

    User.findOne({ where: { email: email } }).then(user => {
      //if (user === 1) не работает, возвращается объект User
      if (user) {
        return res.status(400).json({ message: 'Пользователь существует' });
      } else {
        User.create(userObj).then(newUser => {
          Role.findOne({ where: { id: RoleId } })
            .then(role => {
              newUser.setRole(role).then(() => {
                //Убраем пароль из ответа
                const plainUser = JSON.parse(JSON.stringify(newUser));
                delete plainUser.password;

                res.status(201).json({
                  message: `Пользователь создан `,
                  data: plainUser,
                });
              });
            })
            .catch(error => {
              res.status(400).json({
                message: `Произошла ошибка при выполнении операции "поиск роли"`,
                error: error.message,
              });
            });
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      message: `Произошла ошибка при выполнении операции "Регистрация нового пользователя"`,
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email: email },
      include: Role,
    });
    if (!user) {
      return res.status(400).json({
        error: { email: email || 'Пусто' },
        message: `Пользователь с ${email} не найден`,
      });
    }

    const validetePassword = bcrypt.compareSync(password, user.password);

    if (!validetePassword) {
      return res.status(400).json({
        error: { password: password || 'Пусто' },
        message: `Пароль не верный`,
      });
    }

    const token = generateAccessToken(
      user.dataValues.id,
      user.dataValues.email,
      user.dataValues.RoleId,
      user.dataValues.firstName,
      user.dataValues.lastName,
      user.dataValues.Role,
    );
    const { password: pwd, ...userData } = user.dataValues;

    res.status(201).json({
      data: {
        token: token,
        profile: userData,
      },
      message: 'Операция выполнена успешно',
    });
  } catch (error) {
    res.status(400).json({
      message: `Произошла ошибка при выполнении операции "Авторизация" `,
      error: error.message,
    });
  }
};

exports.getUser = async (req, res) => {
  req.headers.Authorization = null;

  res.status(200).json({
    data: req.user,
    message: 'Операция выполнена успешно',
  });
};

exports.logout = (req, res) => {
  res.status(201).json({
    data: { token: null },
    message: 'Операция выполнена успешно!',
  });
};
