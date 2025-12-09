import {createLogger, format, transports} from 'winston';

const { combine, timestamp, printf, colorize } = format;

const logFormat = printf(({level, message, timestamp })=>{
    return `${timestamp} [${level}] : ${message}`;
});

export const logger = createLogger({
    level: 'info',
    format: combine(timestamp({format: 'YYYY-MM-DD HH:MM:SS '}), logFormat),
    transports:[
        new transports.Console({
            format: combine(colorize(),timestamp(), logFormat)
        }),
        new transports.File({filename: 'logs/execution.log',options: {flag:'w'}}),
        new transports.File({filename: 'logs/errors.log', level: 'error', options: {flag:'w'} })
    ]
});