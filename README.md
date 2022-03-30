# TestProject
Examples of requests

http://localhost:3000/register

{
    "login":"testNewUser",
    "email":"testNewUser@gmail.com",
    "password":"testNewUser1234"
}


http://localhost:3000/login
{
    "login":"testNewUser",
    "email":"testNewUser@gmail.com",
    "password":"testNewUser1234"
}

http://localhost:3000/load-photos
{
    "login":"testNewUser",
    "password":"testNewUser1234"
}

http://localhost:3000/get-photos
{
    "ownerID":1,
    "page":1,
    "maxcount":5
}

http://localhost:3000/delete-photo

{
    "login":"testNewUser",
    "password":"testNewUser1234",
    "photoID": [23, 30, 29]    
}

http://localhost:3000/delete-album

{
    "login":"testNewUser",
    "password":"testNewUser",
    "albumID": [4,5]
}

http://localhost:3000/change-album-title

{
    "login":"testNewUser",
    "password":"testNewUser1234",
    "albumID": 4,
    "newAlbumName": "testName"
}
