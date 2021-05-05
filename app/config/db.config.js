module.exports = {
    HOST: "localhost",
    USER: "pwbe_user",
    PASSWORD: "pwbe_pass",
    PORT: 5432,
    DB: "backend2",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};  