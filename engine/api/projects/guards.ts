import { Guard } from '../lib/EventHandler'
import { checkProjectExists } from './actions'

export const ProjectExists: Guard = [
    (event) => checkProjectExists(event.pathParameters.projectId),
    { statusCode: 404, body: "Project doesn't exist" },
]
