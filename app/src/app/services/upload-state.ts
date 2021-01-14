export type WebkitFile = File & {webkitRelativePath: string};

export type UploadState = {
	stage: 'SELECT_FILES' | 'ADD_METADATA' | 'CREATE_BLOBS' | 'CREATE_INGEST' | 'COMPLETE',
	projectId?: string,
	deviceId?: string,
	files?: WebkitFile[],
	metadata?: Record<string, unknown>,
	blobs?: Array<Record<string, unknown>>,
	ingestId?: string,
}