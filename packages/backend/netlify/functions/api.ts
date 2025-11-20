import { Handler } from '@netlify/functions';
import serverless from 'serverless-http';
import app from '../../src/app';

// Wrap Express app for Netlify Functions
const handler: Handler = serverless(app);

export { handler };
