module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Department", {
    id_department: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
  });
};
