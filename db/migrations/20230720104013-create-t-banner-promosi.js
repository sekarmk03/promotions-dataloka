'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('t_banner_promosi', {
      id_banner_promosi: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      judul_promosi: {
        type: Sequelize.STRING(200)
      },
      tanggal_awal: {
        type: Sequelize.DATEONLY
      },
      tanggal_akhir: {
        type: Sequelize.DATEONLY
      },
      banner: {
        type: Sequelize.STRING
      },
      isi: {
        type: Sequelize.TEXT
      },
      url_target: {
        type: Sequelize.STRING(100)
      },
      tags: {
        type: Sequelize.STRING(100)
      },
      deleted: {
        type: Sequelize.BOOLEAN
      },
      created_by: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('t_banner_promosi');
  }
};