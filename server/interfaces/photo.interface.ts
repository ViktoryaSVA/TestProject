export interface GetPhotoInterface {
    ownerID: number;
    page: number;
    maxcount: number;
}

export interface PhotoInterface {
    ownerCheck: any;
    photoID: Array<number> | number;
    albumID: Array<number> | number;
    newAlbumName: string;
}
