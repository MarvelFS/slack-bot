import accessEnv from './accessEnv';

export const NODE_ENV: string = accessEnv('NODE_ENV', 'development');

export const PORT: number = +accessEnv('PORT', '8080');

export const SLACK_HOOK: string = accessEnv('SLACK_HOOK', 'xxx');

export const RDS_HOSTNAME: string = accessEnv('RDS_HOSTNAME', 'localhost');

export const RDS_PORT: number = +accessEnv('RDS_PORT', '5432');

export const RDS_USERNAME: string = accessEnv('RDS_USERNAME');

export const RDS_PASSWORD: string = accessEnv('RDS_PASSWORD');

export const RDS_DB_NAME: string = accessEnv('RDS_DB_NAME');
