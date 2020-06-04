import accessEnv from './accessEnv';

export const NODE_ENV: string = accessEnv('NODE_ENV', 'development');

export const PORT: number = +accessEnv('PORT', '8080');

export const SLACK_HOOK: string = accessEnv('SLACK_HOOK', 'xxx');
