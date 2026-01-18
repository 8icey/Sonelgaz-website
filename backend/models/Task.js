module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Task", {
    id_task: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
  });
};
