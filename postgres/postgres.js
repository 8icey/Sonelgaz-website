const { Client } = require('pg');
const conString = process.env.DATABASE_URL || "postgres://postgres:nitro2020@localhost:5432/SonelgazDB";

const client = new Client({ connectionString: conString });

// Connect once and reuse
client.connect()
    .then(() => console.log("Connected to PostgreSQL database"))
    .catch(err => {
        console.error("Postgres connection error:", err);
        process.exit(1);
    });

// Export function to insert user
async function insertUser(name) {
    try {
        const query = 'INSERT INTO users (Name) VALUES ($1) RETURNING *';
        const result = await client.query(query, [name]);
        console.log(`User inserted: ${result.rows[0].Name}`);
        return result.rows[0]; // Returns the inserted row
    } catch (err) {
        console.error("Error inserting user:", err);
        throw err;
    }
}

module.exports = { client, insertUser };
// ithub etst