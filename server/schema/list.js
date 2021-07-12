const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "list",
    {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      content: {
        type: Sequelize.CHAR(255),
        allowNull: true,
      },
      status: {
        type: Sequelize.TINYINT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "list",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
