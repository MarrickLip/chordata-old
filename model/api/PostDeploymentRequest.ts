export type PostDeploymentRequestBody = {
	metadata: Record<string, unknown>,
	samples: Array<Record<string, unknown>>
}

export type PostDeploymentRequestHeaders = {
	device: string,
};