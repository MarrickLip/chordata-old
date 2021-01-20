import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ListProjectsResponse } from '~model/api/ListProjectsResponse';
import { API_ENDPOINT } from '../constants';
import { PostDeploymentRequestBody, PostDeploymentRequestHeaders } from '~model/api/PostDeploymentRequest';

@Injectable({
	providedIn: 'root',
})
export class APIService {
	constructor(private http: HttpClient) {}

	async listProjects(): Promise<ListProjectsResponse> {
		const url = `${API_ENDPOINT}/projects`;
		return this.http.get<ListProjectsResponse>(url).toPromise();
	}

	async postDeployment(projectId: string, body: PostDeploymentRequestBody, headers: PostDeploymentRequestHeaders): Promise<void> {
		const url = `${API_ENDPOINT}/projects/${projectId}/deployments`;
		await this.http.post(url, body, {headers}).toPromise();
	}
}
