const db = require('../models');
const Supplier = db.Supplier;
const Service = db.Service;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const name = req.body.name;

  // Validate request
  if (!name) {
    return res.status(400).json({
      message: 'Запрос не может быть пустым',
      error: { name: name || 'Пусто' },
    });
  }

  // Create Supplier
  const supplier = {
    name: name,
    isActive: true,
  };

  // Save Supplier
  Supplier.create(supplier)
    .then(data => {
      res.status(201).json({
        data: data,
        message: 'Поставщик создан успешно',
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Создать поставщика"`,
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;

  let condition = name
    ? {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    }
    : null;

  Supplier.findAll({ where: condition, order: [['id', 'ASC']] })
    .then(data => {
      res.status(200).json({
        data: data,
        message: 'Операция успешно выполнена',
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Найти всех поставщиков"`,
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

  Supplier.findByPk(id, { include: { model: Service, as: 'services' } })
    .then(data => {
      res.status(200).json({
        data: data,
        message: `Операция успешно выполнена`,
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Поиск поставщика по id"`,
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

  Supplier.update(req.body, {
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.status(201).json({
          message: 'Поставщик упешно обновлен',
        });
      } else {
        res.status(400).json({
          message: `Не возможно обновить поставщика с id: ${id}. Возможно поставщика не существует`,
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Обновить поставщика по id"`,
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

  Supplier.destroy({
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.status(201).json({
          message: 'Поставщик удален успешно',
        });
      } else {
        res.status(400).json({
          message: `Невозможно удалить поставщика с id: ${id}. Возможно поставщика не существует`,
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Удалить поставщика по id"`,
      });
    });
};

exports.deleteAll = (req, res) => {
  Supplier.destroy({
    where: {},
    truncate: false,
  })
    .then(nums => {
      res.status(201).json({
        message: `${nums} Поставщики удалены успешно!`,
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Удалить всех поставщиков"`,
      });
    });
};

// find all active Suppliers
exports.findAllActive = (req, res) => {
  Suppliers.findAll({ where: { isActive: true }, order: [['id', 'ASC']] })
    .then(data => {
      res.status(200).json({
        data: data,
        message: 'Операция выполнена успешно',
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Найти всех активных поставщиков"`,
      });
    });
};
