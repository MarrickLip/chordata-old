export type PostIngestRequestBody = {
	metadata: Record<string, unknown>,
	blobs: Array<Record<string, unknown>>
}

export type PostIngestRequestHeaders = {
	device: string,
};