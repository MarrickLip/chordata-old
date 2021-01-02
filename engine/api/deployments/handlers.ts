import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';

export const handle: APIGatewayProxyHandler = async (
	event
): Promise<APIGatewayProxyResult> => {
	return {
		statusCode: 200,
		body: JSON.stringify(
			{
				message: '[Chordata API] Deployments',
				path: event.path,
				method: event.httpMethod,
			},
			null,
			2
		),
	};
};
