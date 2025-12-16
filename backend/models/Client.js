module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Client", {
    id_client: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING
  });
};
