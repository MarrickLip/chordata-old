import { db } from '../lib/database';

export async function listProjects(): Promise<unknown> {
	const projects = await db.projects();
	return projects.find({}).toArray();
}

export async function getProject(id: string): Promise<unknown> {
	const projects = await db.projects();
	const matches = await projects.find({ _id: id }).limit(1).toArray();
	return matches[0];
}