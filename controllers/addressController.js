const db = require('../models');
const Address = db.Address;
const ServicesAddresses = db.ServicesAddresses;
const Supplier = db.Supplier;
const Service = db.Service;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  let { city, street } = req.body;
  // Validate request
  if (!city || !street) {
    return res.status(400).json({
      message: 'Запрос не может быть пустым',
      error: { city: city || 'пусто', street: street || 'пусто' },
    });
  }

  // Create Address
  const addressObj = { city: city, street: street };

  // Save Address
  Address.create(addressObj)
    .then(data => {
      res.status(201).json({
        message: 'Операция "создать город" выполнена успешно',
        data: data,
      });
    })
    .catch(error => {
      res.status(400).json({
        error: error.message,
        message: 'Произошла ошибка при выполнении операции "создать адрес"',
      });
    });
};

exports.findAll = (req, res) => {
  const { street } = req.query;
  let condition = street
    ? {
      street: {
        [Op.iLike]: `%${street}%`,
      },
    }
    : null;

  Address.findAll({ where: condition, order: [['id', 'ASC']], include: Service })
    .then(data => {
      res.status(200).json({
        data: data,
        message: 'Запрос "найти все адреса" выполнен успешно',
      });
    })
    .catch(error => {
      res.status(400).json({
        error: error.message,
        message: 'Произошла ошибка при выполнении операции "найти все города".',
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({
      message: 'Запрос не может быть пустым',
      error: { id: id || 'пусто' },
    });
  }

  Address.findByPk(id, {
    include: { model: Service, include: Supplier },
  })
    .then(data => {
      res.status(200).json({
        data: data,
        message: 'Операция выполнена успешно!',
      });
    })
    .catch(error => {
      res.status(400).json({
        error: error.message,
        message: `Ошибка при выполнении опрерации "Поиск адреса по id" с id: ${id}. Возможно адреса не существует`,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      error: { id: id || 'пусто' },
      message: `Запрос не может быть пустым`,
    });
  }

  Address.update(req.body, {
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.status(201).json({
          message: 'Адрес обновлен успешно.',
        });
      } else {
        res.status(400).json({
          message: `Не возможно обновить адрес с id: ${id}. Возможно адрес не найден`,
        });
      }
    })
    .catch(error => {
      res.status(400).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "обновить адрес" с id: ${id}`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      message: 'Запрос не может быть пустым',
      error: { id: id || 'пусто' },
    });
  }
  Address.destroy({
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.status(201).json({
          message: 'Адрес удален успешно',
        });
      } else {
        res.status(400).json({
          message: `Не возможно удалить город с id: ${id}. Возможно адрес не существует!`,
        });
      }
    })
    .catch(error => {
      res.status(400).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "удалить адрес по id": ${id}`,
      });
    });
};

exports.deleteAll = (req, res) => {
  Address.destroy({
    where: {},
    truncate: false,
  })
    .then(nums => {
      res.status(201).json({
        message: `${nums} адреса удалены!`,
      });
    })
    .catch(error => {
      res.status(400).json({
        error: error.message,
        message: 'Произошла ошибка при выполнении операции "удалить все адреса"',
      });
    });
};
