module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Project", {
    id_project: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
  }, { timestamps: true });
};
