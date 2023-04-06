const { createLogger, format, transports } = require("winston");
const dotenv = require("dotenv").config();

module.exports = createLogger({
  transports: new transports.File({
    level: process.env.LOGGER_LEVEL,
    filename: "logger/logger.log",
    format: format.combine(
      format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
      format.align(),
      format.printf(
        (error) => `${error.level}: ${[error.timestamp]}: ${error.message}`
      )
    ),
  }),
});
