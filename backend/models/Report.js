module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Report", {
    id_report: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.TEXT, allowNull: false }
  });
};
