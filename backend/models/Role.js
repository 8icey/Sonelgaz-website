module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Role", {
    id_role: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
  });
};
