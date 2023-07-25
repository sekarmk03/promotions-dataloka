'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class t_banner_promosi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  t_banner_promosi.init({
    id_banner_promosi: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    judul_promosi: DataTypes.STRING,
    tanggal_awal: DataTypes.DATE,
    tanggal_akhir: DataTypes.DATE,
    banner: DataTypes.STRING,
    isi: DataTypes.STRING,
    url_target: DataTypes.STRING,
    tags: DataTypes.STRING,
    deleted: DataTypes.INTEGER,
    created_by: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 't_banner_promosi',
    underscored: true,
    tableName: 't_banner_promosi',
    freezeTableName: true
  });
  return t_banner_promosi;
};