import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';
import { EventHandler } from '../lib/EventHandler';
import { ProjectExists } from '../lib/guards';

const withCors = (response: APIGatewayProxyResult) => ({
	...response,
	headers: {
		...response.headers,
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Credentials': true,
	},
});

export async function handler(
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
	const _handler = {
		'POST /projects/{projectId}/{deploymentId}': postDeploymentHandler,
	}[`${event.httpMethod} ${event.resource}`];
	return withCors(await _handler.handle(event));
}

const postDeploymentHandler = new EventHandler([ProjectExists], async (event) => {
	console.log('create new ingest...')
	console.log(event);
	return {
		statusCode: 200,
		body: '',
	}
});