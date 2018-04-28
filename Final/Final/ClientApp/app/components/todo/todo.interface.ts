export interface Todo {
    id: number,
    desc: string,
    date: string,
    warnDay: number,
    warnHour: number,
    state: string,
    tags: any[]
}