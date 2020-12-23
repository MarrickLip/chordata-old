import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { db } from '../lib/database';

export const handle: APIGatewayProxyHandler = async (event, _context) => {
  const projects = await db.projects()
  const results = await projects.find({}).toArray()
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: '[Chordata API] Projects',
      projects: results,
      path: event.path,
      method: event.httpMethod,
    }, null, 2),
  };
}