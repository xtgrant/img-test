import { Component, OnInit } from '@angular/core';
import {UsersService} from './../users.service';
import {Observable} from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UsersService]
})
export class HomeComponent implements OnInit {
 title = 'users';
 public users;
 constructor(private userService: UsersService) {}

 ngOnInit() {
   this.getUsers();
 }

 getUsers(){
   this.userService.getUsers().subscribe(
     data=> {this.users = data},
     error=> console.error('error on users'),
     ()=> console.log('done with users')
   );
 }
}

// albums sub outlet
@Component({
  selector: 'albums',
  styleUrls: ['./home.component.css'],
  template: `<h3>ALBUMS - UserId:{{userId}} | Quantity: {{albumLength}} </h3>
  <ul class="child-group-ul">
    <li class="album-group-item"  *ngFor="let album of albums" >
      <a [routerLink]="['/home',{outlets:{'photosRoute':['photos',{'id':userId,'albumId':album.id}]}}]"
        routerLinkActive="active" class="album-group-link">
        <img [src]=album.tmbUrl />
        <span class="subtitle"><em>Album Title:</em> {{album.title}}</span>
        </a>
    </li>
  </ul>`
})
export class AlbumComponent implements OnInit {
  private userId;
  private sub;
  private albums = [];
  private albumLength;

  constructor(private route: ActivatedRoute, private userService: UsersService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.userId = params['id'];
      let id = params['id'];

      this.getUsersAlbums(id);
    });
  }
  getUsersAlbums(id){
    this.userService.getUsersAlbums(id).subscribe(
      data=> {
        this.albumLength = data.length;
        this.albums = [];
        data.forEach(album => {
          this.getFirstPhoto(album.id).subscribe(
            data =>{
              let nAlbum = album;
              nAlbum['tmbUrl'] = data[0].thumbnailUrl;
              this.albums.push(nAlbum);
            }
          );

        });
      },
      error=> console.error('error on users'),
      ()=> console.log('done with albums')
    );
  }
  getFirstPhoto(id){
     return this.userService.getUsersPhotos(id);
  }

  private ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

// photos sub outlet
@Component({
  selector: 'photos',
  styleUrls: ['./home.component.css'],
  template: `<h3>PHOTOS - AlbumId:{{albumId}} | UserId:{{userId}} | Quantity: {{photoLength}} </h3>
    <ul class="child-group-ul">
      <li class="photos-group-item"  *ngFor="let photo of photos" >
          <div>
          <span class="subtitle"><em>Photo Title:</em> {{photo.title}}</span>
          <img [src]=photo.thumbnailUrl />
          </div>

      </li>
    </ul>`
})
export class PhotoComponent implements OnInit {
  private userId;
  private albumId;
  private sub;
  private photos;
  private photoLength;

  constructor(private route: ActivatedRoute, private userService: UsersService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.albumId = params['albumId'];
      let id = params['albumId'];

      this.getUsersPhotos(id);
    });

  }
  getUsersPhotos(id){
     this.userService.getUsersPhotos(id).subscribe(
       data=> {
        this.photoLength = data.length;
        this.photos = data;
      },
       error=> console.error('error on users'),
       ()=> console.log('done with users')
     );
  }
}
