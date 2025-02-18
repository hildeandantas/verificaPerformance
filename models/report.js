import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import "dotenv/config";

const reports = sequelize.define(
  "t_wpp_report_consumo_vms",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    serverName: {
      type: DataTypes.STRING,
    },
    ramEmUso: {
      type: DataTypes.DECIMAL,
    },
    porcentagemRam: {
      type: DataTypes.DECIMAL,
    },
    porcentagemCpu: {
      type: DataTypes.DECIMAL,
    },
    dataHoraParcial: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    tableName: "t_wpp_report_consumo_vms",
    createdAt: false,
    updatedAt: false,
  }
);

reports
  .sync()
  .then(() => {
    console.log("Tabela t_wpp_report_consumo_vms atualizada com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao atualizar tabela t_wpp_report_consumo_vms:", error);
  });

export default reports;
