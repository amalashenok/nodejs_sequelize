const db = require('../models');
const Group = db.Group;
const Op = db.Sequelize.Op;
const Tag = db.Tag;

exports.create = (req, res) => {
  const { name, color } = req.body;

  if (!name) {
    return res.status(400).json({
      error: { name: name || 'Пусто' },
      message: `Запрос не может быть пустым`,
    });
  }

  const group = {
    name: name,
    color: color,
  };

  Group.create(group)
    .then(data => {
      res.status(201).json({
        data: data,
        message: `Создание группы ${name} выполнено успешно`,
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Прошизошла ошибка при выполнении опрерации "Создать группу"`,
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

  Group.findAll({ where: condition, order: [['id', 'ASC']], include: Tag })
    .then(data => {
      res.status(200).json({
        data: data,
        message: 'Операция выполнена успешно',
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Прошизошла ошибка при выполнении опрерации "Найти все группы"`,
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

  Group.findByPk(id, { include: Tag })
    .then(data => {
      res.status(200).json({
        data: data,
        message: 'Операция выполнена успешно',
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Прошизошла ошибка при выполнении опрерации "Поиск группы по id" ${id}`,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  if (!id || !name) {
    return res.status(400).json({
      error: {
        id: id || 'Пусто',
        name: name || 'Пусто',
      },
      message: `Запрос не может быть пустым`,
    });
  }

  Group.update(req.body, {
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.status(201).json({
          message: `Группа ${name} обновлена успешно`,
        });
      } else {
        res.status(400).json({
          message: `Невозможно обновить группу с id: ${id}. Возможно группы не существует !`,
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Прошизошла ошибка при выполнении операции "Обновить группу по id" ${id}`,
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

  Group.destroy({
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.status(201).json({
          message: 'Группа удалена успешно!',
        });
      } else {
        res.status(400).json({
          message: `Невозможно удалить группу с id: ${id}. Возможно группы не существует`,
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Прошизошла ошибка при выполнении операции "Удалить группу по id"`,
      });
    });
};

exports.deleteAll = (req, res) => {
  Group.destroy({
    where: {},
    truncate: false,
  })
    .then(nums => {
      res.status(201).json({
        message: `${nums} группы удалены успешно!`,
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Удалить все группы"`,
      });
    });
};