const db = require('../models');
const Category = db.Category;
const Op = db.Sequelize.Op;
const Service = db.Service;
const Supplier = db.Supplier;
const Image = db.Image;

exports.create = (req, res) => {
  const { name, image, desc } = req.body;

  // Validate request
  if (!name) {
    return res.status(400).json({
      error: {
        name: name || 'Пусто',
        image: image || 'Пусто',
        desc: desc || 'Пусто',
      },
      message: `Запрос не может быть пустым`,
    });
  }

  // Create Category
  const category = {
    name: name,
    image: image,
    desc: desc,
    isActive: true,
  };

  // Save Category
  Category.create(category)
    .then(data => {
      res.status(200).json({
        data: data,
        message: `Категория ${data.name} успешно создана!`,
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Создание новой категории"`,
      });
    });
};

exports.findAll = (req, res) => {
  const categoryName = req.query.categoryName;
  let condition = categoryName
    ? {
      name: {
        [Op.iLike]: `%${categoryName}%`,
      },
    }
    : null;

  Category.findAll({ where: condition, order: [['id', 'ASC']] })
    .then(data => {
      res.status(200).json({
        data: data,
        message: 'Операция выполнена успешно!',
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Поиск всех категорий"`,
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

  Category.findByPk(id, { include: { model: Service, as: 'services', include: [Supplier, Image] } })
    .then(data => {
      res.status(200).json({
        data: data,
        message: 'Операция выполнена успешно!',
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Поиск категории по id"`,
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

  Category.update(req.body, {
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.status(201).json({
          message: `Категория с id: ${id} обновлена успешно!`,
        });
      } else {
        res.status(400).json({
          message: `Ошибка при обновлении категории с id: ${id}. Возможно категория не существует!`,
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Обновление категории по id"`,
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

  Category.destroy({
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.status(200).json({
          message: `Категория с id: ${id} успешно удалена!`,
        });
      } else {
        res.status(400).json({
          message: `Ошибка при удалении категории с id: ${id}. Возможно категории не существует!`,
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Удаление категории по id"`,
      });
    });
};

exports.deleteAll = (req, res) => {
  Category.destroy({
    where: {},
    truncate: false,
  })
    .then(nums => {
      res.status(201).json({
        message: `${nums} Категории успешно удалены!`,
      });
    })
    .catch(error => {
      res.status(400).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Удаление всех категорий"`,
      });
    });
};

// find all active Categories
exports.findAllActive = (req, res) => {
  Category.findAll({ where: { isActive: true }, order: [['id', 'ASC']] })
    .then(data => {
      res.status(200).json({
        data: data,
        message: 'Операция выполнена успешно',
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Поиск всех активных категорий"`,
      });
    });
};
