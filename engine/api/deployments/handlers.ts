import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';
import { EventHandler } from '../lib/EventHandler';
import { ProjectExists } from '../lib/guards';
import { v4 as uuid } from 'uuid';
import { createDeployment, ingestSamples } from './actions';

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
	const body = JSON.parse(event.body);
	const deploymentId = uuid();

	console.log('[postDeploymentHandler] create deployment')

	await createDeployment({
		_id: deploymentId,
		metadata: body.metadata,
		device: event.headers.device,
		timestamp: new Date().getTime(),
	});

	console.log('[postDeploymentHandler] ingestSamples')
	await ingestSamples(body.samples, event.headers.device, deploymentId);

	return {
		statusCode: 200,
		body: '',
	}
});