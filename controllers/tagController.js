const db = require('../models');
const Tag = db.Tag;
const Service = db.Service;
const Op = db.Sequelize.Op;
const Group = db.Group;
exports.create = (req, res) => {

  let { name, isActive, GroupId } = req.body;
  // Validate request
  if (!name) {
    return res.status(400).json({
      message: 'Запрос не может быть пустым',
      error: { name: name || 'Пусто' },
    });
  }

  // Create Tag
  const tagObj = {
    name: name,
    isActive: isActive || true,
    GroupId: GroupId || 1,
  };

  // Save Tag
  Tag.create(tagObj)
    .then(data => {
      res.status(200).json({
        data: data,
        message: `Тэг ${data.name} успешно создан!`,
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Создать новый тэг"`,
      });
    });
};

exports.findAll = (req, res) => {
  const tagName = req.query.tagName;
  let condition = tagName
    ? {
      name: {
        [Op.iLike]: `%${tagName}%`,
      },
    }
    : null;

  Tag.findAll({ where: condition, order: [['id', 'ASC']], include: [Service, Group] })
    .then(data => {
      res.status(200).json({
        data: data,
        messgage: 'Операция выполнена успешно',
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Найти все активные тэги"`,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      message: 'Запрос не может быть пустым',
      error: { id: id || 'Пусто' },
    });
  }

  Tag.findByPk(id, { include: [Service, Group] })
    .then(data => {
      res.status(200).json({
        data: data,
        messgage: 'Операция выполнена успешно',
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Найти тэг по id"`,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      message: 'Запрос не может быть пустым',
      error: { id: id || 'Пусто' },
    });
  }

  Tag.update(req.body, {
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.status(201).json({
          message: `Тэг с id: ${id} успешно обнолвен!`,
        });
      } else {
        res.status(400).json({
          message: `Ошибка при обновлении тэга с id: ${id}. Возможно тэга не существует!`,
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Обновление тэга по id"`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      message: `Запрос не может быть пустым`,
      error: {
        id: id || 'Пусто',
      },
    });
  }

  Tag.destroy({
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.status(200).json({
          message: `Тэг с id: ${id} успешно удален !`,
        });
      } else {
        res.status(400).json({
          message: `Ошибка при удалении тэга с id: ${id}. Возможно тэг не существует`,
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Удалить тэг по id" ${id}`,
      });
    });
};

exports.deleteAll = (req, res) => {
  Tag.destroy({
    where: {},
    truncate: false,
  })
    .then(nums => {
      res.status(200).json({
        message: `${nums} Тэги удалены успешно!`,
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Удалить все Тэги"`,
      });
    });
};

// find all active Tag
exports.findAllActive = (req, res) => {
  Tag.findAll({ where: { isActive: true }, order: [['id', 'ASC']], include: Group })
    .then(data => {
      res.status(200).json({
        data: data,
        message: 'Запрос выполнен успешно',
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Найти все активные Тэги"`,
      });
    });
};
