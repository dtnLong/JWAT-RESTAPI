export interface ResponseInterface {
    status: number,
    data: any,
    error: {
        code: number,
        path: string,
        message: string
    }
}