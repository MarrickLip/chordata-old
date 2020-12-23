import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export type Guard = [(event: APIGatewayProxyEvent) => Promise<boolean>, APIGatewayProxyResult];

export class EventHandler {
    constructor(
        public guards: Guard[],
        public fallback: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>
    ) {}

    async handle(event: APIGatewayProxyEvent) {
        for (var [test, response] of this.guards) {
            if (!(await test(event))) { return response }
        }

        return this.fallback(event);
    }
}