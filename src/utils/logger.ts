import winston from 'winston';
import Config from '../config';

export enum LogLevels {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  HTTP = 3,
  VERBOSE = 4,
  DEBUG = 5,
  SILLY = 6,
}

export class Logger {
  private readonly _logger: winston.Logger;

  constructor(config: Config) {
    this._logger = winston.createLogger(config.winstonConfig);
    if (config.appConfig.env !== 'production') {
      this._logger.debug('Logging initialized at debug level');
    }
  }

  log(message: any): void {
    this._logger.info(message);
  }

  info(message: any): void {
    this._logger.info(message);
  }

  debug(message: any | object): void {
    this._logger.debug(message);
  }

  error(message: any, trace?: any, context?: string): void {
    this._logger.error(
      `${context || ''} ${message} -> (${
        trace ||
                trace ||
                trace ||
                trace ||
                trace ||
                'trace not provided !'
      })`,
    );
  }

  warn(message: string): void {
    this._logger.warn(message);
  }
}
