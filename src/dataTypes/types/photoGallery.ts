
export type photoObject = {
    "id": number,
    "photographer": string,
    "url": string,
    "artWork": string,
    "File_extension": string,
    "size": string,
    "width": string,
    "height": string
}


export type fetchPhotos = {
    photos_list: photoObject[] | any[],
    temp_list: photoObject[] | any[],
    errorMessage: null | string
}

// export enum IActionKind {
//     SUCCESS = "SUCCESS",
//     FIELD = "FIELD"
// }

export type ActionPhoto = { type: "success", payload: photoObject[] } | { type: "field", payload: string } | { type: "search", payload: photoObject[] }