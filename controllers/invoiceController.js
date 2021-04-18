const db = require('../models');
const Service = db.Service;
const Category = db.Category;
const Supplier = db.Supplier;
const SubCategory = db.SubCategory;

const Invoice = db.Invoice;
const Session = db.Session;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const { name, persons, ServiceId, status, description, isActive = true, phone, date, email } = req.body;

  const ssid = req.cookies.ssid;

  // Validate request
  if (!name || !phone) {
    return res.status(400).json({
      error: {
        name: name || 'Пусто',
        phone: phone || 'Пусто',
      },
      message: `Запрос не может быть пустым`,
    });
  }
  // Create invoice
  const invoiceObj = {
    name: name,
    status: status,
    persons: persons,
    description: description,
    isActive: isActive,
    // ServiceId: ServiceId,
    phone: phone,
    date: date || new Date(),
    email: email,
  };

  // Save invoice
  Invoice.create(invoiceObj)
    .then(invoice => {
      invoice.setSession(ssid);
      ServiceId ? invoice.setService(ServiceId) : null;
    })
    .then(data =>
      res
        .cookie('ssid', ssid, {
          maxAge: 3600 * 240,
        })
        .status(201)
        .json({
          data: data,
          message: 'Заявка успешно создана',
        }),
    )
    .catch(error => {
      res.status(400).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Создание новой заявки"`,
      });
    });
};

exports.findAll = (req, res) => {
  const invoiceId = req.query.id;
  const condition = invoiceId
    ? {
      name: {
        [Op.iLike]: `%${invoiceId}%`,
      },
    }
    : null;

  Invoice.findAll({
    where: condition,
    order: [['id', 'ASC']],
    include: [Service, Session],
    paranoid: true,
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
        message: `Произошла ошибка при выполнении операции "Поиск всех заявок"`,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).json({
      error: { id: id || 'Пусто' },
      message: `Запрос не может быть пустым`,
    });
  }

  Invoice.findByPk(id, { include: { model: Service, include: [Category, Supplier] } })
    .then(data => {
      res.status(200).json({
        data: data,
        message: 'Оперрация выполнена успешно!',
      });
    })
    .catch(error => {
      res.status(400).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Поиск заявки по id"`,
      });
    });
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (!id) {
    res.status(400).json({
      error: { id: id || 'Пусто', data: data || 'Пусто' },
      message: `Запрос не может быть пустым`,
    });
  }

  Invoice.update(data, {
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.status(201).json({
          message: 'Заявка обновлена успешно.',
        });
      } else {
        res.status(400).json({
          message: `Заявка с id: ${id} не может быть обновлена. Возможно ее не существует!`,
        });
      }
    })
    .catch(error => {
      res.status(400).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Обновление заявки по id"`,
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

  Invoice.destroy({
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.status(201).json({
          message: `Заявка с id: ${id} удалена!`,
        });
      } else {
        res.status(400).json({
          message: `Ошибка при удалении заявки с id: ${id}. Возможно заявки не существует!`,
        });
      }
    })
    .catch(error => {
      res.status(400).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Удаление заявки по id"`,
      });
    });
};

exports.deleteAll = (req, res) => {
  Invoice.destroy({
    where: {},
    truncate: false,
  })
    .then(nums => {
      res.status(201).json({ message: `${nums} Все заявки удалены!` });
    })
    .catch(error => {
      res.status(400).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Удаление всех заявок"`,
      });
    });
};

// find all active Invoices
exports.findAllActive = (req, res) => {
  Invoice.findAll({ where: { isActive: true }, order: [['id', 'ASC']], include: Service })
    .then(data => {
      res.status(200).json({
        data: data,
        message: 'Операция выполнена успешно!',
      });
    })
    .catch(error => {
      res.status(400).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Поиск всех активных заявок"`,
      });
    });
};
