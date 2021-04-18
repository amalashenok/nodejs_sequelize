'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return await queryInterface.bulkInsert(
            "Addresses", [
                {
                    street: "Ленинградский проспект, д. 80, корп. 11",
                    city: "Москва",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null
                },
                {
                    street: "ул. Енисейская, д. 36, стр. 1",
                    city: "Москва",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null
                },
                {
                    street: "Севастопольский проспект, д. 11Е, Торговый центр «Капитолий», 3 этаж",
                    city: "Москва",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null
                },
                {
                    street: "Багратионовский пр-д, д. 5",
                    city: "Москва",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null
                },
                {
                    street: "Нижний Сусальный пер., д. 9, стр. 4А",
                    city: "Москва",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null
                },
                {
                    street: "ул. Васильевская, д. 3",
                    city: "Москва",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null
                },
                {
                    street: "ул. Сретенка",
                    city: "Москва",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null
                },
                {
                    street: "ул. Александра Солженицына, д. 20, Москва этаж 2",
                    city: "Москва",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null
                },
                {
                    street: "ул. Новослободская, д. 14/19 ст. 4​311 К офис, 3 этаж",
                    city: "Москва",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null
                },
                {
                    street: "Сущёвский вал, 43​2 этаж",
                    city: "Москва",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null
                },
                {
                    street: "ул. Александра Солженицына, 18​2 этаж",
                    city: "Москва",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null
                },
                {
                    street: "Сокольники район, ​Поперечный просек, 1г",
                    city: "Москва",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null
                },
                {
                    street: "Москва",
                    city: "Москва",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null
                },
                {
                    street: "Екатеринбург",
                    city: "Екатеринбург",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null
                },

            ], {}
        )
    },

    down: async(queryInterface, Sequelize) => {
        return await queryInterface.bulkDelete("Addresses", null, {})
    },
};