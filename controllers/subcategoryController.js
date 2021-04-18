const db = require('../models');
const Subcategory = db.Subcategory;
const Op = db.Sequelize.Op;
const Service = db.Service;
const Supplier = db.Supplier;
exports.create = (req, res) => {

  const { name, image, desc } = req.body;

  if (!name) {
    return res.status(400).json({
      error: { name: name || 'Пусто' },
      message: `Запрос не может быть пустым`,
    });
  }

  const subcategory = {
    name: name,
    image: image,
    desc: desc,
    isActive: true,
  };

  Subcategory.create(subcategory)
    .then(data => {
      res.status(201).json({
        data: data,
        message: `Создание подкатегории ${name} выполнено успешно`,
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Создать подкатегорию"`,
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

  Subcategory.findAll({ where: condition, order: [['id', 'ASC']] })
    .then(data => {
      res.status(200).json({
        data: data,
        message: 'Операция выполнена успешно',
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Найти все подкатегории"`,
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

  Subcategory.findByPk(id, { include: { model: Service, as: 'services', include: Supplier } })
    .then(data => {
      res.status(200).json({
        data: data,
        message: 'Операция выполнена успешно',
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Поиск подкатегории по id" ${id}`,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const name = req.body.name;

  if (!id || !name) {
    return res.status(400).json({
      error: {
        id: id || 'Пусто',
        name: name || 'Пусто',
      },
      message: `Запрос не может быть пустым`,
    });
  }

  Subcategory.update(req.body, {
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.status(201).json({
          message: `Подкатегория ${name} обновлена успешно`,
        });
      } else {
        res.status(400).json({
          message: `Невозможно обновить подкатегорию с id: ${id}.Возмодно подкатегории не существует !`,
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Обновить подкатегорию по id" ${id}`,
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

  Subcategory.destroy({
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.status(201).json({
          message: 'Подкатегория удалена успешно!',
        });
      } else {
        res.status(400).json({
          message: `Невозможно удалить подкатегорию с id: ${id}. Возможно подкатегории не существует`,
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Удалить подкатегорию по id"`,
      });
    });
};

exports.deleteAll = (req, res) => {
  Subcategory.destroy({
    where: {},
    truncate: false,
  })
    .then(nums => {
      res.status(201).json({
        message: `${nums} Подкатегории удалены успешно!`,
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Удалить все подкатегории"`,
      });
    });
};

exports.findAllActive = (req, res) => {
  Subcategory.findAll({ where: { isActive: true }, order: [['id', 'ASC']] })
    .then(data => {
      res.status(200).json({
        data: data,
        message: 'Операция выполнена успешно',
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Найти все активные подкатегории"`,
      });
    });
};
