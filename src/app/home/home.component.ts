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
  template: 'ALBUMS - {{user}}'
})
export class AlbumComponent implements OnInit {
  private user;
  private sub;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.user = params['user'];
    });
  }
  private ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

// photos sub outlet
@Component({
  selector: 'photos',
  template: 'PHOTOS'
})
export class PhotoComponent{}
