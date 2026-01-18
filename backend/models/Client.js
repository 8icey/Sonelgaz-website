module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Client", {
    id_client: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING
  });
};
