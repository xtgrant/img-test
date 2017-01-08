import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UsersService {
    private userUrl = 'http://jsonplaceholder.typicode.com/users';
    private albumsUrl = 'http://jsonplaceholder.typicode.com/albums';
    private photosUrl = 'http://jsonplaceholder.typicode.com/photos';

    constructor (private http: Http) {}
    getUsers() {
       return this.http.get(this.userUrl)
                       .map((res:Response) => res.json())
                       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    getUsersAlbums(userId){
       return this.http.get('${this.albumsUrl}?userId=${userId}')
                      .map((res:Response) => res.json())
                      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    getUsersPhotos(albumId){
       return this.http.get('${this.albumsUrl}?albumId=${albumId}')
                      .map((res:Response) => res.json())
                      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

}
