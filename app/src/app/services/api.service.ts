import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ListProjectsResponse } from '~model/api/ListProjectsResponse';
import { API_ENDPOINT } from '../constants';
import { PostIngestRequestBody, PostIngestRequestHeaders } from '~model/api/PostIngestRequest';

@Injectable({
	providedIn: 'root',
})
export class APIService {
	constructor(private http: HttpClient) {}

	async listProjects(): Promise<ListProjectsResponse> {
		const url = `${API_ENDPOINT}/projects`;
		return this.http.get<ListProjectsResponse>(url).toPromise();
	}

	async postIngest(projectId: string, body: PostIngestRequestBody, headers: PostIngestRequestHeaders): Promise<void> {
		const url = `${API_ENDPOINT}/projects/${projectId}/ingests`;
		await this.http.post(url, body, {headers});
	}
}
