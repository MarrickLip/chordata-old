import { db } from '../lib/database';

export async function listProjects() {
	const projects = await db.projects();
	return projects.find({}).toArray();
}

export async function getProject(id: string) {
	const projects = await db.projects();
	const matches = await projects.find({ _id: id }).limit(1).toArray();
	return matches[0];
}

export async function checkProjectExists(id: string) {
	const projects = await db.projects();
	const matches = await projects
		.find({ _id: id })
		.limit(1)
		.project({})
		.toArray();
	return matches.length > 0;
}
