module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Status", {
    id_status: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
  });
};
