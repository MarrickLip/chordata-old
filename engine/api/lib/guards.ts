import { APIGatewayProxyEvent } from "aws-lambda";
import { checkProjectExists } from "./actions";
import { Guard } from "./EventHandler";

export const ProjectExists: Guard = [
	(event: APIGatewayProxyEvent): Promise<boolean> =>
		checkProjectExists(event.pathParameters.projectId),
	{ statusCode: 404, body: "Project doesn't exist" },
];