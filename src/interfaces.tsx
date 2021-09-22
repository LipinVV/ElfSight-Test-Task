export interface characterInterface {
    id: number,
    name: string,
    created: string,
    episode: string[],
    gender: string,
    image: string,
    location: {name: string, url: string},
    origin: {name: string, url: string},
    species: string,
    status: string,
    type: string,
    url: string
}