export type ListProjectsResponseItem = {
    id: string,
    type: string,
    info: {
        name: string,
        description: string,
        image: string,
        tags: string[],
    }
};

export type ListProjectsResponse = Array<ListProjectsResponseItem>;