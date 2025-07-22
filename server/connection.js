require("dotenv").config();

const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "development";

const config = {
  connectionString: process.env.DATABASE_URL,
  ...(ENV === "production" && { max: 2 }),
};

const pool = new Pool(config);

module.exports = pool;
