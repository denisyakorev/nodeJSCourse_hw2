'use strict';
const {DataTypes} = require("sequelize");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Groups', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUID,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      permissions: {
        type: DataTypes.ARRAY(DataTypes.ENUM({
          values: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
        })),
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Groups');
  }
};