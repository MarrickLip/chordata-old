import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ListProjectsResponse } from '../../../../model/api/ListProjectsResponse'
import { API_ENDPOINT } from 'app/constants';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) { }

  async listProjects(): Promise<ListProjectsResponse> {
    const url = `${API_ENDPOINT}/projects`
    return this.http.get<ListProjectsResponse>(url).toPromise()
  }

}
