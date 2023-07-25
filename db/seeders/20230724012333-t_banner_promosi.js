'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('t_banner_promosi', [
    {
      judul_promosi: 'Promo Agustus',
      tanggal_awal: '2022-08-05',
      tanggal_akhir: '2022-08-17',
      banner: 'https://mycompany.co.id/promo/promo_agustus.jpg',
      isi: 'promo ini dikhususkan untuk pelanggan baru',
      url_target: 'https://mycompany.co.id/promo/',
      tags: 'saham, financial',
      deleted: 0,
      created_by: 'admin 1',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      judul_promosi: 'Promo September',
      tanggal_awal: '2022-09-20',
      tanggal_akhir: '2022-09-30',
      banner: 'https://mycompany.co.id/promo/promo_agustus.jpg',
      isi: 'promo ini dikhususkan untuk pembelian produk di bulan september',
      url_target: 'https://mycompany.co.id/promo/',
      tags: 'beauty, fashion',
      deleted: 0,
      created_by: 'admin 1',
      created_at: new Date(),
      updated_at: new Date()
    },
   ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('t_banner_promosi', null, {});
  }
};
