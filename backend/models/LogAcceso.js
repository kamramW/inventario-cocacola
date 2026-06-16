const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const LogAcceso = sequelize.define(
  "LogAcceso",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    usuario_id: {
      type: DataTypes.INTEGER,
    },

    ip: {
      type: DataTypes.STRING,
    },

    navegador: {
      type: DataTypes.STRING,
    },

    evento: {
      type: DataTypes.STRING,
    },

    fecha_hora: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "logs_acceso",
    timestamps: false,
  }
);

module.exports = LogAcceso;