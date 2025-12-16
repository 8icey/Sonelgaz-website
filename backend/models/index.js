const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Client = require("./Client")(sequelize, DataTypes);
const Status = require("./Status")(sequelize, DataTypes);
const Project = require("./Project")(sequelize, DataTypes);
const Intervention = require("./Intervention")(sequelize, DataTypes);
const Task = require("./Task")(sequelize, DataTypes);
const User = require("./User")(sequelize, DataTypes);
const Role = require("./Role")(sequelize, DataTypes);
const Departement = require("./Departement")(sequelize, DataTypes);
const Document = require("./Document")(sequelize, DataTypes);
const Report = require("./Report")(sequelize, DataTypes);

// Associations
Client.hasMany(Project, { foreignKey: "id_client" });
Project.belongsTo(Client, { foreignKey: "id_client" });


Status.hasMany(Project);
Project.belongsTo(Status);

Project.hasMany(Intervention);
Intervention.belongsTo(Project);

Client.hasMany(Intervention);
Intervention.belongsTo(Client);

Status.hasMany(Intervention);
Intervention.belongsTo(Status);

Project.hasMany(Task);
Task.belongsTo(Project);

User.hasMany(Task);
Task.belongsTo(User);

Status.hasMany(Task);
Task.belongsTo(Status);

Intervention.belongsToMany(User, {
  through: "intervents",
  foreignKey: "id_intervention"
});

User.belongsToMany(Intervention, {
  through: "intervents",
  foreignKey: "id_user"
});


User.belongsTo(Role);
User.belongsTo(Departement);
Role.hasMany(User);
Departement.hasMany(User);


Intervention.hasMany(Document);
Document.belongsTo(Intervention);

Intervention.hasMany(Report);
Report.belongsTo(Intervention);
Report.belongsTo(User);

module.exports = {
  sequelize,
  Client,
  Status,
  Project,
  Intervention,
  Task,
  User,
  Role,
  Departement,
  Document,
  Report
};
