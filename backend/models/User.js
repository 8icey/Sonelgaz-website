module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    id_user: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
  }, { tableName: "User_", timestamps: true });
};
