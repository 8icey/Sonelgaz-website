require("dotenv").config();

const bcrypt = require("bcrypt");
const {
  sequelize,
  Client,
  Status,
  Role,
  Department, 
  User,
  Project,
  Intervention,
  Task,
  Report,
  Document,
  Intervent
} = require("./models");

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

async function seed() {
  try {
    console.log("📊 Environment Check:");
    console.log("- DB_NAME:", process.env.DB_NAME);
    console.log("- DB_USER:", process.env.DB_USER);
    console.log("- DB_PASSWORD:", process.env.DB_PASSWORD ? "✓ Set" : "✗ Not set");
    console.log("- DB_HOST:", process.env.DB_HOST);
    
    // Test connection first
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");
    
    // Sync database (force: true will drop and recreate)
    await sequelize.sync({ force: true });
    console.log("🧹 Database reset");

    // ======================
    // 1. STATUS
    // ======================
    const statuses = await Status.bulkCreate([
      { name: "Pending", description: "Waiting to start" },
      { name: "In Progress", description: "Currently being worked on" },
      { name: "Completed", description: "Finished successfully" },
      { name: "Cancelled", description: "Cancelled" },
      { name: "On Hold", description: "Temporarily paused" }
    ]);
    console.log(`✅ Created ${statuses.length} statuses`);

    // ======================
    // 2. ROLES
    // ======================
    const roles = await Role.bulkCreate([
      { name: "Admin", description: "Full system access" },
      { name: "Manager", description: "Project and team management" },
      { name: "Technician", description: "Technical interventions" },
      { name: "Viewer", description: "Read-only access" }
    ]);
    console.log(`✅ Created ${roles.length} roles`);

    // ======================
    // 3. DEPARTMENTS
    // ======================
    const departments = await Department.bulkCreate([
      { name: "IT Department", description: "Information Technology" },
      { name: "Maintenance", description: "Technical Maintenance" },
      { name: "Operations", description: "Field Operations" },
      { name: "Management", description: "Administration" }
    ]);
    console.log(`✅ Created ${departments.length} departments`);

    // ======================
    // 4. USERS
    // ======================
    const hashedPassword = await hashPassword("password123");
    
    const users = await User.bulkCreate([
      {
        first_name: "Admin",
        last_name: "User",
        email: "admin@sonelgaz.dz",
        password: hashedPassword,
        phone: "+213555010001",
        id_role: roles[0].id_role, // Admin
        id_department: departments[0].id_department // IT
      },
      {
        first_name: "Manager",
        last_name: "User",
        email: "manager@sonelgaz.dz",
        password: hashedPassword,
        phone: "+213555010002",
        id_role: roles[1].id_role, // Manager
        id_department: departments[3].id_department // Management
      },
      {
        first_name: "Technician",
        last_name: "One",
        email: "tech1@sonelgaz.dz",
        password: hashedPassword,
        phone: "+213555010003",
        id_role: roles[2].id_role, // Technician
        id_department: departments[1].id_department // Maintenance
      },
      {
        first_name: "Technician",
        last_name: "Two",
        email: "tech2@sonelgaz.dz",
        password: hashedPassword,
        phone: "+213555010004",
        id_role: roles[2].id_role, // Technician
        id_department: departments[2].id_department // Operations
      }
    ]);
    console.log(`✅ Created ${users.length} users`);

    // ======================
    // 5. CLIENTS
    // ======================
    const clients = await Client.bulkCreate([
      {
        name: "Sonelgaz Blida",
        phone: "025123456",
        email: "blida@sonelgaz.dz",
        address: "Blida, Algeria"
      },
      {
        name: "Industrial Complex",
        phone: "025987654",
        email: "industrial@example.dz",
        address: "Industrial Zone, Blida"
      },
      {
        name: "Public Hospital",
        phone: "025555555",
        email: "hospital@example.dz",
        address: "Blida City Center"
      }
    ]);
    console.log(`✅ Created ${clients.length} clients`);

    // ======================
    // 6. PROJECTS
    // ======================
    const projects = await Project.bulkCreate([
      {
        title: "Annual Maintenance Program",
        description: "Yearly maintenance of electrical infrastructure",
        start_date: new Date('2025-01-01'),
        end_date: new Date('2025-12-31'),
        id_client: clients[0].id_client,
        id_status: statuses[1].id_status // In Progress
      },
      {
        title: "Transformer Upgrade Project",
        description: "Replace old transformers with new efficient ones",
        start_date: new Date('2025-03-01'),
        end_date: new Date('2025-06-30'),
        id_client: clients[1].id_client,
        id_status: statuses[0].id_status // Pending
      },
      {
        title: "Emergency Power Supply",
        description: "Install backup generators for critical infrastructure",
        start_date: new Date('2025-02-15'),
        end_date: new Date('2025-04-15'),
        id_client: clients[2].id_client,
        id_status: statuses[1].id_status // In Progress
      }
    ]);
    console.log(`✅ Created ${projects.length} projects`);

    // ======================
    // 7. INTERVENTIONS
    // ======================
    const interventions = await Intervention.bulkCreate([
      {
        title: "Transformer Inspection",
        description: "Routine inspection of main transformer",
        scheduled_date: new Date('2025-12-20'),
        start_date: new Date('2025-12-20'),
        end_date: new Date('2025-12-21'),
        priority: "high",
        id_status: statuses[1].id_status, // In Progress
        id_project: projects[0].id_project,
        id_client: clients[0].id_client
      },
      {
        title: "Cable Replacement",
        description: "Replace damaged power cables",
        scheduled_date: new Date('2025-12-25'),
        priority: "medium",
        id_status: statuses[0].id_status, // Pending
        id_project: projects[1].id_project,
        id_client: clients[1].id_client
      },
      {
        title: "Generator Maintenance",
        description: "Monthly maintenance of backup generator",
        scheduled_date: new Date('2025-12-18'),
        start_date: new Date('2025-12-18'),
        priority: "low",
        id_status: statuses[2].id_status, // Completed
        id_project: projects[2].id_project,
        id_client: clients[2].id_client
      }
    ]);
    console.log(`✅ Created ${interventions.length} interventions`);

    // ======================
    // 8. ASSIGN USERS TO INTERVENTIONS (N-N)
    // ======================
    // Create junction table entries manually
    await Intervent.bulkCreate([
      {
        id_intervention: interventions[0].id_intervention,
        id_user: users[2].id_user
      },
      {
        id_intervention: interventions[1].id_intervention,
        id_user: users[2].id_user
      },
      {
        id_intervention: interventions[1].id_intervention,
        id_user: users[3].id_user
      },
      {
        id_intervention: interventions[2].id_intervention,
        id_user: users[3].id_user
      }
    ]);
    console.log("✅ Assigned users to interventions");

    // ======================
    // 9. TASKS
    // ======================
    const tasks = await Task.bulkCreate([
      {
        title: "Check oil levels",
        description: "Inspect transformer oil levels and quality",
        start_date: new Date('2025-12-20'),
        end_date: new Date('2025-12-20'),
        id_status: statuses[2].id_status, // Completed
        id_project: projects[0].id_project,
        id_user: users[2].id_user
      },
      {
        title: "Test insulation",
        description: "Perform insulation resistance test",
        start_date: new Date('2025-12-21'),
        end_date: new Date('2025-12-21'),
        id_status: statuses[0].id_status, // Pending
        id_project: projects[0].id_project,
        id_user: users[2].id_user
      },
      {
        title: "Order new cables",
        description: "Purchase replacement cables",
        id_status: statuses[0].id_status, // Pending
        id_project: projects[1].id_project,
        id_user: users[1].id_user
      }
    ]);
    console.log(`✅ Created ${tasks.length} tasks`);

    // ======================
    // 10. REPORTS
    // ======================
    const reports = await Report.bulkCreate([
      {
        title: "Monthly Maintenance Report",
        content: "All systems functioning normally. Performed routine checks on transformers and distribution panels.",
        summary: "Successful monthly maintenance",
        id_intervention: interventions[2].id_intervention,
        id_user: users[3].id_user
      }
    ]);
    console.log(`✅ Created ${reports.length} reports`);

    // ======================
    // 11. DOCUMENTS
    // ======================
    const documents = await Document.bulkCreate([
      {
        file_name: "transformer_specs.pdf",
        file_path: "/uploads/transformer_specs_001.pdf",
        file_type: "application/pdf",
        file_size: 2048000,
        id_intervention: interventions[0].id_intervention
      }
    ]);
    console.log(`✅ Created ${documents.length} documents`);

    console.log("\n🎉 SEEDING COMPLETE!");
    console.log("====================");
    console.log("📊 Summary:");
    console.log(`- Statuses: ${statuses.length}`);
    console.log(`- Roles: ${roles.length}`);
    console.log(`- Departments: ${departments.length}`);
    console.log(`- Users: ${users.length}`);
    console.log(`- Clients: ${clients.length}`);
    console.log(`- Projects: ${projects.length}`);
    console.log(`- Interventions: ${interventions.length}`);
    console.log(`- Tasks: ${tasks.length}`);
    console.log(`- Reports: ${reports.length}`);
    console.log(`- Documents: ${documents.length}`);
    
    console.log("\n🔑 Test Login Credentials:");
    console.log("Admin: admin@sonelgaz.dz / password123");
    console.log("Manager: manager@sonelgaz.dz / password123");
    console.log("Technician: tech1@sonelgaz.dz / password123");
    
    process.exit(0);
  } catch (error) {
    console.error("\n❌ SEEDING ERROR:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

seed();