import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import { EventHandler } from '../lib/EventHandler';
import { getProject, listProjects } from './actions';
import { ProjectExists } from './guards';

export const handler: APIGatewayProxyHandler = async (event, _context) => ({
  'GET /projects': listProjectsHandler,
  'GET /projects/{projectId}': getProjectHandler,
}[`${event.httpMethod} ${event.resource}`].handle(event));

const listProjectsHandler = new EventHandler(
  [ProjectExists],
  async event => ({
    statusCode: 200,
    body: JSON.stringify(await listProjects()),
  })
)

const getProjectHandler = new EventHandler(
  [ProjectExists],
  async event => ({
    statusCode: 200,
    body: JSON.stringify(await getProject(event.pathParameters.projectId)),
  })
)