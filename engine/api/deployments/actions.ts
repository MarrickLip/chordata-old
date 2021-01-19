import { db } from '../lib/database';
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { INGEST_QUEUE_URL } from '../../constants';

const sqs = new SQSClient({});

export async function createDeployment(deployment: unknown): Promise<void> {
	const deployments = await db.deployments();
	await deployments.insertOne(deployment);
}

export async function ingestSamples(samples: object[], deviceId: string, deployment: string): Promise<void> {
	await Promise.all(
		samples.map(sample => sendSampleToIngestQueue({...sample, deployment}, deviceId))
	)
}

async function sendSampleToIngestQueue(sample: unknown, deviceId: string): Promise<void> {
	await sqs.send(new SendMessageCommand({
		QueueUrl: INGEST_QUEUE_URL(deviceId),
		MessageBody: JSON.stringify(sample),
	}));
}