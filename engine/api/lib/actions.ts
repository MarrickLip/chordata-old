import { db } from "./database";

export async function checkProjectExists(id: string): Promise<boolean> {
	const projects = await db.projects();
	const matches = await projects
		.find({ _id: id })
		.limit(1)
		.project({})
		.toArray();
	return matches.length > 0;
}
