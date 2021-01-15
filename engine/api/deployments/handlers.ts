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
		'Access-Control-Allow-Headers' : 'device',
	},
});

export async function handle(
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
	const _handler = {
		'POST /projects/{projectId}/deployments': postDeploymentHandler,
	}[`${event.httpMethod} ${event.resource}`];

	if (_handler) {
		return withCors(await _handler.handle(event));
	} else {
		throw new Error(`No handler for ${event.httpMethod} ${event.resource}`);
	}
}

const postDeploymentHandler = new EventHandler([ProjectExists], async (event) => {
	console.log('create new ingest...');
	console.log(event);
	return {
		statusCode: 200,
		body: '',
	}
});