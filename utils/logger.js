const fs = require('fs');
const { createLogger, format, transports } = require('winston');
const winstonDaily = require('winston-daily-rotate-file');

const logDir = __dirname + '/../logs';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// winston format
const { combine, timestamp, printf } = format;

// Define log format
const logFormat = printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: [
    // info log setting
    new winstonDaily({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/info', // log file /logs/info/*.log in save
      filename: `%DATE%.log`,
      maxFiles: 30, // 30 Days saved
      json: false,
      zippedArchive: true,
    }),
    // error log setting
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/error', // log file /logs/error/*.log in save
      filename: `%DATE%.error.log`,
      maxFiles: 30, // 30 Days saved
      handleExceptions: true,
      handleRejections: true,
      json: false,
      zippedArchive: true,
    }),
  ],
});

if (process.env.NODE_ENV === 'development') {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat,
      ),
      level: 'debug',
      handleExceptions: true,
      handleRejections: true,
      colorize: true,
      prettyPrint: true,
    }),
  );
}

const stream = {
  write: message => {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  },
};

module.exports = { logger, stream };
