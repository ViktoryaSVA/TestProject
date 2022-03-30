import mongoose from "mongoose";
import axios, { AxiosResponse } from 'axios';
import { GetPhotoInterface, PhotoInterface } from '../interfaces/photo.interface';

const {photoScheme} = require('../models/photo.model');

mongoose.connect("mongodb://localhost:27017/APIproject");

const Photo = mongoose.model("Photo", photoScheme);

const loadPhoto =  async function(req: any, res: any, PhotoInterface:PhotoInterface) {
    PhotoInterface.ownerCheck = req.body;
    const resultOwner: AxiosResponse = await axios.post(`http://localhost:3081/login`, PhotoInterface.ownerCheck);

    if (resultOwner.status == 200){
        const resultPhoto: AxiosResponse = await axios.get(`http://jsonplaceholder.typicode.com/photos`);

        let buffPhoto: Array<any> = [];

        resultPhoto.data.forEach((photoElement: any) => {
            const photo =  new Photo({
                photoID: photoElement.id,
                albumId: photoElement.albumId,
                title: photoElement.title,
                url: photoElement.url,
                thumbnailUrl: photoElement.thumbnailUrl,
                owner: PhotoInterface.ownerCheck.login
            })

            buffPhoto.push(photo);
            photo.save(function(){
                // mongoose.disconnect();
                console.log("Сохранен объект", photo);
            });
        })
        res.send({
            status: '200' ,
            data: buffPhoto

        });
    } else {
        res.send({
            status: '500',
            data: 'Error'
        })
    }
}

const getPhoto = async function (req: any, res: any, GetPhotoInterface:GetPhotoInterface) {
    try {
        GetPhotoInterface.ownerID = req.body.ownerid;
        GetPhotoInterface.page = req.body.page;
        GetPhotoInterface.maxcount = req.body.maxcount;

        if (GetPhotoInterface.ownerID) {
            Photo.find({albumID: GetPhotoInterface.page}, function (err, photos){
                res.send({
                    status: '200' ,
                    data: photos
                });
            }).limit(GetPhotoInterface.maxcount)
        } else {
            Photo.find({}, function (err, photos){
                res.send({
                    status: '200' ,
                    data: photos
                });
            }).limit(GetPhotoInterface.maxcount)
        }
    } catch (err) {
        res.send({
            status: '400' ,
            data: 'Wrong data'
        });
    }
}

const deletePhoto = async function (req: any, res: any, PhotoInterface: PhotoInterface) {
    PhotoInterface.ownerCheck = req.body;
    const resultOwner: AxiosResponse = await axios.post(`http://localhost:3081/login`, PhotoInterface.ownerCheck);

    if (resultOwner.status == 200) {
        PhotoInterface.photoID = req.body.photoID;
        Photo.deleteMany({photoID: PhotoInterface.photoID}, function (err){
            if (err) {
                res.send({
                    status: '400' ,
                    data: err
                });
            } else {
                res.send({
                    status: '200' ,
                    data: 'Deleted'
                });
            }
        })
    }
}

const deleteAlbum = async function (req: any, res: any, PhotoInterface: PhotoInterface) {
    PhotoInterface.ownerCheck = req.body;
    const resultOwner: AxiosResponse = await axios.post(`http://localhost:3081/login`, PhotoInterface.ownerCheck);

    if (resultOwner.status == 200){
        PhotoInterface.albumID = req.body.albumID;
        Photo.deleteMany({albumId: PhotoInterface.albumID}, function (err){
            if (err) {
                res.send({
                    status: '400' ,
                    data: err
                });
            } else {
                res.send({
                    status: '200' ,
                    data: 'Deleted album'
                });
            }
        })
    }
}

const changeAlbumTitle = async function (req: any, res: any, PhotoInterface: PhotoInterface) {
    PhotoInterface.ownerCheck = req.body;
    const resultOwner: AxiosResponse = await axios.post(`http://localhost:3081/login`, PhotoInterface.ownerCheck);

    if (resultOwner.status == 200){
        PhotoInterface.albumID = req.body.albumID;
        PhotoInterface.newAlbumName = req.body.newAlbumName;

        Photo.updateMany({albumId: PhotoInterface.albumID}, {title: PhotoInterface.newAlbumName}, function (err:any){
            if (err) {
                res.send({
                    status: '400' ,
                    data: err
                });
            } else {
                res.send({
                    status: '200' ,
                    data: 'Updated album'
                });
            }
        })
    }
}

module.exports = {
    loadPhoto,
    getPhoto,
    deletePhoto,
    deleteAlbum,
    changeAlbumTitle
}
