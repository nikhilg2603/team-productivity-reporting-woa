const { Pool } = require("pg");

// PostgreSQL connection configuration
const pool = new Pool({
  user: "app_user",
  host: "localhost",
  database: "team_productivity",
  password: "password",
  port: 5432,
});

pool.on("connect", () => {
  console.log("Connected to the PostgreSQL database!");
});

pool.on("error", (err) => {
  console.error("Unexpected error on the PostgreSQL client:", err);
  process.exit(-1);
});

module.exports = pool;
