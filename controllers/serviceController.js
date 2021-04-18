const db = require('../models');
const imagesDefault = require("../config/images.default");

const { Service, Category, Tag, ServicesTags, Address,
  ServicesAddresses, Supplier, Subcategory, Image, Group
} = db;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {

  let { name, image, images, content, description, isActive, rate, price, limits, categoryId, worktime,
    subcategoryId, tagsId, supplierId, addressesId,
  } = req.body;

  // Validate request
  if (!name || !supplierId) {
    return res.status(400).json({
      error: {
        name: name || 'Пусто',
        image: image || 'Пусто',
        description: description || 'Пусто',
        supplierId: supplierId || 'Пусто',
        body: req.body,
      },
      message: `Запрос не может быть пустым`,
    });
  }

  // Create Service
  const serviceObj = {
    name: name,
    content: content,
    description: description || '',
    isActive: isActive,
    rate: rate,
    price: price,
    worktime: worktime,
    limits: limits,
  };

  // Save Service
  Service.create(serviceObj)
    .then(service => {

      //if tagsid were sent
      if (tagsId) {
        console.log('tags found', tagsId);
        for (const tagId of tagsId) {
          Tag.findOne({ where: { id: tagId } }).then(tag => {
            ServicesTags.create({
              ServiceId: service.id,
              TagId: tag.id,
            })
              .then(() => {
                console.log('tags were set');
              })
              .catch(error => {
                res.status(500).json({
                  error: error.message,
                  message: `Произошла ошибка при выполнении операции "добавление тэга для нового сервиса"`,
                });
              });
          });
        }
      }

      //if addressesId were sent
      if (addressesId) {
        for (const addressId of addressesId) {
          Address.findOne({ where: { id: addressId } }).then(address => {
            ServicesAddresses.create({
              ServiceId: service.id,
              AddressId: address.id,
            })
              .then(() => {
                console.log('adress were set');
              })
              .catch(error => {
                res.status(500).json({
                  error: error.message,
                  message: `Произошла ошибка при выполнении операции "Присвоение адреса новому сервису"`,
                });
              });
          });
        }
      }

      //if supplierId was sent
      if (supplierId) {
        Supplier.findOne({ where: { id: supplierId } }).then(supplier => {
          service
            .setSupplier(supplier)
            .then(() => {
              console.log('supplier were set');
            })
            .catch(error => {
              res.status(500).json({
                error: error.message,
                message: `Произошла ошибка при выполнении операции "Присвоение поставщика новому сервису"`,
              });
            });
        });
      }

      //if subcategoryId was sent
      if (subcategoryId) {
        Subcategory.findOne({ where: { id: subcategoryId } }).then(subcategory => {
          service
            .setSubcategory(subcategory)
            .then(() => {
              console.log('subcategory were set');
            })
            .catch(error => {
              res.status(500).json({
                error: error.message,
                message: `Произошла ошибка при выполнении операции "Присвоение подкатегорию новому сервису"`,
              });
            });
        });
      }

      if (!images || images.length === 0) {
        images = imagesDefault;
      }

      const newImages = images.map(img => ({ ServiceId: service.id, ...img }))
      console.log(images)
      Image.bulkCreate(newImages, { returning: true })
        .then(res => {
          console.log('Изображения были обновлены');
        })
        .catch(err => {
          console.error(err);
        })

      //if category was sent
      if (categoryId) {
        Category.findOne({ where: { id: categoryId } }).then(category => {
          service
            .setCategory(category)
            .then(() => {
              res.status(201).json({
                message: `Сервис ${service.name} создан успешно`,
                data: {
                  name: service.name,
                },
              });
            })
            .catch(error => {
              res.status(500).json({
                error: error.message,
                message: `Произошла ошибка при выполнении операции "Присвоить категорию новому сервису"`,
              });
            });
        });
      } else {
        //default category = 1
        service
          .setCategory(1)
          .then(() => {
            res.status(201).json({
              message: `Сервис ${service.name} создан успешно`,
              data: { id: service.id, name: service.name },
            });
          })
          .catch(error => {
            res.status(500).json({
              error: error.message,
              message: `Произошла ошибка при выполнении операции "Присвоить категорию новому сервису"`,
            });
          });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Создать сервис"`,
      });
    });
};

