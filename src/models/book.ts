import { ShelvesType } from "../defines/defines";

export interface Book {
    shelf: ShelvesType,
    imageLinks?: {
        thumbnail: string
    },
    authors: string[],
    title: string,
    id:string,
}