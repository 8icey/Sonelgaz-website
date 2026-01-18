module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Project", {
    id_project: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: {
  type: DataTypes.STRING,
  allowNull: false,
  validate: {
    notEmpty: {
      msg: "Project title is required"
    }
  }
},
    description: DataTypes.TEXT,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
  });
};
