const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Client = require("./Client")(sequelize, DataTypes);
const Status = require("./Status")(sequelize, DataTypes);
const Project = require("./Project")(sequelize, DataTypes);
const Intervention = require("./Intervention")(sequelize, DataTypes);
const Task = require("./Task")(sequelize, DataTypes);
const User = require("./User")(sequelize, DataTypes);
const Role = require("./Role")(sequelize, DataTypes);
const Department = require("./Department")(sequelize, DataTypes);
const Document = require("./Document")(sequelize, DataTypes);
const Report = require("./Report")(sequelize, DataTypes);
const Intervent = require("./Intervent")(sequelize, DataTypes);

// // Associations
// Client.hasMany(Project, { foreignKey: "id_client" });
// Project.belongsTo(Client, { foreignKey: "id_client" });




// Status.hasMany(Project);
// Project.belongsTo(Status);

// Project.hasMany(Intervention);
// Intervention.belongsTo(Project);

// Client.hasMany(Intervention);
// Intervention.belongsTo(Client);

// Status.hasMany(Intervention);
// Intervention.belongsTo(Status);

// Project.hasMany(Task);
// Task.belongsTo(Project);

// User.hasMany(Task);
// Task.belongsTo(User);

// Status.hasMany(Task);
// Task.belongsTo(Status);

// Intervention.belongsToMany(User, {
//   through: "intervent",
//   foreignKey: "id_intervention"
// });

// User.belongsToMany(Intervention, {
//   through: "intervent",
//   foreignKey: "id_user"
// });


// User.belongsTo(Role);
// User.belongsTo(Department);
// Role.hasMany(User);
// Department.hasMany(User);


// Intervention.hasMany(Document);
// Document.belongsTo(Intervention);


// Intervention.belongsToMany(User, {
//   through: Intervent,
//   foreignKey: 'id_intervention',
//   otherKey: 'id_user'
// });

// User.belongsToMany(Intervention, {
//   through: Intervent,
//   foreignKey: 'id_user',
//   otherKey: 'id_intervention'
// });


// Intervention.hasMany(Report);
// Report.belongsTo(Intervention);
// Report.belongsTo(User);

// Intervention.belongsToMany(User, { through: Intervent });
// User.belongsToMany(Intervention, { through: Intervent });



// =======================
// Associations (FINAL & CLEAN)
// =======================

// Client ↔ Project
Client.hasMany(Project, { foreignKey: "id_client" });
Project.belongsTo(Client, { foreignKey: "id_client" });

// Status ↔ Project
Status.hasMany(Project, { foreignKey: "id_status" });
Project.belongsTo(Status, { foreignKey: "id_status" });

// Project ↔ Intervention
Project.hasMany(Intervention, { foreignKey: "id_project" });
Intervention.belongsTo(Project, { foreignKey: "id_project" });

// Client ↔ Intervention
Client.hasMany(Intervention, { foreignKey: "id_client" });
Intervention.belongsTo(Client, { foreignKey: "id_client" });

// Status ↔ Intervention
Status.hasMany(Intervention, { foreignKey: "id_status" });
Intervention.belongsTo(Status, { foreignKey: "id_status" });

// Project ↔ Task
Project.hasMany(Task, { foreignKey: "id_project" });
Task.belongsTo(Project, { foreignKey: "id_project" });

// User ↔ Task
User.hasMany(Task, { foreignKey: "id_user" });
Task.belongsTo(User, { foreignKey: "id_user" });

// Status ↔ Task
Status.hasMany(Task, { foreignKey: "id_status" });
Task.belongsTo(Status, { foreignKey: "id_status" });

// User ↔ Role
Role.hasMany(User, { foreignKey: "id_role" });
User.belongsTo(Role, { foreignKey: "id_role" });

// User ↔ Department
Department.hasMany(User, { foreignKey: "id_departement" });
User.belongsTo(Department, { foreignKey: "id_departement" });

// Intervention ↔ Document
Intervention.hasMany(Document, { foreignKey: "id_intervention" });
Document.belongsTo(Intervention, { foreignKey: "id_intervention" });

// Intervention ↔ Report
Intervention.hasMany(Report, { foreignKey: "id_intervention" });
Report.belongsTo(Intervention, { foreignKey: "id_intervention" });

// User ↔ Report
User.hasMany(Report, { foreignKey: "id_user" });
Report.belongsTo(User, { foreignKey: "id_user" });

// ✅ MANY-TO-MANY (ONLY ONCE)
Intervention.belongsToMany(User, {
  through: Intervent,
  foreignKey: "id_intervention",
  otherKey: "id_user"
});

User.belongsToMany(Intervention, {
  through: Intervent,
  foreignKey: "id_user",
  otherKey: "id_intervention"
});



module.exports = {
  sequelize,
  Client,
  Status,
  Project,
  Intervention,
  Task,
  User,
  Role,
  Department,
  Document,
  Report,
  Intervent
};
