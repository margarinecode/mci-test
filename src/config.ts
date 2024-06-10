import * as dotenv from 'dotenv';
import DailyRotateFile from 'winston-daily-rotate-file';
import winston from 'winston';

export interface AppConfig {
  env: string,
  host: string,
  port: number,
  baseUrl: string,
}

export enum AppMode {
  DEV = 'development',
  PROD = 'production',
}


export default class Config {
  constructor() {
    dotenv.config();
  }

  get environment() {
    return process.env.NODE_ENV;
  }

  get appConfig(): AppConfig {
    const host = process.env.HOST || 'http://localhost';
    const port = Number(process.env.PORT);
    let baseUrl = host;
    if (host.includes('localhost')) {
      baseUrl = [host, port].join(':');
    }
    return {
      env: process.env.NODE_ENV || 'development',
      host,
      port,
      baseUrl,
    };
  }

  get winstonConfig(): winston.LoggerOptions {
    let transports = [
      new DailyRotateFile({
        level: 'debug',
        filename: `./logs/${this.appConfig.env}/debug-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
        ),
      }),
      new DailyRotateFile({
        level: 'error',
        filename: `./logs/${this.appConfig.env}/error-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        zippedArchive: false,
        maxSize: '20m',
        maxFiles: '30d',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
        ),
      }),
      new winston.transports.Console({
        level: this.appConfig.env === 'development' ? 'debug' : 'info',
        handleExceptions: true,
        format: winston.format.combine(
          winston.format.timestamp({
            format: 'DD-MM-YYYY HH:mm:ss',
          }),
          winston.format.json(),
        ),
      }),
    ];

    return {
      transports,
      exitOnError: false,
    };
  }
}