exports.findAll = (req, res) => {
  const { name } = req.query;
  const condition = name
    ? {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    }
    : null;

  Service.findAll({
    where: condition,
    order: [['id', 'ASC']],
    include: [Category, { model: Tag, include: Group }, Address, Supplier, Image],
  })
    .then(data => {
      res.status(200).json({
        data: data,
        message: 'Операция выполнена успешно!',
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Найти все сервисы"`,
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

  Service.findByPk(id, { include: [Category, { model: Tag, include: Group }, Address, Supplier, Subcategory, Image] })
    .then(data => {
      res.status(200).json({
        data: data,
        message: 'Операция выполнена успешно!',
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Поиск сервиса по id"`,
      });
    });
};

exports.update = async (req, res) => {

  const { id } = req.params;

  let { name, tagsId, addressesId, images, CategoryId, SubcategoryId } = req.body;

  if (!id) {
    return res.status(400).json({
      error: { id: id || 'Пусто' },
      message: `Запрос не может быть пустым`,
    });
  }

  Service.update(req.body, {
    where: { id: id },
  })
    .then(num => {
      //Обновление тегов
      if (tagsId) {
        if (typeof tagsId === 'string') {
          tagsId = JSON.parse(tagsId)
        }
        //Ищем теги в таблице Tags по id
        Tag.findAll({ where: { id: tagsId } })
          .then(tags => {
            //Нашли теги с такими id
            //Удаляем старые в таблице ServicesTags
            ServicesTags.destroy({ where: { ServiceId: id } })
              .then(delRows => {
                const newRows = tags.map(tag => { return { ServiceId: id, TagId: tag.id } })
                ServicesTags.bulkCreate(newRows, { returning: true })
                  .then(res => {
                    console.log('Теги были обновлены');
                  })
                  .catch(err => {
                    console.error(err);
                  })
              })
          })
      }
      //Обновление адресов
      if (addressesId) {
        if (typeof addressesId === 'string') {
          addressesId = JSON.parse(addressesId)
        }
        //Ищем адреса в таблице Addresses по id
        Address.findAll({ where: { id: addressesId } })
          .then(addresses => {
            //Нашли адреса с такими id
            //Удаляем старые в таблице ServicesAddresses
            ServicesAddresses.destroy({ where: { ServiceId: id } })
              .then(delRows => {
                const newRows = addresses.map(address => { return { ServiceId: id, AddressId: address.id } })
                ServicesAddresses.bulkCreate(newRows, { returning: true })
                  .then(res => {
                    console.log('Адреса были обновлены');
                  })
                  .catch(err => {
                    console.error(err);
                  })
              })
          })
      }

      if (!images || images.length === 0) {
        images = imagesDefault;
      }

      Image.destroy({ where: { ServiceId: id } })
        .then(deleted => {

          const newImages = images.map(img => ({ ServiceId: id, ...img }))

          Image.bulkCreate(newImages, { returning: true })
            .then(res => {
              console.log('Изображения были обновлены');
            })
            .catch(err => {
              console.error(err);
            })
        })

      res.status(201).json({
        message: `Сервис ${name ? name : 'id ' + id} обновлен успешно`,
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Обновить сервис по id"`,
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

  Service.destroy({
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {

        res.status(201).json({
          message: `Сервис с id: ${id} удален успешно!`,
        });
      } else {
        res.status(500).json({
          message: `Ошибка при удалении сервиса с id: ${id}. Возможно сервиса не существует`,
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Удалить сервис по id"`,
      });
    });
};

exports.deleteAll = (req, res) => {
  Service.destroy({
    where: {},
    truncate: false,
  })
    .then(nums => {
      res.status(201).json({
        message: `${nums} Сервисы удалены!`,
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Удалить все сервисы"`,
      });
    });
};

// find all active services
exports.findAllActive = (req, res) => {
  Service.findAll({ where: { isActive: true }, order: [['id', 'ASC']], include: Category })
    .then(data => {
      res.status(200).json({
        data: data,
        message: 'Операция выполнена успешно!',
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        message: `Произошла ошибка при выполнении операции "Найти все активные сервисы"`,
      });
    });
};