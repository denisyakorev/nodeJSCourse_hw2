"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var dotenv = require("dotenv");
var joi = require("joi");
var path = require("path");
dotenv.config({ path: path.join(__dirname, "../../.env") });
var envVarsSchema = joi
    .object({
    DB_USERNAME: joi
        .string()
        .required(),
    DB_PORT: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_NAME: joi.string().required(),
    JWT_SECRET: joi.string().required().description("My api secret"),
})
    .unknown();
var _a = envVarsSchema
    .validate(process.env), envVars = _a.value, error = _a.error;
if (error) {
    console.log('error :>>', error);
    throw new Error("Config validation error: " + error.message);
}
exports.config = {
    dbUsername: envVars.DB_USERNAME,
    dbPort: envVars.DB_PORT,
    dbPassword: envVars.DB_PASSWORD,
    dbName: envVars.DB_NAME,
    dbConnectionString: "postgres://" + envVars.DB_USERNAME + ":" + envVars.DB_PASSWORD + "@0.0.0.0:" + envVars.DB_PORT + "/" + envVars.DB_NAME,
    jwtSecret: envVars.JWT_SECRET,
};
