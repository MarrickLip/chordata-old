export interface ListProjectsResponse {
    id: string;
    type: string;
    info: {
        name: string,
        description: string,
        image: string,
        tags: string[],
    }
}