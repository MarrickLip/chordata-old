export type PostDeploymentRequestBody = {
	metadata: Record<string, unknown>,
	blobs: Array<Record<string, unknown>>
}

export type PostDeploymentRequestHeaders = {
	device: string,
};