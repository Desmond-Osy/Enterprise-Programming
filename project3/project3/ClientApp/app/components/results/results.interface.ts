export interface Results {
    count: number,
    previous: string,
    results: ResultDetail[],
    next: string
}

interface ResultDetail {
    url: string,
    name: string

}