import { APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';

import { EventHandler } from '../lib/EventHandler';
import { getProject, listProjects } from './actions';
import { ProjectExists } from './guards';

const withCors = (response: APIGatewayProxyResult) => ({
	...response,
	headers: {
		...response.headers,
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Credentials': true,
	},
});

export async function handler(event, _context) {
	const _handler = {
		'GET /projects': listProjectsHandler,
		'GET /projects/{projectId}': getProjectHandler,
	}[`${event.httpMethod} ${event.resource}`];
	return withCors(await _handler.handle(event));
}

const listProjectsHandler = new EventHandler([], async () => ({
	statusCode: 200,
	body: JSON.stringify(await listProjects()),
}));

const getProjectHandler = new EventHandler([ProjectExists], async (event) => ({
	statusCode: 200,
	body: JSON.stringify(await getProject(event.pathParameters.projectId)),
}));
