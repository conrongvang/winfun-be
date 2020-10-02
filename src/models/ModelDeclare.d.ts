export declare interface RegisterNow {
    id?: number,
    email: string,
    phoneNumber: string,
    name: string,
    sent?: number,
    createdDate?: string
}

export declare interface WinfunEvent {
    id?: number
    createdDate?: string
    location: string
    beginDatetime: string
    endDatetime: string
    descriptions?: string
    detailLink: string
    show?: number
    sequence?: number
}