require("dotenv").config();

const config = {
    development: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: process.env.DB_HOST,
        dialect: "postgres"
    },
    test: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.DB_TEST,
        host: process.env.DB_HOST,
        dialect: "postgres"
    },
    docker: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: process.env.DB_HOST,
        dialect: "postgres",
        port: 5439
    },
    docker_test: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.DB_TEST,
        host: process.env.DB_HOST,
        dialect: "postgres",
        port: 5439
    },
}

module.exports = config;