module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Document", {
    id_document: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    file_name: DataTypes.STRING,
    file_path: DataTypes.TEXT
  });
};
