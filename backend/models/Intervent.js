module.exports = (sequelize, DataTypes) => {
  const Intervent = sequelize.define(
    "Intervent",
    {
      id_intervention: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      }
      // NO assigned_at column - it doesn't exist in your database
    },
    {
      tableName: "intervent",
      timestamps: false, // Disable all timestamps
      freezeTableName: true
    }
  );

  return Intervent;
};