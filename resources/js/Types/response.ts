export interface Response<Data = any> {
    message : string
    data    : Data
    max_page: number
}