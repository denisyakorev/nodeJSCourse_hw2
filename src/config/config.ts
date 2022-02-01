const dotenv = require("dotenv");
const joi = require("joi");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = joi
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

const { value: envVars, error } = envVarsSchema
    .validate(process.env);

if (error) {
  console.log('error :>>', error);
  throw new Error(`Config validation error: ${error.message}`);
}

export const config =  {
  dbUsername: envVars.DB_USERNAME,
  dbPort: envVars.DB_PORT,
  dbPassword: envVars.DB_PASSWORD,
  dbName: envVars.DB_NAME,
  dbConnectionString: `postgres://${envVars.DB_USERNAME}:${envVars.DB_PASSWORD}@0.0.0.0:${envVars.DB_PORT}/${envVars.DB_NAME}`,
  jwtSecret: envVars.JWT_SECRET,
};
